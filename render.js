import { fetchPost, fetchDelete, toggleLike } from "./api.js";
import { getAPI } from "./script.js";
import { rederLoginComponent } from "./components/login-component.js"
import { getListComments } from "./listComments.js";

let token = null;
let name = null;

const renderApp = (comments, listComments) => {


  const appEl = document.getElementById('app');

  if (!token) {
    rederLoginComponent({
      comments,
      appEl,
    setToken: (newToken) => {
      token = newToken;
    },
    setName: (newName) => {
      name = newName; 
    },
    getAPI});
  } else { 

  const commentsHtml = comments.map((comment, index) => listComments(comment, index)).join("");

  const appHTML = `<div class="container">

  <ul class="comments">
   ${commentsHtml}
  </ul>

  
  <div class="add-form">
    <input type="text" class="add-form-name" value = "${name}" />
    <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
    <div class="add-form-row">
      <button class="add-form-button">Написать</button>
      <button class="delete-form-button">Удалить последний комментарий</button>
    </div>
  </div>
  <div class="comment-loading">Комментарий добавляется...</div>
</div>`;


  appEl.innerHTML = appHTML;

  const formCommentElement = document.querySelector('.add-form');
  const inputNameElement = document.querySelector('.add-form-name');
  const inputTextElement = document.querySelector('.add-form-text');
  const buttonElement = document.querySelector('.add-form-button'); 
  const commentsElement = document.querySelector('.comments');
  const buttonElementDel = document.querySelector('.delete-form-button');
  const commentLoadingElement = document.querySelector('.comment-loading');
  const currentDate = new Date().toLocaleDateString('default', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
    " " + new Date().toLocaleTimeString().slice(0, -3);


  

  //счетчик лайков у каждого комментария
  function getLikeButton() {

    const likesButton = document.querySelectorAll('.like-button');
    for (const like of likesButton) {
      like.addEventListener("click", (event) => {

        event.stopPropagation();


        const likeIndex = like.dataset.index;
        const commentsElementLikeIndex = comments[likeIndex];
        like.classList.add('-loading-like');

        if (commentsElementLikeIndex.likeComment) {
          commentsElementLikeIndex.likeComment = false;
          commentsElementLikeIndex.propertyColorLike = 'like-button -no-active-like';
        } else {
          commentsElementLikeIndex.likeComment = true;
          commentsElementLikeIndex.propertyColorLike = 'like-button -active-like';
        }


        const id = like.dataset.id;

        toggleLike({id, token});        

        delay(2000).then(() => {
          getAPI();
        })

      })
    }
  };
  getLikeButton();


  function replyToComment() {
    let commentElements = document.querySelectorAll('.comment');

    for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {

        const indexComment = commentElement.dataset.index;
        let QUOTE_BEGIN = 'QUOTE_BEGIN';
        let QUOTE_END = 'QUOTE_END';
        inputTextElement.value =
          `${QUOTE_BEGIN}${comments[indexComment].name}:\n${comments[indexComment].text}${QUOTE_END}\n\n`;
      }
      )
    }
  };

  replyToComment();


  const deleteComment = () => {

    const deleteButtons = document.querySelectorAll(".delete-button");

    for (const deleteButton of deleteButtons) {
      deleteButton.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = deleteButton.dataset.id;
        console.log(id);
       
        fetchDelete(token, id)
          .then((responseData) => {
            comments = responseData.appComments;
            return getAPI();
          });

      });
    }
  };

  deleteComment();


  
  buttonElement.setAttribute('disabled', true);


  inputTextElement.addEventListener("input", () => {

    buttonElement.setAttribute('disabled', true);

    if (inputTextElement.value.length > 0) {

      buttonElement.removeAttribute('disabled');
    }
  });


 
  const postData = () => {

    return fetchPost(token, inputTextElement, inputNameElement)
      .then((response) => {
        return getAPI();
      })
      .then((data) => {
        commentLoadingElement.classList.add('comment-loading');
        formCommentElement.classList.remove('comment-loading');

        inputNameElement.value = "";
        inputTextElement.value = "";

      })
      .catch((error) => {

        
        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуйте позже");
          postData();
        } else
        
          if (error.message === "Плохой запрос") {
            alert("Имя и комментарий должны быть не короче 3 символов");
          } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
            console.log(error);
          }

        buttonElement.removeAttribute('disabled');
        commentLoadingElement.classList.add('comment-loading');
        formCommentElement.classList.remove('comment-loading');

        console.log(error);
      });
  };



  buttonElement.addEventListener("click", () => {

    commentLoadingElement.classList.remove('comment-loading');
    formCommentElement.classList.add('comment-loading');
    buttonElement.setAttribute('disabled', true);


    postData(fetchPost);
  });


  ///Доп.задание2 нажатие клавиши Enter должно вызывать ту же логику, которая срабатывает при клике на кнопку «Добавить».
  document.addEventListener("keyup", function (event) {
    if (event.shiftKey && (event.keyCode === 13)) {
      //переносит на другую строку
    } else if (event.keyCode === 13) {
      buttonElement.click();
    }
  });

  //удаление последнего комментари
  buttonElementDel.addEventListener("click", () => {

    comments.pop();
    renderApp(comments, getListComments)
    // const lastElement = commentsElement.lastElementChild;
    // lastElement.remove();
    });
  }

};

export default renderApp;
import { getCurrentDate } from "./utils.js";
import { nameInputElement, commentInputElement, buttonElement,commentLoadingElement, formCommentElement } from './main.js';


export function fetchData() {
    return fetch("https://wedev-api.sky.pro/api/v1/bredikhina-viktoriia/comments", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        const appComments = responseJson.comments.map((comment) => {
          return {
            name: comment.author.name,
            dateOfCreation: getCurrentDate(new Date(comment.date)),
            text: comment.text,
            likeComment: comment.isLiked,
            likesNumber: comment.likes,
            propertyColorLike: 'like-button no-active-like',
          }
        });
        return appComments;
      });
  };

  export function postData(comments) {
    return fetch("https://wedev-api.sky.pro/api/v1/bredikhina-viktoriia/comments", {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        date: getCurrentDate(new Date()),
        text: commentInputElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll('QUOTE_BEGIN', "<div class='comment-quote'><b>")
          .replaceAll('QUOTE_END', "</b></div>"),
        isLiked: false,
        likes: 0,
        propertyColorLike: 'like-button no-active-like',
      })
    })
      .then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер сломался");
        } else if (response.status === 400) {
          throw new Error("Плохой запрос");
        } else {
          return fetchData();
        }
      })
      .then((data) => {
        commentLoadingElement.classList.add ('comment-loading');      
        formCommentElement.classList.remove ('comment-loading');
  
        nameInputElement.value = "";
        commentInputElement.value = "";
  
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
        commentLoadingElement.classList.add ('comment-loading');      
        formCommentElement.classList.remove ('comment-loading');
  
        console.log(error);
      });
  };
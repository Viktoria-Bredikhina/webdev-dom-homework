import { fetchData, postData } from './fetch.js';
import { renderComments, replyToComment, getLikes } from './comment.js';

const commentsLoading = document.querySelector('.data-loading');
export const formCommentElement = document.querySelector('.add-form');
export const commentLoadingElement = document.querySelector('.comment-loading');
const deleteButtonElement = document.getElementById("delete-button");
export const buttonElement = document.getElementById("add-button");
export const listElement = document.getElementById("list");
export const nameInputElement = document.getElementById("name-input");
export const commentInputElement = document.getElementById("comment-input");

let comments = [];

const loadComments = () => {
  commentsLoading.style.display = 'block';
  fetchData()
    .then((data) => {
      commentsLoading.style.display = 'none';
      comments = data;
      renderComments(comments);
    });
};

loadComments(); 

nameInputElement.addEventListener("input", () => {
  buttonElement.disabled = true;
  if (nameInputElement.value.length > 0 && commentInputElement.value.length > 0) {
    buttonElement.disabled = false;
  }
});

commentInputElement.addEventListener("input", () => {
  buttonElement.disabled = true;
  if (nameInputElement.value.length > 0 && commentInputElement.value.length > 0) {
    buttonElement.disabled = false;
  }
});

buttonElement.addEventListener("click", () => {
  commentLoadingElement.classList.remove('comment-loading');
  formCommentElement.classList.add('comment-loading');
  buttonElement.setAttribute('disabled', true);

  postData(comments)
    .then(() => {
      loadComments();
      nameInputElement.value = ""; 
      commentInputElement.value = ""; 
      buttonElement.disabled = true;
    })
    .catch((error) => {
      console.log(error);
    });
});

document.addEventListener("keyup", function (enter) {
  if (enter.keyCode == 13) {
    buttonElement.click();
  }
});

deleteButtonElement.addEventListener("click", () => {
  comments.pop();
  renderComments(comments);
});


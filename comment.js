
import { listElement, nameInputElement, commentInputElement, buttonElement } from './main.js';
import { getCurrentDate } from "./utils.js";

export function replyToComment(comments) {
  let commentElements = document.querySelectorAll(".comment");
  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      const indexComment = commentElement.dataset.index;
      commentInputElement.value += `>${comments[indexComment].name}:\n${comments[indexComment].text.replaceAll("QUOTE_BEGIN", "<div class='comment-quote'><b>").replaceAll("QUOTE_END", "</b></div>")}\n\n`;
    });
  }
}

export function getLikes(comments) {
  const likesButton = document.querySelectorAll(".like-button");
  for (const like of likesButton) {
    like.addEventListener("click", (event) => {
      event.stopPropagation();
      const likeIndex = like.dataset.index;
      const commentsElementLikeIndex = comments[likeIndex];
      if (commentsElementLikeIndex.likeComment) {
        commentsElementLikeIndex.likesNumber -= 1;
        commentsElementLikeIndex.likeComment = false;
        commentsElementLikeIndex.propertyLikeImage = "like-button -no-active-like";
      } else {
        commentsElementLikeIndex.likesNumber += 1;
        commentsElementLikeIndex.likeComment = true;
        commentsElementLikeIndex.propertyLikeImage = "like-button -active-like";
      }
      renderComments(comments);
    });
  }
}

export function renderComments(comments) {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment" data-index="${index}">
          <div class="comment-header" data-index="${index}">
            <div>${comment.name
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")}</div>
            <div>${comment.dateOfCreation}</div>
          </div>
          <div class="comment-body">
            <div data-index="${index}" class="comment-text">${comment.text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("QUOTE_BEGIN", "<div class='comment-quote'><b>")
      .replaceAll("QUOTE_END", "</b></div>")}</div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likesNumber}</span>
              <button data-index="${index}" class="like-button ${comment.propertyLikeImage}" alt="Like"></button>
            </div>
          </div>
        </li>`;
    })
    .join("");
  listElement.innerHTML = commentsHtml;
  getLikes(comments);
  replyToComment(comments);
}
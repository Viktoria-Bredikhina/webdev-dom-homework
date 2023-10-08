import { getCurrentDate } from './utils.js';
import { getLikes } from './likes.js';
import { replyToComment } from './reply.js';
import { listElement, nameInputElement, commentInputElement, buttonElement } from './main.js';

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
                <div data-index="${index}" class="comment-text">
                  ${comment.text
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;")
                    .replaceAll("QUOTE_BEGIN", "<div class='comment-quote'><b>")
                    .replaceAll("QUOTE_END", "</b></div>")}
                </div>
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
  nameInputElement.value = "";
  commentInputElement.value = "";
  buttonElement.disabled = true;
  if (nameInputElement.value.length > 0 && commentInputElement.value.length > 0) {
    buttonElement.disabled = false;
  }
};
import { commentInputElement } from './main.js';
export function replyToComment(comments) {
    let commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {
        const indexComment = commentElement.dataset.index;
        commentInputElement.value = `>${comments[indexComment].name}:\n${comments[indexComment].text.replaceAll("QUOTE_BEGIN", "<div class='comment-quote'><b>").replaceAll("QUOTE_END", "</b></div>")}\n\n`;
      });
    }
  }
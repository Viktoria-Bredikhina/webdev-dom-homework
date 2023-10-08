import { renderComments } from './render.js';

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
          commentsElementLikeIndex.propertyLikeImage =
            "like-button -no-active-like";
        } else {
          commentsElementLikeIndex.likesNumber += 1;
          commentsElementLikeIndex.likeComment = true;
          commentsElementLikeIndex.propertyLikeImage =
            "like-button -active-like";
        }
        renderComments(comments);
      });
    }
  }
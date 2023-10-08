import { getCurrentDate } from "./utils.js";
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
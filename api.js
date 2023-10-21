import { getCurrentDate } from "./date.js";

const host = "https://wedev-api.sky.pro/api/v2/viktoriia-bredikhina/comments/";

export const fetchGet = () => {
  return fetch(host, {
    method: "GET",
  })
  .then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    } else  if (response.status === 500) {
      throw new Error("Сервер сломался");
    } else {
      return response.json();
    }    
  })
}



//отпраляем новые данные   
export const fetchPost = (token,commentInputElement,nameInputElement) => {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: nameInputElement.value,
      date: format(new Date()),
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
      forceError: true,
    }),
    headers: {
      Authorization: token,
  }
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      } else if (response.status === 400) {
        throw new Error("Плохой запрос");
      } else {
        return response.json();
      }
    })

}

//удаляем
export function fetchDelete(token,id) {
  return fetch(host + id, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
}

export const loginUser = ({login, password}) => {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
     login,
     password
    })
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      } else if (response.status === 400) {
        throw new Error("Нет авторизации");
      } else {
        return response.json();
      }
    })

}


export const registerUser = ({login, password,name}) => {
  return fetch("https://wedev-api.sky.pro/api/user", {
    method: "POST",
    body: JSON.stringify({
     login,
     password,
     name,
    })
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      } else if (response.status === 400) {
        throw new Error("Такой пользователь уже существует");
      } else {
        return response.json();
      }
    })

}


//лайки
export const toggleLike = ({id, token}) => {
  return fetch(`https://wedev-api.sky.pro/api/v2/viktoriia-bredikhina/comments/${id}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    return response.json();
  });
}
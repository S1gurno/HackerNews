import Api from '../utils/API.js';
// window.localStorage.setItem('id', 'sijducewince2ibuweidkmsi8327ry2hiec');  // Создание элемента
// window.localStorage.removeItem('id');   // Удаление элемента
// window.localStorage.clear();     // Очистка хранилища

// const id = window.localStorage.getItem('id');   // Чтение элемента

const commentsList = document.querySelector(".comments__list"); // Комментарии новости
// const url = "https://hacker-news.firebaseio.com/v0/";
const numberOfComments = 10;
const news = document.querySelector(".news__url");
const api = new Api();

function renderComment(response) {
    // console.log('response: ', response);
    const newComment = document.querySelector('template').cloneNode(true).content;
    // let commentId = response.id
    newComment.querySelector(".author").textContent = `By: ${response.by}`;
    newComment.querySelector(".comment__text").innerHTML = response.text ? response.text : null;
    return newComment;
}


function getComments() {
    const newsId = window.localStorage.getItem('id');
    // New story
    api.getNewsById(newsId)
        .then((res) => {
            if (res) {
                news.textContent = `News Title: ${res.title}`
            }
            if (res.kids) {
                res.kids.map((itemId) => {
                    // Get comments
                    api.getNewsById(itemId)
                        .then((res) => {
                            if (res) {
                                const newComment = renderComment(res);
                                if (!commentsList) {
                                    return;
                                }
                                const kidsList = newComment.querySelector('.comment__kids');
                                commentsList.append(newComment);
                                getKidComments(res, kidsList);
                            }

                        })
                })
            }
        })
        .catch((err) => console.log(err))
}

function getKidComments(res, commentKids) {
    if (res.kids) {
        res.kids.map((itemId) => {
            api.getNewsById(itemId) // Fetch Parent Comments
                .then((res) => {
                    api.getNewsById(res.kids) //Fetch Kid Comments
                        .then((res) => {
                            if (res && commentKids) {
                                const kidComment = renderComment(res);
                                const kidsList = kidComment.querySelector(".comment__kids");
                                commentKids.append(kidComment);
                                getKidComments(res, kidsList);
                            }
                            else {
                                return;
                            }
                        })


                })
        })
    }
}



getComments()




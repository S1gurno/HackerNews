import { api } from '../utils/API';
const NewsList = document.querySelector(".main__list")
const url = "https://hacker-news.firebaseio.com/v0/"
const numberOfStories = 15;
let comment;
// const button = document.querySelector(".comments__button")

function getNews() {
    api.getAllNews()
        .then((res) => {
            res.slice(0, numberOfStories).map((item) => {
                api.getNewsByID(item)
                    .then((res) => {
                        // console.log('res: ', res);
                        const newItem = document.querySelector('template').cloneNode(true).content;
                        newItem.querySelector(".main__list-item-title").textContent = res.title;
                        newItem.querySelector(".main__list-item-title").href = res.url;
                        newItem.querySelector(".main__list-item-author").textContent = `By: ${res.by}`;
                        let newsId = res.id;

                        newItem.querySelector(".comments__button").addEventListener("click", (event) => {
                            event.preventDefault();
                            window.localStorage.setItem('id', `${res.id}`);
                            window.location.href = "./components/comments/comment.html";
                        });

                        NewsList.append(newItem);

                    })
                    .catch((err) => { console.log(err) });

            })
        })
        .catch((err) => console.log(err));

    // const newItem = document.querySelector('template').cloneNode(true).content;

    // newItem.querySelector("main__list-item-title").textContent = res.title;
    // newItem.querySelector("main__list-item-title").href = res.url;

    // NewsList.append(newItem)
}

// `https://hacker-news.firebaseio.com/v0/item/${}.json?print=pretty`
getNews()

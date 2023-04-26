import { URL } from "./config.js";

class Api {
    constructor() {
        this._url = URL;
    }

    getAllNews() {
        const result = fetch(`${this._url}beststories.json?print=pretty`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Не получил список новостей');
                }
                return res.json();
            })
        return result;
    }

    getNewsById(itemID) {
        return fetch(`${this._url}item/${itemID}.json?print=pretty`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Не получил новость по id');
                }
                return res.json();
            })
    }
}

export default Api;

// const obj = {
//     name: 'Вася',
//     age: 15,
// }

// const { name, age } = obg;
// const name = obg.name;
// const age = obj.age;

// const newOnject = {
//     name,
//     age
// }

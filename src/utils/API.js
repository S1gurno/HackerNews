import { URL } from "./config.js";

class Api {
    constructor(url) {
        this._url = url;
    }

    onResponse(res) {
        return res.json();
        // if (res.ok) {
        // }
    }

    getAllNews() {
        fetch(`${url}beststories.json?print=pretty`)
            .then(onResponse);
    }

    getNewsById(itemID) {
        fetch(`${url}item/${itemID}.json?print=pretty`)
            .then(onResponse);
    }


}

const api = new Api(URL);
export default api;

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

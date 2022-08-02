export default function request ({path, params = {}, method, dataForm = null}) {
    let url = `http://localhost:8888/${path}?`

    if (Object.keys(params).length) {
        for (let key in params) {
            url = url + `${key}=${params[key]}&`
        }
    }

    return fetch(url,{
        method: method,
        credentials: 'include',
        body: dataForm
    }).then((response) => response.json())
}
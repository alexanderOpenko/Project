export default async function request ({path, params = {}, method, dataForm = null}) {
    let url = `http://localhost:8888/${path}?`
//http://localhost:8888/
//https://streeterstore.000webhostapp.com/
    if (Object.keys(params).length) {
        for (let key in params) {
            url = url + `${key}=${params[key]}&`
        }
    }

    const response = await fetch(url, {
        method: method,
        credentials: 'include',
        body: dataForm
    })
    
    return await response.json()
}



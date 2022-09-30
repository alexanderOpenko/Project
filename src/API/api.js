export default async function request ({path, params = {}, method, dataForm = null}) {
    let url = `https://streeterstore.000webhostapp.com/${path}?`

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



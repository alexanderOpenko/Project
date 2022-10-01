import axios from 'axios'

export default async function request ({path, params = {}, method, dataForm = null}) {
    const baseUrl = 'https://alexanderopenko.github.io/'
    let getParams = `/${path}?`

    if (Object.keys(params).length) {
        for (let key in params) {
            getParams = getParams + `${key}=${params[key]}&`
        }
    }

    const instance = axios.create({
        baseURL: baseUrl,
        credentirals: 'include',
        withCredentials: true,    
    })

    if (method === 'POST') {
        return instance.post(path, dataForm, {headers: { 
            "Content-Type": "multipart/form-data" 
        }}).then((response) => {
            return response.data
        })
    } else {
        return instance.get(getParams).then((response) => {
            return response.data
        })
    } 
}



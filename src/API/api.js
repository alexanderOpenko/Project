import axios from 'axios'

export default async function request ({path, params = {}, method, dataForm = null}) {
    console.log('reguest');
    const baseUrl = 'https://apistreeter.000webhostapp.com/'

    const instance = axios.create({
        baseURL: baseUrl,
        withCredentials: true,   
    })

    if (method === 'POST') {
        const response = await instance.post(path, dataForm, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })      

        return response.data
    } else {
        const response = await instance.get(path, { 
            params 
        })
        console.log(response, 'response');
        return response.data
    } 
}



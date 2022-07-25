export default function request (path, q, option, method, dataForm = null) {
    return fetch(`http://localhost:8888/store/${path}?` + (q ? `${q}=${option}` : ''),{
        method: method,
        credentials: 'include',
        body: dataForm
    }).then((response) => response.json())
}
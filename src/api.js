const API = 'http://localhost:2000/user'
// const API2 = 'http://10.0.2.2:2000/task'

// export const getTasks = async () => {
//     const res = await fetch(API)
//     return await res.json()
// }

export const getUser = async (id) => {
    const res = await fetch(`${API}/${id}`)
    return await res.json()
}

// export const saveTask = async (title, desrcirp) => {
//     const obj = await {
//         title: title,
//         description: desrcirp
//     }
//     const res = await fetch(API, {
//         method: 'POST',
//         headers: { Accept: 'application/json', "Content-Type": 'application/json' },
//         body: JSON.stringify(obj)
//     })
//     return await res.json()
// }

// export const del = async (id) => {
//     const res = await fetch(`${API2}/${id}`, {
//         method: 'DELETE'
//     })
//     // return await res.json()
// }
// export const edit = async (id, title, description) => {
//     const obj = await {
//         id: id,
//         title: title,
//         description: description
//     }
//     const res = await fetch(`${API2}/${id}`, {
//         method: 'PUT',
//         headers: { Accept: 'application/json', "Content-Type": 'application/json' },
//         body: JSON.stringify(obj)
//     })

// }
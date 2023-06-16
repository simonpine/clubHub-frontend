const API = 'http://localhost:2000/user'
const AP2 = 'http://localhost:2000/users'

export const usersImg = 'http://localhost:2000/images/'
// const API2 = 'http://10.0.2.2:2000/task'

// export const getTasks = async () => {
//     const res = await fetch(API)
//     return await res.json()
// }

export const getUser = async (id) => {
    const res = await fetch(`${API}/${id}`)
    return await res.json()
}

export const getUserName = async (id) => {
    const res = await fetch(`${API}Name/${id}`)
    return await res.json()
}

export const putUser = async (userName, pasword, question, answer) => {
    const obj = await {
        userName,
        clubs: [],
        pasword,
        question,
        answer
    }
    const res = await fetch(AP2, {
        method: 'POST',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(obj)
    })
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
export const editUser = async (userName, clubs, pasword, userImg, question, answer, oldUserName) => {
    const obj = await {
        userName,
        clubs,
        pasword,
        userImg,
        question,
        answer,
    }
    await fetch(`${API}/${oldUserName}`, {
        method: 'PUT',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(obj)
    })

}


export const uploadFile = async (body) => {

    await fetch(`${API}/photo/upload`, {
        method: 'POST',
        // headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: body
    })

}
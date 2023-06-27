// import io from 'socket.io-client'

const API = 'https://clubhub-backend.up.railway.app/user'
const AP2 = 'https://clubhub-backend.up.railway.app/users'
const API3 = 'https://clubhub-backend.up.railway.app/club'
export const usersImg = 'https://clubhub-backend.up.railway.app/images/usersImg/'
// const socket = io('https://clubhub-backend.up.railway.app')
const APIc = 'https://clubhub-backend.up.railway.app/clubs'
export const BannersImg = 'https://clubhub-backend.up.railway.app/images/banners/'
const API3e = 'https://clubhub-backend.up.railway.app/userExitClub'


// //===========================Users

// const API = 'http://localhost:2000/user'
// const AP2 = 'http://localhost:2000/users'
// const API3 = 'http://localhost:2000/club'
// export const usersImg = 'http://localhost:2000/images/usersImg/'
// const socket = io('http://localhost:2000')

// //==========================Clubs

// const APIc = 'http://localhost:2000/clubs'
// const API3e = 'http://localhost:2000/userExitClub'
// export const BannersImg = 'http://localhost:2000/images/banners/'


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
        body: body
    })

}

export const newClub = async (body) => {

    await fetch(`${APIc}/upload`, {
        method: 'POST',
        body: body
    })

}

export const getClubs = async () => {
    const res = await fetch(`${APIc}`)
    return await res.json()
}

export const getClubId = async (id) => {
    const res = await fetch(`${API3}/${id}`)
    return await res.json()
}

export const joinToClub = async (obj) => {
    await fetch(`${APIc}/join`, {
        method: 'PUT',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(obj)
    })
}

export const exitClub = async (obj) => {
    await fetch(`${API3e}`, {
        method: 'PUT',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(obj)
    })
}

export const deleteClub = async (obj, id) => {
    await fetch(`${APIc}/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(obj)
    })
}
export const editClub = async (obj, id) => {
    await fetch(`${API3}/${id}`, {
        method: 'PUT',
        body: obj
    })
}
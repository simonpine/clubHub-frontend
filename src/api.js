export const urlBase = 'http://localhost:2000'
// export const urlBase = 'https://clubhub-backend.up.railway.app'

//===========================Users

const API = urlBase + '/user'
const AP2 = urlBase + '/users'
const API3 = urlBase + '/club'
export const usersImg = urlBase + '/images/usersImg/'

//==========================Clubs

const APIc = urlBase + '/clubs'
const API3e =  urlBase + '/userExitClub'
export const BannersImg = urlBase + '/images/banners/'
export const chatsFlies = urlBase + '/images/chats/'


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
        answer,
        description: "👋 Hey there! I'm using ClubHub"
    }
    const res = await fetch(AP2, {
        method: 'POST',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(obj)
    })
    return await res.json()
}

export const editUser = async (userName, clubs, pasword, userImg, question, answer, description, oldUserName) => {
    const obj = await {
        userName,
        clubs,
        pasword,
        userImg,
        question,
        answer,
        description,
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
export const saveGrades = async (obj) => {
    await fetch(`${API3}/grades`, {
        method: 'POST',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: JSON.stringify(obj)
    })

}

export const sendMsgEvent = async (obj) => {
    await fetch(`${API3}/events`, {
        method: 'POST',
        body: obj
    })

}

export const sendMsgChat = async (obj) => {
    await fetch(`${API3}/chat`, {
        method: 'POST',
        body: obj
    })

}

export const calendarUpdate = async (obj) => {
    await fetch(`${API3}/calendar`, {
        method: 'POST',
        headers: { Accept: 'application/json', "Content-Type": 'application/json' },
        body: obj
    })

}
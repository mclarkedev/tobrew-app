import uuidv4 from 'uuid/v4'
import moment from 'moment'

let brews = []

// Read existing brews from local storage
const loadBrews = () => {
    const brewsJSON = localStorage.getItem('brews')

    try {
        return brewsJSON ? JSON.parse(brewsJSON) : []
    } catch (e) {
        return []
    }
}

// Save brews to local storage
const saveBrews = () => {
    localStorage.setItem('brews', JSON.stringify(brews))
}

// Get brews from module
const getBrews = () => brews

const createBrew = () => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    brews.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp,
        ingredients: []
    })
    saveBrews()
    return id
}

// Remove brew from list
const removeBrew = (id) => {
    const brewIndex = brews.findIndex((brew) => brew.id === id)
    if (brewIndex > -1) {
        brews.splice(brewIndex, 1)
        saveBrews()
    }
}


// Update brew
const updateBrews = (id, updates) => {
    const brew = brews.find((brew) => brew.id === id)

    if (!brew) {
        return
    }

    if (typeof updates.title === 'string') {
        brew.title = updates.title
        brew.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        brew.body = updates.body
        brew.updatedAt = moment().valueOf()
    }

    saveBrews()
    return brew
}

brews = loadBrews()

export { loadBrews, saveBrews, getBrews, createBrew, removeBrew, updateBrews }
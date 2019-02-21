import { initializeEditPage, generateLastEdited, renderBrews } from './views.js'
import { updateBrews, removeBrew, createBrew } from './brews.js'

const titleElement = document.querySelector('#brew-title')
const bodyElement = document.querySelector('#brew-body')
const removeElement = document.querySelector('#remove-brew')
const saveElement = document.querySelector('#save-brew')
const dateElement = document.querySelector('#last-edited')

const brewId = location.hash.substring(1)

initializeEditPage(brewId)

titleElement.addEventListener('input', (e) => {
    const brew = updateBrews(brewId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(brew.updatedAt)
})

bodyElement.addEventListener('input', (e) => {
    const brew = updateBrews(brewId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(brew.updatedAt)
})

removeElement.addEventListener('click', () => {
    removeBrew(brewId)
    location.assign('/index.html')
})

saveElement.addEventListener('click', () => {
    location.assign('/index.html')
})


// Storage Listener
window.addEventListener('storage', (e) => {
    if (e.key === 'brews') {
        initializeEditPage(brewId)
    }
})

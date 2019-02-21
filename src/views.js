import moment from 'moment'
import { getFilters } from './filters.js'
import { getBrews, removeBrew } from './brews.js'


// Generate the DOM structure for a brew
const generateBrewDOM = (brew) => { 
    const brewEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    // Setup the brew title text
    if (brew.title.length > 0) {
        textEl.textContent = brew.title
    } else {
        textEl.textContent = 'Untitled Brew'
    } 
    textEl.classList.add('list-item__title')
    brewEl.appendChild(textEl)

    // Setup the link
    brewEl.setAttribute('href', `/edit.html#${brew.id}`)
    brewEl.classList.add('list-item')

    // Setup status message
    statusEl.textContent = generateLastEdited(brew.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    brewEl.appendChild(statusEl)

    return brewEl
}

// Render application brews
const renderBrews = () => {
    const brewsEl = document.querySelector('#brews')
    const filters = getFilters()
    // const filteredBrews = brews.filter((brew) => brew.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    const filteredBrews = getBrews().filter((brew) => {
        const searchTextMatch = brew.title.toLowerCase().includes(filters.searchText.toLowerCase())
        return searchTextMatch
    })

    brewsEl.innerHTML = ''

    if (filteredBrews.length > 0) {
        filteredBrews.forEach((brew) => {
            const brewEl = generateBrewDOM(brew)
            brewsEl.appendChild(brewEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No brews to show.'
        emptyMessage.classList.add('empty-message')
        brewsEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (brewId) => {
    const titleElement = document.querySelector('#brew-title')
    const bodyElement = document.querySelector('#brew-body')
    const dateElement = document.querySelector('#last-edited')
    const brews = getBrews()
    const brew = brews.find((brew) => brew.id === brewId) 
    
    if (!brew) {
        location.assign('/index.html')
    }
    
    titleElement.value = brew.title
    bodyElement.value = brew.body
    dateElement.textContent = generateLastEdited(brew.updatedAt)

}

// Create last edited timestamp
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}

export { generateBrewDOM, renderBrews, generateLastEdited, initializeEditPage }
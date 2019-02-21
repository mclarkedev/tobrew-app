import { createBrew } from './brews.js'
import { setFilters } from './filters'
import { renderBrews } from './views.js'

renderBrews()

document.querySelector('#create-brew').addEventListener('click', (e) => {
    const id = createBrew()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderBrews()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'brews') {
        renderBrews()
    }
})
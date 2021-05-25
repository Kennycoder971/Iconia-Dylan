import Carousel from './carousel.js'
import {initObserver} from './observer.js'


const burgerMenu = document.querySelector('#burger-menu')
const nav = document.querySelector('.navigation')
const closeBtn = document.querySelector('#close-btn')

burgerMenu.addEventListener('click', () => {
    nav.classList.toggle('open')
})

closeBtn.addEventListener('click', () => {
    nav.classList.remove('open')
})

new Carousel(document.querySelector('#carousel-1'), {
    slidesToScroll: 1,
    slidesVisible: 3
},
    document.querySelector('#button-element')
)

initObserver()
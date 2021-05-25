export default class Carousel {

    /**
     * @param  {HTMLElement} element
     * @param  {Object} options
     * @param  {Object} options.slidesToScroll Nombre d'éléments à faire défiler
     * @param  {Object} options.slidesVisible Nombre d'éléments visibles sur le slide
     * @param  {Boolean} options.loop Doit-on boucler en find de carousel ?
     */

    constructor(element, options = {
        slidesToScroll: 1,
        slidesVisible: 1,
        loop: false
    }, buttonElement) {
        this.element = element
        this.options = options
        this.currentItem = 0
        this.isMobile = false
        this.children = Array.from(element.children)
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel-container')
        this.moveCb = []
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = this.children.map(child => {
            let item = this.createDivWithClass('carousel-item')
            item.appendChild(child)
            this.container.appendChild(item)
            return item
        })
        this.setStyle()
        this.createNavigation(buttonElement)
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize)
    }

    /**
     * @param  {string} className
     * @return {HTMLElement}
     */

    createDivWithClass = (className) => {
        const div = document.createElement('div')
        div.classList.add(className)
        return div
    }
    /**
     *Applique les bonnes dimensions aux étléments du carousel 
     */
    setStyle = () => {
        this.ratio = (this.items.length / this.slidesVisible)
        this.container.style.width = this.ratio * 100 + '%'
        this.items.forEach(item => item.style.width = (100 / this.slidesVisible / this.ratio) * 100 + '%')
    }

    createNavigation = (buttonElement) => {
        let nextButton = this.createDivWithClass('carousel__next')
        let prevButton = this.createDivWithClass('carousel__prev')
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>'
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>'
        buttonElement.appendChild(nextButton)
        buttonElement.appendChild(prevButton)
        nextButton.addEventListener('click', this.next)
        prevButton.addEventListener('click', this.prev)
    }

    next = () => {
        this.goToItem(this.currentItem + this.slidesToScroll)
    }
    prev = () => {
        this.goToItem(this.currentItem - this.slidesToScroll)
    }
    /**
     * @param  {Number} index
     * Déplace le slider vers l'élément ciblé
     */
    goToItem = (index) => {
        if (index < 0) {
            index = this.items.length - this.slidesVisible
        } else if (index >= this.items.length || this.items[this.currentItem + this.slidesVisible] === undefined) {
            index = 0
        }

        let translateX = index * -100 / this.items.length
        this.container.style.transform = `translate3d(${translateX}%, 0,0)`
        this.currentItem = index
        this.moveCb.forEach(cb => cb())
    }
    /**
     * @param  {Carousel-moveCb} cb 
     */


    onWindowResize = () => {
        let mobile = window.innerWidth < 800

        if (mobile !== this.mobile) {
            this.isMobile = mobile
            this.setStyle()
        }
    }
    /**
     * @returns (number)
     */

    get slidesToScroll() {
        return this.isMobile ? 1 : this.options.slidesToScroll
    }
    /**
    * @returns (number)
    */
    get slidesVisible() {
        return this.isMobile ? 1 : this.options.slidesVisible
    }


}

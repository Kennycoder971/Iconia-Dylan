const elemToObserve = [
    ...document.querySelectorAll('.from-top'),
    ...document.querySelectorAll('.from-bottom'),
    ...document.querySelectorAll('.from-left'),
    ...document.querySelectorAll('.from-right'),
]

const ratio = .4
const options = {
    root:null,
    rootMargin:'0px',
    threshold:ratio
}
/**
 * @param  {HTMLElement} element
 * @param  {CssClass} className
 * @returns {Boolean}
 */
const chekClass = (element,className) => {
   return element.classList.contains(className)
}
/**
 * @param  {HTMLElement} element
 * Ajoute une classe reveal-vertical si l'élément contient une classe from-top ou from-bottom
 * ou une classe reveal-horizontal si l'élément contient une classe from-left ou from-right
 */

const addClassReveal = (element) => {
    if(chekClass(element, 'from-top') || chekClass(element, 'from-bottom')) {
        element.classList.add('reveal-vertical')
    } else if(chekClass(element, 'from-left') || chekClass(element, 'from-right')){
        element.classList.add('reveal-horizontal')
    }
}

/**
 * @param  {IntersectionObserverEntry} entries
 * @param  {Observer} observer
 * 
 * Ajoute une classe à chaque élément observé
 */
const handleIntersect = (entries, observer) => {

    entries.forEach(entry => {
        if(entry.intersectionRatio > ratio){
            addClassReveal(entry.target)
            observer.unobserve(entry.target)
        } 
    })
}
/**
 * Début l'observation des éléments dans la liste à observer (elemToObserve)
 */
export const initObserver = () => {
    const observer = new IntersectionObserver(handleIntersect,options)

    elemToObserve.forEach(el => {
        observer.observe(el)
    })
}


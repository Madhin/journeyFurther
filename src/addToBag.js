// Import our SCSS and put it into a variable as a string
import css from './assets/scss/style.scss'
// Get a helper to make our style element
// import {
//   makeStyleElementString,
//   handleLoadFailure,
//   retryTest,
//   // isMobile,
// } from '../lib/optimisation-helpers/dist'

import {
  isInViewport,
  makeStyleElementString,
  handleLoadFailure,
  retryTest,
  isMobile,
} from './helpers'

// Get our HTML style element as a string to insert wherever
const styleElementString = makeStyleElementString(css.toString())

// IIFE to initialise the test and catch any errors
;(function init(tries = 0) {
  const ticketNumber = 'DAL'
  try {
    // If this is an iFrame exit -- prevents our tests from appearing in iFrames
    if (window.location.href.includes('?sidebar=true')) return
    // if we have tried to load more than X times we failed
    if (tries > 5) return handleLoadFailure(5, 500, ticketNumber)
    // Add some logic to check for a target here and then retry
    if (!document.body) return retryTest(init, 500, tries++)

    // Add our css element string to the end of the document body
    document.body.insertAdjacentHTML('beforeend', styleElementString)
    ;(function () {
      console.log('code goes here!')
    })()
  } catch (e) {
    console.error(e)
  } finally {
    // Do some cleanup up
  }

  ;(function () {
    // sizeTilesPDP()

    // original add to bag button
    const pdpAddToBagButton = () =>
      document.querySelector('.button-primary.mobile-full.w-inline-block')

    const navMenuButton = () =>
      document.querySelector(
        '.nav-menu-buttons .button-primary.navigation-button.w-inline-block'
      )

    navMenuButton().querySelector('.button-text').textContent =
      'Get your free quote now'

    pdpAddToBagButton().querySelector('.button-text').textContent =
      'Get your free quote now'

    // add to bag popup
    const addToBagSticky = () =>
      `<div class = "addBagWrapper">
<div class = "innerContent">
<a href="#" class="navigation-brand w-nav-brand"><img width="367" loading="lazy" alt="" src="https://cdn.prod.website-files.com/6647b1346a7f7928dde2207a/668e8978b1337a659a9d5b0a_MSA-logo-full-dark.svg" class="image"></a>
<div class = "buttons">
<button class="chooseButton">Get your free quote now <div class="button-primary-arrow w-embed"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33331 8.5H12.6666M12.6666 8.5L8.66665 4.5M12.6666 8.5L8.66665 12.5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg></div></button>
</div>
</div>
</div>  
`

    document.body.insertAdjacentHTML('beforeend', addToBagSticky())

    const addBagPopup = () => document.querySelector('.addBagWrapper')

    const chooseButton = () => document.querySelector('.chooseButton')

    const logo = () =>
      document.querySelector('.addBagWrapper .navigation-brand')

    if (isMobile()) {
      logo().style.display = 'none'
    }

    chooseButton().addEventListener('click', () => {
      console.log('button pressed')
      pdpAddToBagButton().click()
    })

    addBagPopup().style.display = 'none'

    document.addEventListener('scroll', function () {
      if (!isInViewport(pdpAddToBagButton())) {
        console.log('scroll')
        addBagPopup().style.display = 'block'
      } else {
        addBagPopup().style.display = 'none'
      }
    })
    // }

    // const callback1 = function () {
    //   console.log('mutation')
    //   // addBagPopup().remove()

    //   // document.body.insertAdjacentHTML('beforeend', addToBagSticky())
    // }

    // // // const callback2 = function () {}

    // // // observer to detect changes on page
    // const config1 = {
    //   attributes: true,
    //   childList: true,
    //   subtree: true,
    //   characterData: true,
    // }

    // // const config2 = {
    // //   attributes: true,
    // //   childList: true,
    // //   subtree: true,
    // //   characterData: true,
    // // }

    // const observer1 = new MutationObserver(callback1)
    // // const observer2 = new MutationObserver(callback2)
    // observer1.observe(planPanel(), config1)
    // observer2.observe(likeCount(), config2)
  })()
})()

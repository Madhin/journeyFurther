
// Challenge 2
// Import our SCSS and put it into a variable as a string
import css from './assets/scss/styleTest2.scss'
// Get a helper to make our style element

import {
  // waitForElm,
  // isMobile,
  retryTest,
  handleLoadFailure,
  makeStyleElementString,
} from './helpers'

// Get our HTML style element as a string to insert wherever
const styleElementString = makeStyleElementString(css.toString())

// IIFE to initialise the test and catch any errors
;(function init(tries = 0) {
  try {
    // console.log('should run')
    // If this is an iFrame exit -- prevents our tests from appearing in iFrames
    // if (window.location.href.includes('?sidebar=true')) return
    // if we have tried to load more than X times we failed
    if (tries > 5) return handleLoadFailure()
    // Add some logic to check for a target here and then retry
    if (!document.body) return retryTest(init, 500, tries + 1)
    // if (document.body) {
    //   console.log('hello')
    //   // return retryTest(init, 500, tries + 1)
    // }
    // Add our css element string to the end of the document body
    document.body.insertAdjacentHTML('beforeend', styleElementString)
  } catch (e) {
    console.error(e)
  } finally {
    // Do some cleanup up
  }

  ;(function () {
    
     const reviewRating = document.querySelectorAll('.wrapper-reviews .row.mb-3.review-wrapper .total')
    
     const reviewNumber =  () => reviewRating.forEach((el)=> {
      console.log(el)
     })

    reviewNumber()



      // // Mutationobserver to observe changes to page
      // const observer = new MutationObserver(() => {
      //   // function that waits for the filter to function and then re inserts the promo block
      //   waitForElm(
      //     '.s-result-item.s-asin.sg-col.sg-col-12-of-12.s-widget-spacing-small'
      //   ).then(() => {
      //     if (document.querySelector('.promoContainer')) return
      //     allItems()[0].insertAdjacentHTML('afterend', promoBlock())
      //   })
      // })

      // const options = {
      //   attributes: true,
      // }

      // observer.observe(itemsContainer(), options)
    
  })()
})()

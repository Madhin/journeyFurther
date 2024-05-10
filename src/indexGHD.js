// Challenge 2
// Import our SCSS and put it into a variable as a string
import css from './assets/scss/styleTest2.scss'
// Get a helper to make our style element

import {
  waitForElm,
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
    // if we have tried to load more than X times we failed
    if (tries > 5) return handleLoadFailure()
    // Add some logic to check for a target here and then retry
    if (!document.body) return retryTest(init, 500, tries + 1)
    if (!document.querySelector('.product-images-main'))
      return retryTest(init, 500, tries + 1)
    // Add our css element string to the end of the document body
    document.body.insertAdjacentHTML('beforeend', styleElementString)
  } catch (e) {
    console.error(e)
  } finally {
    // Do some cleanup up
  }

  ;(function () {
    // function to fire once the has-reviews class appears on page
    waitForElm('.has-reviews').then(() => {
      console.log('Element is ready')
      const reviewHandler = () => {
        // all reviews containers
        const reviewRating = document.querySelectorAll(
          '.wrapper-reviews .row.mb-3.review-wrapper'
        )

        // hide reviews function
        const hideReviewsHandler = () =>
          reviewRating.forEach((el) => {
            const reviewNumber = Number(
              el.querySelector('.total').textContent.trim().charAt(0)
            )
            // console.log(reviewNumber)
            if (reviewNumber <= 3) {
              el.style.display = 'none'
            }
          })

        hideReviewsHandler()

        // function that hides the higest and lowest rating options
        const hideRatings = () => {
          const highestRating = document.querySelector(
            '.has-reviews option[value="highestRating"]'
          )
          const lowestRating = document.querySelector(
            '.has-reviews option[value="lowestRating"]'
          )
          highestRating.style.display = 'none'
          lowestRating.style.display = 'none'
        }
        hideRatings()
      }

      reviewHandler()

      const reviewContainer = document.querySelector('.wrapper-reviews')

      // Mutationobserver to observe changes to page
      const observer = new MutationObserver(() => {
        // console.log('mutation')
        reviewHandler()
      })

      const options = {
        attributes: true,
        childList: true,
        subtree: true,
      }

      observer.observe(reviewContainer, options)
    })
  })()
})()

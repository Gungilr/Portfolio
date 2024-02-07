/**
 * Define our route selectable stylesheets
 *
 * @type {Object}
 */
const stylesheets = {
    StartScreeb: '/components/StartScreen.css',
    Blog: '/components/Blog.css',
  }
  
  /**
   * Set the default fallback stylesheet
   * @type {[type]}
   */
  const defaultStylesheet = stylesheets.StartScreen
  
  const cssElement = document.getElementById('stylesheet')
  
  export default function stylesheet(to, from, next) {

    if (to.meta.stylesheet !== from.meta.stylesheet) {
      cssElement.href = stylesheets[to.meta.stylesheet] || defaultStylesheet
    }
  
    return next();
  }
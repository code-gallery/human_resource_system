const initializeGA = function() {
  /* eslint-disable */
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga')
  /* eslint-disable */

  window.ga('create', 'UA-86833250-1', 'auto')
  window.ga('send', 'pageview')
}

export const configureGA = function(history) {
  initializeGA()
  if (typeof window.ga === 'function') {
    history.listen((location) => {
      window.ga('send', 'pageview', location.pathname)
    })
  }
}

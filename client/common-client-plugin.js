/* global fetch, localStorage */
import * as airtime from './common-airtime.js'
import * as shared from './common-shared.js'
import * as ui from './common-ui.js'

function register ({ registerHook, peertubeHelpers }) {

  airtime.injectAirtimeScript()/* LOAD THIS AT FIRST */

  peertubeHelpers.getSettings().then((s) => {
    if (shared.setDebugEnabled(s.airtime_debug || false)) {
      shared.debug('=== Airtime Debug Logging Enabled ===')
    }
    if (!s) return
    /* Static calls for first load */
    shared.debug("==== AIRTIME CHECKING PATH ====== ", window.location.pathname)
    if(window.location.pathname == '/my-account/settings'){
      ui.injectLinkAccountButton(peertubeHelpers) 
    }

    shared.setPeertubeSupport(s.airtime_support_peertube == true)
    airtime.detectContentID(window.location.pathname);
    /* Static calls for first load - END */

    /* ANGULAR NAVIGATION-END */
    /* Detect content ID and check if we need to inject the buttons */
    registerHook({
      target: 'action:router.navigation-end',
      handler: params => {
        peertubeHelpers.getSettings().then((s) => {
          shared.setPeertubeSupport(s.airtime_support_peertube == true)
          airtime.detectContentID(params.path);
        })
        shared.debug("=== ====AIRTIME DEBUG ====== path is:", params.path)
        if(params.path == '/my-account/settings' || params.path == '/my-account'){
          ui.injectLinkAccountButton(peertubeHelpers)
        }
      }
    })
    
    /* Hook for adding donate buttons to video comments(threads) */
    registerHook({
      target: 'action:video-watch.video-threads.loaded',
      handler: params => {
        shared.injectDonateComments()
      }
    })
  })


  /* CUSTOM AIRTIME LINK ACCOUNT event */
  document.addEventListener('airtime-link-account-info', (event) => {
    shared.debug('airtime-link-account-info', event)
    fetch(shared.LinkApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: event.detail,
        host: window.location.host,
        protocol: window.location.protocol,
        token: localStorage.getItem('access_token')
      })
    })
  })

  if(localStorage.getItem('hide-airtime-blue-header') != true && localStorage.getItem('hide-airtime-blue-header') != 'true'){
    ui.injectAirtimeBlueHeader(peertubeHelpers) /* Static call for first load */
  }
}

export {
  register
}

/* global fetch, localStorage */
import * as airtime from './common-airtime.js'
import * as shared from './common-shared.js'
import * as ui from './common-ui.js'

function register ({ registerHook, peertubeHelpers }) {
  let isLoggedIn = peertubeHelpers.isLoggedIn();

  registerHook({
    target: 'action:router.navigation-end',
    handler: params => {
      // isLoggedIn = peertubeHelpers.isLoggedIn();
      airtime.detectContentID(params.path);
      shared.debug("=== ====AIRTIME DEBUG ====== path is:", params.path)
      if(params.path == '/my-account/settings' || params.path == '/my-account'){
        checkLinkAccountButton();
      }
    }
  })

  airtime.injectAirtimeScript()

  peertubeHelpers.getSettings().then((s) => {
    if (!s) return
    if (shared.setDebugEnabled(s.airtime_debug || false)) {
      shared.debug('=== Airtime Debug Logging Enabled ===')
    }
  })

  document.addEventListener('airtime-link-account-info', (event) => {
    shared.debug('airtime-link-account-info', event)
    fetch(shared.linkApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: event.detail,
        host: window.location.host,
        protocol: window.location.protocol,
        // name: localStorage.getItem('username'),
        token: localStorage.getItem('access_token')
      })
    })
  })

  function checkLinkAccountButton(){
    if(isLoggedIn){ 
      ui.injectLinkAccountButton(peertubeHelpers)
    }else{
      ui.removeLinkAccountButton()
    }
  }
  if(window.location.path == '/my-account/settings'){ /* TO-DO: ¿add condition to check if the account it's already linked? */
    checkLinkAccountButton(); /* Static call for first load */
  }
  if(localStorage.getItem('hide-airtime-blue-header') != true && localStorage.getItem('hide-airtime-blue-header') != 'true'){
    ui.injectAirtimeBlueHeader(peertubeHelpers) /* Static call for first load */
  }

}

export {
  register
}

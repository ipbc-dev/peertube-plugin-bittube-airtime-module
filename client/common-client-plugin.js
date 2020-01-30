
import * as airtime from './common-airtime.js'
import * as shared from './common-shared.js'

function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:router.navigation-end',
    handler: params => {
      airtime.detectContentID(params.path)
    }
  })

  airtime.injectAirtimeScript()

  peertubeHelpers.getSettings().then((s) => {
    if (!s) return
    if (shared.setDebugEnabled(s.airtime_debug || false)) {
      shared.debug('=== Airtime Debug Logging Enabled ===')
    }
  })
}

export {
  register
}

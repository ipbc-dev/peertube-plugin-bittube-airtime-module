
import * as airtime from './common-airtime.js'
// import api from './common-api.js'
// import constants from './common-constants.js'

// Fixed data for the whole Peertube Federation
// Platform Name: PeerTube Federation
// Platform UUID: a93e5513-4772-e3d0-8b9f-82bfe73a71de

function register ({ registerHook, peertubeHelpers }) {
  // getAccountInfo('icabaleiro@localhost:9000');
  // getChannelInfo('testing_channel');
  // getVideoInfo('0b96815f-6f70-4c47-8cb1-26c6d7cdd1df');

  registerHook({
    target: 'action:router.navigation-end',
    handler: params => {
      console.log('** params => ', params)
      airtime.detectContentID(params.path)
    }
  })

  airtime.injectAirtimeScript()
  // registerHook({
  //   target: "action:video-watch.video.loaded",
  //   handler: params => {
  //    console.log('** action:video-watch.video.loaded params => ', params)
  //   }
  // })

  // registerHook({
  //   target: "action:video-watch.init",
  //   handler: params => {
  //    console.log('** action:video-watch.init params => ', params)
  //   }
  // })

  // peertubeHelpers.getSettings().then(() => {})
}

export {
  register
}

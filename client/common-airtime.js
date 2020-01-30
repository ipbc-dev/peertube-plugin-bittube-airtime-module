import * as api from './common-api.js'
import * as constants from './common-constants.js'

export async function detectContentID (url) {
  // const url = window.location.pathname
  if (!url) {
    url = window.location.pathname
  }
  const urlSplit = url.split('/')
  console.log('== DETECT CONTENT ID ==')
  console.log('Path is:', url, urlSplit)
  // const videoUUID = '0b96815f-6f70-4c47-8cb1-26c6d7cdd1df';

  if (url.includes('/videos/watch/')) {
    // const videoUUID = url.replace('/videos/watch/', '')
    const videoUUID = urlSplit[3]
    // const metaVideo = getMeta('og:video:url')
    // const metaUrl = getMeta('og:url')
    /* Security Check */
    // if (metaUrl.includes(videoUUID) && metaVideo.includes(videoUUID)) {
    return setContentIdFromVideoUuid(videoUUID)
    // }
  } else if (url.includes('/accounts/')) {
    const userName = urlSplit[2]
    // const metaUrl = getMeta('og:url')
    // const profileActor = document.getElementsByClassName('actor-name')[0].innerText
    /* Security Check */
    // console.log('ACCOUNT CHECK metaUrl: ', metaUrl, '   profileActor is: ', profileActor, '  and username is: ', userName)
    // console.log(metaUrl.includes(userName), '     ', profileActor.includes(userName))
    // if (metaUrl.includes(userName) && profileActor.includes(userName)) {
    return setContentIdFromAccountName(userName)
    // }
  } else if (urlSplit[1] === 'video-channels') {
    const channelName = urlSplit[2]
    // const metaUrl = getMeta('og:url')
    // const channelActor = document.getElementsByClassName('actor-name')[0].innerText
    /* Security Check */
    // console.log('CHANNEL CHECK metaUrl: ', metaUrl, '   channelActor is: ', channelActor, '  and channelName is: ', channelName)
    // console.log(metaUrl.includes(channelName), '     ', channelActor.includes(channelName))
    // if (metaUrl.includes(channelName) && channelActor.includes(channelName)) {
    return setContentIdFromChannelName(channelName)
    // }
  }
  console.log('== AIRTIME SETTING PLATFORM CONTENT ID ==')
  return setContentIdEmpty()
}

// function getMeta (metaProperty) {
//   const metas = document.getElementsByTagName('meta')

//   for (let i = 0; i < metas.length; i++) {
//     if (metas[i].getAttribute('property') === metaProperty) {
//       return metas[i].getAttribute('content')
//     }
//   }

//   return ''
// }

function getContentIdFromAccount (account) {
  return {
    contentName: account.name + '@' + account.host,
    contentDisplayName: account.displayName,
    platformUUID: constants.PLATFORMUUID,
    platformDisplayName: constants.PLATFORMDISPLAY
  }
}

function getContentIdFromChannel (channel) {
  return getContentIdFromAccount(channel.ownerAccount)
}

function getContentIdFromVideo (video) {
  return getContentIdFromAccount(video.account)
}

async function setContentIdFromAccountName (userName) {
  return setAirtimeContentID(getContentIdFromAccount(await api.getAccountInfo(userName)))
}

async function setContentIdFromVideoUuid (videoUUID) {
  return setAirtimeContentID(getContentIdFromVideo(await api.getVideoInfo(videoUUID)))
}

async function setContentIdFromChannelName (channelName) {
  return setAirtimeContentID(getContentIdFromChannel(await api.getChannelInfo(channelName)))
}

function setContentIdEmpty () {
  const setupData = {
    contentName: null,
    contentDisplayName: null,
    platformUUID: constants.PLATFORMUUID,
    platformDisplayName: constants.PLATFORMDISPLAY
  }
  return setAirtimeContentID(setupData)
}

async function setAirtimeContentID (setupData) {
  await _airtimeReadyPromise
  console.log('== AIRTIME SETTING CONTENT ID ==', setupData)
  window.airtime.setup(setupData)
  return setupData
}

export function injectAirtimeScript () {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script')
      script.setAttribute('data-verify', 'none')
      script.setAttribute('data-autostart', 'false')
      script.src = constants.AIRTIMEMODULEURL

      script.onload = () => {
        // console.log('Script on load !!!!! ')
        resolve()
      }
      script.onerror = (error) => {
        console.log('Airtime Script on error', error)
        reject(error)
      }

      document.getElementsByTagName('head')[0].appendChild(script)
    } catch (err) {
      reject(err)
    }
  })
}

let retries = 0
function trySetup () {
  if (window.airtime) {
    console.log('== AIRTIME SETUP ==')
    _airtimeReadyHolder.resolve()
    setContentIdEmpty()
  } else {
    console.log('== AIRTIME SETUP WAITING ==')
    if (retries < 10) {
      retries++
      setTimeout(trySetup, 10 * retries)
    } else {
      console.warn('== AIRTIME SETUP TOO MANY RETRIES ==')
      _airtimeReadyHolder.reject()
    }
  }
}

const _airtimeReadyHolder = {}
const _airtimeReadyPromise = new Promise((resolve, reject) => { _airtimeReadyHolder.resolve = resolve; _airtimeReadyHolder.reject = reject })

document.addEventListener('airtime-loaded', (event) => {
  console.log('== AIRTIME LOADED ==', event, window.airtime)
  setTimeout(trySetup, 10)
})

document.addEventListener('airtime-loaded-error', (event) => {
  console.warn('== AIRTIME LOADING ERROR ==', event)
  _airtimeReadyHolder.reject()
})

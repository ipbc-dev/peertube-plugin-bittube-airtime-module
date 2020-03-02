import * as api from './common-api.js'
import * as shared from './common-shared.js'

export async function detectContentID (url) {
  if (!url) {
    url = window.location.pathname
  }
  const urlSplit = url.split('/')
  shared.debug('== DETECT CONTENT ID ==', url)

  if (url.includes('/videos/watch/')) {
    const videoUUID = urlSplit[3]
    return setContentIdFromVideoUuid(videoUUID)
  } else if (url.includes('/accounts/')) {
    const userName = urlSplit[2]
    return setContentIdFromAccountName(userName)
  } else if (urlSplit[1] === 'video-channels') {
    const channelName = urlSplit[2]
    return setContentIdFromChannelName(channelName)
  }
  return setContentIdEmpty()
}

function getContentIdFromAccount (account) {
  return {
    contentName: account.name + '@' + account.host,
    contentDisplayName: 'BitTube ' + account.name + '@' + account.host,
    platformUUID: shared.PLATFORMUUID,
    platformDisplayName: shared.PLATFORMDISPLAY
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
    platformUUID: shared.PLATFORMUUID,
    platformDisplayName: shared.PLATFORMDISPLAY
  }
  if (!shared.peertubeSupportEnabled) {
    setupData.contentName = 'root@' + window.location.host
    setupData.contentDisplayName = 'BitTube root@' + window.location.host
  }
  return setAirtimeContentID(setupData)
}

let _lastSetupDataJson
async function setAirtimeContentID (setupData) {
  await _airtimeReadyPromise
  const setupDataJson = JSON.stringify(setupData)
  if (_lastSetupDataJson) {
    if (setupDataJson === _lastSetupDataJson) {
      shared.debug('== AIRTIME CONTENT ID UNCHANGED ==', setupData)
      return setupData
    }
  }
  shared.debug('== AIRTIME SETTING CONTENT ID ==', setupData)
  window.airtime.setup(setupData)
  _lastSetupDataJson = setupDataJson
  return setupData
}

export function injectAirtimeScript () {
  return new Promise((resolve, reject) => {
    try {
      const script = document.createElement('script')
      script.setAttribute('data-verify', 'none')
      script.setAttribute('data-autostart', 'false')
      script.src = shared.AIRTIMEMODULEURL

      script.onload = () => {
        // shared.debug('Script on load !!!!! ')
        resolve()
      }
      script.onerror = (error) => {
        // shared.debug('Airtime Script on error', error)
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
    shared.debug('== AIRTIME SETUP ==')
    _airtimeReadyHolder.resolve()
    // detectContentID()
  } else {
    shared.debug('== AIRTIME SETUP WAITING ==')
    if (retries < 10) {
      retries++
      setTimeout(trySetup, 10 * retries)
    } else {
      shared.warn('== AIRTIME SETUP TOO MANY RETRIES ==')
      _airtimeReadyHolder.reject()
    }
  }
}

const _airtimeReadyHolder = {}
const _airtimeReadyPromise = new Promise((resolve, reject) => { _airtimeReadyHolder.resolve = resolve; _airtimeReadyHolder.reject = reject })

document.addEventListener('airtime-loaded', (event) => {
  shared.debug('== AIRTIME LOADED ==', event, window.airtime)
  setTimeout(trySetup, 10)
})

document.addEventListener('airtime-loaded-error', (event) => {
  shared.warn('== AIRTIME LOADING ERROR ==', event)
  _airtimeReadyHolder.reject()
})

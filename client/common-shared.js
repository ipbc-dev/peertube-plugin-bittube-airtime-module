export const AIRTIMEMODULEURL = 'https://bittubeapp.com/tubepay/airtime.loader.js'

// Fixed data for the whole Peertube Federation
// Platform Name: PeerTube Federation
// Platform UUID: a93e5513-4772-e3d0-8b9f-82bfe73a71de
export const PLATFORMDISPLAY = 'PeerTube Federation'
export const PLATFORMUUID = 'a93e5513-4772-e3d0-8b9f-82bfe73a71de'

let debugEnabled = false

export function setDebugEnabled (newVal) {
  debugEnabled = newVal
  return debugEnabled
}

export function debug (...args) {
  if (debugEnabled) {
    console.log(...args)
  }
}

export function warn (...args) {
  if (debugEnabled) {
    console.warn(...args)
  }
}

export function error (...args) {
  if (debugEnabled) {
    console.error(...args)
  }
}

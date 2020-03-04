import * as api from './common-api.js'

export const AIRTIMEMODULEURL = 'https://cdn.jsdelivr.net/gh/ipbc-dev/airtime-module-dist@1.0.1-p8/tubepay/airtime.loader.js'
export const LinkApiUrl = 'https://us-central1-bittube-airtime-extension.cloudfunctions.net/peertubeLinkHandler'

// Fixed data for the whole Peertube Federation
// Platform Name: PeerTube Federation
// Platform UUID: a93e5513-4772-e3d0-8b9f-82bfe73a71de
export const PLATFORMDISPLAY = 'PeerTube Federation'
export const PLATFORMUUID = 'a93e5513-4772-e3d0-8b9f-82bfe73a71de'

export let peertubeSupportEnabled = false

export function setPeertubeSupport (newVal) {
  peertubeSupportEnabled = newVal
  return peertubeSupportEnabled
}

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

function createDonateButton(username, host, buttonId, extraClass=''){
  const span = document.createElement('span')
  span.id= buttonId
  span.className= "p_donateTubes " + extraClass
  span.setAttribute('data-tubepay-donate', "1")
  span.setAttribute('data-tubepay-content-name', username + '@' + host)
  span.setAttribute('data-tubepay-content-display', 'BitTube ' + username + '@' + host)
  return span
}

function addComment(ammount, videoInfo){
  const bittubeLink = '<a class="comment-account" target="_blank" href="https://bittube.app"><span>BitTube Airtime extension</span></a>' 
  const userProfileLink = '<a class="comment-account" target="_blank" href="' + videoInfo.account.url + '"><span>' + videoInfo.account.name + '</span></a>'
  const tubeOrtubes = ammount == 1 || ammount == '1' ? " tube to " : " tubes to "
  const msg = "I just donated " + ammount + tubeOrtubes + userProfileLink + " using " + bittubeLink
  api.addVideoComment(videoInfo.uuid, msg)
}

function addReplytoComment(ammount, videoInfo, commentInfo){
  const bittubeLink = '<a class="comment-account" target="_blank" href="https://bittube.app"><span>BitTube Airtime extension</span></a>' 
  const userProfileLink = '<a class="comment-account" target="_blank" href="' + commentInfo.account.url + '"><span>' + commentInfo.account.name + '</span></a>'
  const tubeOrtubes = ammount == 1 || ammount == '1' ? " tube to " : " tubes to "
  const msg = "I just donated " + ammount + tubeOrtubes + userProfileLink + " for this comment, using " + bittubeLink
  api.addReplytoVideoComment(videoInfo.uuid,commentInfo.threadId, msg)
}

export async function injectDonateButton(videoInfo){
  if (!videoInfo) return
  this.debug("Donate button, received info is: ", videoInfo)
  /* Clean old donate buttons after navigation */
  const oldButtons = document.getElementsByClassName('p_donateTubes')
  for(var i=0; i < oldButtons.length; i++){
    oldButtons[i].remove()
  }
  /* Injecting video donation button */
  const buttonId = 'spanDonate/' + videoInfo.uuid
  const DOMElement = document.querySelector('.border-top.video-info-channel')
  if(DOMElement && document.getElementById(buttonId) == null ){
      DOMElement.appendChild(createDonateButton(videoInfo.account.name, videoInfo.account.host, buttonId));
      /* Donations listener, adds a comment on each donation */
      document.getElementById(buttonId).addEventListener('donated', (e) => {
        this.debug("Triggering event donate with data: ", e);
        addComment(e.detail.amount.toString() , videoInfo)
      })
  }

  /* Fetching comments */
  const comments = await api.getVideoComments(videoInfo.uuid)
  this.debug("videoComments are: ", comments)
  const DOMCommentElements = document.getElementsByClassName('comment-actions')
  this.debug("comment elements are ", DOMCommentElements)
  if(comments.total > 0){
    /* Injecting comment donation button */
    for (var i=0; i < DOMCommentElements.length; i++){
      let data = comments.data[i];
      let buttonCommentId = buttonId + '/' + data.id
      DOMCommentElements[i].appendChild(createDonateButton(data.account.name, data.account.host, buttonCommentId, 'donateToComment'))
      document.getElementById(buttonCommentId).addEventListener('donated', (e) => {
        this.debug("Triggering event donate in comment with data: ", e);
        // this.debug("Index is: ", i)
        this.debug("Comments are. ", comments)
        addReplytoComment(e.detail.amount.toString() , videoInfo, data)
      })
    }
  }
}

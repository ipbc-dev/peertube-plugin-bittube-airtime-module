import * as api from './common-api.js'

export const AIRTIMEMODULEURL = 'https://cdn.jsdelivr.net/gh/ipbc-dev/airtime-module-dist@1.0.1-p9/tubepay/airtime.loader.js'
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
  const profileLinkUrl = 'https://' + commentInfo.account.host + '/accounts/' + commentInfo.account.name + '@' + commentInfo.account.host
  this.debug("ICEICE profileLinkUrl is: ", profileLinkUrl);
  const bittubeLink = '<a class="comment-account" target="_blank" href="https://bittube.app"><span>BitTube Airtime extension</span></a>' 
  const userProfileLink = '<a class="comment-account" target="_blank" href="' + profileLinkUrl.toString() + '"><span>' + commentInfo.account.name + '</span></a>'
  const tubeOrtubes = ammount == 1 || ammount == '1' ? " tube to " : " tubes to "
  const msg = "I just donated " + ammount + tubeOrtubes + userProfileLink + " for this comment, using " + bittubeLink
  api.addReplytoVideoComment(videoInfo.uuid,commentInfo.threadId, msg)
}

let globalVideoInfo = null;

export async function injectDonateButton(videoInfo){
  if (!videoInfo) return
  globalVideoInfo = videoInfo
  this.debug("Donate button, received info is: ", videoInfo)
  /* Clean old donate buttons after navigation */
  const oldButtons = document.getElementsByClassName('p_donateTubes')
  for(var i=0; i < oldButtons.length; i++){
    oldButtons[i].remove()
  }
  /* Injecting video donation button */
  const buttonId = 'spanDonate/' + videoInfo.uuid
  const DOMelement = document.querySelector('.border-top.video-info-channel')
  if(DOMelement && document.getElementById(buttonId) == null ){
    DOMelement.appendChild(createDonateButton(videoInfo.account.name, videoInfo.account.host, buttonId));
    /* Donations listener, adds a comment on each donation */
    document.getElementById(buttonId).addEventListener('donated', (e) => {
      this.debug("Triggering event donate with data: ", e);
      addComment(e.detail.amount.toString() , videoInfo)
    })
  }
  this.injectDonateComments()
}
let commentRetries = 0
export async function injectDonateComments(){
  if(globalVideoInfo){
    const buttonId = 'spanDonate/' + globalVideoInfo.uuid
    const DOMThreadElements = document.getElementsByClassName('comment-actions')
    if(DOMThreadElements && DOMThreadElements.length > 0){
      /* Injecting comment donation button */
      for (var i=0; i < DOMThreadElements.length; i++){
        const DOMthread = DOMThreadElements[i]
        const DOMthreadParent = DOMthread.parentElement
        const threadURL = DOMthreadParent.querySelector('.comment-date').href.toString()
        const threadAccountName = DOMthreadParent.querySelector('.comment-account-name').textContent
        const threadAccountFID = DOMthreadParent.querySelector('.comment-account-fid').textContent
        const threadHostName = threadAccountFID.split('@').length > 1 ? threadAccountFID.split('@')[1] : window.location.origin
        const threadID = threadURL.split("=").length > 0 ? threadURL.split('=')[1] : null
        if(threadID && DOMthread.querySelector('.donateToComment') == null){
          const threadInfo = {
            threadId: threadID,
            account: {
              name: threadAccountName,
              host: threadHostName
            }
          }
          this.debug("-- Airtime Plugin -- thread info is: ", threadInfo)
          const threadButtonId = buttonId + '/' + threadID
          DOMthread.appendChild(createDonateButton(threadInfo.account.name, threadInfo.account.host, threadButtonId, 'donateToComment'))
          document.getElementById(threadButtonId).addEventListener('donated', (e) => {
            addReplytoComment(e.detail.amount.toString() , globalVideoInfo, threadInfo)
          })
        }
      }
      /* Sometimes, it may load comments while we're painting the buttons */
      /* So, better to recheck if we have comments without donate button */
      setTimeout(() => {
        if(commentRetries < 2){
          commentRetries++
          setTimeout(() => {
            injectDonateComments()
          }, commentRetries * 500);
        }else{
          commentRetries = 0;
        }
      }, 100)
    }else{
      /* Sometimes, this can function can be called before the threads are rendered */
      if(commentRetries < 5){
        commentRetries++
        setTimeout(() => {
          injectDonateComments()
        }, commentRetries * 1000);
      }else{
        commentRetries = 0;
      }
    }
  }

}

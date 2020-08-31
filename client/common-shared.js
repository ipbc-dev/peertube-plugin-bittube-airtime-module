import * as api from './common-api.js'

// export const AIRTIMEMODULEURL = 'https://cdn.jsdelivr.net/gh/ipbc-dev/airtime-module-dist@1.0.1-p9/tubepay/airtime.loader.js'
export const AIRTIMEMODULEURL = 'http://localhost:8080'
export const LinkApiUrl = 'https://us-central1-bittube-airtime-extension-dev.cloudfunctions.net/peertubeLinkHandler'

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
  debug("-- Airtime Plugin -- profileLinkUrl is: ", profileLinkUrl);
  const bittubeLink = '<a class="comment-account" target="_blank" href="https://bittube.app"><span>BitTube Airtime extension</span></a>' 
  const userProfileLink = '<a class="comment-account" target="_blank" href="' + profileLinkUrl.toString() + '"><span>' + commentInfo.account.name + '</span></a>'
  const tubeOrtubes = ammount == 1 || ammount == '1' ? " tube to " : " tubes to "
  const msg = "I just donated " + ammount + tubeOrtubes + userProfileLink + " for this comment, using " + bittubeLink
  api.addReplytoVideoComment(videoInfo.uuid,commentInfo.id || commentInfo.threadId, msg)
}

let globalVideoInfo = null;

export async function injectDonateButton(videoInfo){
  if (!videoInfo) return
  globalVideoInfo = videoInfo
  debug("-- Airtime Plugin -- Donate button, received info is: ", videoInfo)
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
      debug("-- Airtime Plugin -- Triggering event donate with data: ", e);
      addComment(e.detail.amount.toString() , videoInfo)
    })
  }
  this.injectDonateComments()
}
let commentRetries = 0
let threadsWithButton = []
export async function resetThreadsWithButton(){
  threadsWithButton = []
  return true
}
export async function injectDonateComments(replyData = null){
  if(globalVideoInfo){
    const buttonId = 'spanDonate/' + globalVideoInfo.uuid
    const DOMThreadElements = document.getElementsByClassName('comment-actions')
    debug("-- Airtime Plugin -- DOMThreadElements are: ", DOMThreadElements)
    debug("-- Airtime Plugin -- DOMThreadElements are: ", DOMThreadElements.length)
    if(DOMThreadElements && DOMThreadElements.length > 0){
      /* Injecting comment donation button */
      for (var i=0; i < DOMThreadElements.length; i++){
        const DOMthread = DOMThreadElements[i]
        const DOMthreadParent = DOMthread.parentElement
        const threadURL = DOMthreadParent.querySelector('.comment-date').href.toString()
        const threadAccountFID = DOMthreadParent.querySelector('.comment-account-fid').textContent
        const threadAccountName = threadAccountFID.split('@')[0]
        const threadHostName = threadAccountFID.split('@').length > 1 ? threadAccountFID.split('@')[1] : window.location.host
        const threadID = threadURL.split("=").length > 0 ? threadURL.split('=')[1] : null
        debug("-- Airtime Plugin -- threadID is: ", threadID)
        if( threadID && DOMthreadParent) DOMthreadParent.id = 'thread/' + threadID /* We add this id to add replies donation buttons correctly later */

        if(threadID && !threadsWithButton.includes(threadID)){
          threadsWithButton.push(threadID)
          const threadInfo = {
            threadId: threadID,
            account: {
              name: threadAccountName,
              host: threadHostName
            }
          }
          debug("-- Airtime Plugin -- thread info is: ", threadInfo)
          const threadButtonId = buttonId + '/' + threadID
          DOMthread.appendChild(createDonateButton(threadInfo.account.name, threadInfo.account.host, threadButtonId, 'donateToComment'))
          document.getElementById(threadButtonId).addEventListener('donated', (e) => {
            debug("-- Airtime Plugin -- Donation click with info: ", globalVideoInfo)
            debug(" thread info: ", threadInfo)
            debug(" and amount: ", e.detail.amount.toString())
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
            injectDonateComments(replyData)
          }, commentRetries * 200);
        }else{
          commentRetries = 0;
        }
      }, 100)
    }else{
      /* Sometimes, this can function can be called before the threads are rendered */
      if(commentRetries < 5){
        commentRetries++
        setTimeout(() => {
          injectDonateComments(replyData)
        }, commentRetries * 1000);
      }else{
        commentRetries = 0;
      }
    }
  }

}

async function repliesSublevels(DOMElements, DOMindex, replies, replyIndex = 0){
  debug('-- Airtime Plugin -- repliesSublevels with replies: ', replies)
  debug('-- Airtime Plugin -- repliesSublevels with DOMindex: ', DOMindex)
  debug('-- Airtime Plugin -- repliesSublevels with replyIndex: ', replyIndex)
  if(globalVideoInfo && DOMElements[DOMindex]){
    const reply = replies[replyIndex]
    if(!reply.comment.isDeleted){
    const buttonId = 'spanDonate/' + globalVideoInfo.uuid
    const threadButtonId = buttonId + '/' + reply.comment.id
      DOMElements[DOMindex].appendChild(createDonateButton(reply.comment.account.name, reply.comment.account.host, threadButtonId, 'donateToComment donateToReply'))
      DOMindex++
      document.getElementById(threadButtonId).addEventListener('donated', (e) => {
        debug("-- Airtime Plugin -- Donation click with info: ", globalVideoInfo)
        reply.threadId = reply.comment.id
        debug(" thread info: ", reply)
        debug(" and amount: ", e.detail.amount.toString())
        addReplytoComment(e.detail.amount.toString() , globalVideoInfo, reply.comment)
      })
    }
    if (reply.children.length > 0){
      /* We go inside (reply [to reply]^X of comment) */
      const newDOMindex = await repliesSublevels(DOMElements, DOMindex, reply.children)
      /* After all sub-arrays are completed, we keep going in the original one */
      if(replies[replyIndex + 1] != undefined){
        return repliesSublevels(DOMElements, newDOMindex, replies , ++replyIndex)
      }
      /* Going a level back, we need to return DOMindex*/
      return newDOMindex
    }else{
      /* There is not sublevels so, we check if this array have one more */
      if(replies[replyIndex + 1] != undefined){
        return repliesSublevels(DOMElements, DOMindex, replies , ++replyIndex)
      }
      /* If it doesn't */
      return DOMindex
    }
  }
}

let retryReplies = 0;
export async function injectDonatetoReplies(replyData = null){
  if(globalVideoInfo){
    // const buttonId = 'spanDonate/' + globalVideoInfo.uuid
    const DOMThreadElements = document.getElementById('thread/' + replyData.comment.threadId).querySelectorAll('.children .comment-actions')
    debug("-- Airtime Plugin -- injectDonatetoReplies DOMElements are: ", DOMThreadElements)
    if(DOMThreadElements && DOMThreadElements.length > 0){
      debug("-- Airtime Plugin -- injectDonatetoReplies replyData.children are: ", replyData.children)
      let DOMindex = 0
      repliesSublevels(DOMThreadElements, DOMindex, replyData.children)
      retryReplies = 0
      }else{
        /* Sometimes, it may load comments while we're painting the buttons */
        /* So, better to recheck if we have comments without donate button */
        if(retryReplies < 5){
          debug("-- Airtime Plugin -- RECALLING injectDonatetoReplies after setTimeOut")
          retryReplies++
          setTimeout(() => {
            injectDonatetoReplies(replyData)
          }, retryReplies * 200);
        }else{
          retryReplies = 0;
        }
      }
    }
  }

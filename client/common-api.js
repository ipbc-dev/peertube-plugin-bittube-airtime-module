/* global fetch */

export function getBaseUrl () {
  return window.location.protocol + '//' + window.location.host
}

async function callAPI (path) {
  const res = await fetch(getBaseUrl() + path)
  return res.json()
}

export async function getAccountInfo (name) {
  const apiURL = '/api/v1/accounts/' + name
  const info = await callAPI(apiURL)
  //   shared.debug('getAccountInfo', name, info)
  return info
}

export async function getChannelInfo (name) {
  const apiURL = '/api/v1/video-channels/' + name
  const info = await callAPI(apiURL)
  //   shared.debug('getChannelInfo', name, info)
  return info
}

export async function getVideoInfo (name) {
  const apiURL = '/api/v1/videos/' + name
  const info = await callAPI(apiURL)
  //   shared.debug('getVideoInfo', name, info)
  return info
}

export async function getVideoComments(videoId){
  const apiURL = "/api/v1/videos/" + videoId + "/comment-threads"
  const info = await callAPI(apiURL)
  return info
}

async function postAjax(url, body) {
  var headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded')
  headers.append('Authorization', "Bearer " + localStorage.getItem('access_token'))
  let initObject = {
      method: 'POST',
      headers: headers,
      body: body
      
  }
  await fetch(url, initObject).then(function(resp){
    return resp
  })
}

export async function addVideoComment(videoId, msg){
  const data = 'text=' + msg
  const body = "Authorization: Bearer " + localStorage.getItem('access_token') + "&" + data + "&response_type=text/json"
  const apiURL = getBaseUrl() + "/api/v1/videos/" + videoId + "/comment-threads"
  try{
    await postAjax(apiURL, body);
  }catch(error){
    console.warn("Something went wrong adding donation comment: ", error)
  }
}

export async function addReplytoVideoComment(videoId, commentId, msg){
  const data = 'text=' + msg
  const body = "Authorization: Bearer " + localStorage.getItem('access_token') + "&" + data + "&response_type=text/json"
  const apiURL = getBaseUrl() + "/api/v1/videos/" + videoId + "/comments/" + commentId
  try{
    await postAjax(apiURL, body);
  }catch(error){
    console.warn("Something went wrong adding donation reply on comment: ", error)
  }
}


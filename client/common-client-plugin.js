function register ({ registerHook, peertubeHelpers }) {
  peertubeHelpers.getSettings().then(
    () => {

      /////////////////////////////////////////////////
      //////////   SCRIPT INJECTION    ///////////////
      ///////////////////////////////////////////////

      // Fixed data for the whole Peertube Federation
      // Platform Name: PeerTube Federation
      // Platform UUID: a93e5513-4772-e3d0-8b9f-82bfe73a71de

      const script = document.createElement('script');
      script.setAttribute('data-verify', "none");
      script.setAttribute('data-autostart', "false");
      script.src = "https://bittubeapp.com/tubepay/airtime.loader.js";

      script.onload = () => {
        // console.log('Script on load !!!!! ')
      };
      script.onerror = (error) => {
        console.log('Airtime Script on error', error)
      };

      document.getElementsByTagName('head')[0].appendChild(script);
      /////////////////////////////////////////////////////
      ////////////////   FUNCTIONS    ////////////////////
      ///////////////////////////////////////////////////
      function getMeta(metaProperty) {
        const metas = document.getElementsByTagName('meta');
      
        for (let i = 0; i < metas.length; i++) {
          if (metas[i].getAttribute('property') === metaProperty) {
            return metas[i].getAttribute('content');
          }
        }
      
        return '';
      }

      function getBaseUrl() {
        return window.location.protocol + '//' + window.location.host;
      }

      async function callAPI(path) {
        const res = await fetch(getBaseUrl() + path);
        return res.json();
      }

      async function getAccountInfo(name) {
        const apiURL = '/api/v1/accounts/' + name;
        const info = await callAPI(apiURL);
        console.log('getAccountInfo', name, info);
        return info;
      }

      async function getChannelInfo(name) {
        const apiURL = '/api/v1/video-channels/' + name;
        const info = await callAPI(apiURL);
        console.log('getChannelInfo', name, info);
        return info;
      }

      async function getVideoInfo(name) {
        const apiURL = '/api/v1/videos/' + name;
        const info = await callAPI(apiURL);
        console.log('getVideoInfo', name, info);
        return info;
      }

      // getAccountInfo('icabaleiro@localhost:9000');
      // getChannelInfo('testing_channel');
      // getVideoInfo('0b96815f-6f70-4c47-8cb1-26c6d7cdd1df');

      function getContentIdFromAccount(account) {
        return {
          contentName: account.name + '@' + account.host,
          contentDisplayName: account.displayName,
          platformUUID: "a93e5513-4772-e3d0-8b9f-82bfe73a71de", // DO NOT CHANGE THIS!! 
          platformDisplayName: "PeerTube Federation", // DO NOT CHANGE THIS!! 
        }
      }

      function getContentIdFromChannel(channel) {
        return getContentIdFromAccount(channel.ownerAccount);
      }

      function getContentIdFromVideo(video) {
        return getContentIdFromAccount(video.account);
      }
      function setAirtimeContentID(setupData){
        console.log("== AIRTIME SETTING CONTENT ID ==");
        console.log(setupData);
        window.airtime.setup(setupData);
      }

      async function detectContentID() {
        const url = window.location.pathname;
        const urlSplit = url.split('/');
        console.log("== DETECT CONTENT ID ==");
        console.log("Path is: ", url)
        // const videoUUID = '0b96815f-6f70-4c47-8cb1-26c6d7cdd1df';

        if(url.includes('/videos/watch/')){
          const videoUUID = url.replace('/videos/watch/', '');
          const metaVideo = getMeta('og:video:url');
          const metaUrl = getMeta('og:url');
          /* Security Check */
          if(metaUrl.includes(videoUUID) && metaVideo.includes(videoUUID)){
            const setupData = getContentIdFromVideo(await getVideoInfo(videoUUID));
            setAirtimeContentID(setupData)
          }else{
            console.log("Security check failed");
          }
        }else if(url.includes('/accounts/')){
          const userName = urlSplit[2];
          const metaUrl = getMeta('og:url');
          const profileActor = document.getElementsByClassName('actor-name')[0].innerText;
          /* Security Check */
          console.log("ACCOUNT CHECK metaUrl: ", metaUrl, "   profileActor is: ", profileActor , "  and username is: ", userName);
          console.log(metaUrl.includes(userName), "     ", profileActor.includes(userName))
          if(metaUrl.includes(userName) && profileActor.includes(userName)){
            const setupData = getContentIdFromAccount(await getAccountInfo(userName));
            setAirtimeContentID(setupData)
          }else{
            console.log("Security check failed");
          }
        }else if(urlSplit[1] == 'video-channels'){
          const channelName = urlSplit[2];
          const metaUrl = getMeta('og:url');
          const channelActor = document.getElementsByClassName('actor-name')[0].innerText;
          /* Security Check */
          console.log("CHANNEL CHECK metaUrl: ", metaUrl, "   channelActor is: ", channelActor , "  and channelName is: ", channelName);
          console.log(metaUrl.includes(channelName), "     ", channelActor.includes(channelName))
          if(metaUrl.includes(channelName) && channelActor.includes(channelName)){
            const setupData = getContentIdFromChannel(await getChannelInfo(channelName));
            setAirtimeContentID(setupData)
          }else{
            console.log("Security check failed");
          }

        } else {
          console.log("== AIRTIME SETTING EMPTY CONTENT ID ==");
          const setupData = {
            contentName: "",
            contentDisplayName: "",
            platformUUID: "a93e5513-4772-e3d0-8b9f-82bfe73a71de",
            platformDisplayName: "PeerTube Federation"
          };
          setAirtimeContentID(setupData);
        }
      }

      let retries = 0;
      function trySetup() {
        if (window.airtime) {
          window.airtime.setup({
            platformUUID: "a93e5513-4772-e3d0-8b9f-82bfe73a71de",
            platformDisplayName: "PeerTube Federation",
          });
          console.log("== AIRTIME SETUP ==");
          airtimeLoaded = true;
          detectContentID();
        } else {
          console.log("== AIRTIME SETUP WAITING ==");
          if (retries < 10) {
            retries++;
            setTimeout(trySetup, 10 * retries);
          } else {
            console.warn("== AIRTIME SETUP TOO MANY RETRIES ==");
          }
        }
      }
      ///////////////////////////////////////////////////////
      ///////////////   HOOKS & LISTENERS    ///////////////
      /////////////////////////////////////////////////////
      let airtimeLoaded = false;
      document.addEventListener('airtime-loaded', (event) => {
        console.log("== AIRTIME LOADED ==", event, window.airtime);
        setTimeout(trySetup, 10);
      });

      document.addEventListener('airtime-loaded-error', (event) => {
        console.warn("== AIRTIME LOADING ERROR ==", event);
      });


      registerHook({
        target: "action:router.navigation-end",
        handler: params => {
         console.log('** params => ', params)
         detectContentID();
        }
      })
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
    }
  )
}

export {
  register
}
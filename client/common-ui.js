import * as shared from './common-shared.js'

/* This function injects the linkAccount button into the DOM  */
export function injectLinkAccountButton(peertubeHelpers) {
    const buttonDOM = document.getElementById('airtime-link-account-btn');
    if (buttonDOM == null || buttonDOM == undefined) { /* If the button is already rendered, do nothing */
        shared.debug("=== ====AIRTIME DEBUG ====== injecting linkAccountButton");
        /* Title */
        const linkAccountTitle = document.createElement('div')
        linkAccountTitle.id = 'airtime-linkAccount-title'
        linkAccountTitle.className = 'airtime-linking-account-title'
        linkAccountTitle.innerText = '** BETA ** AIRTIME ACCOUNT LINKING ** BETA **'
        /* Content */
        const linkAccountContent = document.createElement('div')
        linkAccountContent.class = 'airtime-linkAccount-content'
        /* Links */
        const icon1 = '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"><defs><style>.cls-1{fill:#313232;}</style></defs><title>puzzle copia2</title><g id="Yo6cFl"><path class="cls-1" d="M126.671,243.9h-5.027c-3.726-1.413-6.386-4.2-9.113-6.946-8.919-8.961-17.833-17.928-26.861-26.779a34.445,34.445,0,0,0-7.32-5.748c-6.625-3.63-13.814-.629-16.088,6.556a67.1,67.1,0,0,0-1.424,7.366C59,227.7,54.183,234.628,44.71,237.477c-15.612,4.7-31.362-10.236-31.354-24.4.007-11.007,8.493-20.525,20.038-22.213a39.074,39.074,0,0,0,8.628-1.919,10.321,10.321,0,0,0,5.762-14.477,33.629,33.629,0,0,0-6.2-8.358c-9.733-9.976-19.673-19.749-29.493-29.64C6.315,130.654,6.281,124.4,12,118.64q16.028-16.125,32.168-32.135a19.525,19.525,0,0,1,4.974-3.546c3.727-1.85,6.813-.425,7.9,3.595a40.469,40.469,0,0,1,1.039,6.518A26.908,26.908,0,0,0,79.6,116.961c8.956,1.689,16.975-1.091,23.842-6.67,8.648-7.028,12.876-16.349,11.692-27.556C114,71.967,104.784,62.727,93.706,60.61c-2.981-.57-6.045-.763-8.985-1.48-4.27-1.041-5.75-4.287-3.708-8.174A22.57,22.57,0,0,1,84.956,45.7q15.51-15.672,31.157-31.208c6.308-6.3,12.367-6.314,18.637-.058,9.758,9.737,19.47,19.521,29.292,29.194a34.9,34.9,0,0,0,6.926,5.529c6.841,3.917,14.224.884,16.514-6.655a69.783,69.783,0,0,0,1.367-7.145c1.5-7.811,5.19-14.142,12.566-17.708,15.7-7.591,30.83,5.238,33.933,17.023a23.068,23.068,0,0,1,.664,8.783c-1.444,10.5-9.23,17.89-19.784,19.446a39.556,39.556,0,0,0-8.412,1.856c-6.135,2.356-8.782,8.7-5.9,14.587a32.946,32.946,0,0,0,6.056,8.186c8.761,9.009,17.7,17.848,26.607,26.71,2.847,2.832,5.749,5.592,7.257,9.44v5.028c-1.331,2.088-2.348,4.484-4.045,6.213q-16.085,16.387-32.449,32.5a18.584,18.584,0,0,1-4.6,3.308c-3.915,1.989-7.059.529-8.176-3.747a49.057,49.057,0,0,1-.971-6.07c-1.446-11.055-7.1-19.041-17.592-23-9.209-3.477-17.894-1.316-25.733,4.1-10.006,6.907-14.713,16.656-13.767,28.788.823,10.556,10.318,20.222,21.458,22.356,2.981.571,6.045.76,8.984,1.479,4.294,1.05,5.769,4.269,3.726,8.162a22.618,22.618,0,0,1-3.944,5.251c-9.8,9.913-19.6,19.819-29.584,29.548C132.649,240.031,129.514,241.815,126.671,243.9Z"/></g></svg>'
        // icon1.src = peertubeHelpers.getBaseStaticRoute() + '/images/icon1.svg'
        const icon2 = '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"><defs><style>.cls-1{fill:#313232;}</style></defs><title>learn copia</title><path class="cls-1" d="M118.084,22.337c-16.272,9.91-65.827,40.1-86.8,52.918C18.653,82.907,8.143,89.221,7.868,89.221a.426.426,0,0,0-.415.461c0,.23.275.46.645.46.324,0,26.781,15.951,58.774,35.449L125,161.04l40.472-24.661c22.217-13.551,40.7-24.754,41.024-24.891.415-.185.554,8.022.554,40.151V192.02H221.8V146.937l.046-45.038,9.543-5.762c5.256-3.181,9.91-5.808,10.37-5.9.831-.185,1.106-1.015.324-1.015-.23,0-26.5-15.857-58.31-35.264-31.853-19.407-58.129-35.4-58.45-35.5C125,18.326,121.771,20.079,118.084,22.337Z"/><path class="cls-1" d="M58.159,162.794c0,29.178.091,30.1,3,36a27.533,27.533,0,0,0,10.188,10.648c1.475.876,6.038,3.32,10.095,5.487s15.535,8.573,25.491,14.29l18.117,10.325,10.694-6.177c14.657-8.483,28.211-16.087,36.739-20.559,10.51-5.577,13.506-8.2,16.642-14.566,2.581-5.3,2.72-6.684,2.72-35.449,0-20.744-.139-26.136-.554-25.952-.324.091-15.212,9.08-33.1,19.959C140.305,167.635,125.369,176.53,125,176.53s-15.305-8.9-33.189-19.729c-17.887-10.879-32.774-19.868-33.05-19.959C58.3,136.655,58.159,142.05,58.159,162.794Z"/></svg>'
        // icon2.src = peertubeHelpers.getBaseStaticRoute() + '/images/icon2.svg'
        const a1 = document.createElement('a')
        const span1 = document.createElement('span')
        a1.href = 'https://bittube.app'
        a1.className = 'airtime-linking-extra-links-with-icon'
        span1.innerText = 'Get Airtime extension'
        a1.setAttribute('target', '_blank')
        // a1.appendChild(icon1)
        a1.innerHTML = icon1
        a1.appendChild(span1)
        const div1 = document.createElement('div')
        div1.appendChild(a1);
        div1.className="airtime-linking-extra-links-with-icon-div"
        const a2 = document.createElement('a')
        const span2 = document.createElement('span')
        a2.href = 'https://kb.bittubeapp.com/article/152-what-is-the-purpose-of-the-bittube-browser-extension-on-bittubers-com'
        a2.className = 'airtime-linking-extra-links-with-icon'
        span2.innerText = 'Learn more about Airtime'
        a2.setAttribute('target', '_blank')
        // a2.appendChild(icon2)
        a2.innerHTML = icon2
        a2.appendChild(span2)
        const div2 = document.createElement('div')
        div2.appendChild(a2);
        div2.className="airtime-linking-extra-links-with-icon-div"
        const linkAccountLinks = document.createElement('div')
        linkAccountLinks.className = "airtime-linking-extra-links-container"
        linkAccountLinks.appendChild(div1)
        linkAccountLinks.appendChild(div2)
        /* Button */
        const linkAccountElem = document.createElement('div')
        linkAccountElem.id = 'airtime-linking-account-btn'
        linkAccountElem.setAttribute('data-airtime-link-account-contentname', localStorage.getItem('username') + '@' + window.location.host)
        linkAccountElem.setAttribute('data-airtime-link-account-displayname', 'PeerTube ' + localStorage.getItem('username') + '@' + window.location.host)
        linkAccountElem.setAttribute('data-airtime-link-account-use-event', true)
        linkAccountContent.appendChild(linkAccountElem)
        linkAccountContent.appendChild(linkAccountLinks)
        shared.debug("=== ====AIRTIME DEBUG ====== element is: ", linkAccountContent);
        const settingsMenu = document.querySelector('my-account-settings');
        if (settingsMenu != null && settingsMenu != undefined) {
            settingsMenu.insertBefore(linkAccountContent, settingsMenu.children[4])
            settingsMenu.insertBefore(linkAccountTitle, settingsMenu.children[4])
        }

    } else {
        shared.debug("=== ====AIRTIME DEBUG ====== linkAccountButton already exists!!!!!!!!");
    }
}
/* This function removes linkAccount button from the DOM  */
export function removeLinkAccountButton() {
    shared.debug("=== ====AIRTIME DEBUG ====== removing linkAccountButton");
    /* Remove if it's rendered in DOM */
    const buttonDOM = document.getElementById('airtime-link-account-btn');
    if (buttonDOM != null && buttonDOM != undefined) { buttonDOM.remove() }
}

/******************* INJECT INSTALL EXTENSION SUGGEST BLUE HEADER **********************************/
export function injectAirtimeBlueHeader(peertubeHelpers) {
    /* Create and inject elements */
    const installAirtimeHeader = document.createElement('div')
    installAirtimeHeader.id = 'airtime-install-extension-suggestion-header'
    installAirtimeHeader.className = 'airtime-install-extension-suggestion-header'

    const airtimeSpanInfo = document.createElement('span')
    airtimeSpanInfo.id = 'airtime-message-top-header'
    airtimeSpanInfo.className = 'airtime-message-top-header'
    airtimeSpanInfo.innerHTML = '<span class="messageTopHeader">Get the Airtime extension <a target="_blank" href="https://bittube.app">here</a> to start earning Tubes!<a target="_blank" href="https://kb.bittubeapp.com/article/152-what-is-the-purpose-of-the-bittube-browser-extension-on-bittubers-com"> Learn more</a></span>'

    const airtimeSpanClose = document.createElement('div')
    airtimeSpanClose.id = 'airtime-close-top-header'
    airtimeSpanClose.className = 'airtime-close-top-header'
    const airtimeCloseImg = document.createElement('img')
    airtimeCloseImg.src = peertubeHelpers.getBaseStaticRoute() + '/images/close.svg'
    airtimeSpanClose.appendChild(airtimeCloseImg)

    installAirtimeHeader.appendChild(airtimeSpanInfo)
    installAirtimeHeader.appendChild(airtimeSpanClose)

    const elementHTML = document.getElementsByTagName('html')[0]
    if (elementHTML) elementHTML.insertBefore(installAirtimeHeader, elementHTML.children[0])
    const DOMinstallAirtimeHeader = document.getElementById('airtime-install-extension-suggestion-header')

    /* Add classes to tweak CSS */
    const originalHeader = document.getElementsByClassName('header')[0]
    if (originalHeader) originalHeader.className = originalHeader.className + ' airtime-header-top-distance'

    const originalBody = document.getElementsByTagName('body')[0]
    if (originalBody) originalBody.className = 'airtime-body-margin-top'

    const footerIcons = document.querySelector('menu.logged-in .footer')
    if (footerIcons) footerIcons.className = footerIcons.className + ' airtime-footer-padding'

    if (DOMinstallAirtimeHeader) DOMinstallAirtimeHeader.className = DOMinstallAirtimeHeader.className + ' airtime-install-extension-suggestion-header-height'
    /* Add event listeners */
    document.getElementById('airtime-close-top-header').addEventListener('click', () => {
        removeAirtimeBlueHeader()
        localStorage.setItem('hide-airtime-blue-header', true)
    })
}
/******************* REMOVE EXTENSION SUGGEST BLUE HEADER **********************************/
export function removeAirtimeBlueHeader() {
    /* Remove element */
    const installAirtimeHeader = document.getElementById('airtime-install-extension-suggestion-header')
    if (installAirtimeHeader) installAirtimeHeader.remove()

    /* Remove classes */
    const originalHeader = document.getElementsByClassName('header')[0]
    if (originalHeader) originalHeader.className = originalHeader.className.replace('airtime-header-top-distance', '')

    const originalBody = document.getElementsByTagName('body')[0]
    if (originalBody) originalBody.className = originalBody.className = originalBody.className.replace('airtime-body-margin-top', '')

    const footerIcons = document.querySelector('menu.logged-in .footer')
    if (footerIcons) footerIcons.className = footerIcons.className.replace('airtime-footer-padding', '')

}
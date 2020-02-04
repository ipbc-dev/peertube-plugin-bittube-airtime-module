import * as shared from './common-shared.js'

/* This function injects the linkAccount button into the DOM  */
export function injectLinkAccountButton() {
    const buttonDOM = document.getElementById('airtime-link-account-btn');
    if (buttonDOM == null || buttonDOM == undefined) { /* If the button is already rendered, do nothing */
        shared.debug("=== ====AIRTIME DEBUG ====== injecting linkAccountButton");
        /* Title */
        const linkAccountTitle = document.createElement('div')
        linkAccountTitle.id = 'airtime-linkAccount-title'
        linkAccountTitle.className = 'airtime-linking-account-title'
        linkAccountTitle.innerText = 'AIRTIME ACCOUNT LINKING ** BETA **'
        /* Content */
        const linkAccountContent = document.createElement('div')
        linkAccountContent.class = 'airtime-linkAccount-content'
        /* Button */
        const linkAccountElem = document.createElement('div')
        linkAccountElem.id = 'airtime-linking-account-btn'
        linkAccountElem.setAttribute('data-airtime-link-account-contentname', localStorage.getItem('username') + '@' + window.location.host)
        linkAccountElem.setAttribute('data-airtime-link-account-displayname', 'PeerTube ' + localStorage.getItem('username') + '@' + window.location.host)
        // linkAccountElem.setAttribute('data-airtime-link-account-authtoken', localStorage.getItem('access_token'))
        // linkAccountElem.setAttribute('data-airtime-link-account-url', 'http://localhost:8080/link')
        linkAccountElem.setAttribute('data-airtime-link-account-use-event', true)
        linkAccountContent.appendChild(linkAccountElem)
        // const headerBlock = document.querySelector('.header .top-left-block');
        shared.debug("=== ====AIRTIME DEBUG ====== element is: ", linkAccountContent);
        // headerBlock.appendChild(linkAccountElem);
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
    airtimeSpanInfo.innerHTML = '<span class="messageTopHeader">Get the BitTube extension <a target="_blank" href="https://bittubeapp.com">here</a> to start earning with AirTime!<a target="_blank" href="https://kb.bittubeapp.com/article/152-what-is-the-purpose-of-the-bittube-browser-extension-on-bittubers-com"> Learn more</a></span>'

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
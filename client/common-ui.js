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
        const icon1 = document.createElement('img')
        icon1.src = peertubeHelpers.getBaseStaticRoute() + '/images/icon1.svg'
        const icon2 = document.createElement('img')
        icon2.src = peertubeHelpers.getBaseStaticRoute() + '/images/icon2.svg'
        const a1 = document.createElement('a')
        const span1 = document.createElement('span')
        a1.href = 'https://bittube.app'
        a1.className = 'airtime-linking-extra-links-with-icon'
        span1.innerText = 'Get Airtime extension'
        a1.setAttribute('target', '_blank')
        a1.appendChild(icon1)
        a1.appendChild(span1)
        const div1 = document.createElement('div')
        div1.appendChild(a1);
        // div1.className="airtime-linking-extra-links-with-icon-div"
        const a2 = document.createElement('a')
        const span2 = document.createElement('span')
        a2.href = 'https://kb.bittubeapp.com/article/152-what-is-the-purpose-of-the-bittube-browser-extension-on-bittubers-com'
        a2.className = 'airtime-linking-extra-links-with-icon'
        span2.innerText = 'Learn more about Airtime'
        a2.setAttribute('target', '_blank')
        a2.appendChild(icon2)
        a2.appendChild(span2)
        const div2 = document.createElement('div')
        div2.appendChild(a2);
        div2.className="airtime-linking-extra-links-with-icon-div"
        const linkAccountLinks = document.createElement('div')
        const br = document.createElement('br')
        linkAccountLinks.className = "airtime-linking-extra-links-container"
        linkAccountLinks.appendChild(div1)
        // linkAccountLinks.appendChild(br)
        linkAccountLinks.appendChild(div2)
        // linkAccountLinks.innerHTML = '<a target="_blank" href="https://bittube.app"><img id="airtime-get-airtime-extension-icon" /> Get Airtime extension</a>'
        // linkAccountLinks.innerHTML += '<a target="_blank" href="https://kb.bittubeapp.com/article/152-what-is-the-purpose-of-the-bittube-browser-extension-on-bittubers-com"><img id="airtime-get-airtime-info-icon" />  Learn more about Airtime</a>'
        /* Button */
        const linkAccountElem = document.createElement('div')
        linkAccountElem.id = 'airtime-linking-account-btn'
        linkAccountElem.setAttribute('data-airtime-link-account-contentname', localStorage.getItem('username') + '@' + window.location.host)
        linkAccountElem.setAttribute('data-airtime-link-account-displayname', 'PeerTube ' + localStorage.getItem('username') + '@' + window.location.host)
        // linkAccountElem.setAttribute('data-airtime-link-account-authtoken', localStorage.getItem('access_token'))
        // linkAccountElem.setAttribute('data-airtime-link-account-url', 'http://localhost:8080/link')
        linkAccountElem.setAttribute('data-airtime-link-account-use-event', true)
        linkAccountContent.appendChild(linkAccountElem)
        linkAccountContent.appendChild(linkAccountLinks)
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
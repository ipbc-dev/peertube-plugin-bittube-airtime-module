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
        const icon1 = '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"><defs><style>.cls-1,.cls-3{fill:#313232;}.cls-2{fill:#fff;}.cls-3{stroke:#fff;stroke-miterlimit:10;stroke-width:9px;}</style></defs><title>puzzle</title><path id="Pfad_936" data-name="Pfad 936" class="cls-1" d="M208.113,41.876A117.547,117.547,0,1,0,242.547,125,117.547,117.547,0,0,0,208.113,41.876Z"/><path class="cls-2" d="M173.473,119.759c.014.008.024.02.037.028l.015.009Zm19.579-62.094a96.24,96.24,0,1,0,28.19,68.045A96.241,96.241,0,0,0,193.052,57.665ZM125.021,213.451a87.69,87.69,0,1,1,87.691-87.726l-.022-.015A87.705,87.705,0,0,1,125.021,213.451Z"/><g id="Yo6cFl"><path class="cls-3" d="M125.975,200.656H122.8c-2.349-.891-4.026-2.652-5.746-4.38-5.625-5.651-11.246-11.306-16.939-16.888a21.768,21.768,0,0,0-4.617-3.625A6.822,6.822,0,0,0,85.356,179.9a42.59,42.59,0,0,0-.9,4.646c-1.159,5.9-4.2,10.267-10.17,12.064-9.846,2.962-19.778-6.456-19.773-15.388a14.449,14.449,0,0,1,12.636-14.008A24.621,24.621,0,0,0,72.593,166a6.507,6.507,0,0,0,3.633-9.129,21.183,21.183,0,0,0-3.911-5.271c-6.139-6.291-12.407-12.454-18.6-18.692-3.64-3.667-3.662-7.614-.055-11.243Q63.769,111.5,73.947,101.4a12.306,12.306,0,0,1,3.136-2.236c2.35-1.167,4.3-.268,4.983,2.267a25.52,25.52,0,0,1,.656,4.11A16.969,16.969,0,0,0,96.29,120.606c5.648,1.065,10.7-.688,15.036-4.207,5.454-4.431,8.12-10.31,7.373-17.377-.717-6.791-6.527-12.618-13.513-13.953-1.88-.359-3.812-.481-5.666-.933-2.693-.657-3.626-2.7-2.338-5.155a14.233,14.233,0,0,1,2.486-3.312q9.781-9.883,19.649-19.68c3.978-3.973,7.8-3.983,11.752-.038,6.155,6.141,12.279,12.311,18.473,18.411a22,22,0,0,0,4.368,3.487c4.314,2.47,8.97.557,10.414-4.2a43.8,43.8,0,0,0,.862-4.506c.945-4.925,3.273-8.918,7.925-11.167,9.9-4.787,19.442,3.3,21.4,10.735a14.534,14.534,0,0,1,.418,5.539c-.91,6.622-5.82,11.282-12.476,12.263a24.961,24.961,0,0,0-5.305,1.171,6.519,6.519,0,0,0-3.719,9.2,20.772,20.772,0,0,0,3.819,5.162c5.525,5.681,11.16,11.256,16.779,16.844,1.8,1.786,3.626,3.527,4.577,5.954v3.17a23.07,23.07,0,0,1-2.551,3.918q-10.145,10.335-20.463,20.5a11.733,11.733,0,0,1-2.9,2.086c-2.469,1.254-4.451.333-5.156-2.364a30.963,30.963,0,0,1-.612-3.827c-.912-6.972-4.475-12.008-11.094-14.507-5.808-2.192-11.284-.83-16.228,2.583a19.077,19.077,0,0,0-8.682,18.155c.519,6.657,6.507,12.753,13.532,14.1,1.88.36,3.812.48,5.666.933,2.708.662,3.638,2.693,2.349,5.147a14.21,14.21,0,0,1-2.487,3.311c-6.178,6.252-12.363,12.5-18.656,18.635A48.02,48.02,0,0,1,125.975,200.656Z"/></g></svg>'
        // icon1.src = peertubeHelpers.getBaseStaticRoute() + '/images/icon1.svg'
        const icon2 = '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250"><defs><style>.cls-1{fill:#313232;}.cls-2{fill:#fff;}</style></defs><title>learn</title><path id="Pfad_936" data-name="Pfad 936" class="cls-1" d="M208.113,41.876A117.547,117.547,0,1,0,242.547,125,117.547,117.547,0,0,0,208.113,41.876Z"/><path class="cls-2" d="M173.473,119.759c.014.008.024.02.037.028l.015.009Zm19.579-62.094a96.24,96.24,0,1,0,28.19,68.045A96.241,96.241,0,0,0,193.052,57.665ZM125.021,213.451a87.69,87.69,0,1,1,87.691-87.726l-.022-.015A87.705,87.705,0,0,1,125.021,213.451Z"/><path class="cls-2" d="M188.241,171.843V144.092c0-12.093-.027-19.442-.088-23.829-.1-6.887-.116-8.32-2.6-8.32h-.486l-.455.2c-.644.274-29.541,17.9-30.771,18.649L124.932,148.41,82.884,122.769c-25.6-15.6-36.341-22.088-41.008-24.784,2.544-1.493,6.89-4.123,14.533-8.754,15.607-9.536,52.463-31.992,64.565-39.362,1.812-1.109,3.2-1.888,4-2.3,4.928,2.941,29.012,17.616,42.478,25.82,24.967,15.235,35.693,21.732,40.449,24.5q-1.974,1.122-5.026,2.968l-8.2,4.95-.035,34.785v31.251ZM124.755,55.62c-.753.046-.98.06-34.061,20.205C82.52,80.8,74.359,85.791,68.236,89.559,57.276,96.3,57.276,96.3,57,97.3l-.295,1.073.666.9c.332.447.674.909,33.455,20.864,32.953,20.061,33.266,20.061,34.1,20.061s1.048,0,34.292-20.174c8.565-5.2,16.558-10.07,22.508-13.72,11.178-6.857,11.178-6.857,11.3-8.107l.01-.112v-.113c0-1.315-.275-1.487-3.651-3.6-1.663-1.041-4.07-2.531-7.039-4.361-5.937-3.657-14.146-8.682-23.115-14.149C125.975,55.615,125.7,55.615,124.9,55.615h-.07Z"/><path class="cls-2" d="M112.621,199.811c-7.417-4.257-15.976-9.035-19.016-10.659-2.19-1.169-6.266-3.346-7.418-4.03a18.276,18.276,0,0,1-6.7-6.968c-1.881-3.817-1.993-4.046-1.993-25.765,0-6.133.014-12.025.1-15.506,4.041,2.426,11.832,7.141,21.464,13,24.778,15.007,25.054,15.007,25.873,15.007.8,0,1.1,0,25.868-15.005,10.272-6.247,17.644-10.7,21.473-13,.077,3.494.09,9.379.09,15.5,0,21.18-.126,21.943-1.793,25.366-1.977,4.015-3.62,5.691-11.394,9.817-6.123,3.211-16.114,8.8-27.4,15.332l-6.818,3.938ZM86.6,150.356a2.427,2.427,0,0,0-1.736.727c-1.007,1.019-1,1.608-.889,11.447.1,9.867.114,10.673,1.144,12.531a12.907,12.907,0,0,0,5.891,5.4c3.154,1.577,12.021,6.492,22.575,12.517l11.353,6.438,11.14-6.371c5.658-3.218,13.478-7.6,17.467-9.742l1.622-.867c10.116-5.4,10.616-6.24,10.707-17.985l.017-1.924c.111-10.049.114-10.442-.88-11.448a2.43,2.43,0,0,0-1.736-.725,2.588,2.588,0,0,0-.96.189l.035-.012c-.56.231-2.7,1.45-19.575,11.7-8.6,5.236-15.4,9.275-17.841,10.672-2.3-1.32-8.571-5.057-17.849-10.673-8.5-5.173-18.762-11.382-19.637-11.725l.1.038A2.552,2.552,0,0,0,86.6,150.356Z"/></svg>'
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
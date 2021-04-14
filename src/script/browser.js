/** 
 * @return { Object }  browser names and Version
 * browser: Firefox | Chrome | Opera | IE | Safari
 */
navigator.saysWho = (function () {
    const {
        userAgent
    } = navigator
    let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
    let temp

    if (/trident/i.test(match[1])) {
        temp = /\brv[ :]+(\d+)/g.exec(userAgent) || []

        return {
            browser: 'IE ',
            version: temp[1] || ''
        }
    }

    if (match[1] === 'Chrome') {
        temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/)

        if (temp !== null) {
            return {
                browser: temp[1].replace('OPR', 'Opera'),
                version: temp[0].slice(4)
            }
        }

        temp = userAgent.match(/\b(Edg)\/(\d+)/)

        if (temp !== null) {
            return {
                browser: temp[1].replace('Edg', 'Edge'),
                version: temp[0].slice(4)
            }
        }
    }
    match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?']
    temp = userAgent.match(/version\/(\d+)/i)

    if (temp !== null) {
        match.splice(1, 1, temp[1])
    }


    return {
        browser: match[0] === "MSIE" ? "IE" : match[0],
        version: Number(match[1])
    }
})()

function checkBrowser(url) {
    var defualt = {
        IE: 11,
        Safari: 6.1,
        Firefox: 28,
        Chrome: 28,
        Opera: 12.1
    };

    var keys = Object.keys(defualt);

    if (keys.indexOf(navigator.saysWho.browser) != -1 && defualt[navigator.saysWho.browser] > navigator.saysWho.version) {
        location.replace(url);
    }
}

checkBrowser("not-support.html")
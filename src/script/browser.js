(function () {
    /**
     * 
     * @param {String} path 
     * @param {Object} settings 
     */
    this.CheckBrowser = function (path, settings) {
        // Defaults options 
        var defaults = {
            IE: 11,
            Safari: 6.1,
            Firefox: 28,
            Chrome: 28,
            Opera: 12.1
        }

        /**
         * @param {Object} source 
         * @param {Object} properties 
         * @returns {Object} assign (merge) two object
         */
        function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                // eslint-disable-next-line no-prototype-builtins
                if (source.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }

        this.options = (settings && typeof settings === "object") ? extendDefaults(defaults, arguments[0]) : defaults;


    };
    var userAgent = navigator.userAgent
    var match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
    var temp

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

// function checkBrowser(url) {
//     var defualt = {
//         IE: 11,
//         Safari: 6.1,
//         Firefox: 28,
//         Chrome: 28,
//         Opera: 12.1
//     };

//     var keys = Object.keys(defualt);

//     if (keys.indexOf(navigator.saysWho.browser) != -1 && defualt[navigator.saysWho.browser] > navigator.saysWho.version) {
//         location.replace(url);
//     }
// }
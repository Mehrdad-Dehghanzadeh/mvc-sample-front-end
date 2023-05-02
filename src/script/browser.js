function merge(source, properties) {
  for (var property in properties) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(property)) {
      source[property] = properties[property];
    }
  }
  return source;
}

(function (window) {
  // Defaults options
  var defaults = {
    IE: 11,
    Safari: 12.1,
    Firefox: 60,
    Chrome: 60,
    Opera: 64,
  }

  function CheckBrowser(path, setting) {
    // Define Options For Plugin
    this.options =
      setting && typeof setting === 'object'
        ? merge(defaults, arguments[1])
        : defaults;
    this.init(path);
  }

  CheckBrowser.prototype = {
    init: function (path) {
      if (path) {
        this.path = path;
        this.nav = this.getBrowser();
        this.check();
      } else {
        throw new Error('Please Enter Page Error Path');
      }
    },

    getBrowser: function () {
      var userAgent = navigator.userAgent;
      var match =
        userAgent.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
      var temp;

      if (/trident/i.test(match[1])) {
        temp = /\brv[ :]+(\d+)/g.exec(userAgent) || [];

        return {
          browser: 'IE',
          version: temp[1] || '',
        };
      }

      if (match[1] === 'Chrome') {
        temp = userAgent.match(/\b(OPR|Edge)\/(\d+)/);

        if (temp !== null) {
          return {
            browser: temp[1].replace('OPR', 'Opera'),
            version: temp[0].slice(4),
          };
        }

        temp = userAgent.match(/\b(Edg)\/(\d+)/);

        if (temp !== null) {
          return {
            browser: temp[1].replace('Edg', 'Edge'),
            version: temp[0].slice(4),
          };
        }
      }
      match = match[2]
        ? [match[1], match[2]]
        : [navigator.appName, navigator.appVersion, '-?'];
      temp = userAgent.match(/version\/(\d+)/i);

      if (temp !== null) {
        match.splice(1, 1, temp[1]);
      }

      return {
        browser: match[0] === 'MSIE' ? 'IE' : match[0],
        version: Number(match[1]),
      };
    },

    check: function () {
      var _browser = this.nav.browser;
      var _version = this.nav.version;
      if (_version <= this.options[_browser]) {
        location.replace(this.path);
      }
    },
  };

  /**
   * @param {String} path
   * @param {Object} settings
   */
  window.checkBrowser = function (path, settings) {
    return new CheckBrowser(path, settings);
  };
})(window);

var browser = new checkBrowser('not-support.html');

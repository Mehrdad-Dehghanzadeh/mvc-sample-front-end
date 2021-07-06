const { merge } = require('./helper');

(function ($) {
    var pluginName = 'modal';

    //Constructor Plugin
    var Modal = function (element, options) {
        this.element = element;
        // this.trigger = element;
        this.settings = merge(defaults, options);
        this.init();
    };

    // Defaults Options
    var defaults = {
        id: null, // this property is required
        size: 'sm', // includes xl, lg, md, sm, full, auto
        title: '',
        closeOutSide: true,
    };

    /****** Private Functions ******/
    function _setHeader(that) {
        that.element.append('<div class="modal__header"></div>');
    }

    function _setContainer(that, contents) {
        that.element.append(
            '<div class="modal__container modal__container--' +
                that.settings.size +
                '"></div>'
        );
        that.element.children('.modal__container').html(contents);
    }

    function _setModal(that) {
        var contents = that.element.contents(); // clone content
        that.element.html(''); // clear inner HTML modal

        _setHeader(that);
        _setContainer(that, contents); // append cloned content
    }

    /****** Private Functions ******/

    /****** Public Functions ******/

    $.extend(Modal.prototype, {
        init: function () {
            this.open();
            _setModal(this);
        },

        open: function () {
            this.element.addClass('modal--open');
        },
    });

    /****** Public Functions ******/

    // Prototype Plugin
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            var attrName = 'plugin_' + pluginName;
            var instance = $.data(this, attrName);

            if (!instance) {
                if (options === undefined || typeof options === 'object') {
                    $.data(this, attrName, new Modal($(this), options));
                } else {
                    $.error("method '" + options + "' not attached.");
                }
            } else {
                if (instance[options]) {
                    instance[options].apply(instance);
                } else if (typeof options === 'object') {
                    instance.settings = $.extend(
                        {},
                        instance.settings,
                        options
                    );
                } else if (!options) {
                } else {
                    $.error("The method '" + options + "' not exist.");
                }
            }
        });
    };

    // $[pluginName] = Modal;
})(jQuery);

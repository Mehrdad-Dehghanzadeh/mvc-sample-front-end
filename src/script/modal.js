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
        topClose: true, // top button close
    };

    /****** Private Functions ******/

    // Create Header Of Modal
    function _setHeader(that) {
        var header = $('<div class="modal__header"></div>');

        // top close Button
        if (that.settings.topClose) {
            header.prepend('<span class="modal__close">x</span>');
        }

        if (that.settings.title) {
            header.append(
                '<h2 class="modal__title">' + that.settings.title + '</h2>'
            );
        }

        that.element.children('.modal__container').prepend(header);
    }

    // Create Container Of Modal
    function _setContainer(that, contents) {
        that.element.append(
            '<div class="modal__container modal__container--' +
                that.settings.size +
                '">' +
                '<div class="modal-content"></div>' +
                '</div>'
        );
        that.element.find('.modal-content').html(contents);
    }

    // Create Modal
    function _setModal(that) {
        var contents = that.element.contents(); // clone content
        that.element.html(''); // clear inner HTML modal

        _setContainer(that, contents); // append cloned content
        _setHeader(that);
    }

    function _attachEvents(that) {
        var id = that.element.attr('id');

        // Add Trigger Event To Opening Modal
        $('[data-trigger="' + id + '"]').click(function (event) {
            event.preventDefault();
            that.open();
        });

        // Add Close Modal
        if (that.settings.closeOutSide) {
            that.element.click(function (event) {
                if ($(event.target).hasClass('modal')) {
                    event.stopPropagation();
                    that.close();
                }
            });
        }

        $('.modal__close').click(function (event) {
            event.stopPropagation();
            that.close();
        });
    }

    /****** Private Functions ******/

    /****** Public Functions ******/

    $.extend(Modal.prototype, {
        init: function () {
            _setModal(this);
            _attachEvents(this);
        },

        open: function () {
            $('body').addClass('modal-is-open');
            this.element.addClass('modal--open');
        },

        close: function () {
            $('body').removeClass('modal-is-open');
            this.element.removeClass('modal--open');
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

    $[pluginName] = Modal;
})(jQuery);

$('[data-plugin_modal]').each(function () {
    var options = $(this).data('plugin_modal');
    var id = '#' + $(this).data('trigger');
    $(id).modal(options);
});

import { merge } from './helper';
(function ($) {
    var pluginName = 'modal';

    var defaults = {
        id: 'modal', // this property is required
        size: 'lg', // includes xl, lg, md, sm, full, auto
        title: '',
        closeOutSide: true,
    };

    function Modal(element, options) {
        if (options.id) {
            this.element = element ? element : $(options.id);
            this.settings = merge(options, defaults);

            this.init();
        } else {
            throw new Error('Please Enter Modal id');
        }
    }

    $.extend(Modal.prototype, {
        init: function () {},

        appendContent: function () {
            var contents = this.element.contents();
            this.element.html('');
            this.element.append(
                '<div class="modal__container modal__container--' +
                    this.settings.size +
                    '"></div>'
            );
        },
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Modal(this, options));
            }
        });
    };
})(jQuery);

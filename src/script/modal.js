import { merge } from './helper';
(function ($) {
    var pluginName = 'modal';

    var defaults = {
        id: 'modal', // this property is required
        size: 'lg', // includes lg, sm, xs, auto
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
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Modal(this, options));
            }
        });
    };
})(jQuery);

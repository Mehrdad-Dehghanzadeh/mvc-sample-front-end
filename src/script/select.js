(function ($) {
  var pluginName = 'selectBar';
  var defaultOptions = { label: '', emptyOptionText: 'موردی نیست !' };

  //Constructor Plugin
  var SelectBar = function (element, options) {
    this.element = element;
    this.wrapper = null;
    this.list = null;
    this.settings = Object.assign({}, defaultOptions, options);
    this.init();
  };

  /****** Private Functions ******/
  function _createWrapper(that) {
    var className = that.element.attr('class') || '';

    that.wrapper = $(
      '<div class="select-field ' +
        className +
        '">' +
        '<fieldset class="select-field__fieldset">' +
        '<legend class="select-field__legend">' +
        that.settings.label +
        '</legend>' +
        '<span class="select-field__text"></span>' +
        '</div>'
    );

    that.element.after(that.wrapper);
  }

  function _changeValue(that, value, html) {
    that.element.val(value);
    if (value) {
      that.wrapper.addClass('select-field--has-value');
      that.wrapper.find('.select-field__text').html(html);
    } else {
      that.wrapper.find('.select-field__text').html('');
    }
    that.element.trigger('change');
  }

  function _createListItem(that) {
    var selectedOption = $(that.element.children('option')[0]);

    that.element.children('option').each(function (index) {
      var html = $(that.element.children('option')[index]).html();
      var value = $(that.element.children('option')[index]).val();
      var isSelected = !!$(that.element.children('option')[index]).attr(
        'selected'
      );
      if (isSelected) {
        selectedOption = $(that.element.children('option')[index]);
      }
      var template = $('<li class="select-field__list-item">' + html + '</li>');

      template.click(function () {
        _changeValue(that, value, html);
      });

      that.list.append(template);
    });

    _changeValue(that, selectedOption.val(), selectedOption.html());
  }

  function _createList(that) {
    that.list = $('<ul class="select-field__list"></ul>');
    var hasOption = !!that.element.children('option').length;

    if (hasOption) {
      _createListItem(that);
    } else {
      that.list.append(
        '<li class="select-field__list-item-empty">' +
          that.settings.emptyOptionText +
          '</li>'
      );
    }

    that.wrapper.append(that.list);
  }

  function _attachEvents(that) {
    that.wrapper.children('.select-field__fieldset').click(function (event) {
      event.preventDefault();
      $(that.wrapper).addClass('select-field--active');

      setTimeout(() => {
        $('body').on('click', function () {
          $(that.wrapper).removeClass('select-field--active');
          $('body').off('click');
          return false;
        });
      }, 350);
    });
  }

  /****** Private Functions ******/

  /****** Public Functions ******/
  $.extend(SelectBar.prototype, {
    init: function () {
      _createWrapper(this);
      _createList(this);
      _attachEvents(this);
    },
  });

  /****** Public Functions ******/

  // Prototype Plugin
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      var _element = $(this);
      return $.data(this, new SelectBar(_element, options));
    });
  };

  $[pluginName] = SelectBar;
})(jQuery);

$('[data-plugin_select-bar]').each(function () {
  var options = $(this).data('plugin_select-bar');
  $(this).selectBar(options);
});

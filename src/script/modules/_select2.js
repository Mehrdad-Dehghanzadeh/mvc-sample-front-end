export default () => {
  $('select.select2').each(function () {
    let select2options = {
      width: '100%',
      dir: 'rtl',
      dropdownParent: $('body'),
      placeholder: 'انتخاب کنید ... ',
      language: {
        noResults: function (params) {
          return 'نتیجه یافت نشد.';
        },
      },
    };

    if ($(this).hasClass('no-search')) {
      select2options.minimumResultsForSearch = -1;
    }

    if ($(this).hasClass('has-clear')) {
      select2options.allowClear = true;
    }

    $(this).select2(select2options);
  });
};

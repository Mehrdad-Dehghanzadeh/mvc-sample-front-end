/*****************
 * select2
 *****************/
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

$(document).ready(function () {
  $('select').each(function () {
    $(this).select2(select2options);
  });
});

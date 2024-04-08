$(function(){
  const img_w = $('.ipv').width();
  const img_h = $('.ipv').height();
  var click_flg = false;

  $('body').prepend('<div id="ipv_bg"></div>');

  $(document).on("click", "#ipv_close_btn", function () {
    $(this).toggleClass("Click");
    $("#ipv_bg").addClass("Hide");
  });

	$(".ipv").on("click", function() {
    var src = $(this).children('img').attr('src');

    $("#ipv_bg").empty();
    $("#ipv_bg").removeClass("Hide");
    $("#ipv_bg").append('<div id="ipv_close_btn">✕</div>');
    $("#ipv_bg").append('<img src=\"' + src + '\">');

    $("#ipv_bg").toggleClass("Active");
	})

  $("#ipv_bg").on("click", function() {
    $(this).toggleClass("Active");
  })
});
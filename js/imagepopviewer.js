$(function(){
  var img_path = "./image/";
  const img_w = $('.ipv').width();
  const img_h = $('.ipv').height();
  var click_flg = false;

  $('body').prepend('<div id="ipv_bg"></div>');

  var elem = $('.ipv');
  var ipvArray = new Array();
  var index = 0;
  elem.each(function () {  
    ipvArray[index] = $(this).children('img').attr('src');
    index++;
  });

  $(document).on("click", "#ipv_close_btn", function () {
    $(this).toggleClass("Click");
    $("#ipv_bg").addClass("Hide");
  });

	$(".ipv").on("click", function() {
    var src = $(this).children('img').attr('src');

    $("#ipv_bg").empty();
    $("#ipv_bg").removeClass("Hide");
    if(index > 0)
    {
      $("#ipv_bg").append('<div id="ipv_left_btn"></div>');
      $("#ipv_bg").append('<div id="ipv_right_btn"></div>');
    }
    $("#ipv_bg").append('<div id="ipv_close_btn"></div>');
    $("#ipv_bg").append('<img src=\"' + src + '\">');

    $("#ipv_bg").toggleClass("Active");
	})

  $("#ipv_bg").on("click", function() {
    $(this).toggleClass("Active");
  })
});


var clWidth = 0;
var scaleWidth = 0;
$(function(){
  clWidth = document.documentElement.clientWidth;
  scaleWidth = window.innerWidth;
});

document.documentElement.addEventListener('gesturestart', function (e) {

  scaleWidth = window.innerWidth;

  if(clWidth != scaleWidth) {
		if($("#ipv_bg").find("#ipv_left_btn").hasClass('Hide') == false)
    {
      $("#ipv_bg").find("#ipv_left_btn").addClass('Hide');
      $("#ipv_bg").find("#ipv_right_btn").addClass('Hide');
    }
    else 
    {
      $("#ipv_bg").find("#ipv_left_btn").removeClass('Hide');
      $("#ipv_bg").find("#ipv_right_btn").removeClass('Hide');
    }
  }
});
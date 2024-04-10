$(function(){
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

    $("#ipv_bg").append('<img src=\"' + ipvArray[0] + '\" alt="images" id="ipv_prev">');
    $("#ipv_bg").append('<img src=\"' + ipvArray[1] + '\" alt="images" id="ipv_main">');
    $("#ipv_bg").append('<img src=\"' + ipvArray[2] + '\" alt="images" id="ipv_next">');

    set_close_btn();

    // アニメーションに使う座標
    var main_pos_left = $('#ipv_main').css('margin-left');
    $("#ipv_main").css({'left': main_pos_left, 'margin': 'auto 0'});


    $("#ipv_bg").toggleClass("Active");

    $("#ipv_bg").append('<div id="ipv_close_btn"></div>');

	})

  $(document).on("click", "#ipv_bg", function () {
    $(this).toggleClass("Active");
  })

  $(document).on("click", "#ipv_left_btn", function (e) {
    // 親のイベントを無効
    e.stopPropagation();

    $("#ipv_main").animate({
      left: "100%",
      queue: false
    }, 500, 'swing')
    $("#ipv_prev").animate({
      left: "0", light: "0",
      queue: false
    }, 500, 'swing')

    $('#ipv_next').attr('id', 'ipv_temp');
    $('#ipv_main').attr('id', 'ipv_next');
    $('#ipv_prev').attr('id', 'ipv_main');
    $('#ipv_temp').attr('id', 'ipv_prev');

    set_close_btn();
  })
});

function set_close_btn () {
  var window_w = window.innerWidth;
  var window_h = window.innerHeight;
  var close_btn_w = parseInt($('#ipv_close_btn').css('width'));
  var left_pos = ( (window_w / 2) + (parseInt($('#ipv_bg').find('img#main').css('width')) / 2) ) - close_btn_w - 8;
  var top_pos = ( (window_h / 2) - (parseInt($('#ipv_bg').find('img#main').css('height')) / 2) ) + 4;
  var close_btn = new Object();
  close_btn.top = top_pos
  close_btn.left = left_pos;
  $("#ipv_close_btn").css(close_btn);
}

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
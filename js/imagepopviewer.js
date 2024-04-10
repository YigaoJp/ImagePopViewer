var ipv_current_id = 0;
var current_index = 0;
var ipv_prev_temp = 0;
var ipv_next_temp = 0;

$(function(){

  $('body').prepend('<div id="ipv_bg"></div>');

  var elem = $('.ipv');
  var ipvArray = new Array();
  var index = 0;
  var prev_flg = false;
  var next_flg = false;

  $.when(
    elem.each(function () {  
      ipvArray[index] = $(this).children('img').attr('src');
      $(this).find('img').attr('id', "ipv_" + index);
      $("#ipv_bg").append('<img src=\"' + ipvArray[index] + '\" alt="images" class="ipv_initialize" id="ipv_image_' + index + '">');
      index++;
    })
  )
  .done(function() {
    $("#ipv_bg").append('<div id="ipv_close_btn"></div>');
    if(index > 0)
    {
      $("#ipv_bg").append('<div id="ipv_left_btn"></div>');
      $("#ipv_bg").append('<div id="ipv_right_btn"></div>');
    }
  })

  $(document).on("click", "#ipv_close_btn", function () {
    $(this).toggleClass("Click");
    $("#ipv_bg").addClass("Hide");
    ipv_image_initialize();
  });

	$(".ipv").on("click", function() {

    var src = $(this).children('img').attr('src');
    ipv_current_id = $(this).children('img').attr("id");
    //alert(ipv_current_image);
    // $("#ipv_bg").empty();
    // 最初だけ追加
    $("#ipv_bg").removeClass("Hide");

    current_index = Number(ipv_current_id.match(/\d+$/)[0]);

    if (index >= 1)
    {
      if ( (current_index - 1) >= 0)
      {
        ipv_prev_temp = "ipv_image_" + (current_index - 1);
        prev_flg = true;
      }
      if (current_index + 1 <= index)
      {
        ipv_next_temp = "ipv_image_" + (current_index + 1);
        next_flg = true;
      }
    }

    $("#ipv_bg").find('#ipv_image_' + current_index).attr('id', "ipv_main");

    if (prev_flg)
    {
      $("#ipv_bg").find('#ipv_image_' + (current_index - 1)).attr('id', "ipv_prev");
      $("#ipv_left_btn").removeClass("Disable");
      prev_flg = true;
    }
    else
    {
      $("#ipv_left_btn").attr('class', "Disable");
      prev_flg = false;
    }
    if (next_flg)
    {
      $("#ipv_bg").find('#ipv_image_' + (current_index + 1)).attr('id', "ipv_next");
      $("#ipv_right_btn").removeClass("Disable");
      next_flg = true;
    }
    else
    {
      $("#ipv_right_btn").attr('class', "Disable");
      prev_flg = false;
    }

    $("#ipv_bg").toggleClass("Active");

    set_close_btn();
	})

  $(document).on("click", "#ipv_bg", function () {
    $(this).toggleClass("Active");
    ipv_image_initialize();
  })

  $(document).on("click", "#ipv_left_btn", function (e) {
    // 親のイベントを無効
    e.stopPropagation();

    set_main_image_pos();
        
    $("#ipv_main").animate({
      left: "100%",
      queue: false
    }, 500, 'swing')
    $("#ipv_prev").animate({
      left: "0", light: "0",
      queue: false
    }, 500, 'swing')

    set_main_image_pos_reset();
    $('#ipv_next').attr('id', 'ipv_temp');
    $('#ipv_main').attr('id', 'ipv_next');
    $('#ipv_prev').attr('id', 'ipv_main');
    $('#ipv_temp').attr('id', 'ipv_prev');

    set_close_btn();
  })

  $(document).on("click", "#ipv_right_btn", function (e) {
    // 親のイベントを無効
    e.stopPropagation();
    
    set_main_image_pos();
    
    $("#ipv_main").animate({
      left: "-100%",
      queue: false
    }, 500, 'swing')
    $("#ipv_next").animate({
      left: "0", light: "0",
      queue: false
    }, 500, 'swing')

    set_main_image_pos_reset();
    $('#ipv_prev').attr('id', 'ipv_temp');
    $('#ipv_main').attr('id', 'ipv_prev');
    $('#ipv_next').attr('id', 'ipv_main');
    $('#ipv_temp').attr('id', 'ipv_next');

    set_close_btn();
  })
});

function ipv_image_initialize() {
  $('#ipv_main').attr('id', "ipv_image_" + current_index);
  $('#ipv_prev').attr('id', ipv_prev_temp);
  $('#ipv_next').attr('id', ipv_next_temp);
}

function set_main_image_pos() {
    // アニメーションに使う座標
    var main_pos_left = $('#ipv_main').css('margin-left');
    $("#ipv_main").css({'left': main_pos_left, 'margin': 'auto 0'});  
}

function set_main_image_pos_reset() {
  $("#ipv_main").css({'margin': 'auto'});  
}

function set_close_btn () {
  var window_w = $(window).width();
  var window_h = $(window).height();
  var close_btn_w = parseInt($('#ipv_close_btn').css('width'));
  var left_pos = ( (window_w / 2) + (parseInt($('#ipv_bg').find('#ipv_main').css('width')) / 2) ) - close_btn_w - 8;
  var top_pos = ( (window_h / 2) - (parseInt($('#ipv_bg').find('#ipv_main').css('height')) / 2) ) + 4;
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
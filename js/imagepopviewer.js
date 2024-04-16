var ipv_current_id = 0;
var ipv_current_index = 0;
var ipv_temp = "";
var ipv_prev_temp = "";
var ipv_next_temp = "";
var ipv_prev_flg = false;
var ipv_next_flg = false;
var ipv_index = 0;
var ipv_zoom_flg = false;
var ipv_zoom_x = 0;
var ipv_zoom_y = 0;
var ipv_magnification = 1.0;
var ipv_img_original_width = 0;
var ipv_img_original_height = 0;
var ipv_scale = 1.0;

$(function(){

  $('body').prepend('<div id="ipv_bg"></div>');

  var elem = $('.ipv');
  var ipvArray = new Array();

  $.when(
    elem.each(function () {  
      ipvArray[ipv_index] = $(this).children('img').attr('src');
      $(this).find('img').attr('id', "ipv_" + ipv_index);
      $("#ipv_bg").append('<img src=\"' + ipvArray[ipv_index] + '\" alt="images" class="ipv_initialize" id="ipv_image_' + ipv_index + '">');
      ipv_index++;
    })
  )
  .done(function() {
    $("#ipv_bg").append('<div id="ipv_temp_img"><img alt="temp image"></div>');
    $("#ipv_bg").append('<div id="ipv_close_btn"></div>');
    $("#ipv_bg").append('<div id="ipv_zoom_btn"></div>');
    $("#ipv_bg").append('<div id="ipv_zoom_viewer"></div>');
    if(ipv_index > 0)
    {
      $("#ipv_bg").append('<div id="ipv_left_btn"></div>');
      $("#ipv_bg").append('<div id="ipv_right_btn"></div>');
    }
  })

  $(document).on("click", "#ipv_close_btn", function () {
    $(this).toggleClass("Click");
    $("#ipv_bg").addClass("Hide");
    ipv_image_initialize();
    style_reset();
    ipv_zoom_flg = false;
  });

	$(".ipv").on("click", function() {

    ipv_current_id = $(this).children('img').attr("id");
    check_btn_flg();

    $("#ipv_bg").removeClass("Hide");

    $("#ipv_bg").find('#ipv_image_' + ipv_current_index).attr('id', "ipv_main");

    btn_disable();
    $("#ipv_bg").toggleClass("Active");

    set_close_btn();
    set_zoom_btn();
	})

  $(document).on("click", "#ipv_bg", function () {
    $(this).toggleClass("Active");
    ipv_image_initialize();
    style_reset();
    ipv_zoom_flg = false;
  })

  $(document).on("click", "#ipv_left_btn", function (e) {

    if($('#ipv_left_btn').hasClass("Disable")) {
      return false;
    }

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

    if(0 <= (ipv_current_index - 2))
    {
      ipv_prev_temp = "ipv_image_" + (ipv_current_index - 2);
      ipv_prev_flg = true;
    }
    else
    {
      ipv_prev_flg = false;
    }

    ipv_next_temp = "ipv_image_" + (ipv_current_index + 1);

    ipv_current_index--;
    ipv_current_id = "#ipv_image_" + ipv_current_index;

    $('#ipv_next').attr('id', ipv_next_temp);
    $('#ipv_main').attr('id', 'ipv_next');
    $('#ipv_prev').attr('id', 'ipv_main');
    if(ipv_prev_flg)
    {
      $("#" + ipv_prev_temp).attr('id', 'ipv_prev');
    }

    check_btn_flg();
    btn_disable();
    set_close_btn();
    set_zoom_btn();
    style_reset();
  })

  $(document).on("click", "#ipv_right_btn", function (e) {

    if($('#ipv_right_btn').hasClass("Disable")) {
      return false;
    }

    // 親のイベントを無効
    e.stopPropagation();
    
    set_main_image_pos();
    
    $.when(
      $("#ipv_main").animate({
        left: "-100%",
        queue: false
      }, 500, 'swing'),
      $("#ipv_next").animate({
        left: "0", light: "0",
        queue: false
      }, 500, 'swing')
      ).done(function() {
        style_reset();
    });

    set_main_image_pos_reset();

    if(ipv_index > (ipv_current_index + 2))
    {
      ipv_next_temp = "ipv_image_" + (ipv_current_index + 2);
      ipv_next_flg = true;
    }
    else
    {
      ipv_next_flg = false;
    }

    ipv_prev_temp = "ipv_image_" + (ipv_current_index - 1);

    ipv_current_index++;
    ipv_current_id = "#ipv_image_" + ipv_current_index;

    $('#ipv_prev').attr('id', ipv_prev_temp);
    $('#ipv_main').attr('id', 'ipv_prev');
    $('#ipv_next').attr('id', 'ipv_main');
    if(ipv_next_flg)
    {
      $("#" + ipv_next_temp).attr('id', 'ipv_next');
    }

    check_btn_flg();
    btn_disable();
    set_close_btn();
    set_zoom_btn();
    style_reset();
  })

  $(document).on("click", "#ipv_zoom_btn", function (e) {
    // 親のイベントを無効
    e.stopPropagation();
    $("#ipv_zoom_btn").toggleClass("Active");
    
    $('#ipv_zoom_viewer').css('background-image', 'url(' + $("#ipv_main").attr('src') + ')');
    ipv_magnification = getComputedStyle(document.documentElement).getPropertyValue('--ipv_magnification');

    if(ipv_zoom_flg == false)
    {
      ipv_zoom_flg = true;
      $('#ipv_zoom_viewer').css('display', 'block');
    }
    else
    {
      ipv_zoom_flg = false;
      $('#ipv_zoom_viewer').css('display', 'none');
    }

    ipv_zoom_x = parseInt($("#ipv_zoom_viewer").css("width"));
    ipv_zoom_y = parseInt($("#ipv_zoom_viewer").css("height"));
    $('#ipv_zoom_viewer').offset({ top: e.pageY - (ipv_zoom_y / 2), left: e.pageX - (ipv_zoom_x / 2 )}).hide().fadeIn();

  });

  $(document).on('mousemove', "#ipv_main", function(e){

    if(ipv_zoom_flg == false)
    {
      return;
    }
    
    ipv_zoom_x = parseInt($("#ipv_zoom_viewer").css("width"));
    ipv_zoom_y = parseInt($("#ipv_zoom_viewer").css("height"));

    ipv_img_w = parseInt($(this).css("width"));
    ipv_img_h = parseInt($(this).css("height"));

    $('#ipv_temp_img').find('img').attr("src", $("#ipv_main").attr('src'));
    ipv_img_original_width = $('#ipv_temp_img').find('img')[0].width;
    ipv_img_original_height = $('#ipv_temp_img').find('img')[0].height;

    ipv_scale = ipv_img_original_width / ipv_img_w;
    //デバッグ用
   $('#text').text(((e.offsetX * ipv_scale) - (ipv_zoom_x / 2))+" ] " + "ow:" + ipv_img_original_width + "  oh:" + ipv_img_original_height + "   iw:" + ipv_img_w + "    ih:" + ipv_img_h + " / offsetX:" + e.offsetX + " offsetY:" + e.offsetY);

   if(((e.offsetX * ipv_scale) - (ipv_zoom_x / 2)) > 0 && ((e.offsetY * ipv_scale) - (ipv_zoom_y / 2) > 0 )) 
   {
    $('#ipv_zoom_viewer').css('background-position' , 
    '-' + ((e.offsetX * ipv_scale) - (ipv_zoom_x / 2)) + 'px ' + 
    '-' + ((e.offsetY * ipv_scale) - (ipv_zoom_y / 2)) + 'px');
   }
   else
   {
    if(((e.offsetX * ipv_scale) - (ipv_zoom_x / 2)) < 0)
    {
      $('#ipv_zoom_viewer').css('background-position' , 
      '0px ' + 
      '-' + ((e.offsetY * ipv_scale) - (ipv_zoom_y / 2)) + 'px');
    }
    else if(((e.offsetY * ipv_scale) - (ipv_zoom_y / 2)) < 0)
    {
      $('#ipv_zoom_viewer').css('background-position' , 
      '-' + ((e.offsetX * ipv_scale) - (ipv_zoom_x / 2)) + 'px ' + 
      '0px');
      }
   }

    // 画面端(上と左のみ)に対応
    if((e.pageX - (ipv_zoom_x / 2) > 20) && (e.pageY - (ipv_zoom_y / 2) > (ipv_zoom_y / 4)))
    {
      $('#ipv_zoom_viewer').offset({ top: (e.pageY - (ipv_zoom_y / 2)), left: (e.pageX - (ipv_zoom_x / 2)) });
    }
    else
    {
      if(!(e.pageY - (ipv_zoom_y / 2) < (ipv_zoom_y / 4)))
      {
        $('#ipv_zoom_viewer').offset({ top: (e.pageY - (ipv_zoom_y / 2)) });
      }
      else if(!(e.pageX - (ipv_zoom_x / 2) < 20))
      {
        $('#ipv_zoom_viewer').offset({top: 20, left: (e.pageX - (ipv_zoom_x / 2)) });
      }
    }
  });
});

function style_reset() {
  // スタイルを削除
  $('#ipv_bg').find('img').removeAttr('style');
  $("#ipv_zoom_btn").removeClass('Active');
  $('#ipv_zoom_viewer').css('display', 'none');
  ipv_zoom_flg = false;
}

function btn_disable() {
  if (ipv_prev_flg)
  {
    $("#ipv_bg").find('#ipv_image_' + (ipv_current_index - 1)).attr('id', "ipv_prev");
    $("#ipv_left_btn").removeClass("Disable");
    ipv_prev_flg = true;
  }
  else
  {
    $("#ipv_left_btn").attr('class', "Disable");
    ipv_prev_flg = false;
  }
  if (ipv_next_flg)
  {
    $("#ipv_bg").find('#ipv_image_' + (ipv_current_index + 1)).attr('id', "ipv_next");
    $("#ipv_right_btn").removeClass("Disable");
    ipv_next_flg = true;
  }
  else
  {
    $("#ipv_right_btn").attr('class', "Disable");
    ipv_prev_flg = false;
  }
}

function check_btn_flg() {
  ipv_current_index = Number(ipv_current_id.match(/\d+$/)[0]);

  if (ipv_index >= 1)
  {
    if ( (ipv_current_index - 1) >= 0)
    {
      ipv_prev_temp = "ipv_image_" + (ipv_current_index - 1);
      ipv_prev_flg = true;
    }
    else
    {
      ipv_prev_flg = false;
    }
    if ( (ipv_current_index + 1) < ipv_index)
    {
      ipv_next_temp = "ipv_image_" + (ipv_current_index + 1);
      ipv_next_flg = true;
    }
    else
    {
      ipv_next_flg = false;
    }
  }
}

function ipv_image_initialize() {
  $('#ipv_main').attr('id', "ipv_image_" + ipv_current_index);
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

function set_zoom_btn () {
  var window_w = $(window).width();
  var window_h = $(window).height();
  var zoom_btn_w = parseInt($('#ipv_zoom_btn').css('width'));
  var left_pos = ( (window_w / 2) + (parseInt($('#ipv_bg').find('#ipv_main').css('width')) / 2) ) - zoom_btn_w - 8;
  var bottom_pos = ( (window_h / 2) - (parseInt($('#ipv_bg').find('#ipv_main').css('height')) / 2) ) + 4;
  var zoom_btn = new Object();
  zoom_btn.bottom = bottom_pos
  zoom_btn.left = left_pos;
  $("#ipv_zoom_btn").css(zoom_btn);
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
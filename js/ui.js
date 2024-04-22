var ua = navigator.userAgent;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua);
var isWindows = ua.indexOf('Windows') != -1;
var isMac = /Mac|PPC/i.test(ua);

$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null){
    return null;
  }
  else {
    return decodeURI(results[1]) || 0;
  }
}

var openModal = function(id) {
  $(id).css('display', 'block');
}
var closeModal = function(id) {
  $(id).css('display', 'none');
}

var commonPopup = function() {
  var posY = null;
  var magnificPopupConfiguration = function() {
    return {
      beforeOpen: function() {
        posY = window.pageYOffset;
        $('html').css('overflow', 'hidden');
        $('body').css({'position': 'fixed', 'top': -posY});
      },
      resize: function() {
        if ($('.fix-bottom').length) {
          var $coWrap = $('.fix-bottom .popup-wrap .con-wrap');
          if ($coWrap.hasClass('ws')) {
            $coWrap.children('div').css('max-height', $win.height() - 202 + 'px');
          }
          if ($coWrap.outerHeight() > $win.height() / 3 * 2.3) {
            $coWrap.addClass('ws');
            $coWrap.children('div').css('max-height', $win.height() - 202 + 'px');
          }
        }
      },
      open: function() {},
      beforeClose: function() {
        $('html').css('overflow', '');
        $('body').css({'position': '', 'top': ''});
        window.scrollTo(0, posY);
      }
    }
  }

  //팝업 (공통) - jquery magnific 팝업
  $('.btn-popup-modal a').magnificPopup({
    type: 'inline',
    preloader: false,
    modal: false
  });
  $(document).on('click', '.b-mfp-close', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });
  
  $('.btn-popup-anim-1:not(.disabled) a, a.btn-popup-anim-1:not(.disabled)').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'mfp-zin'
  });
  $('.btn-popup-anim-2:not(.disabled) a').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'mfp-slide-b'
  });
  $('.btn-popup-anim-3:not(.disabled) a, a.btn-popup-anim-3:not(.disabled)').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'fade-slideup fix-bottom',
    callbacks: magnificPopupConfiguration()
  });

  $('.popup-wrap').each(function(){
    if ($(this).data('width')) {
      $(this).css('width', $(this).data('width'));
    }
  });
}
var commonSelect = function() {
  $('.select-base').find('select').each(function(){
    if ($(this).closest('.select-base').hasClass('disabled')) {
      return true;
    }
    if ($(this).find('option:eq(0)').attr('value') === undefined) {
      $(this).find('option:eq(0)').val(0);
    }
    if (parseInt($(this).val()) === 0) {
      $(this).closest('.select-base').removeClass('active');
    } else {
      $(this).closest('.select-base').addClass('active');
    }
  });
  $('.select-base').find('select').on("change",function(){
    if ($(this).closest('.select-base').hasClass('disabled')) {
      return true;
    }
    if (parseInt($(this).val()) === 0) {
      $(this).closest('.select-base').removeClass('active');
    } else {
      $(this).closest('.select-base').addClass('active');
    }
    $(this).prev().html($(this).find("option:selected").text());
  }).prev().html(function() {
    return $(this).next().find("option:selected").text();
  });
}
var commonTab = function() {
  $('.tab-base').each(function(){
    var target = $(this).find('li.on').find('a').attr('href');
    if (target.indexOf('#') != -1) {
      $(target).show();
    }
  })
  $('.tab-base').find('a').on('click', function(e){
    e.preventDefault();
    var target = $(this).attr('href');
    $(this).closest('li').addClass('on');
    $(this).closest('li').siblings().removeClass('on');
    if (target.indexOf('#') != -1) {
      $(target).show();
      $(target).siblings().hide();
    }
  });
}
var commonCounter = function() {
  $('.counter-base').each(function(){
    var $input = $(this).find('input'),
        $minus = $(this).find('.btn-minus'),
        $plus = $(this).find('.btn-plus');
    var min = $(this).data('min'),
        max = $(this).data('max');
    $(this).on('mouseenter', function(){
      $(this).addClass('on');
    }).on('mouseleave', function(){
      $(this).removeClass('on');
    });

    $minus.on('click', function(){
      if (min) {
        if ($input.val() > min) $input.val(Number($input.val()) - 1);
      } else {
        if ($input.val() > 0) $input.val(Number($input.val()) - 1);
      }
    });

    $plus.on('click', function(){
      if (max) {
        if ($input.val() < max) $input.val(Number($input.val()) + 1);
      } else {
        $input.val(Number($input.val()) + 1);
      }
    });
  });
}

var gnbMenu = function() {
  var menu=1;
  var sub=1;
  
  function hide(){
    if(menu && sub){
      $("#gnb > li.on a").next().slideUp("fast");
      $("#gnb > li.on").removeClass("on");
    }
  }

  var dp1 = $('#gnb').data('dp1');
  var dp2 = $('#gnb').data('dp2');

  if (dp1) {
    $("#gnb > li").eq(dp1 - 1).addClass('active');
    if (dp2) {
      $("#gnb > li").eq(dp1 - 1).find('.submenu').find('li').eq(+dp2 - 1).addClass('active');
    }
  }

  $("#gnb > li > a").on("mouseenter",function(){
    $("#gnb > li.on a").next().slideUp("fast");
    $("#gnb > li.on").removeClass("on");

    $(this).closest('li').addClass("on");
    $(this).next().stop().slideDown("fast");
  })

  $("#gnb").mouseenter(function(){
    menu=0;
  });
  $("#gnb ul").mouseenter(function(){
    sub=0;
  });
  
  $("#gnb").mouseleave(function(){
    menu=1;
    setTimeout(hide, 500);
  });
  $("#gnb ul").mouseleave(function(){
    sub=1;
    setTimeout(hide, 500);
  });
}

var createTable = function(target) {
  //define data array
  var tabledata = [
    {
      id:1,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed",
      "레이더 상태":"정상"
    },
    {
      id:2,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Text line 1",
      "레이더 상태":"이상"
    },
    {
      id:3,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"정상"
    },
    {
      id:4,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:5,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed",
      "레이더 상태":"정상"
    },
    {
      id:6,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:7,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:8,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:9,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:10,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:11,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:12,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:13,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:14,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:15,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:16,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:17,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:18,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:19,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:20,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:21,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:22,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:23,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:24,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:25,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    }
  ];

  //initialize table
  const table = new Tabulator(target, {
		data: tabledata, //assign data to table
		layout: "fitColumns",
		reactiveData: true,
		columns: [
			{
        width: 41,
				formatter: "rowSelection",
				titleFormatter: "rowSelection",
				titleFormatterParams: {
					rowRange: "active", //only toggle the values of the active filtered rows
				},
				headerSort: false,
        hozAlign: "center",
        headerHozAlign: "center"
			},
			{ title: "VMS_ID",
        field: "id",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{ title: "VMS 이름",
        field: "레이더 ID",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{
        title: "VMS 상태",
        field: "레이더 이름",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{
				title: "운영상황",
				field: "레이더 상태",
        hozAlign: "center",
        headerHozAlign: "center",
				formatter: function (cell, formatterParams, onRendered) {
					const value = cell.getValue();
					if(value === '이상') return `<span class="state"><img src=img/ico-s-abnormal.svg></img><em>${value}</em></span>`;
					else return `<span class="state"><img src=img/ico-s-steady.svg></img><em>${value}</em></span>`;
				},
			},
		],
  });
  table.on("rowClick", function(e, row){
    if (!$(row._row.element).hasClass('on')) {
      $(row._row.element).addClass('on')
    } else {
      $(row._row.element).removeClass('on')
    }
  });
}

var createTableType2 = function(target) {
  //define data array
  var tabledata = [
    {
      id:1,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed",
      "레이더 상태":"정상"
    },
    {
      id:2,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Text line 1",
      "레이더 상태":"이상"
    },
    {
      id:3,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"정상"
    },
    {
      id:4,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:5,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed",
      "레이더 상태":"정상"
    },
    {
      id:6,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:7,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:8,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:9,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:10,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:11,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:12,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:13,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:14,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:15,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:16,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:17,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:18,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:19,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:20,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:21,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:22,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:23,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:24,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    },
    {
      id:25,
      "레이더 ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "레이더 상태":"이상"
    }
  ];

  //initialize table
  const table = new Tabulator(target, {
		data: tabledata, //assign data to table
		layout: "fitColumns",
		reactiveData: true,
		columns: [
			{
        width: 41,
				formatter: "rowSelection",
				titleFormatter: "rowSelection",
				titleFormatterParams: {
					rowRange: "active", //only toggle the values of the active filtered rows
				},
				headerSort: false,
        hozAlign: "center",
        headerHozAlign: "center"
			},
			{ title: "ID",
        field: "id",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{ title: "레이더 이름",
        field: "레이더 ID",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{
        title: "주소",
        field: "레이더 이름",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{
				title: "레디어 상태",
				field: "레이더 상태",
        hozAlign: "center",
        headerHozAlign: "center",
				formatter: function (cell, formatterParams, onRendered) {
					const value = cell.getValue();
					if(value === '이상') return `<span class="state"><img src=img/ico-s-abnormal.svg></img><em>${value}</em></span>`;
					else return `<span class="state"><img src=img/ico-s-steady.svg></img><em>${value}</em></span>`;
				},
			},
		],
  });
  table.on("rowClick", function(e, row){
    if (!$(row._row.element).hasClass('on')) {
      $(row._row.element).addClass('on')
    } else {
      $(row._row.element).removeClass('on')
    }
  });
}

var createTableType3 = function(target) {
  //define data array
  var tabledata = [
    {
      id:1,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed",
      "구간명":"구간명",
      "레이더 상태":"정상",
      "운영상황": "자동_평시"
    },
    {
      id:2,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Text line 1",
      "구간명":"구간명\n구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:3,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"정상",
      "운영상황": "자동_평시"
    },
    {
      id:4,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:5,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed",
      "구간명":"구간명",
      "레이더 상태":"정상",
      "운영상황": "자동_평시"
    },
    {
      id:6,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:7,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:8,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:9,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:10,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:11,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:12,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:13,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:14,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:15,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:16,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:17,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:18,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:19,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:20,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:21,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:22,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:23,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:24,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    },
    {
      id:25,
      "VMS_ID":"VMS_001",
      "레이더 이름":"Limit_Speed_2",
      "구간명":"구간명",
      "레이더 상태":"통신 이상",
      "운영상황": "자동_평시"
    }
  ];

  //initialize table
  const table = new Tabulator(target, {
		data: tabledata, //assign data to table
		layout: "fitColumns",
		reactiveData: true,
		columns: [
			{
        width: 41,
				formatter: "rowSelection",
				titleFormatter: "rowSelection",
				titleFormatterParams: {
					rowRange: "active", //only toggle the values of the active filtered rows
				},
				headerSort: false,
        hozAlign: "center",
        headerHozAlign: "center"
			},
			{ title: "VMS_ID",
        field: "VMS_ID",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{ title: "VMS 이름",
        field: "레이더 이름",
        hozAlign: "center",
        headerHozAlign: "center"
      },
      { title: "구간명",
        field: "구간명",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{
        title: "VMS 상태",
        field: "레이더 상태",
        hozAlign: "center",
        headerHozAlign: "center",
        formatter: function (cell, formatterParams, onRendered) {
					const value = cell.getValue();
					if(value === '통신 이상') return `<span class="state"><img src=img/ico-s-abnormal.svg></img><em>${value}</em></span>`;
					else return `<span class="state"><img src=img/ico-s-steady.svg></img><em>${value}</em></span>`;
				},
      },
			{
				title: "운영상황",
				field: "운영상황",
        hozAlign: "center",
        headerHozAlign: "center",
				
			},
		],
  });
  table.on("rowClick", function(e, row){
    if (!$(row._row.element).hasClass('on')) {
      $(row._row.element).addClass('on')
    } else {
      $(row._row.element).removeClass('on')
    }
  });
}

var createTableType4 = function(target) {
  //define data array
  var tabledata = [
    {
      "VMS_ID":"VMS_001",
      "VMS 이름":"Limit_Speed",
    },
    {
      "VMS_ID":"VMS_001",
      "VMS 이름":"Limit_Speed",
    },
    {
      "VMS_ID":"VMS_001",
      "VMS 이름":"Limit_Speed_2",
    },
    {
      "VMS_ID":"VMS_001",
      "VMS 이름":"Limit_Speed_2",
    },
    {
      "VMS_ID":"VMS_001",
      "VMS 이름":"Limit_Speed_2",
    },
  ];

  //initialize table
  const table = new Tabulator(target, {
		data: tabledata, //assign data to table
		layout: "fitColumns",
		reactiveData: true,
		columns: [
			{
        width: 41,
				formatter: "rowSelection",
				titleFormatter: "rowSelection",
				titleFormatterParams: {
					rowRange: "active", //only toggle the values of the active filtered rows
				},
				headerSort: false,
        hozAlign: "center",
        headerHozAlign: "center"
			},
			{ title: "VMS_ID",
        field: "VMS_ID",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{ title: "VMS 이름",
        field: "VMS 이름",
        hozAlign: "center",
        headerHozAlign: "center"
      },
		],
  });
  table.on("rowClick", function(e, row){
    if (!$(row._row.element).hasClass('on')) {
      $(row._row.element).addClass('on')
    } else {
      $(row._row.element).removeClass('on')
    }
  });
}
var createTableType5 = function(target) {
  //define data array
  var tabledata = [
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed",
      "전환시간": "5초"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Text Text Text Text Text",
      "전환시간": "5초"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
    {
      "시나리오 ID":"VMS_001",
      "시나리오 이름":"Limit_Speed_2",
      "전환시간": "자동_평시"
    },
  ];

  //initialize table
  const table = new Tabulator(target, {
		data: tabledata, //assign data to table
		layout: "fitColumns",
		reactiveData: true,
		columns: [
			{ title: "시나리오 ID",
        field: "시나리오 ID",
        hozAlign: "center",
        headerHozAlign: "center"
      },
			{ title: "시나리오 이름",
        field: "시나리오 이름",
        hozAlign: "center",
        headerHozAlign: "center"
      },
      { title: "전환시간",
        field: "전환시간",
        hozAlign: "center",
        headerHozAlign: "center"
      }
		],
  });
  table.on("rowClick", function(e, row){
    if (!$(row._row.element).hasClass('on')) {
      $(row._row.element).addClass('on')
    } else {
      $(row._row.element).removeClass('on')
    }
  });
}

$(function(){
  AOS.init({ // https://github.com/michalsnik/aos#1-initialize-aos
    duration: 600,
    once: true,
  });

  if (isMac) {
    $('body').addClass('isMac');
  }

  commonPopup();
  commonSelect();
  commonTab();
  commonCounter();

  gnbMenu();
});
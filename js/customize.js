// -----  基本功能開關   ---------------------------------------------------
window.addEventListener('load', () => {
  // navSticky(); // 捲動時固定主選單、本站沒有search、先隱藏
  toggleSlider('.header .language button', '.header .language ul'); //語系
  fontSize(); // 全站字體
  fatFooter(); // fatFooter是否要展開
  scrollTables('.tableWrapper'); // table捲動功能

  // webSearch(); // 搜尋功能、本站沒有search、先隱藏

  // tabFunction({
  //   target: '.target1',
  //   modeSwitch: false, // 尺寸以上tab功能，尺寸以下手風琴功能
  //   openContent: false, // 預設先展開所有內容，僅開啟模式切換時才可使用
  //   openIndex: 0, // 預設開啟第幾個
  //   width: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
  //   autoClose: true, // 自動關閉其他開啟內容
  //   openSwitch: true, // 是否可開合/切換
  // });

  tabFunction({ target: '.target1', modeSwitch: true });

  tableAddDataAttributes({
    elemClass: '.tableList', // 目標table
    dataName: 'title', // tableList樣式 加上 data-title
  });

  // 手風琴功能

  accordionFunction({
    target: '.accordion',
    openContent: false, // 預設先展開所有內容，僅開啟模式切換時才可使用
    openDefault: true, // 是否有預設開啟
    openIndex: 0, // 預設開啟第幾個
    autoClose: true, // 自動關閉其他開啟內容
    openSwitch: true, // 是否可開合/切換
    info: {
      open: '展開', // 收合時顯示
      close: '收合', // 展開時顯示
    },
  });
});
// -----  基本功能開關   ---------------------------------------------------

// 自行加入的JS請寫在這裡
(function () {
  
  // 字級開關 .fontSize
  // 點擊 font-size-label 切換 .act 和 ul.show
  const fontSizeButton = document.querySelector('.font-size-label');
  if (fontSizeButton) {
    fontSizeButton.addEventListener('click', () => {
      const isActive = fontSizeButton.classList.contains('act');
      const fontSizeMenu = fontSizeButton.nextElementSibling; // ul
      if (!isActive) {
        fontSizeButton.classList.add('act');
        if (fontSizeMenu) fontSizeMenu.classList.add('show');
      } else {
        fontSizeButton.classList.remove('act');
        if (fontSizeMenu) fontSizeMenu.classList.remove('show');
      }
    });
  }
  // 使用者開關 .userName
  const userButton = document.querySelector('.header .userName .user-label');
  const userButton_mobile = document.querySelector('.mobileSidebar .userName .user-label');
  if (userButton) {
    userButton.addEventListener('click', () => {
      const isActive = userButton.classList.contains('act');
      const userMenu = userButton.nextElementSibling; // ul
      if (!isActive) {
        userButton.classList.add('act');
        if (userMenu) userMenu.classList.add('show');
      } else {
        userButton.classList.remove('act');
        if (userMenu) userMenu.classList.remove('show');
      }
    });
  }
  if (userButton_mobile) {
    userButton_mobile.addEventListener('click', () => {
      const isActive = userButton_mobile.classList.contains('act');
      const userMenu = userButton_mobile.nextElementSibling; // ul
      if (!isActive) {
        userButton_mobile.classList.add('act');
        if (userMenu) userMenu.classList.add('show');
      } else {
        userButton_mobile.classList.remove('act');
        if (userMenu) userMenu.classList.remove('show');
      }
    });
  }
  // 常用搜尋：院內、院外資源開展
  // searchPanel 展開切換
  document.querySelectorAll('.searchPanel fieldset .btn._switch').forEach(btn => {
    btn.addEventListener('click', () => {
      const fieldset = btn.closest('fieldset');
      if (!fieldset) return;

      const thirdBoxes = fieldset.querySelectorAll('.box_3rd');
      const isActive = btn.classList.contains('act');

      if (!isActive) {
        btn.classList.add('act');
        btn.textContent = '隱藏細項';
        thirdBoxes.forEach(box => box.classList.add('show'));
      } else {
        btn.classList.remove('act');
        btn.textContent = '展開細項';
        thirdBoxes.forEach(box => box.classList.remove('show'));
      }
    });
  });
  
  // sp 查詢動作
  // 查詢送出：顯示 popup
  const body = document.querySelector('body');
  const btnSubmit = document.querySelector('.searchPanel .btnSubmit');
  const popup = document.querySelector('.popup');
  const btnSwitch = document.querySelector('.popup .btn._switch');
  if (btnSubmit && popup) {
    btnSubmit.addEventListener('click', () => {
      popup.classList.remove('_default');
      popup.classList.add('_show');
      btnSwitch.classList.add('act');
      body.classList.add('noscroll');
    });
  }

  // 清除查詢：關閉 popup 回復預設
  const btnReset = document.querySelector('.searchPanel .btnReset');
  // const btnSwitch = document.querySelector('.popup .btn._switch');
  if (btnReset && popup) {
    btnReset.addEventListener('click', () => {
      popup.classList.remove('_show');
      popup.classList.add('_default');
      btnSwitch.classList.add('act');
      btnSwitch.textContent = '收合查詢結果';
    });
  }

  // popup 切換：展示/收合查詢結果
  document.querySelectorAll('.popup .btn._switch').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!popup) return;

      const isShown = popup.classList.contains('_show');
      if (isShown) {
        popup.classList.remove('_show');
        btn.classList.remove('act');
        btn.textContent = '展示查詢結果';
        body.classList.remove('noscroll');
      } else {
        popup.classList.add('_show');
        btn.classList.add('act');
        btn.textContent = '收合查詢結果';
        body.classList.add('noscroll');
      }
    });
  });

  // 條件查詢 .btn_filter、.filterBox
  const filterButton = document.querySelector('.btn_filter');
  if (filterButton) {
    filterButton.addEventListener('click', () => {
      const isActive = filterButton.classList.contains('act');
      const filterBox = filterButton.nextElementSibling; // .filtetBox
      if (!isActive) {
        filterButton.classList.add('act');
        if (filterBox) filterBox.classList.add('show');
      } else {
        filterButton.classList.remove('act');
        if (filterBox) filterBox.classList.remove('show');
      }
    });
  }

  //首頁連結輪播
  const linkSwiper = new Swiper('.linkSlider .swiper', {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: false,
    // 切換點
    pagination: {
      el: '.linkSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.linkSlider .nextSlider', //自行設定樣式
      prevEl: '.linkSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  });

  //cp輪播
  const cpSwiper = new Swiper('.cpSlider .swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,
    // 切換點
    pagination: {
      el: '.cpSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.cpSlider .nextSlider', //自行設定樣式
      prevEl: '.cpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 4,
      },
    },
  });

  //大圖輪播
  let mpSliderItem = document.querySelectorAll('.mpSlider .swiper-slide');
  let mpSliderPagination = [];
  mpSliderItem.forEach((item, index) => {
    mpSliderPagination.push(item.dataset.title);
  });
  const mpSlider = new Swiper('.mpSlider .swiper', {
    slidesPerView: 1,
    // 切換點
    pagination: {
      el: '.mpSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button class="${className} noFonts" aria-label="${mpSliderPagination[index]}">${mpSliderPagination[index]}</button>`;
      },
    },
    autoplay: {
      delay: 5000,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.mpSlider .nextSlider', //自行設定樣式
      prevEl: '.mpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    on: {
      init: function (swiper) {
        const controlBox = document.querySelector('.mpSlider .swiperControlBox');

        controlBox?.addEventListener('click', (e) => {
          if (e.target.classList.contains('stop')) {
            swiper.autoplay.stop();
            e.target.classList.add('active');
            e.target.nextElementSibling.classList.remove('active');
          } else if (e.target.classList.contains('play')) {
            swiper.autoplay.start();
            e.target.classList.add('active');
            e.target.previousElementSibling.classList.remove('active');
          }
        });

        swiper.slides.length === 1 ? controlBox.remove() : null;
      },
    },
  });

  //廣告輪播
  const adSwiper = new Swiper('.adSlider .swiper', {
    slidesPerView: 5,
    spaceBetween: 30,
    loop: false,
    // 切換點
    pagination: {
      el: '.adSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.adSlider .nextSlider', //自行設定樣式
      prevEl: '.adSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  });

  //跑馬燈
  const marqueeSwiper = new Swiper('.marquee .swiper', {
    direction: 'vertical',
    // 切換點
    // 切換箭頭
    navigation: {
      nextEl: '.marquee .nextSlider', //自行設定樣式
      prevEl: '.marquee .prevSlider', //自行設定樣式
      disabledClass: '.marquee marquee-arrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  });

  //cp_photo
  const sliderFor = new Swiper('.sliderFor .swiper', {
    slidesPerView: 1, //顯示張數
    effect: 'fade', //淡入
    fadeEffect: {
      crossFade: true, //上一張淡出，false上一張不淡出，下一張疊在上方
    },
    pagination: {
      el: '.sliderFor .pagination',
      type: 'fraction', //顯示分頁
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    lazy: true,
    thumbs: {
      swiper: {
        el: '.navSlider .swiper', //設定指向到哪個swiper，使用另一個設定的參數
        lazy: true, // lazy load
        spaceBetween: 20,
        preloadImages: false, // 多筆設定lazy時須設定
        centeredSlides: false, // 多筆設定lazy時須設定
        slidesPerView: 4,
        watchSlidesVisibility: true, //防止不可点击
        navigation: {
          nextEl: '.navSlider .nextSlider', //下一張class，無障礙設定關係需要增加.nextSlider
          prevEl: '.navSlider .prevSlider', //前一張class，無障礙設定關係需要增加.prevSlider
          disabledClass: 'swiperArrow-disabled', //不可點選樣式
        },
        breakpoints: {
          100: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 4,
          },
        },
      },
      autoScrollOffset: 1,
    },
  });
})();

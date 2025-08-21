// script.js

;(function ($) {
  'use strict'

  //
  // Utility Helpers
  //

  // Debounce function to limit how often a handler runs
  const debounce = (fn, wait = 100) => {
    let timeout
    return function (...args) {
      clearTimeout(timeout)
      timeout = setTimeout(() => fn.apply(this, args), wait)
    }
  }

  // Hide all Karat tooltips
  const closeAllTooltips = () => {
    $('.enroll-now')
      .find('.karat-tooltip, .karat-tooltip-arrow')
      .hide()
  }

  // Hide all overlays and popups
  const closeAllModals = () => {
    $('.overlay, .overlay-guest, .overlay-address, .overlay-payment')
      .fadeOut(200)

    $('.removepopup, .removepopup-guest, .removepopup-address, .removepopup-payment')
      .fadeOut(200)

    $('.signin-modal, .register-modal, .resetpassword-modal')
      .fadeOut(200)
  }

  //
  // Karat Rewards Tooltip
  //

  function initKaratTooltip() {
    $(document).on('click.tooltip', '.karat-tooltip-trigger', function (e) {
      e.stopPropagation()
      const $enroll = $(this).closest('.enroll-now')
      closeAllTooltips()

      const $tooltip = $enroll.find('.karat-tooltip')
      const $arrow = $enroll.find('.karat-tooltip-arrow')

      $tooltip.toggle()
      $tooltip.is(':visible') ? $arrow.show() : $arrow.hide()
    })

    $(document).on('click.tooltip', '.karat-tooltip-close', function (e) {
      e.stopPropagation()
      $(this)
        .closest('.enroll-now')
        .find('.karat-tooltip, .karat-tooltip-arrow')
        .hide()
    })

    // Click outside to close
    $(document).on('click.tooltip', function (e) {
      if (!$(e.target).closest('.karat-tooltip, .karat-tooltip-trigger').length) {
        closeAllTooltips()
      }
    })
  }

  //
  // Generic Accordion
  //
  function initAccordion({
    container,
    headerSelector,
    contentSelector,
    openClass = 'open',
    speed = 300,
  }) {
    const $container = $(container)
    $container.find(contentSelector).slideUp(speed)

    $container.on('click.accordion', headerSelector, function (e) {
      e.stopPropagation()
      const $header = $(this)
      const $item = $header.parent()
      const $openItems = $container.find(`.${openClass}`).not($item)

      $openItems.removeClass(openClass).children(contentSelector).slideUp(speed)
      $item.toggleClass(openClass).children(contentSelector).slideToggle(speed)
    })
  }

  //
  // Slick Slider Initializers
  //

  function initSlick($slider, opts) {
    if (!$slider.length) return
    $slider.slick(opts)
  }

  function initMobileSlider(selector, maxWidth, opts) {
    const $slider = $(selector)
    const check = () => {
      if ($(window).width() < maxWidth) {
        if (!$slider.hasClass('slick-initialized')) {
          $slider.slick(opts)
        }
      } else if ($slider.hasClass('slick-initialized')) {
        $slider.slick('unslick')
      }
    }
    check()
    $(window).on('resize.slick', debounce(check, 200))
  }

  //
  // Document Ready: Initialize Everything
  //

  $(function () {
    // Karat tooltip
    initKaratTooltip()

    // Accordions
    initAccordion({
      container: '.accordion-wrapper',
      headerSelector: '.accordion-header',
      contentSelector: '.accordion-content',
    })
    initAccordion({
      container: '.product-list',
      headerSelector: '.productlist-header h5',
      contentSelector: '.product-list-items',
    })
    initAccordion({
      container: '.faq-wrapper',
      headerSelector: '.faq-question',
      contentSelector: '.faq-answer',
      openClass: 'active',
      speed: 200,
    })

    // Main theme slider per wrapper
    $('.theme-slider').each(function () {
      const $slider = $(this)
      const $controls = $slider.closest('.product-wrapper').find('.slider-controls')

      initSlick($slider, {
        slidesToShow: 4.2,
        slidesToScroll: 4,
        arrows: true,
        dots: false,
        infinite: false,
        centerMode: false,
        appendArrows: $controls,
        prevArrow:
          "<button type='button' class='slick-prev'><img src='images/svg/arrow-right.svg' alt='slider arrow'></button>",
        nextArrow:
          "<button type='button' class='slick-next'><img src='images/svg/arrow-right.svg' alt='slider arrow'></button>",
        responsive: [
          { breakpoint: 1280, settings: { slidesToShow: 3.2 } },
          { breakpoint: 1024, settings: { slidesToShow: 2.2 } },
          {
            breakpoint: 768,
            settings: { arrows: false, dots: false, slidesToShow: 1.2 },
          },
          {
            breakpoint: 640,
            settings: { arrows: false, dots: false, slidesToShow: 2.2 },
          },
        ],
      })
    })

    // Mobile Sliders
    initMobileSlider('.mobile-slider', 1024, {
      slidesToShow: 3.2,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: false,
      centerMode: false,
      autoplay: true,
      autoplaySpeed: 8000,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3.2 } },
        { breakpoint: 640, settings: { slidesToShow: 2.5 } },
      ],
    })
    initMobileSlider('.mobile-slider2', 1200, {
      slidesToShow: 2.2,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      infinite: false,
      centerMode: false,
      autoplay: true,
      autoplaySpeed: 8000,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 640, settings: { slidesToShow: 1.2 } },
      ],
    })

    // Nav toggle for mobile
    $('.nav-icon').on('click.nav', function () {
      $(this).toggleClass('active')
      $('.header .header-bottom').toggleClass('show')
    })

    // Prevent dropdown closing when clicking inside
    $('.dropdown-list, .search-dropdown').on('click.dropdown', function (e) {
      e.stopPropagation()
    })

    // Profile dropdown
    $('.profile-icon').on('click.dropdown', () => $('.dropdown-menu').toggle())
    $('.accountmodal-close').on('click.dropdown', () => $('.dropdown-menu').hide())
    $(document).on('click.dropdown', (e) => {
      if (!$(e.target).closest('.dropdown').length) {
        $('.dropdown-menu').hide()
      }
    })

    // Search dropdown
    $('#searchInput, #searchInput2')
      .on('click.dropdown touchstart.dropdown', (e) => {
        e.stopPropagation()
        $('.search-dropdown').fadeIn(200)
      })
    $('.search-close').on('click.dropdown', (e) => {
      e.stopPropagation()
      $('.search-dropdown').fadeOut(200)
    })
    $(document).on('click.dropdown touchstart.dropdown', (e) => {
      if (!$(e.target).closest('.search-bar').length) {
        $('.search-dropdown').fadeOut(200)
      }
    })

    // Modals (signin/register/remove)
    $('.signin').on('click.modal', () => $('.overlay, .signin-modal').fadeIn(200))
    $('.register').on('click.modal', () => $('.overlay, .register-modal').fadeIn(200))
    $('.openPopup, .add-guest-order, .address-delete, .payment-delete, .quote-editig-done').on(
      'click.modal',
      () => $('.overlay, .removepopup, .overlay-guest, .removepopup-guest, .overlay-address, .removepopup-address, .overlay-payment, .removepopup-payment').fadeIn(200)
    )
    $('.overlay, .form-close').on('click.modal', closeAllModals)

    // Forgot password
    $('.forgot-password').on('click.modal', () => {
      $('.overlay, .signin-modal').fadeOut(200)
      $('.overlay, .resetpassword-modal').fadeIn(200)
    })

    // Filter sidebar mobile
    $('.filter-sort-mobile').on('click.ui', () => $('.product-sidebar').slideToggle(200))
    $('.sidebar-close-icon').on('click.ui', () => $('.product-sidebar').fadeOut(200))

    // Sort dropdown desktop
    $('.productlist-sort-dropdown').on('click.ui', function () {
      $(this).toggleClass('active')
    })

    // Product info tabs
    $('.tab').on('click.ui', function () {
      const tabId = $(this).data('tab')
      $('.tab, .product-tab-content').removeClass('active')
      $(this).addClass('active')
      $(`#${tabId}`).addClass('active')
    })

    // Append ellipsis to product-item headings
    $('.product-item h3').each(function () {
      const $h = $(this)
      if (!$.trim($h.text()).endsWith('...')) {
        $h.text($.trim($h.text()) + ' ...')
      }
    })

    // Quick view modal
    const $productModal = $('#productModal')
    $('.quick-view').on('click.ui', function () {
      const $item = $(this).closest('.product-item')
      $('#modalImg').attr('src', $item.find('.main-product').attr('src'))
      $('#modalTitle').text($item.find('h3').text())
      $('#modalPrice').text($item.find('.price').text())
      $productModal.fadeIn(200)
    })
    $('.close').on('click.ui', () => $productModal.fadeOut(200))
    $(window).on('click.ui', (e) => {
      if (e.target === $productModal[0]) $productModal.fadeOut(200)
    })

    // My Account Tabs
    window.myAccountsTabs = (evt, accountInfoId) => {
      $('.tabcontent').removeClass('activetab')
      $('.tablinks').removeClass('active')
      $(`#${accountInfoId}`).addClass('activetab')
      $(evt.currentTarget).addClass('active')
    }

    // Orders filter
    window.filterOrders = (evt, status) => {
      evt.preventDefault()
      $('.order-product-box').each(function () {
        const show = status === 'All' || $(this).data('status') === status
        $(this).css('display', show ? 'block' : 'none')
      })
      $('.tablinks.inherit').removeClass('active')
      $(evt.currentTarget).addClass('active')
    }

    // Mobile order detail accordion
    ;(() => {
      const $head = $('.order-head-tag')
      const $content = $('.order-deatil-contant')
      if ($head.length && $content.length) {
        $content.addClass('active')
        $head.on('click.ui', function () {
          $content.toggleClass('active')
          $(this)
            .find('img')
            .toggleClass('rotate')
        })
      }
    })()

    // Loan accordion
    $('.loan-accordion-head').on('click.ui', function () {
      const $box = $(this).closest('.loan-accordion-box')
      $('.loan-accordion-box').not($box).removeClass('active')
      $box.toggleClass('active')
    })

    // Toggle password visibility (fontawesome icons)
    $('.toggle-password').on('click.ui', function () {
      const $icon = $(this)
      const $input = $($icon.attr('toggle'))
      const isPwd = $input.attr('type') === 'password'
      $input.attr('type', isPwd ? 'text' : 'password')
      $icon.toggleClass('fa-eye fa-eye-slash')
    })

    // Quotes detail product slider
    initSlick($('.js-items-slider-container .slider-for'), {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.js-items-slider-container .slider-nav',
    })
    initSlick($('.js-items-slider-container .slider-nav'), {
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.js-items-slider-container .slider-for',
      dots: false,
      centerMode: false,
      focusOnSelect: true,
      arrows: false,
    })

    // FAQ accordion (vanilla for consistency)
    document.querySelectorAll('.faq-question').forEach((q) => {
      q.addEventListener('click', function () {
        const ans = this.nextElementSibling
        document.querySelectorAll('.faq-answer').forEach((a) => {
          if (a !== ans) a.style.display = 'none'
        })
        document.querySelectorAll('.faq-question').forEach((qq) => {
          if (qq !== this) qq.classList.remove('active')
        })
        const open = ans.style.display === 'block'
        ans.style.display = open ? 'none' : 'block'
        this.classList.toggle('active', !open)
      })
    })

    // File drop thumbnail update
    document.querySelectorAll('.drop-zone__input').forEach((inputEl) => {
      const dz = inputEl.closest('.drop-zone')
      dz.addEventListener('click', () => inputEl.click())
      inputEl.addEventListener('change', () => {
        if (inputEl.files.length) updateThumbnail(dz, inputEl.files[0])
      })
      dz.addEventListener('dragover', (e) => {
        e.preventDefault()
        dz.classList.add('drop-zone--over')
      })
      ;['dragleave', 'dragend'].forEach((ev) => {
        dz.addEventListener(ev, () => dz.classList.remove('drop-zone--over'))
      })
      dz.addEventListener('drop', (e) => {
        e.preventDefault()
        if (e.dataTransfer.files.length) {
          inputEl.files = e.dataTransfer.files
          updateThumbnail(dz, e.dataTransfer.files[0])
        }
        dz.classList.remove('drop-zone--over')
      })
    })

    function updateThumbnail(dropZone, file) {
      let thumb = dropZone.querySelector('.drop-zone__thumb')
      if (dropZone.querySelector('.drop-zone__prompt')) {
        dropZone.querySelector('.drop-zone__prompt').remove()
      }
      if (!thumb) {
        thumb = document.createElement('div')
        thumb.classList.add('drop-zone__thumb')
        dropZone.appendChild(thumb)
      }
      thumb.dataset.label = file.name
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => (thumb.style.backgroundImage = `url('${reader.result}')`)
      } else {
        thumb.style.backgroundImage = null
      }
    }

    // Guest/address/payment/remove popups handled by common closeAllModals()

    // Signup form validation
    $('#create-account').on('click.validation', function () {
      let valid = true
      const email = $('#register-email')
      const pwd = $('#register-password')
      const fName = $('#fName')
      const lName = $('#lName')
      const emailPat = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/

      if (!emailPat.test(email.val())) {
        email.addClass('error')
        $('#email-error').show()
        valid = false
      } else {
        email.removeClass('error')
        $('#email-error').hide()
      }

      ;[pwd, fName, lName].forEach(($field) => {
        if ($field.val().length < 4) {
          $field.addClass('error')
          $('#password-error').show()
          valid = false
        } else {
          $field.removeClass('error')
        }
      })

      if (valid) alert('Account created successfully!')
    })
    $('#register-email, #register-password, #fName, #lName').on('input', function () {
      $(this).removeClass('error')
      $('.error-message').hide()
    })

    // Heart favorite toggle
    $('.heart').on('click.ui', function () {
      $(this).toggleClass('favorited')
    })

    // Sticky sidebars on scroll (debounced)
    const handleSticky = () => {
      const scrolled = window.scrollY > 0
      $('.product-detail-right, .cart-right').toggleClass('sticky', scrolled)
    }
    window.addEventListener('scroll', debounce(handleSticky, 50))

    // Checkout accordion mobile
    ;(() => {
      const $acc = $('.checkout-accordion-mbl')
      const $cart = $('.cart-container')
      const toggle = () => {
        if (window.innerWidth <= 680) {
          $cart.toggleClass('open')
          $acc.toggleClass('active')
          $cart.css(
            'maxHeight',
            $cart.hasClass('open') ? $cart[0].scrollHeight + 'px' : 0
          )
        }
      }
      $acc.on('click.ui', toggle)
      $(window).on(
        'resize.ui',
        debounce(() => {
          if (window.innerWidth > 680) {
            $cart.removeClass('open').css('maxHeight', '')
            $acc.removeClass('active')
          }
        }, 200)
      )
    })()

    // Store Locator buttons
    $('.store-locator-button').on('click.ui', function () {
      const target = $(this).data('target')
      $('.store-locator-button').removeClass('active')
      $(this).addClass('active')

      if (target === 'all') {
        $('#minnesota, #wisconsin').addClass('active')
      } else {
        $('#minnesota, #wisconsin').removeClass('active')
        $(`#${target}`).addClass('active')
      }
    })

    // Product detail mobile toggle
    $('.toggle-header').on('click.ui', function () {
      if (window.innerWidth <= 1024) {
        $(this).closest('.product-info-box').toggleClass('active')
      }
    })

    // Quote detail mobile toggle
    $('.quote-header').on('click.ui', function () {
      if (window.innerWidth <= 767) {
        $(this).closest('.quote-detail-right').toggleClass('active')
      }
    })

    // Order tracking mobile accordion
    $('.tracking-head').on('click.ui', function () {
      $(this)
        .siblings('.tracking-mobile-content')
        .toggleClass('active')
        .end()
        .find('img')
        .toggleClass('rotate')
    })

    // Shipping info mobile accordion
    $('.shipping-info-row .tracking-head').on('click.ui', function () {
      $(this)
        .siblings('.shipping-order-content')
        .toggleClass('active')
        .end()
        .find('img')
        .toggleClass('rotate')
    })

    // Order tracking progress dots
    ;(() => {
      const $line = $('.order-tracking-line.line-completed')
      if (!$line.length) return
      const completed = $line.find('.order-track-dot.completed').length
      const map = { 0: '0%', 1: '0%', 2: '33.5%', 3: '66.5%', 4: '100%' }
      $line.css('--progress-width', map[completed] || '0%')
      $line.css('--Primary-Blue', '#067cb7')
    })()

    // PD banner close
    $('.pd-banner svg').on('click.ui', () => $('.pd-banner').slideUp(200))

    // Quantity button dropdown
    ;(() => {
      const $btn = $('#qtyBtn')
      const $opts = $('#qtyOptions')
      if (!$btn.length || !$opts.length) return

      $btn.on('click.ui', (e) => {
        e.stopPropagation()
        $opts.toggleClass('hidden')
      })
      $opts.on('click.ui', 'li', function () {
        $btn.find('strong').text($(this).data('value'))
        $opts.addClass('hidden')
      })
      $(document).on('click.ui', () => $opts.addClass('hidden'))
    })()

    // Signin password toggle
    $('.password-toggle').on('click.ui', function () {
      const $input = $(this).closest('.relative').find('.password-input')
      const isPwd = $input.attr('type') === 'password'
      $input.attr('type', isPwd ? 'text' : 'password')
      $(this).toggleClass('fa-eye fa-eye-slash')
    })

    // Mobile categories dropdown
    ;(() => {
      const $wrapper = $('.mb-categories-wrapper')
      const $dropdown = $('.mb-categories-dropdown-content')
      const $footer = $('.footer-fix-bar')
      if (! $wrapper.length || ! $dropdown.length) return

      const toggleBtn = $wrapper.find('.mb-categories-toggle')
      const closeBtn = $dropdown.find('.mb-categories-close')

      toggleBtn.on('click.ui', (e) => {
        e.preventDefault()
        const isActive = $dropdown.toggleClass('active').hasClass('active')
        $footer.toggleClass('dropdown-open', isActive)
      })
      closeBtn.on('click.ui', () => {
        $dropdown.removeClass('active')
        $footer.removeClass('dropdown-open')
      })

      // inner accordion
      $dropdown.on('click.ui', '.mb-categories-header', function () {
        const $hdr = $(this)
        const $cnt = $hdr.find('.mb-categories-content')
        $dropdown
          .find('.mb-categories-content')
          .not($cnt)
          .removeClass('open')
        $dropdown.find('.mb-categories-header').not($hdr).removeClass('active')
        $cnt.toggleClass('open')
        $hdr.toggleClass('active')
      })

      // close on outside or ESC
      $(document).on('click.ui keydown.ui', (e) => {
        if (
          (e.type === 'click' &&
            !$wrapper.is(e.target) &&
            !$wrapper.has(e.target).length &&
            !$dropdown.is(e.target) &&
            !$dropdown.has(e.target).length) ||
          (e.type === 'keydown' && e.key === 'Escape')
        ) {
          $dropdown.removeClass('active')
          $footer.removeClass('dropdown-open')
        }
      })
    })()

    // Mobile search placeholder
    if (window.innerWidth <= 480) {
      $('.search-bar.mobile-view input[type="search"]').attr(
        'placeholder',
        'Search or sell...'
      )
    }
  })
})(jQuery)

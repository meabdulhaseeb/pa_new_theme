// nav dropdown function
$(function () {
  $(".accordion-content").slideUp(300);
  $(".accordion-header").click(function () {
    $(".open")
      .not(this)
      .removeClass("open")
      .children(".accordion-content")
      .slideUp(300);
    $(this).toggleClass("open").children(".accordion-content").slideToggle(300);
  });
});

// Product list dropdown
$(function () {
  $(".product-list-items").slideUp(300);
  $(".productlist-header h5").click(function () { // Click event only on h5
    $(".open")
      .not($(this).parent()) // Ensure only the clicked one toggles
      .removeClass("open")
      .children(".product-list-items")
      .slideUp(300);
    $(this).parent().toggleClass("open").children(".product-list-items").slideToggle(300);
  });
});


// theme slider
$(".theme-slider").slick({
  slidesToShow: 4.2, // Show 4 full slides, half of the 5th
  slidesToScroll: 1,
  arrows: true,
  dots: false,
  infinite: false,
  centerMode: false, // Important to avoid centering issues
  prevArrow:
    "<button type='button' class='slick-prev'><img src='images/svg/arrow-right.svg' alt=' slider arrow'></button>",
  nextArrow:
    "<button type='button' class='slick-next'><img src='images/svg/arrow-right.svg' alt=' slider arrow'></button>",
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3.2, // Show 3 full slides, half of the 4th
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2.2, // Show 2 full slides, half of the 3rd
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: false,
        slidesToShow: 1.2, // Show 2 full slides, half of the 3rd
      }
    },
    {
      breakpoint: 640,
      settings: {
        arrows: false,
        dots: false,
        slidesToShow: 2.2, // Show 1 full slide, half of the 2nd
      }
    }
  ]
});

// Mobile Slider starts here
function initSlick1() {
  if ($(window).width() < 1024) {
    if (!$(".mobile-slider").hasClass("slick-initialized")) {
      $(".mobile-slider").slick({
        slidesToShow: 3.2, // Default for <1024px
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: false,
        centerMode: false,
        autoplay: true,
        autoplaySpeed: 8000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3.2, // Show 2 full slides, half of the 3rd
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2.5, // Show 1 full slide, half of the 2nd
            }
          }
        ]
      });
    }
  } else {
    if ($(".mobile-slider").hasClass("slick-initialized")) {
      $(".mobile-slider").slick("unslick");
    }
  }
}
// ends here

// Mobile Slider 2 starts here
function initSlick() {
  if ($(window).width() < 1024) {
    if (!$(".mobile-slider2").hasClass("slick-initialized")) {
      $(".mobile-slider2").slick({
        slidesToShow: 2.2, // Default for <1024px
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: false,
        centerMode: false,
        autoplay: true,
        autoplaySpeed: 8000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2, // Show 2 full slides, half of the 3rd
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1, // Show 1 full slide, half of the 2nd
            }
          }
        ]
      });
    }
  } else {
    if ($(".mobile-slider").hasClass("slick-initialized")) {
      $(".mobile-slider").slick("unslick");
    }
  }
}
// ends here

$(document).ready(function () {
  initSlick();
  initSlick1(); // Run on page load
  $(window).on("resize", function () {
    initSlick1();
    initSlick(); // Re-check on window resize
  });

  // Nav Toggle Function
  $(".nav-icon").click(function () {
    $(this).toggleClass("active"); // Toggle cross effect on icon
    $(".header .header-bottom").toggleClass("show"); // Toggle show class
  });

  // Nav Submenu onclick toggle Mobile view
  $(".dropdown-item").click(function (e) {
    e.stopPropagation(); // Prevent event bubbling
    let dropdownList = $(this).find(".dropdown-list");
  });


  // Prevent dropdown from closing when clicking inside
  $(".dropdown-list").click(function (e) {
    e.stopPropagation();
  });



  // Auth state HEADER 
  $(".profile-icon").click(function () {
    $(".dropdown-menu").toggle();
  });
  $(".accountmodal-close").click(function () {
    $(".dropdown-menu").hide();
  });
  // Close dropdown if clicked outside
  $(document).click(function (e) {
    if (!$(e.target).closest(".dropdown").length) {
      $(".dropdown-menu").hide();
    }
  });

  $("#searchInput, #searchInput2").on("click touchstart", function (e) {
    e.stopPropagation(); // Prevents event from bubbling to document
    $(".search-dropdown").fadeIn();
  });

  // Close dropdown when clicking the close button
  $(".search-close").on("click", function (e) {
    e.stopPropagation();
    $(".search-dropdown").fadeOut();
  });

  // Close dropdown when clicking outside
  $(document).on("click touchstart", function (e) {
    if (!$(e.target).closest(".search-bar").length) {
      $(".search-dropdown").fadeOut();
    }
  });

  // signin modal starts here
  // Show modal
  $(".signin").click(function () {
    $(".overlay, .signin-modal").fadeIn();
  });
  // Hide modal when clicking outside or close button
  $(".overlay, .form-close").click(function () {
    $(".overlay, .signin-modal").fadeOut();
  });

  // register modal starts here
  $(".register").click(function () {
    $(".overlay, .register-modal").fadeIn();
  });

  // Hide modal when clicking outside or close button
  $(".overlay, .form-close").click(function () {
    $(".overlay, .register-modal").fadeOut();
  });

  // Remove modal starts here
  $(".openPopup").click(function () {
    $(".overlay, .removepopup").fadeIn();
  });
  // Hide modal when clicking outside or close button
  $(".overlay, .form-close").click(function () {
    $(".overlay, .removepopup").fadeOut();
  });

  // Sign In Form validation
  $("#submit").click(function () {
    let email = $("#email").val();
    let password = $("#password").val();
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let valid = true;
    if (!email.match(emailPattern)) {
      $("#email").addClass("error");
      $("#email-error").show();
      valid = false;
    } else {
      $("#email").removeClass("error");
      $("#email-error").hide();
    }
    if (password.length < 6) {
      $("#password").addClass("error");
      $("#password-error").show();
      valid = false;
    } else {
      $("#password").removeClass("error");
      $("#password-error").hide();
    }
    if (valid) {
      alert("Signed in successfully!");
    }
  });
  // Remove error state on input
  $("#email, #password").on("input", function () {
    $(this).removeClass("error");
    $(".error-message").hide();
  });

  // show Reset Password Modal
  $(".forgot-password").click(function () {
    $(".overlay, .signin-modal").fadeOut();
    $(".overlay, .resetpassword-modal").fadeIn();
  });

  // Hide Reset Password Modal when clicking outside or close button
  $(".overlay, .form-close").click(function () {
    $(".overlay, .resetpassword-modal").fadeOut();
  });

  // sort dropdown desktop view
  $(".productlist-sort-dropdown").click(function () {
    $(".productlist-sort-dropdown").toggleClass("active");
  });

  // filter sort btn function
  $(".filter-sort-mobile").click(function () {
    $(".product-sidebar").slideToggle();
  });

  $(".sidebar-close-icon").click(function () {
    $(".product-sidebar").fadeOut();
  })

  // Product INfo Tabs
  $(".tab").click(function () {
    var tab_id = $(this).data("tab");
    $(".tab").removeClass("active");
    $(".product-tab-content").removeClass("active");
    $(this).addClass("active");
    $("#" + tab_id).addClass("active");
  });

  // adding ... after detail on Homepage
  document.querySelectorAll(".product-item h3").forEach(heading => {
    if (!heading.innerHTML.trim().endsWith("...")) {
      heading.innerHTML += " ...";
    }
  });


});

// quick view MODAL POPUP starts here
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const closeBtn = document.querySelector(".close");
  document.querySelectorAll(".quick-view").forEach((btn) => {
    btn.addEventListener("click", function () {
      const productItem = this.closest(".product-item");
      const imgSrc = productItem.querySelector(".main-product").src;
      const title = productItem.querySelector("h3").textContent;
      const price = productItem.querySelector(".price").textContent;
      modalImg.src = imgSrc;
      modalTitle.textContent = title;
      modalPrice.textContent = price;
      modal.style.display = "flex";
    });
  });
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });
  window.addEventListener("click", function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
});

// My Acoount Tabs Js
function myAccountsTabs(evt, accountInfoId) {
  var tabcontent = document.querySelectorAll(".tabcontent");
  tabcontent.forEach(function (content) {
    content.classList.remove("activetab");
  });
  var tablinks = document.querySelectorAll(".tablinks");
  tablinks.forEach(function (link) {
    link.classList.remove("active");
  });
  var activeTab = document.getElementById(accountInfoId);
  if (activeTab) {
    activeTab.classList.add("activetab");
  } else {
    console.warn("Tab content with ID '" + accountInfoId + "' not found on this page.");
  }
  if (evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  }
}

// Orders Filter
function filterOrders(evt, status) {
  evt.preventDefault();
  var orders = document.querySelectorAll('.order-product-box');

  orders.forEach(function (order) {
    if (status === "All") {
      order.style.display = 'block';
    } else {
      if (order.getAttribute('data-status') === status) {
        order.style.display = 'block';
      } else {
        order.style.display = 'none';
      }
    }
  });
  var tablinks = document.querySelectorAll('.tablinks.inherit');
  tablinks.forEach(function (link) {
    link.classList.remove('active');
  });
  evt.currentTarget.classList.add('active');
}
// Orders Filter End


//order-deatil-mobile tab 
document.addEventListener('DOMContentLoaded', function () {
  const orderHeadTag = document.querySelector('.order-head-tag');
  const orderDetailContent = document.querySelector('.order-deatil-contant');
  if (orderHeadTag && orderDetailContent) {
    const arrowIcon = orderHeadTag.querySelector('img');
    orderDetailContent.classList.add('active');
    orderHeadTag.addEventListener('click', function () {
      orderDetailContent.classList.toggle('active');
      if (arrowIcon) {
        arrowIcon.classList.toggle('rotate');
      }
    });
  }
});

//order-deatil-mobile tab end


//Loan Accrodion 
document.addEventListener("DOMContentLoaded", function () {
  const accordionHeads = document.querySelectorAll(".loan-accordion-head");

  accordionHeads.forEach((head) => {
    head.addEventListener("click", function () {
      const parentBox = head.closest(".loan-accordion-box");

      // Close all accordions
      document.querySelectorAll(".loan-accordion-box").forEach((box) => {
        if (box !== parentBox) {
          box.classList.remove("active");
        }
      });

      // Toggle the clicked one
      parentBox.classList.toggle("active");
    });
  });
});

// Hide And Show Password
$(".toggle-password").click(function () {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});


//Quotes Deatil Product Slider
$('.js-items-slider-container .slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.js-items-slider-container .slider-nav'
});
$('.js-items-slider-container .slider-nav').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.js-items-slider-container .slider-for',
  dots: false,
  centerMode: false,
  focusOnSelect: true,
  arrows: false,
  accessibility: true,
  onAfterChange: function (slide, index) {
    console.log("slider-nav change");
    console.log(this.$slides.get(index));
    $('.current-slide').removeClass('current-slide');
    $(this.$slides.get(index)).addClass('current-slide');
  },
  onInit: function (slick) {
    $(slick.$slides.get(0)).addClass('current-slide');
  }
});

// faq accordion
document.addEventListener("DOMContentLoaded", function () {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      // Close all faq-answer elements and remove 'active' class from all faq-questions
      document.querySelectorAll(".faq-answer").forEach((answer) => {
        if (answer !== this.nextElementSibling) {
          answer.style.display = "none";
        }
      });

      document.querySelectorAll(".faq-question").forEach((q) => {
        if (q !== this) {
          q.classList.remove("active");
        }
      });

      // Toggle the clicked faq-answer
      const answer = this.nextElementSibling;
      const isOpen = answer.style.display === "block";

      if (isOpen) {
        answer.style.display = "none";
        this.classList.remove("active");
      } else {
        answer.style.display = "block";
        this.classList.add("active");
      }
    });
  });
});



// Drop File
document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", (e) => {
    inputElement.click();
  });

  inputElement.addEventListener("change", (e) => {
    if (inputElement.files.length) {
      updateThumbnail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone--over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (e) => {
      dropZoneElement.classList.remove("drop-zone--over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone--over");
  });
});

/*Updates the thumbnail on a drop zone element.*/
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}


$(document).ready(function () {
  // Open Guest Order Modal
  $(".add-guest-order").click(function (e) {
    e.preventDefault();
    $(".overlay-guest, .removepopup-guest").fadeIn();
  });

  // Open Address Delete Modal
  $(".address-delete").click(function (e) {
    e.preventDefault();
    $(".overlay-address, .removepopup-address").fadeIn();
  });

  // Open Payment Delete Modal
  $(".payment-delete").click(function (e) {
    e.preventDefault();
    $(".overlay-payment, .removepopup-payment").fadeIn();
  });

  // Open Payment Delete Modal
  $(".quote-editig-done").click(function (e) {
    e.preventDefault();
    $(".overlay, .removepopup").fadeIn();
  });

  // Close ALL modals when .form-close is clicked
  $(".form-close").click(function () {
    $(".overlay, .removepopup").fadeOut();
  });
});



// Signup Form Validation
$("#create-account").click(function () {
  let email = $("#register-email").val();
  let password = $("#password").val();
  let fName = $("#lName").val();
  let lName = $("#lName").val();
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  let valid = true;
  if (!email.match(emailPattern)) {
    $("#register-email").addClass("error");
    $("#email-error").show();
    valid = false;
  } else {
    $("#register-email").removeClass("error");
    $("#email-error").hide();
  }
  if (password.length < 6) {
    $("#register-password").addClass("error");
    $("#password-error").show();
    valid = false;
  } else {
    $("#register-password").removeClass("error");
    $("#password-error").hide();
  }
  if (fName.length < 6) {
    $("#fName").addClass("error");
    $("#password-error").show();
    valid = false;
  } else {
    $("#fName").removeClass("error");
    $("#password-error").hide();
  }
  if (valid) {
    alert("Signed in successfully!");
  }
  if (fName.length < 4) {
    $("#lName").addClass("error");
    $("#password-error").show();
    valid = false;
  } else {
    $("#lName").removeClass("error");
    $("#password-error").hide();
  }
  if (valid) {
    alert("Signed in successfully!");
  }
});

//HEaart icon
const hearts = Array.from(document.querySelectorAll('.heart'));
hearts.map(heart => {
  heart.addEventListener('click', () => {
    heart.classList.toggle('favorited');
  });
})


//----------------- 
window.addEventListener('scroll', function () {
  let detailRight;
  if (document.querySelector('.product-detail-right')) {
    detailRight = document.querySelector('.product-detail-right');
  }
  if (detailRight) {
    if (window.scrollY > 0) {
      detailRight.classList.add('sticky');
    } else {
      detailRight.classList.remove('sticky');
    }
  }
});

//------------------ 
window.addEventListener('scroll', function () {
  let detailRight;
  if (document.querySelector('.cart-right')) {
    detailRight = document.querySelector('.cart-right');
  }
  if (detailRight) {
    if (window.scrollY > 0) {
      detailRight.classList.add('sticky');
    } else {
      detailRight.classList.remove('sticky');
    }
  }
});

//------------------- Checkout Accordion Mobile

// const accordion = document.querySelector('.checkout-accordion-mbl');
// const cartContainer = document.querySelector('.cart-container');

// accordion.addEventListener('click', function () {
//   if (window.innerWidth <= 680) {
//     // Toggle class on cartContainer
//     cartContainer.classList.toggle('open');

//     // Toggle class on accordion itself
//     accordion.classList.toggle('active');

//     // Set maxHeight for animation
//     if (cartContainer.classList.contains('open')) {
//       cartContainer.style.maxHeight = cartContainer.scrollHeight + "px";
//     } else {
//       cartContainer.style.maxHeight = 0;
//     }
//   }
// });

// // Reset on resize
// window.addEventListener('resize', () => {
//   if (window.innerWidth > 680) {
//     cartContainer.classList.remove('open');
//     cartContainer.style.maxHeight = null;
//     accordion.classList.remove('active');
//   }
// });
document.addEventListener('DOMContentLoaded', () => {
  const accordion = document.querySelector('.checkout-accordion-mbl');
  const cartContainer = document.querySelector('.cart-container');

  if (accordion && cartContainer) {
    accordion.addEventListener('click', function () {
      if (window.innerWidth <= 680) {
        cartContainer.classList.toggle('open');
        accordion.classList.toggle('active');

        if (cartContainer.classList.contains('open')) {
          cartContainer.style.maxHeight = cartContainer.scrollHeight + "px";
        } else {
          cartContainer.style.maxHeight = 0;
        }
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 680) {
        cartContainer.classList.remove('open');
        cartContainer.style.maxHeight = null;
        accordion.classList.remove('active');
      }
    });
  }
});



//=============Store Locator Script 
const buttons = document.querySelectorAll('.store-locator-button');
const minnesota = document.getElementById('minnesota');
const wisconsin = document.getElementById('wisconsin');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-target');

    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    if (target === 'all') {
      minnesota.classList.add('active');
      wisconsin.classList.add('active');
    } else {
      minnesota.classList.remove('active');
      wisconsin.classList.remove('active');

      document.getElementById(target).classList.add('active');
    }
  });
});

//========Store locator Script End 



//---------Product Detail Mobile Tab
document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".toggle-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      // Only toggle on mobile
      if (window.innerWidth <= 1024) {
        const box = header.closest(".product-info-box");
        box.classList.toggle("active");
      }
    });
  });
});

// ----------------
document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".quote-header");

  headers.forEach(header => {
    header.addEventListener("click", () => {
      // Only toggle on mobile
      if (window.innerWidth <= 767) {
        const box = header.closest(".quote-detail-right");
        box.classList.toggle("active");
      }
    });
  });
});


//ORDER TRACKING MOBILE ACCORDIN
document.addEventListener("DOMContentLoaded", function () {
  const trackingHead = document.querySelector('.tracking-head');
  const trackingContent = document.querySelector('.tracking-mobile-content');

  if (trackingHead && trackingContent) {
    const arrowIcon = trackingHead.querySelector('img');

    trackingHead.addEventListener('click', function () {
      trackingContent.classList.toggle('active');
      if (arrowIcon) {
        arrowIcon.classList.toggle('rotate');
      }
    });
  }
});

//----------- 
document.addEventListener("DOMContentLoaded", function () {
  const shippingHead = document.querySelector('.shipping-info-row .tracking-head');
  const shippingContent = document.querySelector('.shipping-order-content');

  if (shippingHead && shippingContent) {
    const arrowIcon = shippingHead.querySelector('img');

    shippingHead.addEventListener('click', function () {
      shippingContent.classList.toggle('active');
      if (arrowIcon) {
        arrowIcon.classList.toggle('rotate');
      }
    });
  }
});



//--------- Order TRacking Dot Dynamicaly
document.addEventListener('DOMContentLoaded', () => {
  const trackingLine = document.querySelector('.order-tracking-line.line-completed');

  if (trackingLine) {
    const completedDots = trackingLine.querySelectorAll('.order-track-dot.completed').length;

    const progressPercentMap = {
      0: '0%',
      1: '0%',
      2: '33.5%',
      3: '66.5%',
      4: '100%'
    };

    const progress = progressPercentMap[completedDots] || '0%';

    trackingLine.style.setProperty('--progress-width', progress);
    trackingLine.style.setProperty('--Primary-Blue', '#067cb7');
  }
});

$(".pd-banner svg").click(function () {
  $(".pd-banner").slideUp("slow");
})



const btn = document.getElementById('qtyBtn');
const options = document.getElementById('qtyOptions');

// Toggle dropdown visibility
btn.addEventListener('click', function (e) {
  e.stopPropagation();
  options.classList.toggle('hidden');
});

// Handle option selection
options.querySelectorAll('li').forEach(option => {
  option.addEventListener('click', function () {
    const value = this.getAttribute('data-value');
    // Update just the <strong> inside the button
    const strongEl = btn.querySelector('strong');
    if (strongEl) {
      strongEl.textContent = value;
    }
    options.classList.add('hidden');
  });
});

// Close dropdown if clicking outside
document.addEventListener('click', function () {
  options.classList.add('hidden');
});




// Sign in Toggle password
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".password-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function () {
      const input = this.closest(".relative").querySelector(".password-input");
      if (!input) return;

      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";

      this.classList.toggle("fa-eye");
      this.classList.toggle("fa-eye-slash");
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  function initMobileCategories() {
    const wrapper = document.querySelector(".mb-categories-wrapper");
    const footerBar = document.querySelector(".footer-fix-bar");
    const dropdown = document.querySelector(".mb-categories-dropdown-content");

    if (window.innerWidth <= 1024 && wrapper && dropdown) {
      const toggle = wrapper.querySelector(".mb-categories-toggle");
      const closeBtn = dropdown.querySelector(".mb-categories-close"); // Close button

      // Toggle main modal
      toggle.addEventListener("click", function (e) {
        e.preventDefault();
        const isActive = dropdown.classList.toggle("active");
        if (footerBar) footerBar.classList.toggle("dropdown-open", isActive);
      });

      // Close modal on close icon click
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          dropdown.classList.remove("active");
          if (footerBar) footerBar.classList.remove("dropdown-open");
        });
      }

      // Accordion logic
      const categoryHeaders = dropdown.querySelectorAll(".mb-categories-header");
      categoryHeaders.forEach(header => {
        header.addEventListener("click", function () {
          const currentContent = this.querySelector(".mb-categories-content");
          const allHeaders = dropdown.querySelectorAll(".mb-categories-header");
          const allContents = dropdown.querySelectorAll(".mb-categories-content");

          allContents.forEach(content => {
            if (content !== currentContent) content.classList.remove("open");
          });

          allHeaders.forEach(h => {
            if (h !== this) h.classList.remove("active");
          });

          currentContent.classList.toggle("open");
          this.classList.toggle("active");
        });
      });

      // Close on outside click
      document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove("active");
          if (footerBar) footerBar.classList.remove("dropdown-open");
        }
      });

      // Close on ESC
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          dropdown.classList.remove("active");
          if (footerBar) footerBar.classList.remove("dropdown-open");
        }
      });
    }
  }

  initMobileCategories();
});




document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector('.search-bar.mobile-view input[type="search"]');
  if (window.innerWidth <= 480) {
    input.setAttribute("placeholder", "Search or sell...");
  }
});


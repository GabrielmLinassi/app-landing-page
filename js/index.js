// Show menu on scroll
(function($) {
  $(document).ready(function() {
    // hide .navbar first
    $(".navbar").hide();

    // fade in .navbar
    $(function() {
      $(window).scroll(function() {
        // set distance user needs to scroll before we fadeIn navbar
        if ($(this).scrollTop() > 100) {
          $(".navbar").fadeIn();
        } else {
          $(".navbar").fadeOut();
        }
      });
    });
  });
})(jQuery);

// scrollspy offset fix
function scrollspy() {
  $(".navbar li a").click(function(event) {
    var offset = -90;

    event.preventDefault();

    // verify if section id is home so make scrollspy offset = 0
    idRef = $($(this).attr("href"))[0]["id"];
    if (idRef == "home") {
      offset = 0;
    }

    $($(this).attr("href"))[0].scrollIntoView();
    scrollBy(0, -offset);
  });
}

//go up effect
function goUpEffect() {
  setTimeout(() => {
    gsap.from(".home-text", { opacity: 0, y: 100, duration: 1 });
  }, 500);
}

$(document).ready(function() {
  // splitting effect
  Splitting();

  // scrollspy effect
  scrollspy();

  goUpEffect();
});

// counter animation
function animateCounter() {
  $(".count").each(function() {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).text()
        },
        {
          duration: 4000,
          easing: "swing",
          step: function(now) {
            $(this).text(Math.ceil(now));
          }
        }
      );
    // remove class
    $(this).removeClass("count");
  });
}

// listen for elements in the viewport
const myElems = document.querySelectorAll("#counter, #home, #stop-arrow");

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // counter
    if (entry.target.id === "counter" && entry.isIntersecting === true)
      animateCounter();

    // up arrow
    if (entry.target.id === "home") {
      if ($(window).width() >= 576) {
        if (entry.isIntersecting) $(".up-arrow").fadeOut();
        else $(".up-arrow").fadeIn();
      } else {
        $(".up-arrow").fadeOut();
      }
    }

    // stop up arrow
    if (entry.target.id === "stop-arrow") {
      if (entry.isIntersecting) {
        $(".up-arrow").animate({ margin: "170px 50px" }, 1000);
      } else {
        $(".up-arrow").animate({ margin: "50px 50px" }, 1000);
      }
    }
  });
});

// owl carousel
$(".main-content .owl-carousel").owlCarousel({
  stagePadding: 20,
  loop: true,
  margin: 0,
  nav: true,
  navText: [
    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>'
  ],
  navContainer: ".main-content .custom-nav",
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 3
    },
    1000: {
      items: 3
    }
  }
});

// hide up-arrow on small screen
$(document).ready(function() {
  $(window)
    .resize(function() {
      if ($(window).width() >= 576) {
        $(".up-arrow").fadeIn();
      } else {
        $(".up-arrow").fadeOut();
      }
    })
    .resize();
});

myElems.forEach(elem => {
  observer.observe(elem);
});

// Click effect btn available download
$("#available-btn-ios, #available-btn-android, #available-btn-windows").click(
  function() {
    $("#available-btn-ios").removeClass("button-clicked");
    $("#available-btn-android").removeClass("button-clicked");
    $("#available-btn-windows").removeClass("button-clicked");
    $(this).addClass("button-clicked");
  }
);

// handle download
$("#btn-download").click(e => {
  $plataform = $.trim($(".button-clicked").text()).toLowerCase();
  $file = "";
  $ext = "";

  $(".must-choose-plataform").text("");

  if ($plataform === "ios") {
    $file = ".././images/home-bg.png";
    $ext = ".apk";
  } else if ($plataform === "android") {
    $file = ".././images/about-iphone.png";
    $ext = ".apk";
  } else if ($plataform === "windows") {
    $file = ".././images/screen-01.png";
    $ext = ".exe";
  } else {
    //write under download button a plataform must be choosen
    $(".must-choose-plataform").text("Please, choose a platform first");
    return;
  }

  // start download
  $("#btn-download").attr("download", $plataform + $ext);
  $("#btn-download").attr("href", $file);
});

// animate up arrow, available-on btns
$(".up-arrow, .contact-us .icons a, .available-on-item .btn").on(
  "mouseenter",
  function() {
    var duration = 1;
    TweenMax.to(this, duration / 4, { y: -15, ease: Power2.easeOut });
    TweenMax.to(this, duration / 2, {
      y: 0,
      ease: Bounce.easeOut,
      delay: duration / 4
    });
  }
);

$(".btn-tour").on("mouseenter", function() {
  console.log($(".btn-tour").width());
});

// up arrow click effect to go home
$(".up-arrow").on("click", () => {
  $("html, body").animate({ scrollTop: 0 }, 1000);
});

// navbar item click scroll effect
$(".nav-item a, .btn-tour").on("click", function(e) {
  if (this.hash == "") return;

  e.preventDefault();

  var hash = this.hash;
  var offset = 110;

  if (hash == "#home") offset = 0;

  $("html, body").animate({ scrollTop: $(hash).offset().top + offset }, 1000);

  window.location.hash = hash;
});

// language button
$(".languages .dropdown-item").on("click", function() {
  $lang = "";

  if (this.id === "br") {
    $lang = "Português";
  } else if (this.id === "us") {
    $lang = "English";
  }

  $(".languages .dropdown .btn").text($lang);
});

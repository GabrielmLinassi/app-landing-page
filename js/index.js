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
$(document).ready(function() {
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
const myElems = document.querySelectorAll("#counter, #home");

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // counter
    if (entry.target.id === "counter" && entry.isIntersecting === true)
      animateCounter();

    // up arrow
    if (entry.target.id === "home") {
      if (entry.isIntersecting) $(".up-arrow").fadeOut();
      else $(".up-arrow").fadeIn();
    }
  });
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

// animate up arrow
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

// up arrow click effect to go home
$(".up-arrow").on("click", () => {
  $("html, body").animate({ scrollTop: 0 }, 1000);
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

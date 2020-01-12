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
  });
}

// listen for elements in the viewport
const myImgs = document.querySelectorAll(".counter");

observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      animateCounter();
    }
  });
});

myImgs.forEach(image => {
  observer.observe(image);
});

/* ACTIVE CLASS */
$(document).ready(function () {
  var menu_links = $('.ed-menu li a[href^="#"]');
  var menu_active = 0;
  var menu_object_top;
  var menu_item = $(menu_links[0]);

  menu_item.addClass("active");

  $(window).scroll(function () {
    for (var i = 0; i < menu_links.length; i++) {
     var link_active = $(menu_links[i]).attr('href');

      if ($(link_active).length) {
        menu_object_top = $(link_active).offset().top;
      }

      var scroll_top = $(window).scrollTop();
      var getdif = Math.abs(scroll_top - menu_object_top);
      if (i === 0) {
        menu_active = getdif;
        menu_item = $(menu_links[i]);
        $(".ed-menu li a").removeClass("active");
        menu_item.addClass("active");
      } else {
        if (getdif < menu_active || getdif === menu_active) {
          menu_active = getdif;
          menu_item = $(menu_links[i]);
          $(".ed-menu li a").removeClass("active");
          menu_item.addClass("active");
        }
      }
    }
  });
});

/* SMOOTH SCROLL */
$(function () {
  $("a[href*=\\#]")
    .stop()
    .click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") ||
        location.hostname == this.hostname
      ) {
        var hash = this.hash;
        var target = $(this.hash);
        if (target.length) {
          var margin_top = target.offset().top;
          $([document.documentElement, document.body]).animate(
            { scrollTop: margin_top },
            1000
          );
        }
      }
    });
});

/* MOBILE TOGGLE */
(function () {
  $(function () {
    $(".menu-wrapper").each(function () {
      initMenu($(this));
    });
  });

  // Make :active pseudo classes work on iOS
  document.addEventListener("touchstart", function () {}, false);

  var initMenu = function ($menuWrapper) {
    var $menu = $(".ed-menu");
    var $menuTrigger = $(".menu-trigger");
    toggleClassOnClick($menu, $menuTrigger, null, "open");
  };

  /*
   * Toggles class on a target when a trigger is clicked
   */

  var toggleClassOnClick = function (
    $target,
    $trigger,
    $closeTrigger,
    cssClass
  ) {
    // Reset in case class "open" was saved accidentally
    $target.removeClass(cssClass);
    $trigger.removeClass(cssClass);

    // Click on trigger toggles class "open"
    $trigger.off(".toggle").on("click.toggle", function () {
      $(this).toggleClass(cssClass);
      $target.toggleClass(cssClass);
    });

    // Close target when link inside is clicked
    $target.find("a").click(function () {
      $target.removeClass(cssClass);
      $trigger.removeClass(cssClass);
    });

    if (!$closeTrigger || !$closeTrigger.length) {
      return;
    }

    $closeTrigger.click(function () {
      $target.removeClass(cssClass);
      $trigger.removeClass(cssClass);
    });
  };
})();
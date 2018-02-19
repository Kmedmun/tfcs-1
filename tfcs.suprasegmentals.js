jQuery(document).ready(function($) {
  $(".accordion-title").click(function() { $(this).next(".accordion-content").slideToggle("slow") });
  // display current position
  $("[href='"+window.location.pathname.toLowerCase()+"']").parent().addClass("current"); // section
  $("[href='"+window.location.pathname.toLowerCase()+"']").parent().prev().addClass("current"); // section title
  $("[href='"+window.location.pathname.toLowerCase()+"']").addClass("current"); // individual links
  $('#ss-nav-menu').find('.ss-nav-menu-toggle').click(function(){
    //Expand or collapse this panel
    $(this).next().slideToggle('fast', function() {if ($(this).is(':visible')) $(this).css('display','grid');});
    //Hide the other panels
    $(".ss-nav-menu-content").not($(this).next()).slideUp('fast');
  });
  $(".clear-all-button").click(function() { $(this).prev("table").find('.answer').removeClass("green red") });
  $(".correct").click(function() { $(this).toggleClass("green") });
  $(".wrong").click(function() {
    let toggleRed = setInterval( ()=>$(this).toggleClass("red"), 100 );
    setTimeout( ()=>clearInterval(toggleRed), 500 );
    setTimeout( ()=>$(this).removeClass("red"), 600 );
  });
});
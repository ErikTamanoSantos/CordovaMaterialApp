(function($){
  $(function(){

    $('.sidenav').sidenav();
    $(document).ready(function(){
      $('.tabs').tabs();
      $('.tabs').tabs({'swipeable':true})
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space

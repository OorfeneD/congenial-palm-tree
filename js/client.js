function getPage(ths){
  pathname = $(ths).attr("id").slice(0, -4).toLowerCase();
  if(location.pathname.slice(1) != pathname){
    $("#title, title").html(translate(["pages", pathname]));
    history.replaceState('', null, pathname);

    $(document).scrollTop(0);
    $("input#filter").prop("checked", false);  
    $("main ul, .activeBottomFilter").html("");
    $("#awayMove").remove();
 
    getBottomFilter();
    start(pathname);
  }
}


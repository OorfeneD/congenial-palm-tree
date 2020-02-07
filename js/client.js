function getPage(ths){
  pathname = $(ths).attr("id").slice(0, -4).toLowerCase();
  if(location.pathname.slice(1) != pathname){
    $("#title, title").html(translate(["pages", pathname]));
    history.replaceState('', null, pathname);

    $(document).scrollTop(0);
    $("input#filter").prop("checked", false);  
    $("main ul, .rightFilter").html("");
    $("#awayMove").remove();
 
    getBottomMenu(); // при необходимости скрывает filter и autoload
    start(pathname);
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка нижнего меню
function getBottomMenu(){
  for(let i = 0; i < $(".bottomMenu label").length; i++){
    let name = $(".bottomMenu label").eq(i).attr("for");
    $(`.bottomMenu label[for='${name}']`).css({
      display: filterOnly(pageSet["bottomMenu"][`hide_${name}`], pathname) ? "none" : "flex",
    })
  }  
  $(".bottomMenu").css({display: 
    $(".bottomMenu label[style*='display: none;']").length == $(".bottomMenu label").length 
    ? "none" 
      : "flex",
  })
  if(cookie["turn_filter"][pathname] == "1" && !filterOnly(pageSet.bottomMenu.hide_filter, pathname)){  
    $(".bottomMenu #filter").prop("checked", true); 
  }  
  getRightFilter();
  reloadAutoload()
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function start(pathname){
  switch(pathname){
    case "main": loadMain(pathname); break;
    case "fbi": case "notes": case "tags": loadComments(pathname); break;
    // case "archive": loadArchive(pathname); break;
    case "settings": loadSettings(pathname); break;
    // case "database": loadDatabase(pathname); break;
  }
}

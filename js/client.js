function start(ths){
  pathname = $(ths).attr("id").slice(0, -4).toLowerCase() ;
  if(location.pathname.slice(1) != pathname){
    $("#title, title").html(translate(["pages", pathname]));
    history.replaceState('', null, pathname);

    $(document).scrollTop(0);
    $("input#filter").prop("checked", false);  
    $("main ul, .rightFilter").html("");
    $("#awayMove").remove();
 
    getBottomMenu();       // при необходимости скрывает и активирует filter и autoload
    getReloadAutoload();   // обнуляет значение autoload
    getRightFilter();      // загружает новый фильтр
    getContent(pathname);  // загружает контент характерный для pathname  
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getContent(pathname, step = 0){
  if(pathname == "settings"){
    loadSettings(pathname)
  }else{
    $.ajax({
      url: "listStream",
      data: {step: step, limit: loadLimit},
      method: 'get',
      success: data => {
        console.log(data);
        switch(pathname){
          case "main": loadMain(pathname, data, step); break;
          case "fbi": case "notes": case "tags": loadComments(pathname, data, step); break;
        }
      }
    })
  }
}
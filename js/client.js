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

function getContent(type, step = 0){
  if(type == "settings"){
    loadSettings(type)
  }else if(filter(["main"], type)){
    // $.ajax({
    //   url: "listStream",
    //   data: {step: step, limit: loadLimit},
    //   method: 'get',
    //   success: data => {
    //     console.log(data);
    //     loadMain(type, data, step); 
    //   }
    // })
  }else if(filter(["fbi", "notes", "tags"], type)){
    if(!$("ul div[load]").length)
      $("ul").append(`<div view="button" name="${translate(["loading"])}" load></div>`)
    $.ajax({
      url: "listStream",
      data: {type: type, from: loadLimit*step, limit: loadLimit},
      method: 'get',
      error: err => setTimeout(() => {if(pathname == type) getContent(type, step)}, 3000),
      success: data => {
        console.log(data)
        loadComments(type, data, step);
        $(`.loadCode input`).prop("checked", false)
      }
    })
  }
}
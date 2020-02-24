function start(ths, pass = ""){
  pathname = !pass ? $(ths).attr("id").slice(0, -4).toLowerCase() : pathname;
  if(location.pathname.slice(1) != pathname || pass){
    $("#title, title").html(translate(["pages", pathname]));
    pass = pass == 1 ? "" : pass;
    history.replaceState('', null, pathname+pass);
    createGet();
    
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
  createGet();
  let oldget = get;
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
      $("ul").append(`<div view="button" load></div>`)
    $.ajax({
      url: "listStream",
      data: {
        type: type, 
        from: loadLimit*step, 
        limit: loadLimit, 
        channel: get[pathname]["channel"] || 0, 
        sort: get[pathname]["sort"] || "DESC",
        by: get[pathname]["by"] || "sI",
        date: get[pathname]["date"] || 0,
        duration: get[pathname]["duration"] || 0,
        pop: get[pathname]["pop"] || 0,
        sID: get[pathname]["sID"] || 0,
      },
      method: 'get',
      error: err => setTimeout(() => {if(pathname == type) getContent(type, step)}, 3000),
      success: data => {
        console.log(data)
        loadComments(type, data, step, oldget);
        $(`.loadCode input`).prop("checked", false)
      }
    })
  }
}
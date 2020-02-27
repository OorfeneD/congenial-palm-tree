function start(ths, pass = ""){
  pathname = !pass ? $(ths).attr("id").slice(0, -4).toLowerCase() : pathname;
  if(location.pathname.slice(1) != pathname || pass){
    $("label[for='autoload']").attr({status: "process"})
    $("#title, title").html(translate(["pages", pathname]));
    pass = pass == 1 ? "" : pass;
    history.replaceState('', null, pathname + getToString());
    
    $(document).scrollTop(0);
    $("input#filter").prop("checked", false);  
    $("main ul, .rightFilter").html("");
    $("#awayMove").remove();
 
    content = {};
    getBottomMenu();       // при необходимости скрывает и активирует filter и autoload
    getReloadAutoload();   // обнуляет значение autoload
    getRightFilter();      // загружает новый фильтр
    getContent(pathname);  // загружает контент характерный для pathname  
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getContent(type, step = 0){
  let href = window.location.href;
  createGet();
  let oldget = get;
  if(!$("ul div[load]").length && !filter(["settings"], pathname)){
    $("ul").append(`<div view="button" load></div>`);
    $("main").css({cursor: "wait"});
    if(pathname == "main") $("ul").prepend("<a id='awayMove' target='_blank' onmouseout='awayMove(this)'></a>")
  }
  
  switch(type){
    case "settings": loadSettings(type); break;
    case "main": case "fbi": case "notes": case "tags": 
      $("#autoload").attr({act: "load"})
      $.ajax({
        url: "listStream",
        data: {
          type: type, 
          from: step*(type=="main" ? loadLimit/2 : loadLimit), 
          limit: (type=="main" ? loadLimit/2 : loadLimit), 
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
          // console.log(data)
          $("main").css({cursor: ""})
          if(type=="main") loadMain(href, data, step, oldget);
          else loadComments(href, data, step, oldget);
          $(`.loadCode input`).prop("checked", false)
        }
      })
    break;
    default: $("main").css({cursor: ""})
  }
}
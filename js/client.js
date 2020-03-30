function start(ths, pass = 0, url = 0){
  pathname = !pass ? $(ths).attr("id").slice(0, -4).toLowerCase() : pathname;
  if(location.pathname.slice(1) != pathname || pass){
    $(`.topMenu input`).prop({checked: false})
    $(`input#${pathname}Page`).prop({checked: true})
    $("label[for='autoload']").attr({status: "process"})
    $("#title, title").html(translate(["pages", pathname]));
    history.replaceState('', null, pathname + (!url ? getToString() : url));
    
    $(document).scrollTop(0);
    $("input#filter").prop("checked", false);  
    $("main ul, .rightFilter").html("");
    $("#awayMove, .getColor").detach();
 
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
    if(filter(["main", "best", "archive"], pathname)) 
      $("ul").prepend("<a id='awayMove' target='_blank' onclick='awayMove(this)' onmouseout='awayMove(this)' onwheel='graphXWheel(this, event)'></a>")
  }
  
  switch(type){
    case "settings": loadSettings(type); break;
    case "main": case "fbi": case "notes": case "tags": case "archive": case "best":
      $("#autoload").attr({act: "load"})
      $.ajax({
        url: "listStream",
        data: {
          type: type, 
          from: step*(filterOnly(["fbi", "notes", "tags"], type) ? loadLimit : loadLimit/2), 
          limit: (filterOnly(["fbi", "notes", "tags"], type) ? loadLimit : loadLimit/2),
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
          switch(type){
            case "main": loadMain(href, data, step, oldget); break;
            case "archive": loadArchive(href, data, step, oldget); break;
            default: loadComments(href, data, step, oldget);
          }
          $(`.loadCode input`).prop("checked", false)
        }
      })
    break;
    case "clips": 
      $("#autoload").attr({act: "load"})
      $.ajax({
        url: "getclips",
        data: {
          // type: type, 
          step: step, 
          limit: loadLimit,
          // channel: get[pathname]["channel"] || 0, 
          // sort: get[pathname]["sort"] || "DESC",
          // by: get[pathname]["by"] || "sI",
          // date: get[pathname]["date"] || 0,
          // duration: get[pathname]["duration"] || 0,
          // pop: get[pathname]["pop"] || 0,
          // sID: get[pathname]["sID"] || 0,
        },
        method: 'get',
        error: err => setTimeout(() => {if(pathname == type) getContent(type, step)}, 3000),
        success: data => {
          // console.log(data)
          $("main").css({cursor: ""})
          loadClips(href, data, step, oldget);
          $(`.loadCode input`).prop("checked", false)
        }
      })
    break;
    default: 
      $("main").css({cursor: ""}); 
      endAutoload()
  }
}
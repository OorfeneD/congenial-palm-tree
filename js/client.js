function getPage(ths){
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
    start(pathname);       // загружает контент характерный для pathname
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
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getRightFilter(){
  setTimeout(() => {
    $(".rightFilter").html("").css({display: $(".bottomMenu #filter").prop("checked") ? "flex" : "none"});
    switch(pathname){
      case "settings":
        let labelArr = ["theme", "same", ...allPages];
        for(let i = 0; i < labelArr.length; i++){
          $(".rightFilter").append(`
          <a style="display: flex; width: 100%;" href="/${pathname}#${labelArr[i]}">
            <input type="radio" name="filterMax" id="${labelArr[i]}FilterMax" onclick="getSettings(this)">
            <label for="${labelArr[i]}FilterMax"></label>
          </a>
          `)
          $(`.rightFilter label[for="${labelArr[i]}FilterMax"]`).attr({
            name: i == 0 || i == 1 ? translate(["menu", "filter", labelArr[i]]) : translate(["pages", labelArr[i]]),
          })
        }
        // getSettings();
      break;
    }
  }, 50)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getReloadAutoload(){
  $("#autoload").prop("checked", false);
  $("label[for='autoload']").attr({name: translate(["menu", "autoload"]), number: 0, status: "process"})
  if(cookie["turn_autoload"][pathname] == "1" && !filterOnly(pageSet.bottomMenu.hide_autoload, pathname)){
    $("#autoload").prop("checked", true);
  }  
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

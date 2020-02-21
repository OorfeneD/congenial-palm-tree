$(document).ready(() => { 
  getTheme();
  getHueRotate();
  $("loading").detach();
  
  if(!filter(["away"], pathname)){
/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////   
    $("head").append("<style icons></style>")
    for(let i = 0; i < Object.keys(iconsObj).length; i++){
      $("style[icons]").append(`[icon="${Object.keys(iconsObj)[i]}"]:after{background-image: url(${Object.values(iconsObj)[i]})}`)
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// создание и настройка кнопки смены темы
    let colorLength = Object.keys(colorObj).length;
    for(let c = 0; c < colorLength; c++){
      let theme = Object.keys(colorObj)[c];
      $(".getTheme").append(`
        <input type="radio" name="getTheme" id="${theme}Theme">
        <label for="${theme}Theme" icon="${theme}" onclick="getTheme(this)"></label>
      `)
    }
    $(".getTheme").css({width: colorLength*40+"px"})
    $(`.getTheme #${cookie["theme"]}Theme`).prop("checked", true)
    
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// создание и настройка кнопки смены языка
    for(let i = 0; i < Object.keys(langObj).length; i++){
      let val = Object.keys(langObj)[i];
      $(".getLang").append(`
        <input type="radio" name="lang" id="${val}Lang" ${val == cookie["lang"] ? "checked" : ""}>
        <label for="${val}Lang" onclick="getLang(this);">${val}</label>
      `);
    }   
    
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// создание и настройка верхнего меню
    for(let page = 0; page < allPages.length; page++){
      let key = allPages[page];
      $(".topMenu").append(`
        <a style="display: flex; width: 100%;" href="https://ican.glitch.me/${key}">
          <input type="radio" name="page" id="${key}Page" onclick="start(this)">
          <label for="${key}Page" bg="_c:color_ch:color" color="_b:color" icon="${iconsObj[key] ? key : "none"}"></label>
        </a>
      `)
    }
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// создание и настройка нижнего меню
    let widthSmall = +$(".rightMenu").css("width").slice(0, -2);
    $(".bottomMenu")
      .css({top: `calc(${(allPages.length + 3) * widthSmall}px)`,}) 
      .append(`
        <input type="checkbox" name="filter" id="filter">
        <label for="filter" onclick="getRightFilter()" bg="_c:color_ch:color" color="_b:color" icon="filter"></label>
        <input type="checkbox" name="autoload" id="autoload">
        <label for="autoload" number="0" status="process" onclick="getClickAutoload(this)" bg="_c:color_ch:color" color="_b:color" icon="autoload"></label>
      `)
    getBottomMenu();   
    
/////////////////////////////////////////////////////////////////////////////////////////////    
/////////////////////////////////////////////////////////////////////////////////////////////
    $(".loadCode").append(`
      <input type="checkbox" id="loadCode" disabled>
      <label for="loadCode" icon="resettings" style="cursor: default"></label>
    `)
    
/////////////////////////////////////////////////////////////////////////////////////////////   
/////////////////////////////////////////////////////////////////////////////////////////////
  }
  getBottomMenu();       // при необходимости скрывает и активирует filter и autoload
  getRightFilter();      // загружает новый фильтр
  getContent(pathname);  // загружает контент характерный для pathname
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  $(`input#${pathname}Page`).prop("checked", true);
  getLang(cookie["lang"]);
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

  $.ajax({
    url: "listStream",
    data: {from: 0, limit: loadLimit},
    method: 'get',
    success: data => {
      for(let i = 0; i < data.length; i++){
        sSmax = data[i]["sS"] > sSmax ? data[i]["sS"] : sSmax;
        let sID = data[i]["sI"];
        delete data[i]["sI"];
        streamArr[sID] = data[i];
      }
      (function newSteamLoad(){
        $.ajax({
          url: "listStream",
          data: {max: sSmax},
          method: 'get',
          error: err => setTimeout(() => newSteamLoad(), 60*1000),
          success: data => {
            for(let i = 0; i < data.length; i++){
              sSmax = data[i]["sS"] > sSmax ? data[i]["sS"] : sSmax;
              let sID = data[i]["sI"];
              delete data[i]["sI"];
              streamArr[sID] = data[i];
            }
            console.log(streamArr);
            setTimeout(() => newSteamLoad(), 60*1000)
          }
        })
      })()
    }
  })  
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  $(window).on("scroll", function(e){
    $(".height").html($(document).scrollTop())
    
    $("ul li").css({opacity: 1})
    let winH = $(window).height();
    for(let i = 0; i < Object.keys(loadCommentsObj).length; i++){
      let liOffsetT = Object.keys(loadCommentsObj)[i],
          sID = Object.values(loadCommentsObj)[i];
      if( liOffsetT > winH ){
        $(`li[sID="${sID}"]`).css({opacity: 0.5})
      }
    }
  })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  

})
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
    $(".rightMenu").append(`
      <input type="checkbox" id="getTheme" ${cookie["theme"] == "day" ? "checked" : ""}>
      <label class="getTheme" for="getTheme" view="min" icon="${cookie["theme"]}" onclick="getTheme(this)"></label>
    `)
    
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
          <label for="${key}Page" view="min" icon="${iconsObj[key] ? key : "none"}"></label>
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
        <label for="filter" onclick="getRightFilter()" view="min" icon="filter"></label>
        <input type="checkbox" name="autoload" id="autoload">
        <label for="autoload" number="0" status="process" onclick="getClickAutoload(this)" view="min" icon="autoload"></label>
      `)
    getBottomMenu();   
    
/////////////////////////////////////////////////////////////////////////////////////////////    

    
    // $(".leftFilter").css({left: "calc(50vw - 457px)"}).append(`    
    //   <div class="graphMemeBox">
    //     <input type="range" name="graphMeme" class="graphMeme" min="0" max="${memes.length-1}" step="1" value="0" oldvalue="0" orient="vertical" onmousemove="graphMemeBigMouseMove(this)">
    //   </div> 
    // `)    
/////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
/////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
    // if($(".rightFilter")){
    //   $(".rightFilter").css({right: "calc(50vw - 457px)"})
    //   for(let i = 0; i < streamers.length; i++){
    //     $(".rightFilter").append(`
    //       <div n="${i}" style="order: ${i};${cookie["loadGraph"].slice(i, +i+1) == 0 && location.pathname == "/"? "display: none" : ""}">
    //         <input type="radio" name="rightFilter" id="${streamers[i].toLowerCase()}"><label n="${i}" for="${streamers[i].toLowerCase()}" full="${streamers[i]}"></label>
    //         <a target="_blank" filter="${streamers[i]}" ${location.pathname != "/setting" ? `href="${location.pathname.slice(1)}?c=${streamers[i]}` : ""}></a>
    //       </div>
    //     `)   
    //   }
    //   if(window.location.search){$(`.rightFilter #${streamers[get["c"]].toLowerCase()}`).prop("checked", true)}
    // }    
  }
  getBottomMenu();       // при необходимости скрывает и активирует filter и autoload
  getRightFilter();      // загружает новый фильтр
  getContent(pathname);       // загружает контент характерный для pathname
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  $(`input#${pathname}Page`).prop("checked", true);
  getLang(cookie["lang"]);
})
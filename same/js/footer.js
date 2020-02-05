$(document).ready(() => { 

  if(!filter(["away"], pathname)){
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// создание и настройка кнопки смены темы
    $(".rightFilter").append(`
      <input type="checkbox" id="getTheme" ${cookie["theme"] == "day" ? "checked" : ""}>
      <label class="getTheme" for="getTheme" onclick="getTheme(1)"></label>
    `)
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// создание и настройка кнопки смены языка
    for(let i = 0; i < Object.keys(langSet).length; i++){
      let lVal = Object.keys(langSet)[i];
      $(".getLang").append(`
        <input type="radio" name="lang" id="${lVal}Lang" ${lVal == cookie["lang"] ? "checked" : ""}>
        <label for="${lVal}Lang" onclick="getLang(this);">${lVal}</label>
      `);
    }    
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// создание и настройка верхнего меню
    for(let page = 0; page < allPages.length; page++){
      let key = allPages[page];
      $(".topFilter").append(`
        <a style="display: flex; width: 100%;" href="https://ican.glitch.me/${key}">
          <input type="radio" name="page" id="${key}Page" onclick="getPage(this)">
          <label for="${key}Page"></label>
        </a>
      `)
    }
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// создание и настройка нижнего меню
    let widthSmall = +$(".rightFilter").css("width").slice(0, -2);
    $(".bottomFilter")
      .css({top: `calc(${(allPages.length + 3) * widthSmall}px)`,}) 
      .append(`
        <input type="checkbox" name="filter" id="filter"><label for="filter" onclick="getRightFilter()"></label>
        <input type="checkbox" name="autoload" id="autoload"><label for="autoload" number="0" status="process" onclick="getAutoload(this)"></label>
      `)
    getBottomFilter();   
    
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
  start(pathname);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  $(`input#${pathname}Page`).prop("checked", true);
  getLang(cookie["lang"]);
})
$(document).ready(() => { 
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  if(!filter(["away"], pathname)){ 
    for(let page = 0; page < Object.keys(langSet[lang]["pages"]).length; page++){
      let pKey = Object.keys(langSet[lang]["pages"])[page],
          pVal = Object.values(langSet[lang]["pages"])[page];
      $(".topFilter").append(`
        <a style="display: flex; width: 100%;" href="https://ican.glitch.me/${pKey}">
          <input type="radio" name="page" id="${pKey}Page" onclick="getPage(this)">
          <label for="${pKey}Page" name="» ${pVal}" onclick=""></label>
        </a>
      `)
    }
    
    $("label[for='getTheme']").attr({name: langSet[lang].menu.getTheme})
    let widthSmall = +$(".rightFilter").css("width").slice(0, -2);
    setTimeout(() => $(".bottomFilter").css({transition: ".25s"}), 100)
    $(".bottomFilter")
      .css({top: `calc(${(Object.keys(langSet[lang]["pages"]).length + 3) * widthSmall}px)`,})
      .append(`
        <input type="checkbox" name="filter" id="filterMenu">
          <label for="filterMenu" name="${langSet[lang].menu.filter.name}"></label>
        <input type="checkbox" name="autoload" id="autoload">
          <label for="autoload" name="${langSet[lang].menu.autoload}" number="0" onclick="autoload(this)"></label>
      `)
    
    for(let i = 0; i < Object.keys(langSet).length; i++){
      let lVal = Object.keys(langSet)[i];
      $(".getLang").append(`
        <input type="radio" name="lang" id="${lVal}Lang" ${lVal == lang ? "checked" : ""}><label for="${lVal}Lang">${lVal}</label>
      `);
    }
    
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
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  $(`input#${pathname}Page`).prop("checked", true);
  $(".getLang").attr({lang: lang})
  $("title, #title").html(langSet[lang]["pages"]["main"]);
})
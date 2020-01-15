$(document).ready(() => { 
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  if(!filter(["/away"], location.pathname)){ 
    for(let page = 0; page < Object.keys(langSet[lang]["pages"]).length; page++){
      $(".topFilter").append(`
        <input type="radio" name="page" id="${Object.keys(langSet[lang]["pages"])[page]}Page">
        <label for="${Object.keys(langSet[lang]["pages"])[page]}Page" name="» ${Object.values(langSet[lang]["pages"])[page]}"></label>
      `)
    }
    
    $(".bottomFilter")
      .css({top: `calc(${$(".bottomFilter").css("top")} + ${Object.keys(langSet[lang]["pages"]).length * 40}px + 40px)`})
      .append(`
        <input type="checkbox" name="filter" id="filterMenu">
        <label for="filterMenu" name="${langSet[lang].menu.filter.name}"></label>
        <input type="checkbox" name="autoload" id="autoload"><label class="autoload" for="autoload" onclick="autoload(this)"></label>
      `)
    
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
  
  let urlPage = location.pathname.slice(1);
  $(`input#${urlPage}Page`).prop("checked", true);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  $("title").html(langSet[lang]["pages"]["main"]);
})
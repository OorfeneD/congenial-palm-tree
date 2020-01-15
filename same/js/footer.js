$(document).ready(() => { 
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  if(!filter(["/away"], location.pathname)){ 
    for(let page = 0; page < Object.keys(pages).length; page++){
      $(".leftFilter").append(`
        <input type="radio" name="page" id="${Object.keys(pages)[page]}Page" class="statsPage">
        <label for="${Object.keys(pages)[page]}Page" name="${Object.values(pages)[page]}" onclick="$(location).attr('href', 'http://www.iwant.glitch.me/${page == 0 ? "" : Object.keys(pages)[page]}')"></label>
      `)
    }
    $(".leftFilter").css({left: "calc(50vw - 457px)"}).append(`    
      <div class="graphMemeBox">
        <input type="range" name="graphMeme" class="graphMeme" min="0" max="${memes.length-1}" step="1" value="0" oldvalue="0" orient="vertical" onmousemove="graphMemeBigMouseMove(this)">
      </div> 
    `)    
/////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
/////-----------------------------------------------------------------------------------------------------------------------------------------------------------/////
    if($(".rightFilter")){
      $(".rightFilter").css({right: "calc(50vw - 457px)"})
      for(let i = 0; i < streamers.length; i++){
        $(".rightFilter").append(`
          <div n="${i}" style="order: ${i};${cookie["loadGraph"].slice(i, +i+1) == 0 && location.pathname == "/"? "display: none" : ""}">
            <input type="radio" name="rightFilter" id="${streamers[i].toLowerCase()}"><label n="${i}" for="${streamers[i].toLowerCase()}" full="${streamers[i]}"></label>
            <a target="_blank" filter="${streamers[i]}" ${location.pathname != "/setting" ? `href="${location.pathname.slice(1)}?c=${streamers[i]}` : ""}></a>
          </div>
        `)   
      }
      if(window.location.search){$(`.rightFilter #${streamers[get["c"]].toLowerCase()}`).prop("checked", true)}
    }    
  }
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  setTimeout(() => $("title").html(langSet[lang]["pages"]["main"]), 5000)
})
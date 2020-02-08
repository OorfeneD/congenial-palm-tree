function loadSettings(type){
  (function aaa(){
    if(!$(".rightFilter a").eq(0).attr("href")){
      setTimeout(() => aaa(), 100)
    }else{
      let check = type != pathname 
        ? $(type).attr("id").slice(0, -9) 
          : !hash || !filterOnly(["theme", "same", ...allPages], hash)
            ? $(".rightFilter a").eq(0).attr("href").split("#")[1]
              : hash;
      hash = check;
      $(`.rightFilter input#${check}FilterMax`).prop("checked", true);
      history.replaceState('', null, pathname+"#"+check);
      $("main ul").html(`
        <div class="reset" name="${translate(["menu", "filter", "reset"])}" onclick="reset('${hash}')"></div>
      `);
      if(filter(allPages, check)){
        let list = pageSet.bottomMenu.list;
        for(let i = 0; i < list.length; i++){
          if(
            !filterOnly(pageSet["bottomMenu"][`turn_${list[i]}`], check) && 
            !filterOnly(pageSet["bottomMenu"][`hide_${list[i]}`], check)
          ){  
            if($("ul li[for='cookieRightFilter']").length == 0){
              $("main ul").append(`
                <li for="cookieRightFilter" type="settings">
                  <h4><a>${translate(["settings", "activePage"])}</a></h4>
                  <h8 style="flex-direction: row;" notcounter></h8>
                </li>
              `)}
            $("li[for='cookieRightFilter'] h8").append(`
              <input type="checkbox" id="${list[i]}Cookie" oninput="objectCookie(this);">
              <label for="${list[i]}Cookie" icon="${list[i]}"></label><br>
            `);
            $(`input#${list[i]}Cookie`).prop("checked", +cookie[`turn_${list[i]}`][check])
          }       
        } 
      }
      switch(check){
        case "theme":
          $("main ul").append(`
            <li type="settings">
              <h4><a>${translate(["settings", "hueRotate"])}</a></h4>
              <h8 style="flex-direction: row;" notcounter>
                <input type="range" name="hueRotate" class="hueRotateRange" min="0" max="359" step="1" oninput="hueRotate(this)">
              </h8>
            </li>
          `)
          let value = cookie["hueRotate"][cookie["theme"]];
          $("main ul input[name='hueRotate']").val(value).attr({deg: +value})
        break;
        case "same":
           $("main ul").append(`
            <li content="streamers" type="settings">
              <h4><a>Отслеживаем стримеров:</a></h4>
              <h8 meme="Суммарно" sum="0">
                <div class="streamersAdd">
                  <input type="text">
                </div>  
              </h8>
            </li>
          `)    
          let tracking = pageSet.topMenu.tracking;
          for(let i = 0; i < tracking.length; i++){
            $("ul li[content='streamers'] .streamersAdd").append(`
              <input type="checkbox" id="${tracking[i]}StreamersAdd" checked>
              <label for="${tracking[i]}StreamersAdd" icon="${tracking[i]}"></label><br>
            `)
          }
          $("ul li[content='streamers'] .streamersAdd").append(`<div class="add" name="Добавить"></div>`)
          for(let i = 0; i < streamers.length; i++){
            $("ul li[content='streamers'] h8").append(`
              <div>  
                <a href="https://www.twitch.tv/${streamers[i]}">${streamers[i]}</a>
              </div>
            `)
          }
        break;
      }        
    }
  })()
}
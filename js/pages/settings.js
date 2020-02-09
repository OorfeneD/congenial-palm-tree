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
      $("main ul").html(
        hash == "same" 
        ? `<div class="reset" name="${translate(["settings", "save"])}" onclick="saveStreamers()"></div>`
        : `<div class="reset" name="${translate(["menu", "filter", "reset"])}" onclick="reset('${hash}')"></div>`
      );
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
            <li content="streamersAdd" type="settings">
              <h4><a>${translate(["settings", "streamersAdd"])}</a></h4>
              <h8 meme="${translate(["settings", "total"])}" sum="0">
                <div class="streamersAdd">
                  <input type="text">
                  <div class="add" name="${translate(["settings", "add"])}" onclick="addStreamer(this)"></div>
                </div>
              </h8>
            </li>
            <li content="streamers" type="settings">
              <h4><a>${translate(["settings", "streamers"])}</a></h4>
              <h8></h8>
            </li>
          `)    
          let tracking = pageSet.topMenu.tracking;
          for(let i = 0; i < tracking.length; i++){
            $("ul li[content='streamersAdd'] .streamersAdd .add").before(`
              <input type="checkbox" id="${tracking[i]}StreamersAdd" checked>
              <label for="${tracking[i]}StreamersAdd" icon="${tracking[i]}"></label>
            `)
          }
          $("ul li[content='streamers']").append("<h9></h9>");
          (function streamersList(){
            $.ajax({
              url: "streamersList",
              error: err => {if(err.status == 503){
                setTimeout(() => streamersList(), 1000);
                $("ul li[content='streamers'] h9>div").prepend(".").append(".");
                $("ul li[content='streamers'] h9").append(`<div>${translate(["reboot"])}</div>`)
              }},
              success: streamers => {
                $("ul li[content='streamers'] h9").detach();
                $("ul li[content='streamersAdd'] h8").attr({sum: Object.keys(streamers).length})
                for(let i = 0; i < Object.keys(streamers).length; i++){
                  let username = streamers[i]["username"];
                  if(!$(`ul li[content='streamers'] div[streamer="${username.toLowerCase()}"]`).length){
                    $("ul li[content='streamers'] h8").append(`
                      <div streamer="${username.toLowerCase()}">  
                        <a target="_blank" href="https://www.twitch.tv/${username}">${username}</a>
                        <input type="checkbox" id="delete_${username}">
                        <label for="delete_${username}" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteStreamer(this)"></label> 
                      </div>
                    `)
                    for(let u = 0; u < tracking.length; u++){
                      let check = streamers[i][tracking[u]];
                      $(`ul li[content='streamers'] h8 div[streamer="${username.toLowerCase()}"] #delete_${username}`).before(`
                        <input type="checkbox" id="${tracking[u]}_${username}" ${check == "true"? "checked" : ""}>
                        <label for="${tracking[u]}_${username}" icon="${tracking[u]}"></label>
                      `)
                    }
                  }
                }
              },
            })            
          })()
        break;
      }        
    }
  })()
}
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      $("main ul").html(`<div class="reset" view="button" name="${translate(["menu", "filter", "reset"])}" onclick="reset('${hash}')"></div>`);
      if(filter(allPages, check)){
        let list = pageSet.bottomMenu.list;
/******/for(let i = 0; i < list.length; i++){
          if(
            !filterOnly(pageSet["bottomMenu"][`turn_${list[i]}`], check) && 
            !filterOnly(pageSet["bottomMenu"][`hide_${list[i]}`], check)
          ){  
            if($("ul li[for='cookieRightFilter']").length == 0){
              $("main ul").append(`
                <li for="cookieRightFilter" type="settings">
                  <h4><a>${translate(["settings", "activePage"])}</a></h4>
                  <h8 style="flex-direction: row;"></h8>
                </li>
              `)}
            $("li[for='cookieRightFilter'] h8").append(`
              <input type="checkbox" id="${list[i]}Cookie" oninput="objectCookie(this);">
              <label for="${list[i]}Cookie" icon="${list[i]}" bg="_h:dark_c:color_ch:color"></label><br>
            `);
            $(`input#${list[i]}Cookie`).prop("checked", +cookie[`turn_${list[i]}`][check])
          }       
/******/} 
      }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      switch(check){
        case "theme":
          $("main ul").append(`
            <li type="settings">
              <h4><a>${translate(["settings", "hueRotate"])}</a></h4>
              <h8 style="flex-direction: row;">
                <input type="range" name="hueRotate" class="hueRotateRange" min="0" max="359" step="1" oninput="hueRotate(this)">
              </h8>
            </li>
          `)
          let value = cookie["hueRotate"][cookie["theme"]];
          $("main ul input[name='hueRotate']").val(value).attr({deg: +value})
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        case "same":
           let tracking = pageSet.topMenu.tracking;
           $("main ul").append(`
            <li content="UTC" type="settings">
              <h4><a>${translate(["settings", "UTC"])}</a></h4>
              <h8 style="flex-direction: row;">
                <input type="range" name="UTC" class="UTCRange" min="-44" max="56" step="1" oninput="getUTC(this)">
              </h8>
            </li>
            <li content="streamersAdd" type="settings">
              <h4><a>${translate(["settings", "streamers", "add"])}</a></h4>
              <h8 meme="${translate(["settings", "total"])}" sum="0">
                <div class="streamersAdd">
                  <input type="text" onkeyup="keyPressAddStreamers(event, this);">
                  <div view="button" class="add" name="${translate(["settings", "add"])}" onclick="addStreamer(this);"></div>
                </div>
              </h8>
            </li>
            <li content="streamers" type="settings">
              <h4 display="0">
                <a>${translate(["settings", "streamers", "names"])}</a>
                <div style="width: ${(tracking.length + (tracking.length-1)*0.25) * $(".rightMenu").width()}px" tracking>${translate(["settings", "streamers", "tracking"])}</div>
              </h4>
              <h8></h8>
            </li>
          `)     
          let UTC = cookie["UTC"],
              hour = Math.floor(UTC/4),
              min = zero((UTC - hour*4) * 15);
          $("li[content='UTC'] input[name='UTC']").val(UTC).attr({deg: `${hour >= 0 ? "+"+hour : hour}:${min}`})
          for(let i = 0; i < tracking.length; i++){
            $("ul li[content='streamersAdd'] .streamersAdd .add").before(`
              <input type="checkbox" id="${tracking[i]}StreamersAdd" checked>
              <label for="${tracking[i]}StreamersAdd" icon="${tracking[i]}" bg="_h:dark_c:color_ch:color"></label>
            `)
          }
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
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
                if(Object.keys(streamers).length) $("ul li[content='streamers'] h4").attr({display: 1})
                for(let i = 0; i < Object.keys(streamers).length; i++){
                  let username = streamers[i]["username"];
                  if(!$(`ul li[content='streamers'] div[streamer="${username.toLowerCase()}"]`).length){
                    $("ul li[content='streamers'] h8").append(`
                      <div streamer="${username.toLowerCase()}">  
                        <a target="_blank" href="https://www.twitch.tv/${username}">${username}</a>
                        <input type="checkbox" id="delete_${username}">
                        <label for="delete_${username}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteStreamer(this)"></label> 
                      </div>
                    `)
                    for(let u = 0; u < tracking.length; u++){
                      let check = streamers[i][tracking[u]];
                      $(`ul li[content='streamers'] h8 div[streamer="${username.toLowerCase()}"] #delete_${username}`).before(`
                        <input type="checkbox" id="${tracking[u]}_${username}" ${check == "true"? "checked" : ""}>
                        <label for="${tracking[u]}_${username}" bg="_c:color_ch:color" icon="${tracking[u]}"></label>
                      `)
                    }
                  }
                }
              },
            })            
          })()
          $("ul").append(`<div class="reset" view="button" name="${translate(["settings", "save"])}" onclick="saveStreamers()"></div>`)
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        case "main":
           $("main ul").append(`
            <li content="${hash}Add" type="settings">
              <h4><a>${translate(["settings", hash, "add"])}</a></h4>
              <h8 meme="${translate(["settings", "total"])}" sum="0">
                <div class="${hash}Add">
                  <input type="text" onkeyup="keyPressAddMain(event);">
                  <div view="button" class="add" name="${translate(["settings", "add"])}" onclick="addMain(this);"></div>
                </div>
              </h8>
            </li>
            <li content="${hash}" type="settings">
              <h4 display="0">
                <a>${translate(["settings", hash, "groups"])}</a>
                <div triggers>${translate(["settings", hash, "triggers"])}</div>
              </h4>
              <h8></h8>
            </li>
          `);
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
          $(`ul li[content='${hash}']`).append("<h9></h9>");
          (function mainList(){
            $.ajax({
              url: hash+"List",
              error: err => {if(err.status == 503){
                setTimeout(() => mainList(), 1000);
                $(`ul li[content='${hash}'] h9>div`).prepend(".").append(".");
                $(`ul li[content='${hash}'] h9`).append(`<div>${translate(["reboot"])}</div>`)
              }},
              success: result => {
                $(`ul li[content='${hash}'] h9`).detach();
                $(`ul li[content='${hash}Add'] h8`).attr({sum: Object.keys(result).length})
                if(Object.keys(result).length) $(`ul li[content='${hash}'] h4`).attr({display: 1})
                for(let i = 0; i < Object.keys(result).length; i++){
                  let group = result[i]["key"];
                  if(!$(`ul li[content='${hash}'] div[group="${group.toLowerCase()}"]`).length && hash == "main"){
                    $(`ul li[content='${hash}'] h8`).append(`
                      <div group="${group.toLowerCase()}">  
                        <a target>${group}</a>
                        <input type="text" onkeypress="keyPressAddMainTrigger(event, this)">
                        <div view="button" class="add" name="${translate(["settings", "add"])}" onclick="addMainTrigger(this)"></div>
                        <input type="checkbox" id="delete_${group}">
                        <label for="delete_${group}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteMain(this)"></label> 
                      </div>
                      <nav group="${group.toLowerCase()}"></nav>
                    `)
                    let triggers = result[i]["value"].slice(1, -1).split(",");
                    for(let u = 0; u < triggers.length; u++){
                      let trigger = triggers[u].split(":")[0],
                          value = triggers[u].split(":")[1];
                      $(`li[content='${hash}'] h8 nav[group="${group}"]`).append(`
                        <wrap trigger="${trigger}">
                          <a target>${trigger.toLowerCase()}</a>
                          <input type="text" maxlength="3" maxlength="1" min="0" value="${value}" onkeyup="keyPressMainTriggerValue(event, this)">
                          <input type="checkbox" id="delete_${group}_${u}">
                          <label for="delete_${group}_${u}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteMainTrigger(this)"></label> 
                        </wrap>
                      `)
                    }
                  }
                }
              },
            })            
          })()
          $("ul").append(`<div class="reset" view="button" name="${translate(["settings", "save"])}" onclick="saveMain()"></div>`)
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        case "fbi":
           $("main ul").append(`
            <li content="${hash}Add" type="settings">
              <h4><a>${translate(["settings", hash, "add"])}</a></h4>
              <h8 meme="${translate(["settings", "total"])}" sum="0">
                <div class="${hash}Add">
                  <input type="text" onkeyup="keyPressAddFBI(event, this);">
                  <div view="button" class="add" name="${translate(["settings", "add"])}" onclick="addFBI(this);"></div>
                </div>
              </h8>
            </li>
            <li content="${hash}" type="settings">
              <h4 display="0">
                <a>${translate(["settings", hash, "names"])}</a>
              </h4>
              <h8></h8>
            </li>
          `)
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
          $(`ul li[content='${hash}']`).append("<h9></h9>");
          (function fbiList(){
            $.ajax({
              url: hash+"List",
              error: err => {if(err.status == 503){
                setTimeout(() => fbiList(), 1000);
                $(`ul li[content='${hash}'] h9>div`).prepend(".").append(".");
                $(`ul li[content='${hash}'] h9`).append(`<div>${translate(["reboot"])}</div>`)
              }},
              success: result => {
                $(`ul li[content='${hash}'] h9`).detach();
                $(`ul li[content='${hash}Add'] h8`).attr({sum: Object.keys(result).length})
                if(Object.keys(result).length) $(`ul li[content='${hash}'] h4`).attr({display: 1})
                for(let i = 0; i < Object.keys(result).length; i++){
                  let key = result[i]["key"];
                  if(!$(`ul li[content='${hash}'] div[username="${key.toLowerCase()}"]`).length){
                    $(`ul li[content='${hash}'] h8`).append(`
                      <div username="${key.toLowerCase()}">  
                        <a target>${key}</a>
                        <input type="checkbox" id="delete_${key}">
                        <label for="delete_${key}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteFBI(this)"></label> 
                      </div>
                    `)
                  }
                }
              },
            })            
          })()
          $("ul").append(`<div class="reset" view="button" name="${translate(["settings", "save"])}" onclick="saveFBI()"></div>`)
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        case "notes":
           $("main ul").append(`
            <li content="${hash}UserAdd" type="settings">
              <h4><a>${translate(["settings", hash, "add"])}</a></h4>
              <h8 meme="${translate(["settings", "total"])}" sum="0">
                <div class="${hash}UserAdd">
                  <input type="text" onkeyup="keyPressAddUserNotes(event, this);">
                  <div view="button" class="add" name="${translate(["settings", "add"])}" onclick="addUserNotes(this);"></div>
                </div>
              </h8>
            </li>
            <li content="${hash}User" type="settings">
              <h4 display="0">
                <a>${translate(["settings", hash, "names"])}</a>
              </h4>
              <h8></h8>
            </li>
          `)
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
          $(`ul li[content='${hash}']`).append("<h9></h9>");
          (function notesList(){
            $.ajax({
              url: hash+"List",
              error: err => {if(err.status == 503){
                setTimeout(() => notesList(), 1000);
                $(`ul li[content='${hash}'] h9>div`).prepend(".").append(".");
                $(`ul li[content='${hash}'] h9`).append(`<div>${translate(["reboot"])}</div>`)
              }},
              success: result => {
                $(`ul li[content='${hash}'] h9`).detach();
                $(`ul li[content='${hash}Add'] h8`).attr({sum: Object.keys(result).length})
                if(Object.keys(result).length) $(`ul li[content='${hash}'] h4`).attr({display: 1})
                // for(let i = 0; i < Object.keys(result).length; i++){
                //   let key = result[i]["key"];
                //   if(!$(`ul li[content='${hash}'] div[username="${key.toLowerCase()}"]`).length){
                //     $(`ul li[content='${hash}'] h8`).append(`
                //       <div username="${key.toLowerCase()}">  
                //         <a target>${key}</a>
                //         <input type="checkbox" id="delete_${key}">
                //         <label for="delete_${key}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteFBI(this)"></label> 
                //       </div>
                //     `)
                //   }
                // }
              },
            })            
          })()
          $("ul").append(`<div class="reset" view="button" name="${translate(["settings", "save"])}" onclick="saveFBI()"></div>`)
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
          
          
          
          
      }        
    }
  })()
}
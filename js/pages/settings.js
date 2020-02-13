function loadSettings(type){
  $("ul").html("");
  (function aaa(){
    if(!$(".rightFilter a").eq(0).attr("href")){
      setTimeout(() => aaa(), 100)
    }else{
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
      hash = type != pathname 
        ? $(type).attr("id").slice(0, -9) 
          : !hash || !filterOnly(["theme", "same", ...allPages], hash)
            ? $(".rightFilter a").eq(0).attr("href").split("#")[1]
              : hash;
      $(`.rightFilter input#${hash}FilterMax`).prop("checked", true);
      history.replaceState('', null, pathname+"#"+hash);
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
      if(filter(allPages, hash)){
        let list = pageSet.bottomMenu.list;
/******/for(let i = 0; i < list.length; i++){
          if(
            !filterOnly(pageSet["bottomMenu"][`turn_${list[i]}`], hash) && 
            !filterOnly(pageSet["bottomMenu"][`hide_${list[i]}`], hash)
          ){  
            if($("ul li[for='cookieRightFilter']").length == 0){
              $("ul").append(`
                <li for="cookieRightFilter" type="settings">
                  <h4><a>${translate([pathname, "activePage"])}</a></h4>
                  <h8 style="flex-direction: row;"></h8>
                </li>
              `)}
            $("li[for='cookieRightFilter'] h8").append(`
              <input type="checkbox" id="${list[i]}Cookie" oninput="objectCookie(this);">
              <label for="${list[i]}Cookie" icon="${list[i]}" bg="_h:dark_c:color_ch:color"></label><br>
            `);
            $(`input#${list[i]}Cookie`).prop("checked", +cookie[`turn_${list[i]}`][hash])
          }       
/******/} 
      }
      let button = ["Reset", "Save"];
      for(let i = 0; i < button.length; i++){
        $("ul").append(`
          <div class="reset" view="button" 
            style="right: ${10 + 130*i}px"
            name="${translate([pathname, button[i].toLowerCase()])}" 
            onclick="${pathname + button[i]}('${hash}')">
          </div>  
        `);
      }
      
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
      switch(hash){
        case "theme":
          $("ul").append(appendRange(hash, [hash, "title"], [0, 359, 1]));
          let value = cookie["hueRotate"][cookie["theme"]];
          $("ul input[name='hueRotate']").val(value).attr({deg: +value});
          $(".reset[onclick*='Save']").detach();
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        case "same":       
          $("main ul").append(
            appendRange("UTC", ["UTC"], [-44, 56, 1]) + 
            appendLiContentAdd()
          );   
          let UTC = cookie["UTC"],
              hour = Math.floor(UTC/4),
              min = zero((UTC - hour*4) * 15);
          $("li[content='UTC'] input[name='UTC']").val(UTC).attr({deg: `${hour >= 0 ? "+"+hour : hour}:${min}`});
          let tracking = pageSet.topMenu.tracking;
          for(let i = 0; i < tracking.length; i++){
            $(`ul li[content='${hash}Add'] .${hash}Add .add`).before(`
              <input type="checkbox" id="${tracking[i]}_${hash}Add" checked>
              <label for="${tracking[i]}_${hash}Add" icon="${tracking[i]}" bg="_h:dark_c:color_ch:color"></label>
            `);
          };
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
          (function sameList(){
            let conformity = hash;
            $.ajax({
              url: hash+"List",
              error: err => {if(err.status == 503){
                setTimeout(() => sameList(), 1000);
                $(`ul li[content='${hash}'] h9>div`).prepend(".").append(".");
                $(`ul li[content='${hash}'] h9`).append(`<div>${translate(["reboot"])}</div>`)
              }},
/*----------*/success: result => {
                if(conformity == hash){
                  $(`ul li[content='${hash}'] h9`).detach();
                  $(`ul li[content='${hash}Add'] h8`).attr({sum: Object.keys(result).length});
                  for(let i = 0; i < Object.keys(result).length; i++){
                    let username = result[i]["username"];
                    if(!i) appendLiContent();
                    if(!$(`ul li[content='${hash}'] div[username="${username.toLowerCase()}"]`).length){
                      $(`ul li[content='${hash}'] h8`).append(`
                        <div username="${username.toLowerCase()}">  
                          <a target="_blank" href="https://www.twitch.tv/${username}">${username}</a>
                          <input type="checkbox" id="delete_${username}">
                          <label for="delete_${username}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${hash}Delete(this)"></label> 
                        </div>
                      `)
                      for(let u = 0; u < tracking.length; u++){
                        let check = result[i][tracking[u]];
                        $(`ul li[content='${hash}'] h8 div[username="${username.toLowerCase()}"] #delete_${username}`).before(`
                          <input type="checkbox" id="${tracking[u]}_${username}" ${check == "true"? "checked" : ""}>
                          <label for="${tracking[u]}_${username}" bg="_c:color_ch:color" icon="${tracking[u]}"></label>
                        `)
                      }
                    }
                  }
                }
/*----------*/},
            })            
          })()
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        case "main":
           $("main ul").append(appendLiContentAdd() + appendLiContentAdd("Anti"));
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
          (function mainList(){
            let conformity = hash;
            $.ajax({
              url: hash+"List",
              error: err => {if(err.status == 503){
                setTimeout(() => mainList(), 1000);
                $(`ul li[content='${hash}'] h9>div`).prepend(".").append(".");
                $(`ul li[content='${hash}'] h9`).append(`<div>${translate(["reboot"])}</div>`)
              }},
/*----------*/success: result => {
                if(conformity == hash){
                  $(`ul li[content='${hash}'] h9`).detach();
                  $(`ul li[content='${hash}Add'] h8`).attr({sum: Object.keys(result).length})
                  for(let i = 0; i < Object.keys(result).length; i++){
                    if(!i) appendLiContent();
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
                }
/*----------*/},
            })            
          })()
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        case "fbi":
           $("main ul").append(appendLiContentAdd() + appendLiContentAdd("Anti"));
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
          (function fbiList(){
            let conformity = hash;
            $.ajax({
              url: hash+"List",
              error: err => {if(err.status == 503){
                setTimeout(() => fbiList(), 1000);
                $(`ul li[content='${hash}'] h9>div`).prepend(".").append(".");
                $(`ul li[content='${hash}'] h9`).append(`<div>${translate(["reboot"])}</div>`)
              }},
/*----------*/success: result => {
                if(conformity == hash){
                  $(`ul li[content='${hash}'] h9`).detach();
                  $(`ul li[content='${hash}Add'] h8`).attr({sum: Object.keys(result).length})
                  for(let i = 0; i < Object.keys(result).length; i++){
                    if(!i) appendLiContent();
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
                }
/*----------*/},
            })            
          })()
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        case "notes":
           $("main ul").append(appendLiContentAdd("User") + appendLiContentAdd() + appendLiContentAdd("Anti"));
//--------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------------//
          // (function notesList(){
          //   $.ajax({
          //     url: hash+"List",
          //     error: err => {if(err.status == 503){
          //       setTimeout(() => notesList(), 1000);
          //       $(`ul li[content='${hash}'] h9>div`).prepend(".").append(".");
          //       $(`ul li[content='${hash}'] h9`).append(`<div>${translate(["reboot"])}</div>`)
          //     }},
          //     success: result => {
          //       $(`ul li[content='${hash}'] h9`).detach();
          //       $(`ul li[content='${hash}Add'] h8`).attr({sum: Object.keys(result).length})
          //       if(Object.keys(result).length) $(`ul li[content='${hash}'] h4`).attr({display: 1})
          //       // for(let i = 0; i < Object.keys(result).length; i++){
          //       //   let key = result[i]["key"];
          //       //   if(!$(`ul li[content='${hash}'] div[username="${key.toLowerCase()}"]`).length){
          //       //     $(`ul li[content='${hash}'] h8`).append(`
          //       //       <div username="${key.toLowerCase()}">  
          //       //         <a target>${key}</a>
          //       //         <input type="checkbox" id="delete_${key}">
          //       //         <label for="delete_${key}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteFBI(this)"></label> 
          //       //       </div>
          //       //     `)
          //       //   }
          //       // }
          //     },
          //   })            
          // })()
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         
          
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        default: $(".reset[onclick*='Save']").detach();   
      }        
    }
  })()
}
function loadSettings(data){
  $("ul").html("");
  $(".getColor").detach();
  (function aaa(){
    if(!$(".rightFilter a").eq(0).attr("href")){
      setTimeout(() => aaa(), 100)
    }else{
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
      hash = data != pathname 
        ? $(data).attr("id").slice(0, -9) 
          : !hash || !filterOnly(settingsPages, hash)
            ? "same" : hash;
      $(`.rightFilter input#${hash}FilterMax`).prop("checked", true);
      history.replaceState('', null, pathname+"#"+hash);
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
      if(filter(settingsPages, hash)){
        let list = pageSet.turn.list;
        if(!$("ul li[for='cookieRightFilter']").length){
          $("ul").append(`
            <li for="cookieRightFilter" type="settings">
              <h4><a>${translate([pathname, "activePage"])}</a></h4>
              <h8 style="flex-direction: row;"></h8>
            </li>
          `)}
/******/for(let i = 0; i < list.length; i++){
          if(filterOnly(pageSet["turn"]["show"][list[i]], hash) && !$(`input#${list[i]}Cookie`).length){
            $("li[for='cookieRightFilter'] h8").append(`
              <input type="checkbox" id="${list[i]}Cookie" oninput="objectCookie(this);">
              <label for="${list[i]}Cookie" 
                icon="${list[i]}" bg="_h:dark_c:color_ch:color"
                onmouseover="help(this, ['help', pathname, 'cookie_${list[i]}'])" 
              ></label><br>
            `);
            $(`input#${list[i]}Cookie`).prop("checked", +cookie["turn"][list[i]][hash])
          }   
/******/} 
        if(!$("li[for='cookieRightFilter'] h8>label").length)
          $("li[for='cookieRightFilter']").detach();
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
      
      switch(hash){    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        case "theme":
          $("ul").append(appendRange(hash, [hash, "title"], [0, 359, 1]));
          let value = cookie["hueRotate"][cookie["theme"]];
          $(`ul input[name='${hash}']`).val(value).attr({deg: +value});
          $(".reset[onclick*='Save']").detach();
        break;
       
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
/*....*/case "same": 
          appendRange("UTC", ["UTC"], [-44, 56, 1]);
          let UTC = cookie["UTC"],
              sign = +UTC >= 0 ? 1 : -1,
              hour = Math.floor(UTC/(4*sign)),
              min = zero((UTC - 4*hour*sign) * 15*sign);
          $("li[content='UTC'] input[name='UTC']").val(UTC).attr({deg: `${UTC >= 0 ? "+"+hour : "-"+hour}:${min}`});
/*....*/case "main": case "fbi": case "tags": case "notes":
          
          
          for(let li = 0; li < pageSet[pathname]["add"][hash].length; li++){
            let type = pageSet[pathname]["add"][hash][li] || "";
            appendLiContentAdd(type);
            if(filterOnly(["same"], hash+type)){
              var tracking = pageSet.topMenu.tracking;
              for(let i = 0; i < tracking.length; i++){
                $(`ul li[content='${hash+type}Add'] .${hash+type}Add .add`).before(`
                  <input type="checkbox" id="${tracking[i]}_${hash+type}Add" checked>
                  <label for="${tracking[i]}_${hash+type}Add" icon="${tracking[i]}" bg="_h:dark_c:color_ch:color"></label>
                `);
              };
            }
            $(`.loadCode input`).prop("checked", true);
/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
/*WMWMWMWM*/(function dbList(type = pageSet[pathname]["add"][hash][li]){
              let conformity = hash+type;
              $.ajax({
                url: "list",
                data: {hash: hash+type},
                error: err => {if(err.status == 503){
                  setTimeout(() => {if(conformity == hash+type) dbList(pageSet[pathname]["add"][hash][li])}, 5000);
                }},
/*============*/success: result => { 
                  if(conformity == hash+type){
                    $("main").css({cursor: ""})
                    $(`.loadCode input`).prop("checked", false)
                    if(result.length && result != "end"){
                      $(`ul li[content='${hash+type}Add'] h4`).attr({sum: Object.keys(result).length})
                      for(let i = 0; i < Object.keys(result).length; i++){
                        if(!i) appendLiContent(type);
                        let group = result[i]["key"];
                        if(!$(`ul li[content='${hash+type}'] h8>div[group="${group.toLowerCase()}"]`).length){
/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
                          let text = group.slice(0, 1) == " " ? "➝"+group.slice(1) : group;
                          $(`ul li[content='${hash+type}'] h8`).append(`
                            <div group="${group.toLowerCase()}" title="«${text.replace(/➝/g," ")}»">  
                              <a target="_blank" ${hash+type == "same" || hash+type == "notesUser" ? `href="https://twitch.tv/${group}"` : ''}>${text}</a>
                              ${hash+type == "main" ? `
                                <color><div style="background-color: ${colorArr[+result[i]["color"]]}" num="${result[i]["color"]}" onclick="getColor(this)"></div></color>
                                <input type="text" onkeyup="${pathname}KeyUp('Trigger', this, event);">
                                <div view="button" class="add" name="${translate([pathname, "add"])}" onclick="${pathname}Add('Trigger', this)"></div>
                              ` : ""}
                              <input type="checkbox" id="delete_${hash+type}_${group}">
                              <label for="delete_${hash+type}_${group}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('', this)"></label> 
                            </div>
                            ${hash+type == "main" ? `
                              <input type="checkbox" id="arrow_${hash+type}_${group.toLowerCase()}">
                              <label for="arrow_${hash+type}_${group.toLowerCase()}" icon="arrow"></label>
                              <nav group="${group.toLowerCase()}"></nav>
                            ` : ""}
                          `);

/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/

/*----------------------*/if(hash+type == "main"){
                            let triggers = result[i]["value"].slice(1, -1).split(",");
                            for(let u = 0; u < triggers.length; u++){
                              let trigger = triggers[u].split(":")[0],
                                  value = triggers[u].split(":")[1];
                              $(`li[content='${hash}'] h8 nav[group="${group}"]`).append(`
                                <wrap trigger="${trigger}">
                                  <a target>${trigger.toLowerCase()}</a>
                                  <input type="text" maxlength="4" maxlength="1" min="0" value="${value}" onkeyup="${pathname}KeyUp('TriggerValue', this, event)">
                                  <input type="checkbox" id="delete_${hash+type}_${group}_${u}">
                                  <label for="delete_${hash+type}_${group}_${u}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('Trigger', this)"></label> 
                                </wrap>
                              `)
                            }
/*----------------------*/}else if(hash == "same"){
                            $(`ul li[content='${hash}'] h8 div[group="${group.toLowerCase()}"] a`).after(`
                              <a target="_blank" type="screen" key="${group.toLowerCase()}"></a> 
                            `);
                            (function getScreen(){
                              $(`ul li[content='${hash}'] h8 div[group="${group.toLowerCase()}"] a[key="${group.toLowerCase()}"]`)
                                .attr({
                                  href: returnURL(1600, 900, group.toLowerCase()),
                                  style: `background-image: url(${returnURL(160, 80, group.toLowerCase())})`
                                })
                              setTimeout(() => {if(hash == "same") getScreen()}, 30000)
                            })()
                            let values = result[i]["value"].slice(1, -1).split(",");
                            for(let u = 0; u < values.length; u++){
                              let key = values[u].split(":")[0],
                                  value = values[u].split(":")[1];
                              $(`ul li[content='${hash}'] h8 div[group="${group.toLowerCase()}"] #delete_${hash+type}_${group}`).before(`
                                <input type="checkbox" id="${key}_${group}" ${value == "true" ? "checked" : ""}>
                                <label for="${key}_${group}" bg="_h:dark_c:color_ch:color" icon="${key}"></label>
                              `)
                            }
/*----------------------*/}

/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
                        }
                      }
                    }
                  }
/*============*/},
              })            
/*WMWMWMWM*/})() 
/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/ 
          }
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        case "help": $(".reset[onclick*='Reset']").detach();   
        default: $(".reset[onclick*='Save']").detach();   
      }        
    }
  })()
}
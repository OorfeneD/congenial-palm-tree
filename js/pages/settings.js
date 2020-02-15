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
              hour = Math.floor(UTC/4),
              min = zero((UTC - hour*4) * 15);
          $("li[content='UTC'] input[name='UTC']").val(UTC).attr({deg: `${hour >= 0 ? "+"+hour : hour}:${min}`});
          var tracking = pageSet.topMenu.tracking;
/*....*/case "notes":
          if(filter(["notes"], hash)) appendLiContentAdd("User");
/*....*/case "main": case "fbi": case "tags":
          appendLiContentAdd();
          if(filter(["same"], hash)){
            for(let i = 0; i < tracking.length; i++){
              $(`ul li[content='${hash}Add'] .${hash}Add .add`).before(`
                <input type="checkbox" id="${tracking[i]}_${hash}Add" checked>
                <label for="${tracking[i]}_${hash}Add" icon="${tracking[i]}" bg="_h:dark_c:color_ch:color"></label>
              `);
            };
          }else{appendLiContentAdd("Anti");}  
/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
/*WMWMWM*/(function dbList(){
            let conformity = hash;
            $.ajax({
              url: "dbList",
              data: {hash},
              error: err => {if(err.status == 503){
                setTimeout(() => dbList(), 1000);
                $(`ul li[content='${hash}'] h9>div`).prepend(".").append(".");
                $(`ul li[content='${hash}'] h9`).append(`<div>${translate(["reboot"])}</div>`)
              }},
/*==========*/success: result => {
                if(conformity == hash){
                  $(`ul li[content='${hash}'] h9`).detach();
                  $(`ul li[content='${hash}Add'] h8`).attr({sum: Object.keys(result).length})
                  for(let i = 0; i < Object.keys(result).length; i++){
                    if(!i) appendLiContent();
                    let group = result[i]["key"];
                    if(!$(`ul li[content='${hash}'] h8>div[group="${group.toLowerCase()}"]`).length){
/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/

                      $(`ul li[content='${hash}'] h8`).append(`
                        <div group="${group.toLowerCase()}">  
                          <a target="_blank" ${hash == "same" ? `href="twitch.tv/${group}"` : ''}>${group}</a>
                          ${hash == "main" ? `
                            <input type="text" onkeyup="${pathname}KeyUp('Trigger', this, event);">
                            <div view="button" class="add" name="${translate([pathname, "add"])}" onclick="${pathname}Add('Trigger', this)"></div>
                          ` : ""}
                          <input type="checkbox" id="delete_${group}">
                          <label for="delete_${group}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('', this)"></label> 
                        </div>
                        ${hash == "main" ? `<nav group="${group.toLowerCase()}"></nav>` : ""}
                      `);
                      
/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
                      
/*------------------*/if(hash == "main"){
                        let triggers = result[i]["value"].slice(1, -1).split(",");
                        for(let u = 0; u < triggers.length; u++){
                          let trigger = triggers[u].split(":")[0],
                              value = triggers[u].split(":")[1];
                          $(`li[content='${hash}'] h8 nav[group="${group}"]`).append(`
                            <wrap trigger="${trigger}">
                              <a target>${trigger.toLowerCase()}</a>
                              <input type="text" maxlength="4" maxlength="1" min="0" value="${value}" onkeyup="${pathname}KeyUp('TriggerValue', this, event)">
                              <input type="checkbox" id="delete_${group}_${u}">
                              <label for="delete_${group}_${u}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('Trigger', this)"></label> 
                            </wrap>
                          `)
                        }
/*------------------*/}else if(hash == "same"){
                        let values = result[i]["value"].slice(1, -1).split(",");
                        for(let u = 0; u < values.length; u++){
                          let key = values[u].split(":")[0],
                              value = values[u].split(":")[1];
                          $(`ul li[content='${hash}'] h8 div[group="${group.toLowerCase()}"] #delete_${group}`).before(`
                            <input type="checkbox" id="${key}_${group}" ${value == "true" ? "checked" : ""}>
                            <label for="${key}_${group}" bg="_c:color_ch:color" icon="${key}"></label>
                          `)
                        }
/*------------------*/}
                      
/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
                    }
                  }
                }
/*==========*/},
            })            
/*WMWMWM*/})() 
/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
        break;
          
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
          
        default: $(".reset[onclick*='Save']").detach();   
      }        
    }
  })()
}
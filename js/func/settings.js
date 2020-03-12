function themeRange(ths){
  let value = zero($(ths).val(), 3);
  $(ths).attr({deg: +value})
  cookie["hueRotate"][cookie["theme"]] = value;
  document.cookie = `hueRotate=${JSON.stringify(cookie["hueRotate"])};expires=${cookieDate}`;   
  getHueRotate();
}
function getHueRotate(){
  if($("style[hueRotate]")){$("style[hueRotate]").remove()}
  $("head").append(`
    <style hueRotate>
      .rightFilter>div, .rightFilter:before, #title, .getLang:before, .rightMenu label, 
      .rightMenu:before, .scrollTop:before, ul li h4, li h8 div[fn], ul li[type="comments"] h8>div,
      li[type="settings"] input[type="range"], li[type="settings"] label, ul .reset,
      .add:hover:before, li[type="settings"] input[type="text"], ul .ignore, .help,
      li[type="settings"]:not([content$="Anti"]) h8>div a:hover, li[type="settings"] nav:after,
      li[type="settings"] nav wrap:after, li[type="settings"] nav:hover wrap>a, div[load],
      input[type="checkbox"][id^="arrow"]:not([id*="Cookie"])[id*="comments"]:after,
      li[type="settings"] nav:hover wrap>input[type="text"], .getTheme:before, .getTheme input:checked+label,
      li h8 .mainMenu
      {filter: hue-rotate(${cookie["hueRotate"][cookie["theme"]]}deg)}

      li>h4>a[datetype='online'], li>h4>.deleteLi:hover, li>h8 div[delete], img.smile, 
      .channelFilterWrap > a input[checked]:not(:checked) + label:before,
      .channelFilterWrap > a input:checked:not([checked]) + label:before,
      body main ul li[type="settings"] input[type="checkbox"]:not([checked]):checked+label[icon]:after,
      body main ul li[type="settings"] input[type="checkbox"][checked]:not(:checked)+label[icon]:after
      {filter: hue-rotate(-${cookie["hueRotate"][cookie["theme"]]}deg)}

    </style>
  `)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UTCRange(ths){
  let value = $(ths).val(),
      sign = +value >= 0 ? 1 : -1,
      hour = Math.floor(value/(4*sign)),
      min = zero((+value - 4*hour*sign) * 15*sign);
  $(ths).attr({deg: `${value >= 0 ? "+"+hour : "-"+hour}:${min}`})
  cookie["UTC"] = value;
  document.cookie = `UTC=${cookie["UTC"]};expires=${cookieDate}`;     
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function objectCookie(ths){
  let value = String(+$(ths).prop("checked")),
      name = $(ths).attr("id").slice(0, -6);
  cookie["turn"][name][hash] = value;
  document.cookie = `turn=${JSON.stringify(cookie["turn"])};expires=${cookieDate}`;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function settingsKeyDown(type, ths, e){
  let e09 = e.which >= 48 && e.which <= 57 ? true : false;
  let eAz = (e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z") || e.keyCode == 8 ? true : false;
  if(filter(["same", "notesUser"], hash+type)){
    if((!eAz && !e09 && e.key != ";") || ($(ths).val() == "" && !isNaN(e.key))) e.preventDefault();
  }
}
function settingsKeyUp(type, ths, e){
  if(filter(["same"], hash)){
    if(!isNaN($(ths).val().slice(0, 1))) $(ths).val($(ths).val().slice(1))
  }
  if(filter(["TriggerValue"], type)){
    if(isNaN($(ths).val())) $(ths).val("")
  }
  if(e.which == 13 && type != "TriggerValue"){settingsAdd(type, $(ths).siblings(`${type == "Anti" ? ".ignore" : ".add"}`));}
} 
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function settingsAdd(type, ths){
  let groups = $(ths).siblings("input[type='text']").val().split(";");
  for(let g = 0; g < groups.length; g++){
    let group = groups[g];
    if(group && group != " " && !$(`li[content="${hash+type}"] div[group="${group.toLowerCase()}"]`).length){
      if(!$(`ul li[content='${hash+type}'] h4`).length) appendLiContent(type);
      $(`ul li[content='${hash+type}'] h4`).attr({display: 1})
  /*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
      let text = group.slice(0, 1) == " " ? "➝"+group.slice(1) : group;
      if(filterOnly(["same", "fbi", "notes", "tags"], hash) || type == "Anti"){
        $(`ul li[content='${hash+type}'] h8`).append(`
          <div group="${group.toLowerCase()}" title="«${text.replace(/➝/g," ")}»" new>  
            <a target="_blank" ${hash+type == "same" || hash+type == "notesUser" ? `href="https://twitch.tv/${group}"` : ''}>${text}</a>
            <input type="checkbox" id="delete_${hash+type}_${group}">
            <label for="delete_${hash+type}_${group}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="settingsDelete('${type}', this); return false"></label> 
          </div>
        `)  
      }
      if(filterOnly(["same"], hash)){
        $(`ul li[content='${hash}'] h8 div[group="${group.toLowerCase()}"] #delete_${hash+type}_${group}`).before(`
          <a target="_blank" type="screen" 
            href="${returnURL(1600, 900, group.toLowerCase())}" 
            style="background-image: url(${returnURL(160, 80, group.toLowerCase())})"
          ></a> 
        `)
        for(let i = 0; i < pageSet.topMenu.tracking.length; i++){
          let link = pageSet.topMenu.tracking[i],
              check = $(`.${hash}Add #${link}_${hash}Add`).prop("checked");
          $(`ul li[content='${hash}'] h8 div[group="${group.toLowerCase()}"] #delete_${hash+type}_${group}`).before(`
            <input type="checkbox" id="${link}_${group}" ${check ? "checked" : ""}>
            <label for="${link}_${group}" bg="_h:dark_c:color_ch:color" icon="${link}"></label>
          `)
        }
      }
      if(filterOnly(["main"], hash)){
        if(type == ""){
          if(!$(`wrap[trigger="${group.toLowerCase()}"]`).length){
            let color = $(`ul li[content='${hash}'] div[group]`).length
            $(`ul li[content='${hash}'] h8`).append(`
              <div group="${group.toLowerCase()}" title="«${text.replace(/➝/g," ")}»" new>  
                <a target>${text}</a>
                <color><div style="background-color: ${colorArr[color]}" num="${color}" onclick="getColor(this)"></div></color>
                <input type="text" onkeyup="${pathname}KeyUp('Trigger', this, event);">
                <div view="button" class="add" name="${translate([pathname, "add"])}" onclick="${pathname}Add('Trigger', this)"></div>
                <input type="checkbox" id="delete_${hash+type}_${group}">
                <label for="delete_${hash+type}_${group}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('', this); return false"></label> 
              </div>
              <input type="checkbox" id="arrow_${hash+type}_${group.toLowerCase()}">
              <label for="arrow_${hash+type}_${group.toLowerCase()}" icon="arrow"></label>
              <nav group="${group.toLowerCase()}">
                <wrap trigger="${group.toLowerCase()}" title="«${text.replace(/➝/g," ")}»" new>
                  <a target>${text}</a>
                  <input type="text" maxlength="4" maxlength="1" min="0" value="1" onkeyup="${pathname}KeyUp('TriggerValue', this, event);">
                  <input type="checkbox" id="delete_${hash+type}_${group}_1">
                  <label for="delete_${hash+type}_${group}_1" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('Trigger', this); return false"></label> 
                </wrap>
              </nav>
            `) 
          }else{alert("err");}
        }else if(type == "Trigger"){
          let oldgroup = $(ths).siblings("a").html(),
              num = +$(`li[content="${hash}"] nav[group="${oldgroup}] wrap"`).length + 1;
          if(!$(`wrap[trigger="${group.toLowerCase()}"]`).length){
            $(`ul li[content='${hash}'] h8 nav[group="${oldgroup}"]`).append(`
              <wrap trigger="${group}" new>
                <a target>${group.toLowerCase()}</a>
                <input type="text" maxlength="4" maxlength="1" min="0" value="1" onkeyup="${pathname}KeyUp('TriggerValue', this, event);">
                <input type="checkbox" id="delete_${hash+type}_${oldgroup}_${num}">
                <label for="delete_${hash+type}_${oldgroup}_${num}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('Trigger', this); return false"></label> 
              </wrap>
            `)
          }else{alert("err");}
        }
      }

  /*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
    }else{alert("err");}
  }
  $(ths).siblings("input[type='text']").val("")
        .siblings("input[type='checkbox']:not([id^='delete'])").prop("checked", true);
  $(`li[content='${hash+type}Add'] h4`).attr({sum: $(`li[content='${hash+type}'] h8 div[group]`).length})
}
function settingsDelete(type, ths){
  let group = $(ths).siblings("a").html();
  if($(ths).parent().attr("new") == ""){
    if(confirm(`${translate([pathname, "delete"])} #${group}?`)){
      $(ths).parent().siblings(`nav[group="${group}"]`).detach();
      $(`label[for='arrow_${hash+type}_${group}'], #arrow_${hash+type}_${group}`).detach();
      $(ths).parent().detach();
      let sum = $(`li[content='${hash+type}'] h8 div[group]`).length;
      $(`li[content='${hash+type}Add'] h4`).attr({sum: sum})   
      sum ? $(`li[content='${hash+type}'] h4`).attr({display: 1})
          : $(`li[content='${hash+type}']`).detach();
    }
  }
}
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function settingsSave(hash){
  let box = {},
      addContentList = $("li[content$='Add']").length;
  for(let i = 0; i < addContentList; i++){
    let type = $("li[content$='Add']").eq(i).attr("content").slice(String(hash).length, -3),
        list = $(`li[content='${hash+type}'] h8>div`);
    if(!filterOnly(["main"], hash+type)){
      box[hash+type] = filterOnly(["same"], hash+type) ? {} : [];
      if(filterOnly(["same"], hash+type)) infoBot["channels"] = {}
      for(let u = 0; u < list.length; u++){
        if(!list.eq(u).children("input[id^='delete_']").prop("checked")){
          if(filterOnly(["same"], hash+type)){
            let group = list.eq(u).children("a").html(),
                tracking = pageSet.topMenu.tracking;
            box[hash+type][group] = {};
            for(let y = 0; y < tracking.length; y++){
              let check = list.eq(u).children(`#${tracking[y]}_${group}`).prop("checked");
              box[hash+type][group][tracking[y]] = check;
            }
            infoBot["channels"][group] = box[hash+type][group]
            box[hash+type][group] = JSON.stringify(box[hash+type][group]).replace(/"/g, "")
          }else{
            box[hash+type].push(list.eq(u).children("a").html())
          }
        }
      }
      if(filterOnly(["same"], hash+type)){
        box[hash+type] = !Object.keys(box[hash+type]).length ? 0 : box[hash+type]
      }else{
        box[hash+type] = !box[hash+type].length ? 0 : box[hash+type]
      }
    }else{
      box[hash+type] = {};
      infoBot["memes"] = {}
      for(let u = 0; u < list.length; u++){
        let group = list.eq(u).children("a").html(),
            color = list.eq(u).children("color").children("div").attr("num"),
            wrap = $(`li[content='${hash+type}'] h8 nav[group="${group.toLowerCase()}"] wrap`);
        box[hash+type][group] = {color: color, value: {}}
        if(
          !list.eq(u).children("[id^='delete_']").prop("checked") &&
          wrap.length &&
          wrap.children("[id^='delete_']").prop("checked").length != wrap.length
        ){
          for(let y = 0; y < wrap.length; y++){
            if(!wrap.eq(y).children("[id^='delete_']").prop("checked")){
              let trigger = wrap.eq(y).children("a").html(),
                  value = wrap.eq(y).children("input[type='text']").val();
              box[hash+type][group]["value"][trigger] = value;
            }
          }
          infoBot["memes"][group] = color
          box[hash+type][group]["value"] = JSON.stringify(box[hash+type][group]["value"])
        }else{delete box[hash+type][group]}
      }
      box[hash+type] = !Object.keys(box[hash+type]).length ? 0 : box[hash+type]
    }
    if(!$(`.loadCode input`).prop("checked")){
      $(`li[content='${hash+type}Add'] h8`).attr({sum: 0})  
      $(`li[content="${hash+type}"]`).detach()
    }  
  }
  if(!$(`.loadCode input`).prop("checked")){
    $.ajax({
      url: pathname+"Save",
      method: 'get',
      data: {box},
      success: res => setTimeout(() => {if(pathname == "settings") loadSettings(pathname)}, 2000),
    })
    $(`.loadCode input`).prop("checked", true);
  }else{alert(translate(["reboot"]))}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





function themeRange(ths){
  let value = zero($(ths).val(), 3);
  $(ths).attr({deg: +value})
  cookie["hueRotate"][cookie["theme"]] = value;
  document.cookie = `hueRotate=${JSON.stringify(cookie["hueRotate"]).replace(/"/g,"")};expires=${cookieDate}`;   
  getHueRotate();
}
function getHueRotate(){
  if($("style[hueRotate]")){$("style[hueRotate]").remove()}
  $("head").append(`
    <style hueRotate>
      .rightFilter>div, .rightFilter:before, #title, .getLang:before, .rightMenu label, 
      .rightMenu:before, .scrollTop:before, ul li h4, ul li[type="comments"] h8>div,
      li[type="settings"] input[type="range"], li[type="settings"] label, ul .reset,
      .add:hover:before, li[type="settings"] input[type="text"], ul .ignore,
      li[type="settings"] h8>div a:hover, li[type="settings"] nav:after,
      li[type="settings"] nav wrap:after, li[type="settings"] nav:hover wrap>a,
      li[type="settings"] nav:hover wrap>input[type="text"]
      {filter: hue-rotate(${cookie["hueRotate"][cookie["theme"]]}deg)}

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
      hour = Math.floor(value/4),
      min = zero((value - hour*4) * 15);
  $(ths).attr({deg: `${hour >= 0 ? "+"+hour : hour}:${min}`})
  cookie["UTC"] = value;
  document.cookie = `UTC=${cookie["UTC"]};expires=${cookieDate}`;     
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function objectCookie(ths){
  let value = +$(ths).prop("checked"),
      name = $(ths).attr("id").slice(0, -6);
  cookie[`turn_${name}`][hash] = value;
  document.cookie = `turn_${name}=${JSON.stringify(cookie[`turn_${name}`]).replace(/"/g,"")};expires=${cookieDate}`;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function settingsKeyDown(type, ths, e){
  let e09 = e.which >= 48 && e.which <= 57 ? true : false;
  let eAz = (e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z") || e.keyCode == 8 ? true : false;
  if(filter(["same"], hash)){
    if((!eAz && !e09) || ($(ths).val() == "" && !isNaN(e.key))) e.preventDefault();
  }
}
function settingsKeyUp(type, ths, e){
  if(filter(["same"], hash)){
    if(!isNaN($(ths).val().slice(0, 1))) $(ths).val($(ths).val().slice(1))
  }
  if(filter(["TriggerValue"], type)){
    if(isNaN($(ths).val())) $(ths).val("")
  }
  if(e.which == 13 && type != "TriggerValue"){settingsAdd(type, `li[content='${hash+type}Add'] .${type == "Anti" ? "ignore" : "add"}`)}
} 
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function settingsAdd(type, ths){
  let group = $(ths).siblings("input[type='text']").val();
  if(group && !$(`li[content="${hash+type}"] div[group="${group.toLowerCase()}"]`).length){
    if(!$(`ul li[content='${hash+type}'] h4`).length) appendLiContent(type);
    $(`ul li[content='${hash+type}'] h4`).attr({display: 1})
/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
    
    if(filterOnly(["same", "fbi", "notes", "tags"], hash) || type == "Anti"){
      $(`ul li[content='${hash+type}'] h8`).append(`
        <div group="${group.toLowerCase()}" new>  
          <a target="_blank" href="https://www.twitch.tv/${group}">${group}</a>
          <input type="checkbox" id="delete_${hash+type}_${group}">
          <label for="delete_${hash+type}_${group}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="settingsDelete('${type}', this); return false"></label> 
        </div>
      `)  
    }
    if(filterOnly(["same"], hash)){
      for(let i = 0; i < pageSet.topMenu.tracking.length; i++){
        let link = pageSet.topMenu.tracking[i],
            check = $(`.${hash}Add #${link}_${hash}Add`).prop("checked");
        $(`ul li[content='${hash}'] h8 div[group="${group.toLowerCase()}"] #delete_${hash+type}_${group}`).before(`
          <input type="checkbox" id="${link}_${group}" ${check ? "checked" : ""}>
          <label for="${link}_${group}" bg="_c:color_ch:color" icon="${link}"></label>
        `)
      }
    }
    if(filterOnly(["main"], hash)){
      if(type == ""){
        $(`ul li[content='${hash}'] h8`).append(`
          <div group="${group.toLowerCase()}" new>  
            <a target>${group}</a>
            <input type="text" onkeyup="${pathname}KeyUp('Trigger', this, event);">
            <div view="button" class="add" name="${translate([pathname, "add"])}" onclick="${pathname}Add('Trigger', this)"></div>
            <input type="checkbox" id="delete_${hash+type}_${group}">
            <label for="delete_${hash+type}_${group}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('', this); return false"></label> 
          </div>
          <nav group="${group.toLowerCase()}">
            <wrap trigger="${group.toLowerCase()}" new>
              <a target>${group}</a>
              <input type="text" maxlength="4" maxlength="1" min="0" value="1" onkeyup="${pathname}KeyUp('TriggerValue', this, event);">
              <input type="checkbox" id="delete_${hash+type}_${group}_1">
              <label for="delete_${hash+type}_${group}_1" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('Trigger', this); return false"></label> 
            </wrap>
          </nav>
        `) 
      }else if(type == "Trigger"){
        let oldgroup = $(ths).siblings("a").html(),
            num = +$(`li[content="${hash}"] nav[group="${oldgroup}] wrap"`).length + 1;
        $(`ul li[content='${hash}'] h8 nav[group="${oldgroup}"]`).append(`
          <wrap trigger="${group}" new>
            <a target>${group.toLowerCase()}</a>
            <input type="text" maxlength="4" maxlength="1" min="0" value="1" onkeyup="${pathname}KeyUp('TriggerValue', this, event);">
            <input type="checkbox" id="delete_${hash+type}_${oldgroup}_${num}">
            <label for="delete_${hash+type}_${oldgroup}_${num}" view="button_red" class="delete" name="${translate([pathname, "delete"])}" onclick="${pathname}Delete('Trigger', this); return false"></label> 
          </wrap>
        `)
      }
    }

/*WMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWM*/
  }else{alert("err");}
  $(ths).siblings("input[type='text']").val("")
        .siblings("input[type='checkbox']:not([id^='delete'])").prop("checked", true);
  $(`li[content='${hash+type}Add'] h8`).attr({sum: $(`li[content='${hash+type}'] h8 div[group]`).length})
}
function settingsDelete(type, ths){
  let group = $(ths).siblings("a").html();
  if($(ths).parent().attr("new") == ""){
    if(confirm(`${translate([pathname, "delete"])} #${group}?`)){
      $(ths).parent().detach();
      let sum = $(`li[content='${hash+type}'] h8 div[group]`).length;
      $(`li[content='${hash+type}Add'] h8`).attr({sum: sum})   
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
      for(let u = 0; u < list.length; u++){
        if(!list.eq(u).children("input[id^='delete_']").prop("checked")){
          if(filterOnly(["same"], hash+type)){
            let group = list.eq(u).children("a").html(),
                tracking = pageSet.topMenu.tracking;
            box[hash+type][group] = "{";
            for(let y = 0; y < tracking.length; y++){
              let check = list.eq(u).children(`#${tracking[y]}_${group}`).prop("checked");
              box[hash+type][group] += `${tracking[y]}:${check},`;
            }
            box[hash+type][group] = box[hash+type][group].slice(0, -1)+"}"
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
      for(let u = 0; u < list.length; u++){
        let group = list.eq(u).children("a").html(),
            wrap = $(`li[content='${hash+type}'] h8 nav[group="${group.toLowerCase()}"] wrap`)
        if(
          !list.eq(u).children("[id^='delete_']").prop("checked") &&
          wrap.length &&
          wrap.children("[id^='delete_']").prop("checked").length != wrap.length
        ){
          box[hash+type][group] = "{";
          for(let y = 0; y < wrap.length; y++){
            if(!wrap.eq(y).children("[id^='delete_']").prop("checked")){
              let trigger = wrap.eq(y).children("a").html(),
                  value = wrap.eq(y).children("input[type='text']").val();
              box[hash+type][group] += `${trigger}:${value},`;
            }
          }
          box[hash+type][group] = box[hash+type][group].slice(0, -1)+"}"
          if(box[hash+type][group] == "}") delete box[hash+type][group]
        }
      }
      box[hash+type] = !Object.keys(box[hash+type]).length ? 0 : box[hash+type]
    }
    $(`li[content="${hash+type}"]`).detach()
  }

  if(!$(`.loadCode input`).prop("checked")){
    $.ajax({
      url: pathname+"Save",
      method: 'get',
      data: {box},
      success: res => loadSettings(pathname),
    })
    $(`.loadCode input`).prop("checked", true);
  }else{alert(translate(["reboot"]))}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





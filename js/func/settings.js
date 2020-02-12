function hueRotate(ths){
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
      .add:hover:before, li[type="settings"] input[type="text"],
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
function getUTC(ths){
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
function keyPressAddStreamers(e, ths){
  if(e.which >= 48 && e.which <= 57 && !isNaN($(ths).val().slice(0, 1))){$(ths).val("")}
  if(e.which != 8 && (e.which < 48 || e.which > 122 || (e.which >= 58 && e.which <= 64) || (e.which >= 91 && e.which <= 95))){e.preventDefault();}
  if(e.which == 13){addStreamer("li[content='streamersAdd'] .add")}
} 
function addStreamer(ths){
  let streamer = {},
      username = $(ths).siblings("input[type='text']").val();
  if(username && isNaN(username.slice(0, 1)) && !$(`li[content="streamers"] div[streamer="${username.toLowerCase()}"]`).length){
    streamer[username] = {};
    $("ul li[content='streamers'] h4").attr({display: 1})
    $("ul li[content='streamers'] h8").append(`
      <div streamer="${username.toLowerCase()}" new>  
        <a target="_blank" href="https://www.twitch.tv/${username}">${username}</a>
        <input type="checkbox" id="delete_${username}">
        <label for="delete_${username}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteStreamer(this); return false"></label> 
      </div>
    `)    
    for(let i = 0; i < pageSet.topMenu.tracking.length; i++){
      let link = pageSet.topMenu.tracking[i],
          check = $(`.streamersAdd #${link}StreamersAdd`).prop("checked");
      streamer[username][link] = check;
      $(`ul li[content='streamers'] h8 div[streamer="${username.toLowerCase()}"] #delete_${username}`).before(`
        <input type="checkbox" id="${link}_${username}" ${check ? "checked" : ""}>
        <label for="${link}_${username}" bg="_c:color_ch:color" icon="${link}"></label>
      `)
    }
  }else{alert("err"); $(ths).siblings("input[type='text']").val("")}
  $(ths).siblings("input[type='text']").val("")
        .siblings("input[type='checkbox']").prop("checked", true);
  $("li[content='streamersAdd'] h8").attr({sum: $("li[content='streamers'] h8 div[streamer]").length})
}
function deleteStreamer(ths){
  let username = $(ths).siblings("a").html();
  if($(ths).parent().attr("new") == ""){
    if(confirm(`${translate(["settings", "delete"])} #${username}?`)){
      $(ths).parent().detach();
      let sum = $("li[content='streamers'] h8 div[streamer]").length;
      $("li[content='streamersAdd'] h8").attr({sum: sum})   
      $("li[content='streamers'] h4").attr({display: sum ? 1 : 0})
    }
  }
}
function saveStreamers(){
  let streamers = {},
      list = $("li[content='streamers'] h8 div[streamer]");
  for(let i = 0; i < list.length; i++){
    if(!list.eq(i).children("[id^='delete_']").prop("checked")){
      let username = list.eq(i).children("a").html(),
          tracking = pageSet.topMenu.tracking;
      streamers[username] = {tracking: {}};
      for(let u = 0; u < tracking.length; u++){
        let check = list.eq(i).children(`#${tracking[u]}_${username}`).prop("checked");
        streamers[username]["tracking"][tracking[u]] = check;
      }
    }
  } 
  if(!Object.keys(streamers).length) streamers = 0
  if(!$("li[content='streamers'] h9").length){
    $.ajax({
      url: "streamersSave",
      method: 'get',
      data: {streamers},
      success: res => loadSettings(pathname),
    })
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function keyPressAddMain(e){if(e.which == 13){addMain("li[content='mainAdd'] .add")}} 
function keyPressAddMainTrigger(e, ths){
  let group = $(ths).parent().attr("group");
  if(e.which == 13){addMainTrigger($("li[content='main'] div[group='"+group+"']>.add"))}
} 
function keyPressMainTriggerValue(e, ths){
  if(isNaN(e.key) && $(ths).val() != "0" && $(ths).val() != "0."){$(ths).val("")}
}

function addMain(ths){
  let group = $(ths).siblings("input[type='text']").val();
  if(group && !$(`li[content="main"] div[group="${group.toLowerCase()}"]`).length){
    $("ul li[content='main'] h4").attr({display: 1})
    $("ul li[content='main'] h8").append(`
      <div group="${group.toLowerCase()}" new>  
        <a target>${group}</a>
        <input type="text" onkeypress="keyPressAddMainTrigger(event, this)">
        <div view="button" class="add" name="${translate(["settings", "add"])}" onclick="addMainTrigger(this)"></div>
        <input type="checkbox" id="delete_${group}">
        <label for="delete_${group}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteMain(this); return false"></label> 
      </div>
      <nav group="${group.toLowerCase()}">
        <wrap trigger="${group.toLowerCase()}">
          <a target>${group}</a>
          <input type="text" maxlength="3" maxlength="1" min="0" value="1" onkeyup="keyPressMainTriggerValue(event, this)">
          <input type="checkbox" id="delete_${group}_1">
          <label for="delete_${group}_1" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteMainTrigger(this); return false"></label> 
        </wrap>
      </nav>
    `)    
  }else{alert("err"); $(ths).siblings("input[type='text']").val("")}
  $(ths).siblings("input[type='text']").val("")
        .siblings("input[type='checkbox']").prop("checked", true);
  $("li[content='mainAdd'] h8").attr({sum: $("li[content='main'] h8 div[group]").length})
}
function addMainTrigger(ths){
  let group = $(ths).parent().attr("group"),
      trigger = $(ths).siblings("input[type='text']").val(),
      num = +$(`ul li[content='main'] h8 nav[group="${group}"] wrap`).length+1;
  if(group && trigger && !$(`li[content="main"] nav[group="${group}"] wrap[trigger="${trigger.toLowerCase()}"]`).length){
    $(`ul li[content='main'] h8 nav[group="${group}"]`).append(`
      <wrap trigger="${trigger}">
        <a target>${trigger.toLowerCase()}</a>
        <input type="text" maxlength="3" maxlength="1" min="0" value="1" onkeyup="keyPressMainTriggerValue(event, this)">
        <input type="checkbox" id="delete_${group}_${num}">
        <label for="delete_${group}_${num}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteMainTrigger(this); return false"></label> 
      </wrap>
    `)
    $(ths).siblings("input[type='text']").val("");
  }else{alert("err"); $(ths).siblings("input[type='text']").val("")}
}

function deleteMain(ths){
  let group = $(ths).siblings("a").html();
  if($(ths).parent().attr("new") == ""){
    if(confirm(`${translate(["settings", "delete"])} #${group}?`)){
      $(ths).parent().detach();
      $(`li[content='main'] h8 nav[group="${group.toLowerCase()}"]`).detach();
      let sum = $("li[content='main'] h8 div[group]").length;
      $("li[content='mainAdd'] h8").attr({sum: sum})   
      $("li[content='main'] h4").attr({display: sum ? 1 : 0})
    }
  }
}
function deleteMainTrigger(ths){
  let group = $(ths).attr("for").split("_")[1],
      trigger = $(ths).siblings("a").html();
  if($(`li[content='main'] h8 div[group="${group}"]`).attr("new") == ""){
    if(confirm(`${translate(["settings", "delete"])} #${group} » ${trigger}?`)){
      $(ths).parent().detach();
    }
  }
}

function saveMain(){
  let box = {},
      list = $("li[content='main'] h8 div[group]");
  for(let g = 0; g < list.length; g++){
    let group = list.eq(g).children("a").html(),
        wrap = $(`li[content='main'] h8 nav[group="${group.toLowerCase()}"] wrap`)
    if(
      !list.eq(g).children("[id^='delete_']").prop("checked") &&
      wrap.length &&
      wrap.children("[id^='delete_']").prop("checked").length != wrap.length
    ){
      box[group] = {};
      for(let t = 0; t < wrap.length; t++){
        if(!wrap.eq(t).children("[id^='delete_']").prop("checked")){
          let trigger = wrap.eq(t).children("a").html(),
              value = wrap.eq(t).children("input[type='text']").val();
          box[group][trigger] = value;
        }
      }
    }
  }
  if(!Object.keys(box).length) box = 0;
  if(!$("li[content='main'] h9").length){
    console.log("main: ", box)
    $.ajax({
      url: "mainSave",
      method: 'get',
      data: {box},
      success: res => {
        console.log(res);
        loadSettings(pathname)
      }
    })
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function keyPressAddFBI(e, ths){
  if(e.which >= 48 && e.which <= 57 && !isNaN($(ths).val().slice(0, 1))){$(ths).val("")}
  if(e.which != 8 && (e.which < 48 || e.which > 122 || (e.which >= 58 && e.which <= 64) || (e.which >= 91 && e.which <= 95))){e.preventDefault();}
  if(e.which == 13){addFBI("li[content='fbiAdd'] .add")}
} 
function addFBI(ths){
  let username = $(ths).siblings("input[type='text']").val();
  if(username && isNaN(username.slice(0, 1)) && !$(`li[content="fbi"] div[username="${username.toLowerCase()}"]`).length){
    $("ul li[content='fbi'] h4").attr({display: 1})
    $("ul li[content='fbi'] h8").append(`
      <div username="${username.toLowerCase()}" new>  
        <a target="_blank" href="https://www.twitch.tv/${username}">${username}</a>
        <input type="checkbox" id="delete_${username}">
        <label for="delete_${username}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteStreamer(this); return false"></label> 
      </div>
    `)    
  }else{alert("err"); $(ths).siblings("input[type='text']").val("")}
  $(ths).siblings("input[type='text']").val("")
        .siblings("input[type='checkbox']").prop("checked", true);
  $("li[content='fbiAdd'] h8").attr({sum: $("li[content='fbi'] h8 div[username]").length})
}
function deleteFBI(ths){
  let username = $(ths).siblings("a").html();
  if($(ths).parent().attr("new") == ""){
    if(confirm(`${translate(["settings", "delete"])} #${username}?`)){
      $(ths).parent().detach();
      let sum = $("li[content='fbi'] h8 div[username]").length;
      $("li[content='fbiAdd'] h8").attr({sum: sum})   
      $("li[content='fbi'] h4").attr({display: sum ? 1 : 0})
    }
  }
}
function saveFBI(){
  let box = [],
      list = $("li[content='fbi'] h8 div[username]");
  for(let i = 0; i < list.length; i++){
    if(!list.eq(i).children("[id^='delete_']").prop("checked")){
      box.push(list.eq(i).children("a").html());
    }
  } 
  if(!box.length) box = 0
  if(!$("li[content='fbi'] h9").length){
    $.ajax({
      url: "fbiSave",
      method: 'get',
      data: {box},
      success: res => loadSettings(pathname),
    })
  }
}
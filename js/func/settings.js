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
      .add:hover:before, li[type="settings"] h8>div input[type="text"],
      li[type="settings"] h8>div a:hover
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
  if(e.which >= 48 && e.which <= 57 && !$(".streamersAdd input[type='text']").val().length){e.preventDefault();}
  if(e.which < 48 || e.which > 122 || (e.which >= 58 && e.which <= 64) || (e.which >= 91 && e.which <= 95)){e.preventDefault();}
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
  }
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
function keyPressAddMain(e, ths){
  if(e.which == 13){addMain("li[content='mainAdd'] .add")}
} 
function addMain(ths){
  let streamer = {},
      group = $(ths).siblings("input[type='text']").val();
  if(group && !$(`li[content="main"] div[group="${group.toLowerCase()}"]`).length){
    // streamer[username] = {};
    $("ul li[content='main'] h4").attr({display: 1})
    $("ul li[content='main'] h8").append(`
      <div group="${group.toLowerCase()}" new>  
        <a target>${group}</a>
        <input type="text" onkeypress="keyPressAddMainTrigger(this)">
        <div view="button" class="add" name="${translate(["settings", "add"])}"></div>
        <input type="checkbox" id="delete_${group}">
        <label for="delete_${group}" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteMain(this); return false"></label> 
      </div>
      <nav>
        <wrap>
          <a target>${group}</a>
          <input type="text">
          <input type="checkbox" id="delete_${group}_1">
          <label for="delete_${group}_1" view="button_red" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteMainTrigger(this); return false"></label> 
        </wrap>
      </nav>
    `)    
    // for(let i = 0; i < pageSet.topMenu.tracking.length; i++){
    //   let link = pageSet.topMenu.tracking[i],
    //       check = $(`.streamersAdd #${link}StreamersAdd`).prop("checked");
    //   streamer[username][link] = check;
    //   $(`ul li[content='streamers'] h8 div[streamer="${username.toLowerCase()}"] #delete_${username}`).before(`
    //     <input type="checkbox" id="${link}_${username}" ${check ? "checked" : ""}>
    //     <label for="${link}_${username}" bg="_c:color_ch:color" icon="${link}"></label>
    //   `)
    // }
  }
  $(ths).siblings("input[type='text']").val("")
        .siblings("input[type='checkbox']").prop("checked", true);
  $("li[content='mainAdd'] h8").attr({sum: $("li[content='main'] h8 div[group]").length})
}





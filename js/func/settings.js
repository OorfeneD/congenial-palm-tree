
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
      input[type="range"][name="hueRotate"], li[type="settings"] label, ul .reset,
      .streamersAdd .add:hover:before, li[type="settings"] h8>div input[type="text"]:hover,
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
function objectCookie(ths){
  let value = +$(ths).prop("checked"),
      name = $(ths).attr("id").slice(0, -6);
  cookie[`turn_${name}`][hash] = value;
  document.cookie = `turn_${name}=${JSON.stringify(cookie[`turn_${name}`]).replace(/"/g,"")};expires=${cookieDate}`;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addStreamer(ths){
  let streamer = {},
      username = $(ths).siblings("input[type='text']").val();
  if(username && isNaN(username.slice(0, 1))){
    streamer[username] = {};
    $("ul li[content='streamers'] h8").append(`
      <div streamer="${username}" new>  
        <a target="_blank" href="https://www.twitch.tv/${username}">${username}</a>
        <input type="checkbox" id="delete_${username}">
        <label for="delete_${username}" class="delete" name="${translate(["settings", "delete"])}" onclick="deleteStreamer(this)"></label> 
      </div>
    `)    
    for(let i = 0; i < pageSet.topMenu.tracking.length; i++){
      let link = pageSet.topMenu.tracking[i],
          check = $(`.streamersAdd #${link}StreamersAdd`).prop("checked");
      streamer[username][link] = check;
      $(`ul li[content='streamers'] h8 div[streamer="${username}"] #delete_${username}`).before(`
        <input type="checkbox" id="${link}_${username}" ${check ? "checked" : ""}>
        <label for="${link}_${username}" icon="${link}"></label>
      `)
    }
  }
  $(ths).siblings("input[type='text']").val("")
        .siblings("input[type='checkbox']").prop("checked", true);
  $("li[content='streamers'] h8").attr({sum: $("li[content='streamers'] h8 div[streamer]").length})
}

function deleteStreamer(ths){
  let username = $(ths).siblings("a").html();
  if($(ths).parent().attr("new") == ""){
    if(confirm(`${translate(["settings", "delete"])} #${username}?`)){
      $(ths).parent().detach();
      $("li[content='streamers'] h8").attr({sum: $("li[content='streamers'] h8 div[streamer]").length})      
    }
  }
}









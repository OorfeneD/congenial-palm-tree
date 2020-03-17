
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function getRightFilter(){
  setTimeout(() => {
    let active = $(".bottomMenu #filter").prop("checked");
    $(".rightFilter").html("<div></div>").css({display: active ? "flex" : "none"});
    $(".rightFilter>div").append(`<div view="button" id="resetAll" name="${translate(["menu", "filter", "resetAll"+(pathname=="settings"?"Settings":"")])}" onclick="allReset()"></div>`)
    switch(pathname){
      case "settings":
        for(let i = 0; i < settingsPages.length; i++){
          $(".rightFilter>div").append(`
            <a style="display: flex; width: 100%;" href="/${pathname}#${settingsPages[i]}">
              <input type="radio" name="filterMax" id="${settingsPages[i]}FilterMax" onclick="loadSettings(this)">
              <label view="button" for="${settingsPages[i]}FilterMax"></label>
            </a>
          `)
          $(`.rightFilter input#${hash}FilterMax`).prop("checked", true);
          $(`.rightFilter label[for="${settingsPages[i]}FilterMax"]`).attr({
            name: i == 0 || i == 1 ? translate(["menu", "filter", settingsPages[i]]) : translate(["pages", settingsPages[i]]),
          })
        }
        let widthSmall = $(".rightMenu").width(),
            paddingTop = ($(document).height() % widthSmall )+ widthSmall;
        $(".rightFilter>div").css("padding-bottom", paddingTop + "px")
      break;
      default:   
        $(".rightFilter>div").append(`
          <input type="checkbox" less="${translate(["menu", "filter", "less"])}" more="${translate(["menu", "filter", "more"])}" id="filterOrder" ${get[pathname]["sort"] == "ASC" ? "checked" : ""}>
          <label view="icon" onmouseover="help(this, ['help', 'sort', 'order'])" bg="_h:color_ch:color" icon="sort_order" for="filterOrder"></label>
          <div id="filterRadio"></div>
        `);
        
        let filterRadio = ["id", "pop", "duration"],
            fRcheck = get[pathname]["by"] ? get[pathname]["by"] : filterRadio[0];
        for(let i = 0; i < filterRadio.length; i++){
          $(".rightFilter>div #filterRadio").append(`
            <input type="radio" name="filterRadio" id="filterRadio_${filterRadio[i]}" ${fRcheck == filterRadio[i] ? "checked" : ""}>
            <label view="icon" onmouseover="help(this, ['help', 'sort', '${filterRadio[i]}'])" bg="_h:color_c:color_ch:color" icon="sort_${filterRadio[i]}" for="filterRadio_${filterRadio[i]}"></label>
          `);
        }
        
        let filterWrap = ["date", "pop", "duration"];
        for(let i = 0; i < filterWrap.length; i++){
          let name = filterWrap[i]
          $(".rightFilter>div").append(`
            <input type="checkbox" id="${name}FilterWrap" ${get[pathname][name] ? "checked" : ""}>
            <label view="button" for="${name}FilterWrap" name="${translate(["menu", "filter", "wrap", name])}" bg="_c:color_h:color_ch:color"></label>
            <div class="${name}FilterWrap"></div>
          `)
          for(let u = 0; u < 2; u++){
            let pseudo = !u ? "Before" : "After",
                getRes = get[pathname][name]
            let val = getRes
                ? name == "duration"
                  ? tLSr(getRes).split("-")[u]
                  : getRes.split("-")[u]
                : filterDefault[name][pseudo.toLowerCase()]
            $(`.rightFilter>div .${name}FilterWrap`).append(`
              <input type="text" maxlength="${i!=2?10:8}" id="${name}FilterBefore" value="${val}" onkeydown="filterKeyDown(this, event);" onkeyup="filterKeyUp(this, event);">
            `)
          }
        }
        
        if(Object.keys(infoBot.channels).length){
          $(".rightFilter>div>#dateFilterWrap").before(`
            <input type="checkbox" id="channelFilterWrap" ${get[pathname]["channel"] ? "checked" : "checked"}>
            <label view="button" for="channelFilterWrap" name="${translate(["menu", "filter", "wrap", "channel"])}" bg="_c:color_h:color_ch:color"></label>
            <div class="channelFilterWrap"></div>
          `);
          for(let i = 0; i < Object.keys(infoBot["channels"]).length; i++){
            let key = Object.keys(infoBot["channels"])[i];
            if(!filter(["notes", "fbi", "tags"], pathname) || infoBot["channels"][key][pathname] == "true"){
              $("div.channelFilterWrap").append(`
                <a href="/${pathname}?channel=${key}" target="_blank">
                  <input type="checkbox" name="channelFilterWrap" id="channel_${key}" ${get[pathname]["channel"] ? filter(get[pathname]["channel"].split(","), key) ? "checked" : "" : "checked"}>
                  <label view="button" for="channel_${key}" name="${key}" bg="_c:color_h:color_ch:color" onclick="channelFilter(this);" ondblclick="channelFilter(this, 1);" oncontextmenu="channelFilter(this, 2, event)"></label>  
                </a>
              `)
            }
          }
        }



        
        
        $(".rightFilter>div").append(`<div view="button" id="activeFilter" name="${translate(["menu", "filter", "active"])}" onclick="activeFilter()"></div>`)
      break;
    }
  }, 50)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function activeFilter(){
  let url = ``;
      url += $("#filterOrder").prop("checked") ? "&sort=ASC" : "";
  let by = $("#filterRadio input:checked").attr("id").split("_")[1];
      url += by != "id" ? `&by=${by}` : "";

  if(($("#dateFilterBefore").val() != "01.01.2020" || $("#dateFilterAfter").val() != tLS(new Date())) && $("#dateFilterWrap").prop("checked")){
    url += `&date=`+$("#dateFilterBefore").val() + "-" + $("#dateFilterAfter").val()
  }
  
  if(($("#popFilterBefore").val() != "0" || $("#popFilterAfter").val() != "99999999") && $("#popFilterWrap").prop("checked")){
    url += `&pop=`+$("#popFilterBefore").val() + "-" + $("#popFilterAfter").val()
  }
  
  if(
    ($("#durationFilterBefore").val() != "00:00:00" || $("#durationFilterAfter").val() != "23:59:59") && 
    $("#durationFilterWrap").prop("checked")
  ){
    url += `&duration=` + tLS2($("#durationFilterBefore").val(), 1) + "-" + tLS2($("#durationFilterAfter").val(), 1)
  } 
  
  let streamArr = $(".channelFilterWrap input:checked");
  if(streamArr.length && streamArr.length != $(".channelFilterWrap input").length && $("#channelFilterWrap").prop("checked")){
    url += `&channel=`
    for(let i = 0; i < streamArr.length; i++){
      url += streamArr.eq(i).attr("id").split("_")[1]+","
    }
    url = url.slice(0, -1)
  }
  
  url = url.length != 0 ? "?"+url.slice(1) : 1;
  getToObj(url)
  start(pathname, url)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function filterKeyDown(ths, e){
  if((e.which < 48 || e.which > 57) && e.which != 8 && e.which != 46) e.preventDefault();
  let keys = {date: ".", duration: ":"}
  for(let k = 0; k < Object.keys(keys).length; k++){
    if(filter([Object.keys(keys)[k]], $(ths).attr("id"))){
      if(filterOnly([2, 5], $(ths).val().length) && e.which != 8)
        $(ths).val($(ths).val() + Object.values(keys)[k])
    }
  }
}
function filterKeyUp(ths, e){
  let keys = {date: ".", duration: ":"}
  let nums = $(ths).val().split(""),
      res = "";
  for(let k = 0; k < Object.keys(keys).length; k++){
    if(filter([Object.keys(keys)[k]], $(ths).attr("id"))){
      for(let i = 0; i < nums.length; i++){
        if(i==2 || i==5){res += !isNaN(nums[i]) ? Object.values(keys)[k]+nums[i] : nums[i]}
          else{res += !isNaN(nums[i]) ? nums[i] : ""}
      }
      $(ths).val(res)
    }
  }  
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function channelFilter(ths, dbl = 0, e){
  let id = $(ths).attr("for");
  if(!dbl){
    if($(`input#${id}[checked]`).length){
      if(!$(`input#${id}[checked]`).prop("checked")){
        $(`ul li[username='${id.split("_")[1]}']`).show();
        $(`ul label[username='${id.split("_")[1]}']`).show();
      }else{
        $(`ul li[username='${id.split("_")[1]}']`).hide();
        $(`ul label[username='${id.split("_")[1]}']`).hide();
      }
    }
  }else if(dbl == 1){
    $(`input#${id}[checked]`).prop("checked", true);
    $(`ul li[username='${id.split("_")[1]}']`).show();
    $(`ul label[username='${id.split("_")[1]}']`).show();
    
    $(`.channelFilterWrap input:not([id='${id}'])`).prop("checked", false)
    $(`ul li:not([username='${id.split("_")[1]}'])`).hide();
    $(`ul label:not([username='${id.split("_")[1]}'])`).hide();
  }else{
    e.preventDefault();
    $(`.channelFilterWrap input[checked]`).prop("checked", true);
    $(`ul li, ul label`).show();
  }
  addTitleNum();
}

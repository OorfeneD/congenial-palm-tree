
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function getRightFilter(){
  setTimeout(() => {
    let active = $(".bottomMenu #filter").prop("checked");
    $(".rightFilter").html("<div></div>").css({display: active ? "flex" : "none"})
      .children().append(`
        <div view="button" id="resetAll" onclick="allReset()"
         name="${translate(["menu", "filter", `resetAll${ pathname == "settings" ? upFirst(pathname) : "" }`])}"></div>
      `)
    switch(pathname){
      case "settings":
        for(let i = 0; i < settingsPages.length; i++){
          let name = settingsPages[i]
          $(".rightFilter>div").append(`
            <a href="/${pathname}#${name}">
              <input type="radio" name="filterMax" id="${name}FilterMax" onclick="loadSettings(this)">
              <label view="button" for="${name}FilterMax"></label>
            </a>
          `)
          $(`.rightFilter label[for="${name}FilterMax"]`).attr({
            name: translate([...(filterOnly([0, 1], i) ? ["menu", "filter"] : ["pages"]), name]),
          })
        }
        let paddingTop = ($(document).height() % widthSmall ) + widthSmall;
        $(".rightFilter>div").css("padding-bottom", paddingTop)
          .children(`input#${hash}FilterMax`).prop("checked", true);
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
      
        let filterWrap = ["channel", "date", "pop", "duration"];
        for(let i = 0; i < filterWrap.length; i++){
          let name = filterWrap[i],
              query = get[pathname][name]
          $(".rightFilter>div").append(`
            <input type="checkbox" id="${name}FilterWrap" ${query ? "checked" : ""}>
            <label view="button" for="${name}FilterWrap" name="${translate(["menu", "filter", "wrap", name])}" bg="_c:color_h:color_ch:color"></label>
            <div class="${name}FilterWrap"></div>
          `).children(`.${name}FilterWrap`).append(() => {
            let result = "";
            
            if(!i){
              let channels = Object.keys(infoBot.channels)
              if(channels.length){
                for(let i = 0; i < channels.length; i++){
                  let channel = channels[i];
                  if(!filter(commentPages, pathname) || infoBot.channels[channel][pathname] == "true"){
                    result += `
                      <a href="/${pathname}?${name}=${channel}" target="_blank">
                        <input type="checkbox" name="${name}FilterWrap" id="${name}_${channel}" ${query ? filter(query.split(","), channel) ? "checked" : "" : "checked"}>
                        <label view="button" for="${name}_${channel}" name="${channel}" bg="_c:color_h:color_ch:color" 
                          onclick="${name}Filter(this);" ondblclick="${name}Filter(this, 1);" oncontextmenu="${name}Filter(this, 2, event)"
                        ></label>  
                      </a>`
                  }
                }
              }
            }else{
              for(let u = 0; u < 2; u++){
                let pseudo = !u ? "Before" : "After"
                let val = query
                    ? (name == "duration" ? tLSr(query) : query).split("-")[u]
                    : filterDefault[name][pseudo.toLowerCase()]
                result += `<input type="text" maxlength="${i!=2?10:8}" id="${name}Filter${pseudo}" value="${val}" 
                            onkeydown="filterKeyDown(this, event);" onkeyup="filterKeyUp(this, event);">`
              }
            }
            
            return result
          })
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

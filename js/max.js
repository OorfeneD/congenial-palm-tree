///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка графиков (ширина/высота столбца, линия среднего значения, лимит разовой загрузки через ajax)
function random(min, max){return (Math.random()*(max - min) + min).toFixed()}
function returnURL(width, height, group){
  return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${group}-${width}x${height}.jpg?d=${Math.random()}`}
      
function widthLi(n = 0){return 780 - n}
function heightLi(n = 0){return 200 - n}
function xW(ch){return 6}
function xH(ch){return 2}

function url(sID){
  return !+cookie["turn"]["chat"][pathname]
          ? `https://twitch.tv/videos/${sID}?` 
          : `https://player.twitch.tv/?autoplay=true&video=v${sID}`
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function utc(){return new Date().getTimezoneOffset()*-60000 - cookie["UTC"]*900000}
function tLS(value, set = dateSet){
  return new Date(value).toLocaleString("ru-RU", set)
}
function tLS2(value, set){
  if(!set){
    let date = value.split(".");
    return new Date(+date[2], +date[1]-1, +date[0])
               .toLocaleString("ru-RU", dateSet)
  }else{
    let time = value.split(":");
    time[0] = +time[0] > 23 ? 23 : time[0];
    time = new Date((+time[0]*3600 + +time[1]*60 + +time[2])*1000 - new Date().getTimezoneOffset()*-60000)
               .toLocaleString("ru-RU", timeSet).split(":")
    return `${time[0]}h${time[1]}m${time[2]}s`
  }
}
function tLSr(values){
  let result = "";
  values = values.split("-");
  if(values.length == 2){
    for(let i = 0; i < values.length; i++){
      if(values[i].split("h").length != 2){return false}
      if(values[i].split("m").length != 2){return false}
      if(values[i].split("s").length != 2){return false}
      let time = {
        hour: +values[i].split("h")[0],
        min: +values[i].split("h")[1].split("m")[0],
        sec: +values[i].split("m")[1].split("s")[0],
      }
      time.min = time.sec - 60 > 0 ? Math.floor(time.sec/60) + time.min : time.min;
      time.sec = time.sec > 60 ? time.sec%60 : time.sec < 0 ? 0 : time.sec;
      time.hour = time.min - 60 > 0 ? Math.floor(time.min/60) + time.hour : time.hour;
      time.min = time.min > 60 ? time.min%60 : time.min < 0 ? 0 : time.min;
      time.hour = time.hour > 23 ? 23 : time.hour < 0 ? 0 : time.hour;

      result += `${zero(time.hour)}:${zero(time.min)}:${zero(time.sec)}`
      if(!i) result += "-"
    }
    return result
  }else{return false}
}
function tLS3(dur, gap = null){
  if(dur == "00:00:00"){
    if(gap){
      let value = gap*120;
      let sec = zero(value%60),
          min = zero(Math.floor(value/60)%60),
          hour = zero(Math.floor(value/3600)%86400)
      return `~${hour}:${min}:${sec}`
      }else{ return "??:??:??" }
  }else{ return dur }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Проверка начилия [name] в [arr]
function indexOf(name, arr){
  for(let step = 0; step < arr.length; step++){
    if(arr[step].slice(0,1) == "!"){if(name == arr[step].slice(1)){return true}}
      else if(name.indexOf(arr[step]) != (-1)) return true
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Проверка начилия любого элемента из массива [arr] в [text]
function filter(arr, text){
  if(!arr || !arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(String(text).toLowerCase().indexOf(String(arr[word]).toLowerCase()) != (-1)) return true;
    if(+word+1 == arr.length) return false;
  }
}
function filterOnly(arr, text){
  if(!arr || !arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(String(text).toLowerCase() == String(arr[word]).toLowerCase()) return true;
    if(+word+1 == arr.length) return false;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Добавляет 0 к [num] до достижения длины [length]
function zero(num, length = 2){
  for(let deg = 1; deg < length; deg++){
    +num < 10**deg ? num = "0"+num : ""
  }
  return num
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function parent(ths, N = 1){
  ths = $(ths);
  for(let step = 0; step < N; step++){
    ths = ths.parent();
  }
  return ths
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// При отсутствии перевода возращает [error]
function translate(way){
  let result = langObj[cookie["lang"]],
      err = "";
  for(let i = 0; i < way.length; i++){
    result = result[`${String(way[i])}`] || "";
    err += way[i]+" » "
  }
  if(!result) console.log(`%cLang err: %c[${cookie["lang"]}] ${err.slice(0, -3)}`, "color: red", "color: black")
  return result || err.slice(0, -3)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Находит в [message] ссылку и заменяет ее рабочей ссылкой
function wwwFilter(message){
  if(filter(["http://", "https://", "www."], message) && cookie["turn"]["url"][pathname] == "1"){
    let mesArr = message.split(" ");
    for(let step = 0; step < mesArr.length; step++){
      if((mesArr[step].slice(0, 4) == "http" || mesArr[step].slice(0, 4) == "www.") && !filter(['src="smile"'], mesArr[step])){
        mesArr[step] = `<a target="_blank" href="${mesArr[step]}">${mesArr[step]}</a>`
      }
    }
    message = mesArr.join(" ")
  }   
  return message;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Находит в [message] код смайлов и заменяет его картинками смайлов
function smilesFilter(message){
  if(cookie["turn"]["smile"][pathname] == "1"){
    for(let i = 0; i < Object.keys(smiles).length; i++){
      if(message.toLowerCase().indexOf(Object.keys(smiles)[i].toLowerCase()) != (-1)){
        message = message.replace(new RegExp(Object.keys(smiles)[i], "ig"), `<img class="smile" src="${smiles[Object.keys(smiles)[i]]}">`)
      }
    }
  }
  return message;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function appendLiContentAdd(type = ""){
  let display = type == "Anti" ? "ignore" : "add";
  if(!$(`li[content="${hash+type}Add"][type="${pathname}"]`).length){
    $("ul").append(`
      <input type="checkbox" id="arrow_${hash+type}">
      <label for="arrow_${hash+type}" icon="arrow"></label>
      <li content="${hash+type}Add" type="${pathname}">
        <h4 meme="${translate([pathname, "total"])}" sum="0">
          <a>${translate([pathname, hash, "add"+type])}</a>
        </h4>
        <h8>
          <div class="${hash+type}Add">
            <input type="text" 
              onkeydown="${pathname}KeyDown('${type}', this, event);" 
              onkeyup="${pathname}KeyUp('${type}', this, event);"
            >
            <div view="button" class="${display}" name="${translate([pathname, display])}" onclick="${pathname}Add('${type}', this);"></div>
          </div>
        </h8>
      </li>
    `);
  }
}
function appendLiContent(type = ""){
  if(!$(`li[content="${hash+type}"][type="${pathname}"]`).length){
    $(`ul li[content="${hash+type}Add"]`).after(`
      <li content="${hash+type}" type="${pathname}">
        <h4 display="1">
          <a>${translate([pathname, hash, "title"+type])}</a>
          ${filterOnly(["main"], hash+type) ? `<div subtitle>${translate([pathname, hash, "subtitle"])}</div>` : ""}
        </h4><h8></h8><h9></h9>
      </li>
    `);
  }
}
function appendRange(type = "", title= [], MMS = [0, 1, 1]){
  title.unshift(pathname)
  $("ul").append(`
    <li content="${type}" type="${pathname}">
      <h4><a>${translate(title)}</a></h4>
      <h8 style="flex-direction: row;">
        <input type="range" name="${type}" min="${MMS[0]}" max="${MMS[1]}" step="${MMS[2]}" oninput="${type}Range(this)">
      </h8>
    </li>
  `);
}





///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка нижнего меню
function getBottomMenu(){
  for(let i = 0; i < $(".bottomMenu label").length; i++){
    let name = $(".bottomMenu label").eq(i).attr("for");
    $(`.bottomMenu label[for='${name}']`).css({
      display: filterOnly(pageSet["ban"][name], pathname) ? "none" : "flex",
    })
  }  
  $(".bottomMenu").css({display: 
    $(".bottomMenu label[style*='display: none;']").length == $(".bottomMenu label").length 
    ? "none" : "flex",
  })
  if(cookie["turn"]["filter"][pathname] == "1" && !filterOnly(pageSet.ban.filter, pathname)){  
    $(".bottomMenu #filter").prop("checked", true); 
  }  
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Смена темы сайта
function getTheme(input){
  if(input){
    let newTheme = $(input).attr("for").slice(0, -5);
    cookie["theme"] = newTheme;
    document.cookie = `theme=${cookie["theme"]};expires=${cookieDate}`;
  }
  let themeStyle = ":root{";
  for(let i = 0; i < Object.values(colorObj[cookie["theme"]]).length; i++){
    let key = Object.keys(colorObj[cookie["theme"]])[i],
        value = Object.values(colorObj[cookie["theme"]])[i];
    themeStyle = themeStyle + `--${key}: ${value};`;
  }
  if(!$("head style[theme]").length){$("head").append("<style theme></style>")}  
  $("style[theme]").html(`${themeStyle}}`);
  let value = cookie["hueRotate"][cookie["theme"]];
  if($("ul input[name='theme']")) $("ul input[name='theme']").val(value).attr({deg: +value})
  getHueRotate();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Кнопка "вверх" и обратно 
function getScroll(){
  if($(document).scrollTop() == 0){
    $(document).scrollTop($(this).attr("oldScroll"))
    $(this).attr("oldScroll", 0);
  }else{
    $(this).attr("oldScroll", $(document).scrollTop())
    $(document).scrollTop(0);
  }    
}  

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function getColor(ths){
  let top = +$(ths).offset().top,
      group = $(ths).parent().siblings("a[target]").html(),
      oldgroup = $(".getColor").attr("group")
  let colors = ""
  for(let i = 0; i < colorArr.length; i++){
    colors += `<div num="${i}" style="background-color: ${colorArr[i]}" onclick="getColorClick(this)"></div>`
  }
  if($(".getColor").length) $(".getColor").detach();
  if(group != oldgroup)
    $("body").append(`
      <div class="getColor" style="top: ${top - 72.5}px" group="${group}">${colors}</div>
    `)
}
function getColorClick(ths){
  let group = $(ths).parent().attr("group")
  $(`li[content="main"] div[group="${group}"] color>div`).attr({
    style: `background-color: ${colorArr[$(ths).attr("num")]}`,
    num: $(ths).attr("num")
  })
  $(".getColor").detach()
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function addTitleNum(){
  let title = $("title").html(),
      value = $("ul li").length ? $("ul li[counter]:not([style*='display: none;'])").length : 0;
  $("label[for='autoload']").attr({number: value})
  let status = filter(["completed", "nodata"], $("label[for='autoload']").attr("status"))
      ? !value ? `| ${translate(["menu", "autoloadNodata"])}` 
      : `| ${translate(["menu", "autoloadCompleted"])}` : "";
  setTimeout(() => {
    $("title").html(`${translate(["pages", pathname])} | ${value} ${status}`)
    if(!filter(["completed", "nodata"], $("label[for='autoload']").attr("status"))){
      $("ul div[load]").removeAttr("name")
    }else{
      $("label[for='autoload'], ul>div[load]").attr({
        name: translate(["menu", !value ? "autoloadNodata" : "autoloadCompleted"])
      })
    }
  }, 0)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function getClickAutoload(ths){
  if(filter(["completed", "nodata"], $(ths).attr("status")))
  $("#autoload").prop("checked", true)
}   
function getReloadAutoload(){
  $("#autoload").prop("checked", false);
  $("label[for='autoload']").attr({name: translate(["menu", "autoload"]), number: 0, status: "process"})
  if(cookie["turn"]["autoload"][pathname] == "1" && !filterOnly(pageSet.ban.autoload, pathname)){
    $("#autoload").prop("checked", true);
  }  
}
function endAutoload(){
  let oldpathname = pathname
  let name = $("ul li").length ? translate(["menu", "autoloadCompleted"]) : translate(["menu", "autoloadNodata"]),
      status = $("ul li").length ? "completed" : "nodata";
  $("label[for='autoload'], ul>div[load]").attr({name: name, status: status})
  setTimeout(() => {
    if(oldpathname == pathname)
      $("#autoload").prop("checked", false); 
      $("title").html(`${$("#title").html()} | ${$("label[for='autoload']").attr("number")} | ${name}`)
  }, 200)
}   

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function allReset(){
  if(confirm(translate(["menu", "filter", "resetAllConfirm"+(pathname=="settings"?"Settings":"")])+translate(["pages", pathname]))){
    switch(pathname){
      case "settings": 
        for(let i = 0; i < settingsPages.length; i++){
          settingsReset(settingsPages[i], 1); 
        }
      break;
      default: 
        get[pathname] = {}
        start(pathname, 1);
    }
  }
}
function settingsReset(url, pass){
  let name = url == "theme" || url == "same" ? translate(["menu", "filter", url]) : translate(["pages", url]);
  if(pass || confirm(`${translate([pathname, "resetConfirm"])} #${name}`)){
    switch(url){
      case "theme":
        for(let i = 0; i < Object.keys(colorObj).length; i++){
          let key = Object.keys(colorObj)[i];
          cookie["hueRotate"][key] = "000";
          $("input.hueRotateRange").attr({deg: 0}).val(0);
        }
        getHueRotate();
        document.cookie = `hueRotate=${JSON.stringify(cookie["hueRotate"])};expires=${cookieDate}`; 
      break;
      default: 
        for(let i = 0; i < pageSet.turn.list.length; i++){
          let key = pageSet.turn.list[i],
              value = filterOnly(pageSet["turn"]["auto"][key], url) ? 1 : 0;
          cookie["turn"][key][url] = value;
          $(`ul input#${key}Cookie`).prop("checked", value);
          document.cookie = `turn=${JSON.stringify(cookie["turn"])};expires=${cookieDate}`; 
        }
      break;
    }
    loadSettings(pathname)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function help(ths, text, text2 = ""){
  let hDiv = $(ths).height() ,
      wDiv = $(ths).width(),
      top = $(ths).offset().top + +$(ths).css("padding-top").slice(0, -2),
      left = $(ths).offset().left,
      pL = +$(ths).css("padding-left").slice(0, -2),
      pR = +$(ths).css("padding-right").slice(0, -2) * -1;
  if(cookie["turn"]["help"][pathname] == "1"){
    $(ths).attr({event: "hover", onmouseout: "helpOut(this);"}).css({cursor: "help"})
    setTimeout(() => {
      if($(ths).attr("event") == "hover"){
        $(ths).css({cursor: ""})
        text[0] = text[0] == 1 ? pathname : text[0];
        $(".help").html(translate([...text])+text2).show();
        let hHelp = $(".help").height(),
            wHelp = $(".help").width();

        let position = left > $(window).width()*0.75 ? "right" : "left",
            padding = position == "left" ? pL : pR;
        left = left > $(window).width()*0.75 ? left - 30 - wHelp : 10+wDiv+left;
        $(".help").css({
          left: padding+left+"px",
          top: top+(hHelp > hDiv ? 0 : (hDiv - hHelp) / 2 - 7)+"px"
        }).attr({position: position})
      }
    }, 750)
  }
}
function helpOut(ths){
  $(ths).attr({event: ""}).css({cursor: ""})
  $(".help").html("").hide();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function dlt(ths, type, info, ts){
  if(info == "message"){
    let sID = parent(ths, 3).attr("sID"),
        username = $(ths).siblings("a").html().split("</b>")[0].split("#")[1].slice(0, -1),
        message = $(ths).siblings("a").html().split("</b>")[1].replace(/  /g,"").replace(/\r?\n/g, "").slice(1);
    if(confirm(`${translate(["settings", "delete"])} ${username}:«${message}»?`)){
      $.ajax({
        url: "dlt",
        data: {type: type, sID: sID, ts: ts},
        method: 'get',
        success: res => {
          parent(ths).attr({dlt: ""})
          setTimeout(() => {
            parent(ths).detach();
            if(!$(`li[sID="${sID}"] h8 div`).length){
              $(`li[sID="${sID}"]`).detach();
              $(`input[id="arrow_comments${sID}"]`).detach();
              $(`label[for="arrow_comments${sID}"]`).detach();
            }
          }, 500)
        }
      })
    }
  }else if(info == "block"){
    let sID = parent(ths).attr("sID"),
        text = "";
        text += $(`li[sID="${sID}"] h4 a[ch]`).html();
        text += ":«"+$(`li[sID="${sID}"] h4 a[title]`).attr("title")+"» ";
        text += "["+$(`li[sID="${sID}"] h4 a[date]`).attr("date")+"]";
    if(confirm(`[${translate(["pages", type])}] ${translate(["settings", "delete"])} ${text}?`)){
      let pnli = pathname == "archive" ? `[pathname="${type}"]` : "",
          pnlabel = pathname == "archive" ? `[for*="${type}"]` : "",
          pninput = pathname == "archive" ? `[id*="${type}"]` : ""
      $.ajax({
        url: "dlt",
        data: {type: type, sID: sID},
        method: 'get',
        success: res => {
          $(`li[sID="${sID}"]${pnli}`).detach();
          $(`input[id*="arrow_"][id*="${sID}"]${pninput}`).detach();
          $(`label[for*="arrow_"][for*="${sID}"]${pnlabel}`).detach();
        }
      })
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 






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
          $(".rightFilter>div").append(`
            <input type="checkbox" id="${filterWrap[i]}FilterWrap" ${get[pathname][filterWrap[i]] ? "checked" : ""}>
            <label view="button" for="${filterWrap[i]}FilterWrap" name="${translate(["menu", "filter", "wrap", filterWrap[i]])}" bg="_c:color_h:color_ch:color"></label>
            <div class="${filterWrap[i]}FilterWrap">
              <input type="text" maxlength="${i!=2?10:8}" id="${filterWrap[i]}FilterBefore" onkeydown="filterKeyDown(this, event);" onkeyup="filterKeyUp(this, event);">
              <input type="text" maxlength="${i!=2?10:8}" id="${filterWrap[i]}FilterAfter" onkeydown="filterKeyDown(this, event);" onkeyup="filterKeyUp(this, event);">
            </div>
          `)
          if(get[pathname][filterWrap[i]]){
            if(filterWrap[i] == "duration"){
              $(`#${filterWrap[i]}FilterBefore`).val(tLSr(get[pathname][filterWrap[i]]).split("-")[0])
              $(`#${filterWrap[i]}FilterAfter`).val(tLSr(get[pathname][filterWrap[i]]).split("-")[1])
            }else{
              $(`#${filterWrap[i]}FilterBefore`).val(get[pathname][filterWrap[i]].split("-")[0])
              $(`#${filterWrap[i]}FilterAfter`).val(get[pathname][filterWrap[i]].split("-")[1])
            }
          }
        }
        if(!get[pathname]["date"]){
          $("#dateFilterBefore").val("01.01.2020")
          $("#dateFilterAfter").val(tLS(new Date()))
        }  
        if(!get[pathname]["duration"]){
          $("#durationFilterBefore").val("00:00:00")
          $("#durationFilterAfter").val("23:59:59")
        }
        if(!get[pathname]["pop"]){
          $("#popFilterBefore").val("0")
          $("#popFilterAfter").val("99999999")
        }
        

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
      li[type="settings"] nav:hover wrap>input[type="text"], .getTheme:before, .getTheme input:checked+label
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




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа правого бегунка 
function rightRange(ths){
  let value = !ths ? 0 : $(ths).val(),
      sID = parent(ths, 2).attr("sID");
  canvas(ths, value)
  let meme = filter(["main", "archive"], pathname) 
           ? Object.keys(content[sID])[value] 
           : Object.values(content[sID]["list"])[value] != "allTriggers"
             ? Object.values(content[sID]["list"])[value]
             : "Все"
  $(ths).attr({meme: meme})
  $(ths).parent().siblings("h4").attr({meme: meme, sum: $(ths).attr("m"+value)});
  $(ths).siblings(".allMaxLine").children(`dot`).attr({hover: 0})
                                .siblings(`dot[meme="m${value}"]`).attr({hover: cookie["turn"]["maxline"][pathname]})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа нижнего бегунка 
function bottomRange(ths){
  let value = +$(ths).val();
  let max = +$(ths).attr("max");
  $(ths).attr({percent: Math.round((value) * 100 / max)});
  $(ths).siblings(".graphX").children(".graph, .graphMin").css("left", -5*value*xW(parent(ths, 2).attr("username")));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dotclick(ths){
  let value = +$(ths).attr("meme").slice(1),
      rightRange = $(ths).parent().siblings(".rightRange"),
      sID = parent(ths, 3).attr("sID"),
      yMax = +parent(ths).siblings(".graphX").children(".graphAim").height(),
      ctx = document.getElementById(`aim${sID}`).getContext("2d");
  ctx.clearRect(0, 0, widthLi(), yMax);
  canvas(rightRange, value)
  rightRange.val(value).attr({meme: Object.keys(content[sID])[value]});
  parent(ths, 2).siblings("h4").attr({meme: Object.keys(content[sID])[value], sum: rightRange.attr("m"+value)});
  $(ths).parent().children("dot").attr({hover: 0})
                 .siblings(`dot[meme="m${value}"]`).attr({hover: 1})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openLi(ths){
  let sID = parent(ths, 3).attr("sID"),
      type = pathname == "archive" ? "main" : "comments"
  $(`#arrow_${type+sID}`).prop({checked: false})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function canvas(ths, mem){
  let sID  = +parent(ths, 2).attr("sID"),
      user = parent(ths, 2).attr("username"),
      min  = +$(ths).siblings(".graphX").attr("min"),
      max  = +$(ths).siblings(".graphX").attr("max"),
      rrMax= +$(ths).attr("max"),
      xMax = +$(ths).siblings(".graphX").children(".graph").attr("width"),
      yMax = +$(ths).siblings(".graphX").children(".graph").attr("height"),
      ctx  = document.getElementById(`canvas${sID}`).getContext("2d"),
      ctxMin = document.getElementById(`min${sID}`).getContext("2d"); 
  let maxPoints = 0;
  ctx.clearRect(0, 0, xMax, yMax);
  ctxMin.clearRect(0, 0, xMax, 40);
  canvasTimer(ctx, ctxMin, user, min, max, yMax, xMax);     

  ctx.beginPath();
  ctxMin.beginPath();
  let meme = Object.keys(content[sID])[mem],
      color = colorArr[infoBot["memes"][meme]]
  ctx.fillStyle = ctxMin.fillStyle = color+"cc";
  try{
    if(filter(["main", "archive"], pathname)){
      ctx.moveTo(0, yMax); 
      ctxMin.moveTo(0, yMax); 
      for(let gap = Math.floor((min-1)/5)*5; gap <= Math.round((max+1)/5)*5; gap++){
        let points = gap < min ? 0 : gap > max ? 0 : Math.round(content[sID][meme]["g"+gap]);
        ctx.lineTo((gap-min+1)*xW(user), yMax - points*xH(user));
        ctx.lineTo((gap-min+2)*xW(user), yMax - points*xH(user));
        ctx.lineTo((gap-min+2)*xW(user), yMax)
        ctxMin.lineTo((gap-min+1)*xW(user), 40 - points*xH(user)/5);
        ctxMin.lineTo((gap-min+2)*xW(user), 40 - points*xH(user)/5);
        ctxMin.lineTo((gap-min+2)*xW(user), 40)
        maxPoints = points > maxPoints ? points : maxPoints;   
      }
      ctx.fill();
      ctxMin.fill();

      if(cookie["turn"]["maxline"][pathname] == "1"){
        ctx.beginPath();
        ctx.moveTo(0,    (yMax-1) - maxPoints*xH(user));
        ctx.lineTo(xMax, (yMax-1) - maxPoints*xH(user));
        ctx.strokeStyle = ctxMin.strokeStyle = color;
        ctx.stroke();
        ctx.textAlign = "center";
        ctxMin.beginPath();
        ctxMin.moveTo(0,    (40-1) - maxPoints*xH(user)/5);
        ctxMin.lineTo(xMax, (40-1) - maxPoints*xH(user)/5);
        ctxMin.stroke();
        for(let t = Math.floor(min/15); t <= Math.round(max/15)*2; t+=2){
          let height = (yMax-5) - maxPoints*xH(user) <= 10 ? 10 : (yMax-5) - maxPoints*xH(user)
          ctx.fillText(Math.ceil(maxPoints), 15*xW(user)*((t - Math.floor(min/15)) + 0.5), height)
        }
      }
    }else{
      let memeName = content[sID]["list"][mem];
      for(let i = 0; i < content[sID][memeName]["map"].length; i++){
        let num = Number(String(content[sID][memeName]["map"][i]).split(":")[0]),
            color = Number(String(content[sID]["allTriggers"]["map"][rrMax == +mem ? i : num]).split(":")[1]),
            value = rrMax == +mem ? num : Number(String(content[sID]["allTriggers"]["map"][num]).split(":")[0]);
        
        ctx.beginPath();
        ctx.fillStyle = ctxMin.fillStyle = colorArr[infoBot["memes"][content[sID]["oldlist"][color]]]+"cc"; 
        ctx.moveTo((i)*xW(user), yMax)
        ctx.lineTo((i)*xW(user), yMax - value*xH(user));
        ctx.lineTo((i+1)*xW(user), yMax - value*xH(user));
        ctx.lineTo((i+1)*xW(user), yMax)
        ctx.fill();
        ctxMin.beginPath(); 
        ctxMin.moveTo((i)*xW(user), 40)
        ctxMin.lineTo((i)*xW(user), (yMax - value*xH(user))/5);
        ctxMin.lineTo((i+1)*xW(user), (yMax - value*xH(user))/5);
        ctxMin.lineTo((i+1)*xW(user), 40)
        ctxMin.fill();
      }
    }
  }catch(e){console.error(e)}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function smallLine(ctx, ctxMin, user, start, yMax){
  for(let i = 1; i < 3; i++){
    ctx.beginPath();
    ctx.moveTo(5*xW(user)*(3*start+i), 0);
    ctx.lineTo(5*xW(user)*(3*start+i), yMax);
    ctx.strokeStyle = ctxMin.strokeStyle = "#0002";
    ctx.stroke();
    ctx.clearRect(5*xW(user)*(3*start+i), 0, 1, yMax);    
    ctxMin.beginPath();
    ctxMin.moveTo(5*xW(user)*(3*start+i), 0);
    ctxMin.lineTo(5*xW(user)*(3*start+i), 40);
    ctxMin.stroke();
    ctxMin.clearRect(5*xW(user)*(3*start+i), 0, 1, 40); 
  }  
}
function dotted(ctx, ctxMin, user, start, yMax){
  ctx.strokeStyle = ctxMin.strokeStyle = "#0004";
  let y = 0, length = yMax/5;
  for(let i = 0; i < length; i++){
    ctx.beginPath();
    ctx.moveTo(15*xW(user)*(start+1), y);
    ctx.lineTo(15*xW(user)*(start+1), y+3);
    ctx.stroke();   
    ctxMin.beginPath();
    ctxMin.moveTo(15*xW(user)*(start+1), y);
    ctxMin.lineTo(15*xW(user)*(start+1), y+3);
    ctxMin.stroke();  
    y += 5;
  }
  ctx.clearRect(15*xW(user)*start, 0, 1, yMax); 
  ctxMin.clearRect(15*xW(user)*start, 0, 1, 40);
}
function canvasTimer(ctx, ctxMin, user, min, max, yMax, xMax){
  let num = Math.ceil(100/xH(user));
  let fillText = false;
  ctx.beginPath();
  ctxMin.beginPath();
  ctx.textAlign = "center"; 
  let tMax = Math.round((max)/5) + +cookie["UTC"]
  
  for(let t = 0; t <= tMax+10; t++){ 
    ctx.fillStyle = ctxMin.fillStyle = "#0004";
    ctx.lineWidth = ctxMin.lineWidth = 1;
      let minute = t%2=="0" ? "00" : "30";
      let hour = zero(Math.floor(t/2)%24);
      let start = (t - Math.floor(min/(5*xW(user)))*2);
    if(filter(["main", "archive"], pathname)){
      ctx.fillText(`${hour} ${minute}`, 15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), ((yMax-10) - num*xH(user))/2);
    }
    
    if(fillText){
      ctx.beginPath();
      ctx.moveTo(15*xW(user)*(start-1), 0);
      ctx.lineTo(15*xW(user)*(start-1), yMax);
      ctx.strokeStyle = ctxMin.strokeStyle = "#0006";
      ctx.stroke();
      ctx.clearRect(15*xW(user)*(start-1), 0, 1, yMax);
      ctx.fillText(num, 15*xW(user)*(start + 0.5), (yMax-5) - num*xH(user))
      ctxMin.beginPath();
      ctxMin.moveTo(15*xW(user)*(start-1), 0);
      ctxMin.lineTo(15*xW(user)*(start-1), 40);
      ctxMin.stroke();
      ctxMin.clearRect(15*xW(user)*(start-1), 0, 1, 40);
    }else{dotted(ctx, ctxMin, user, start, yMax)}
    smallLine(ctx, ctxMin, user, start, yMax) 
    fillText = !fillText;
    
    if(cookie["turn"]["midnight"][pathname] == "1" && hour == "00" && minute == "00"){
      ctx.beginPath();
      ctx.moveTo(15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), 0);
      ctx.lineTo(15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), yMax);
      ctx.lineWidth = ctxMin.lineWidth = 2;
      ctx.strokeStyle = ctxMin.strokeStyle = "#0006";
      ctx.stroke();
      ctxMin.beginPath();
      ctxMin.moveTo(15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), 0);
      ctxMin.lineTo(15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), 40);
      ctxMin.stroke();
    }
  }
  for(let i = 1; i < 4; i++){
    ctx.beginPath();
    ctx.moveTo(0, (yMax - num*xH(user))/2*i);
    ctx.lineTo(xMax+100, (yMax - num*xH(user))/2*i);
    ctx.strokeStyle = ctx.strokeStyle = i==2 ? "#0006" : "#0004";
    ctx.stroke();  
    ctx.clearRect(0, (yMax - num*xH(user))/2*i, xMax, 1)  
    if(i == 2){
      ctxMin.beginPath();
      ctxMin.moveTo(0, (40 - num*xH(user)/5)/2*i);
      ctxMin.lineTo(xMax+100, (40 - num*xH(user)/5)/2*i);
      ctxMin.stroke();  
      ctxMin.clearRect(0, (40 - num*xH(user)/5)/2*i, xMax, 1)  
    }
  } 
} 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clearCanvas(ths){
  let sID = parent(ths, 3).attr("sID"),
      yMax = +$(ths).height(),
      ctx = document.getElementById(`aim${sID}`).getContext("2d");
  if($('#awayMove:hover').length == 0) 
    ctx.clearRect(0, 0, widthLi(), yMax);
}
function awayMove(ths){
  try{
    let sID = !+cookie["turn"]["chat"][pathname] 
            ? $(ths).attr("href").split("videos/")[1].split("?")[0]
            : $(ths).attr("href").split("video=v")[1].split("&")[0],
        yMax = $(`#aim${sID}`).height(),
        ctx = document.getElementById(`aim${sID}`).getContext("2d");
    ctx.clearRect(0, 0, widthLi(), yMax);
  }catch(e){}
}
function getCanvasXY(ths, e){
  let sID = parent(ths, 3).attr("sID"),
      user = parent(ths, 3).attr("username"),
      yMax = +$(`#aim${sID}`).height(),
      sS = (parent(ths).attr("sS") - new Date().getTimezoneOffset()*-60000) % 86400000,
      min = +parent(ths).attr("min"),
      mem = +parent(ths).siblings(".rightRange").val(),
      range = +parent(ths).siblings(".bottomRange").val(),
      ctx = document.getElementById(`aim${sID}`).getContext("2d");
  let x = e.offsetX,
      y = e.offsetY,
      gap = "g"+(Math.floor((x + 5*range*xW(user))/xW(user)) + min - (filter(["main", "archive"], pathname)?1:0));
  ctx.clearRect(0, 0, widthLi(), yMax);


  let res = content[sID][gap.slice(1)] ? content[sID][gap.slice(1)] : {v: 0, m: 0, g: 0}
  if(filter(["best"], pathname)){
    [res["v"], res["m"], res["g"]] = String(
                content[sID]["allTriggers"]["map"][
                  $(`li[sID="${sID}"] .rightRange`).val() == +$(`li[sID="${sID}"] .rightRange`).attr("max")
                    ? +gap.slice(1)
                    : content[sID][content[sID]["list"][mem]]["map"][+gap.slice(1)]
                ]
              ).split(":")
    res["m"] = content[sID]["oldlist"][res["m"]]
  }
  let value = filter(["main", "archive"], pathname) 
      ? Math.round(content[sID][Object.keys(content[sID])[mem]][gap])
      : res["v"];
  let ggg = filter(["main", "archive"], pathname)
          ? +gap.slice(1)*120000 - sS - new Date().getTimezoneOffset()*-120000
          : res["g"]*120000 - sS - new Date().getTimezoneOffset()*-120000;
  try{
    ctx.beginPath();
    ctx.fillStyle = "#0009";
    if(value){
      ctx.fillRect(
        Math.round((x-(xW(user)/2))/xW(user))*xW(user), 
        yMax - value*xH(user), 
        xW(user), 
        value*xH(user)
      ); 
      $("#awayMove").attr({href: `${url(sID)}&t=${tLS2(tLS(ggg, timeSet), timeSet)}`})
    }
  }catch(e){$("#awayMove").removeAttr("href")}

  $("#awayMove")
    .css({top: $(window).scrollTop() + e.y-41+"px", left: x+9+"px"})
    .attr({x: x, y: y})
  
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(widthLi(), y);
  ctx.stroke();  
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, yMax);
  ctx.stroke(); 
  
  if(value && value != "undefined"){
    let x1 = x + 10, x2 = x + 10;
    let y1 = y - 10, y2 = y + 20;
    let tA1 = "start", tA2 = "start";
    if(y > 180){tA2 = "end"; y2 = y1; x2 = x - 10}
    if(y < 20) {tA1 = "end"; y1 = y2; x1 = x - 10}
    if(y > 180 && x < 5*xW(user)*(range+1)){tA2 = "start"; y2 = y1; x2 = x + 35}
    if(y < 20 && x < 5*xW(user)*(range+1)) {tA1 = "start"; y1 = y2; x1 = x + 10; x2 = x + 35}  
    if(x > 5*xW(user)*(range+23)){tA1 = tA2 = "end"; x1 = x2 = x - 10}
    if(y > 180 && x > 5*xW(user)*(range+23)){tA2 = "end"; y2 = y1; x2 = x - 35}
    if(y < 20 && x > 5*xW(user)*(range+23)) {tA1 = "end"; y1 = y2; x1 = x - 10; x2 = x - 35}
    
    ctx.beginPath();
    ctx.fillStyle = "#0009";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = tA1;    
    if(filter(["best"], pathname) &&
      parent(ths).siblings(".rightRange").val() == +parent(ths).siblings(".rightRange").attr("max")
    ) value+= ` [${res["m"]}]`
    ctx.fillText(value, x1, y1); 

    ctx.textAlign = tA2;
    ctx.fillText(tLS(ggg, timeSet), x2, y2);    
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function graphXWheel(ths, e, min = 0){
  e.preventDefault(); 
  let deltaY = e.deltaY > 0 ? 1 : -1;
  try{
    let sID = !min ? cookie["turn"]["chat"][pathname] != "1"
                ? $(ths).attr("href").split("videos/")[1].split("?")[0]
                : $(ths).attr("href").split("video=v")[1].split("&")[0]
              : parent(ths, 3).attr("sID"),
        li = `li[sID='${sID}']`,
        user = !min ? $(ths).attr("username") : parent(ths, 3).attr("username");
    if(+keyFilter == 16){
      let value = +$(`${li} .rightRange`).val() + deltaY;
      if(value >= 0 && value <= $(`${li} .rightRange`).attr("max")){
        let meme = Object.keys(content[sID])[value]
            
        $(`${li} .rightRange`).val(value).attr({meme: meme});
        $(`${li} .allMaxLine>dot`).attr({hover: 0});
        $(`${li} .allMaxLine>dot[meme="m${value}"]`).attr({hover: 1});
        $(`${li} h4`).attr({meme: meme, sum: $(`${li} .rightRange`).attr("m"+value)});
        canvas(`${li} .rightRange`, value); 
      }
      getCanvasXY(`#aim${sID}`, {offsetX: +$("#awayMove").attr("x"), offsetY: +$("#awayMove").attr("y")});
    // }
    // else if(keyFilter == 18){ 
    //   let zoom = Number($(li).attr("zoom"));
    }else{
      let bottomRange = $(`${li} .bottomRange`);
      let value = +bottomRange.val() + deltaY; 
      if(0 <= value && value <= +bottomRange.attr("max")){
        bottomRange.val(value)
        bottomRange.siblings(".graphX").children(".graph, .graphMin").css("left", -5*value*xW(user));
        getCanvasXY(`#aim${sID}`, {offsetX: +$("#awayMove").attr("x"), offsetY: +$("#awayMove").attr("y")})
      }
    }
  }catch(e){}
} 



let wH = +$(window).height();
let loadLimit = 10; 
var keyFilter = 0;
let dateSet = {day: "2-digit", month: "2-digit", year: "numeric"},
    timeSet = {hour: "2-digit", minute: "2-digit", second: "2-digit"};
let pathname = location.pathname.slice(1);
let hash = location.hash.slice(1);

var content = {},
    infoBot = {};



let get = {};
function createGet(){
  if(!get[pathname]) get[pathname] = {}
  if(window.location.search.slice(1) != ""){
    let href = window.location.search.slice(1).split("&");
    for(let i = 0; i < href.length; i++){
      get[pathname][href[i].split("=")[0]] = href[i].split("=")[1];
    }
  }
}

function getToObj(string){
  get[pathname] = {}
  if(string!=1){
    string = string.slice(1).split("&");
    for(let i = 0; i < string.length; i++){
      get[pathname][string[i].split("=")[0]] = string[i].split("=")[1];
    }
  }
}

function getToString(){
  if(get[pathname] && Object.keys(get[pathname]).length){
    let result = "";
    for(let i = 0; i < Object.keys(get[pathname]).length; i++){
      result += `&${Object.keys(get[pathname])[i]}=${Object.values(get[pathname])[i]}`
    }
    return "?" + result.slice(1)
  }else{return ""}
}
var langObj = {
  ru: {
    loading: "Загружаем",
    reboot: "Перезагрузка бота",
    pages: {
      main: "Графики",
      best: "Лучшее",
      fbi: "FBI",
      notes: "Заметки",
      tags: "Теги",
      archive: "Архив",
      calendar: "Календарь",
      settings: "Настройки",
      database: "База данных",
      help: "Помощь",
    },
    menu: {
      autoload: "Автозагрузка",
      autoloadNodata: "Данных нет",
      autoloadCompleted: "Всё загружено",   
      filter: {
        name: "Фильтр",
        same: "Общее",
        theme: "Оформление",
        active: "Отфильтровать",
        less: "меньше",
        more: "больше",
        resetAll: "Сброс всех фильтров",
        resetAllConfirm: "Подтвердите сброс всех фильтров для страницы #",
        resetAllSettings: "Сброс всех настроек",
        resetAllConfirmSettings: "Подтвердите сброс всех настроек для страницы #",
        wrap: {
          date: "По дате",
          pop: "По популярности",
          duration: "По длительности",
          channel: "По каналам",
        },
      },
    },
    settings: {
      activePage: "Действия на странице",
      UTC: "Часовой пояс",
      add: "Добавить",
      ignore: "Игнорировать",
      delete: "Удалить",
      save: "Сохранить",
      total: "Суммарно",
      reset: "Сброс",
      success: "Успех",
      resetConfirm: "Подтвердите сброс настроек для страницы",
      theme: {
        title: "Кастомизация палитры сайта",
      },
      same: {
        add: "Добавить новый канал",
        title: "Список каналов",
        subtitle: "Отслеживание",        
      },
      main: {
        add: "Добавить новую группу",
        title: "Список групп",
        subtitle: "Список триггеров",
        addAnti: "Исключить из отслеживания",
        titleAnti: "Список исключенного",
      },
      fbi: {
        add: "Добавить новое отслеживание",
        title: "Список отслеживаемого",
        addAnti: "Исключить из отслеживания",
        titleAnti: "Список исключенного",
      },
      notes: {
        addUser: "Добавить нового пользователя для отслеживания",
        titleUser: "Список отслеживаемых пользователей",
        add: "Добавить новый триггер",
        title: "Список триггеров",
        addAnti: "Исключить из отслеживания",
        titleAnti: "Список исключенного",
      },
      tags: {
        add: "Добавить новый тег",
        title: "Список тегов",
        addAnti: "Исключить из отслеживания",
        titleAnti: "Список исключенного",
      },
    },
    time: {
      online: "онлайн",
      today: "сегодня",
      yesterday: "вчера",
    },
    help: {
      get archive(){return `» ${translate(["pages", "archive"])}`},
      settings: {
        cookie_help: "Показывать подсказки",
        cookie_filter: "Автовключение<br>фильтра",
        cookie_autoload: "Автозагрузка контента",
        cookie_arrow: "Сворачивать<br>контейнеры",
        cookie_same: "Обрезать<br>одинаковое",
        cookie_old: "Помечать старые<br>данные",
        cookie_chat: "Скрывать чат на Twitch",
        cookie_link: "Отображать ссылки",
        cookie_smile: "Отображать смайлики",
        cookie_maxline: "Линия максимального значения",
        cookie_midnight: "Линия полуночи",
      },
      fn: {
        get main(){return `${translate(["pages", "fbi"])}<br>${translate(["pages", "notes"])}<br>${translate(["pages", "tags"])}`},
        get fbi(){return `${translate(["pages", "main"])}<br>${translate(["pages", "notes"])}<br>${translate(["pages", "tags"])}`},
        get notes(){return `${translate(["pages", "main"])}<br>${translate(["pages", "fbi"])}<br>${translate(["pages", "tags"])}`},
        get tags(){return `${translate(["pages", "main"])}<br>${translate(["pages", "fbi"])}<br>${translate(["pages", "notes"])}`},
      },
      sort: {
        order: "Способ сортировки",
        get id(){return translate(["menu", "filter", "wrap", "date"])},
        get pop(){return translate(["menu", "filter", "wrap", "pop"])},
        get duration(){return translate(["menu", "filter", "wrap", "duration"])},
      },
    },
  },  
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
  en: {
    loading: "Loading",
    reboot: "Bot reboot",
    pages: {
      main: "Main",
      best: "Best",
      fbi: "FBI",
      notes: "Notes",
      tags: "Tags",
      archive: "Archive",
      calendar: "Calendar",
      settings: "Settings",
      database: "Database",
      help: "Help",
    },
    menu: {
      autoload: "Autoload",
      autoloadNodata: "No data",
      autoloadCompleted: "All uploaded",
      filter: {
        name: "Filter",
        same: "Same",
        theme: "Decor",
        active: "Filter out",
        less: "less",
        more: "more",
        resetAll: "Reset all filters",
        resetAllConfirm: "Confirm reset all filters for page #",
        resetAllSettings: "Reset all settings",
        resetAllConfirmSettings: "Confirm reset all settings for page #",
        wrap: {
          date: "By date",
          pop: "By popularity",
          duration: "By duration",
          channel: "By channels",
        },
      },
    },
    settings: {
      activePage: "Actions on the page", 
      UTC: "Timezone",
      add: "Add",
      ignore: "Ignore",
      delete: "Delete",
      save: "Save",
      total: "Total",
      reset: "Reset",
      success: "Success",
      resetConfirm: "Confirm reset for page",
      theme: {
        title: "Site palette customization",
      },
      same: {
        add: "Add new channel", 
        title: "Channel list", 
        subtitle: "Tracking",
      },
      main: {
        add: "Add new group",
        title: "Group list",
        subtitle: "Trigger list",    
        addAnti: "Exclude from tracking",
        titleAnti: "Excluded list",
      },
      fbi: {
        add: "Add new tracking",
        title: "Track List",
        addAnti: "Exclude from tracking",
        titleAnti: "Excluded list",
      },
      notes: {
        addUser: "Add new user to track",
        titleUser: "List of tracked users",
        add: "Add new trigger",
        title: "Trigger list",
        addAnti: "Exclude from tracking",
        titleAnti: "Excluded list",
      },
      tags: {
        add: "Add new tag",
        title: "Tag list",
        addAnti: "Exclude from tracking",
        titleAnti: "Excluded list",
      },
    },
    time: {
      online: "online",
      today: "today",
      yesterday: "yesterday",
    },
    help: {
      get archive(){return `» ${translate(["pages", "archive"])}`},
      fn: {
        get main(){return `${translate(["pages", "fbi"])}<br>${translate(["pages", "notes"])}<br>${translate(["pages", "tags"])}`},
        get fbi(){return `${translate(["pages", "main"])}<br>${translate(["pages", "notes"])}<br>${translate(["pages", "tags"])}`},
        get notes(){return `${translate(["pages", "main"])}<br>${translate(["pages", "fbi"])}<br>${translate(["pages", "tags"])}`},
        get tags(){return `${translate(["pages", "main"])}<br>${translate(["pages", "fbi"])}<br>${translate(["pages", "notes"])}`},
      },
      settings: {
        cookie_help: "Show hints",
        cookie_filter: "Auto Filter On",
        cookie_autoload: "Content autoload",
        cookie_arrow: "Collapse containers",
        cookie_old: "Mark old data",
        cookie_chat: "Hide Twitch Chat",
        cookie_link: "Show links",
        cookie_smile: "Show emoticons",
        cookie_maxline: "Maximum value line",
        cookie_midnight: "Midnight line",
      },
      sort: {
        order: "Sorting method",
        get id(){return translate(["menu", "filter", "wrap", "date"])},
        get pop(){return translate(["menu", "filter", "wrap", "pop"])},
        get duration(){return translate(["menu", "filter", "wrap", "duration"])},
      },
    },
  },    
}; 


const colorArr = [
  "#1abc9c", "#16a085", "#2ecc71", "#27ae60", "#3498db", "#2980b9",
  "#9b59b6", "#8e44ad", "#34495e", "#2c3e50", "#f1c40f", "#f39c12",
  "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#7ed6df", "#22a6b3",
  "#badc58", "#6ab04c", "#30336b", "#130f40", "#fd79a8", "#e84393",
]
const colorObj = {
  day: {
    color1: "#55883a",
    color2: "#7fa66b",
    color3: "#aec8a0",
    color4: "#d4e7c9", 
    colorLight: "#d4e7c9",
    colorMiddle: "#80AF69",
    colorDark: "#55883a",
    
    red: "#DD5145",
    green: "#92C477",
    
    dark1: "#333333",
    dark2: "#cccccc",
    dark3: "#999999",
    dark4: "#bbbbbb",
    dark5: "#dddddd",
    dark6: "#f5f5f5", //body
    dark7: "#f9f9f9",
    dark8: "#ffffff",
  },
  night: {
    color1: "#678A54",
    color2: "#4C683E",
    color3: "#597A49",
    color4: "#293E1C",
    colorLight: "#678A54",
    colorMiddle: "#678E50",
    colorDark: "#293E1C",
    
    red: "#DD5145",
    green: "#92C477",
    
    dark1: "#777777",
    dark2: "#333333",
    dark3: "#888888",
    dark4: "#222222",
    dark5: "#222222",
    dark6: "#444444",
    dark7: "#484848",
    dark8: "#606060",
  },
  guru: {
    color1: "#678A54",
    color2: "#4C683E",
    color3: "#597A49",
    color4: "#293E1C",
    colorLight: "#999999",
    colorMiddle: "#678E50",
    colorDark: "#293E1C",
    
    red: "#DD5145",
    green: "#92C477",
    
    dark1: "#777777",
    dark2: "#333333",
    dark3: "#888888",
    dark4: "#222222",
    dark5: "#222222",
    dark6: "#444444",
    dark7: "#484848",
    dark8: "#606060",
  },
  dandelion: {
    color1: "#678A54",
    color2: "#4C683E",
    color3: "#597A49",
    color4: "#293E1C",
    
    colorLight: "#dddddd",
    colorMiddle: "#678E50",
    colorDark: "#293E1C",
    
    red: "#DD5145",
    green: "#92C477",
    
    dark1: "#333333",
    dark2: "#888888",
    dark3: "#999999",
    dark4: "#777777",
    dark5: "#777777",
    dark6: "#f5f5f5",
    dark7: "#f9f9f9",
    dark8: "#ffffff",
  },
}
const graphPages = [
  "main", 
  "best", 
]
const commentPages = [
  "fbi", 
  "notes", 
  "tags", 
]
const allPages = [
  ...graphPages,
  ...commentPages,
  // "calendar",  
  "archive",  
  "settings", 
  // "database",
];
const settingsPages = ["theme", "same", ...allPages, "help"];


var pageSet = {
      topMenu: {
        tracking: ["main", ...commentPages],
      },
      turn: {
        list: [
                "help", "theme", "filter", "autoload", "arrow", 
                "old", "chat", "username", "same", "url", 
                "smile", "maxline", "midnight", "scrollTop",
              ],
        auto: { // По стандарту включены:
          help:     [...settingsPages],
          filter:   ["settings"],
        },
        show: { // Есть возможность изменить
          help:     ["theme", ...allPages],
          filter:   [...commentPages, ...graphPages, "archive"],
          autoload: [...commentPages, ...graphPages, "archive"],
          arrow:    [...commentPages, ...graphPages, "archive"],
          old:      [...commentPages, ...graphPages, "archive"],
          chat:     [...commentPages, ...graphPages, "archive"],
          username: [...commentPages, "archive"],
          same:     [...commentPages, "archive"],
          url:      [...commentPages, "archive"],
          smile:    [...commentPages, "archive"],
          maxline:  [...graphPages, "archive"],
          midnight: ["main", "archive"],
          theme:    ["theme"],
          scrollTop:["theme"],
        }
      },
      ban: {
        autoload: ["settings"],
      },
      settings:{
        add: {
          same: [""],
          main: ["", "Anti"],
          fbi: ["", "Anti"],
          notes: ["User", "", "Anti"],
          tags: ["", "Anti"],
        },
      },
    };
let zzz = pageSet.turn.list;
for(let z = 0; z < zzz.length; z++){
  if(!pageSet.turn.show[zzz[z]]) pageSet.turn.show[zzz[z]] = [];
  if(!pageSet.turn.auto[zzz[z]]) pageSet.turn.auto[zzz[z]] = [];
  if(!pageSet.ban[zzz[z]]) pageSet.ban[zzz[z]] = [];
}


try{module.exports = [allPages, pageSet.settings.add];}catch(e){}

var smiles = {
  "4Header":           "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1(49).png?v=1572025192565",
  "4Head":             "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(38).png?v=1572023660066",
  "BibleThump":        "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(39).png?v=1572023660264",
  "cemka4CB":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(40).png?v=1572023663264",
  "cemkaBait":         "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(41).png?v=1572023660641",
  "cemkaBaka":         "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(42).png?v=1572023661319",
  "cemkaBob":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(43).png?v=1572023661368",
  "cemkaBoi":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(44).png?v=1572023661291",
  "cemkaChamp":        "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(45).png?v=1572023662332",
  "cemkaCry":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(46).png?v=1572023662279",
  "cemkaEbalo":        "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(48).png?v=1572023654214",
  "cemkaE":            "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(47).png?v=1572023662514",
  "cemkaGEK":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(1).png?v=1572023657104",
  "cemkaHype":         "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(2).png?v=1572023654096",
  "cemkaKappa":        "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(3).png?v=1572023654234",
  "cemkaKEK":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(4).png?v=1572023654650",
  "cemkaLove":         "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(5).png?v=1572023654591",
  "cemkaLUL":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(6).png?v=1572023654251",
  "cemkaM":            "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(7).png?v=1572023654163",
  "cemkaPuwka":        "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(8).png?v=1572023654298",
  "cemkaRage":         "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(9).png?v=1572023658145",
  "cemkaRIP":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(10).png?v=1572023654310",
  "cemkaSleeper":      "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(11).png?v=1572023655256",
  "cemkaThonk":        "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(12).png?v=1572023656233",
  "cemkaToxic":        "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(13).png?v=1572023657940",
  "cemkaWO":           "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(14).png?v=1572023657674",
  "cemkaWut":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(15).png?v=1572023654636",
  "cemkaYea":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(16).png?v=1572023655227",  
  "<3":                "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(17).png?v=1572023655648",
  "HeyGuys":           "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(18).png?v=1572023655886",
  "Jebaited":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(19).png?v=1572023656073",
  "KappaPride":        "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(21).png?v=1572023658737",
  "Kappa":             "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(20).png?v=1572023655843",
  "KonCha":            "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(22).png?v=1572023656495",
  "kreygasm":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(23).png?v=1572023657266",
  "OpieOP":            "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1(50).png?v=1572025683085",
  "MEGALUL":           "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(25).png?v=1572023656881",
  "LUL":               "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(24).png?v=1572023656691",
  "NotLikeThis":       "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(26).png?v=1572023658516",
  "omegaKEK":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(27).png?v=1572023657484",
  "pepega":            "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(28).png?v=1572023658310",
  "PepeLaugh":         "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(29).png?v=1572023660687",
  "peepoClown":        "https://cdn.betterttv.net/frankerfacez_emote/318914/1",
  "peepoHug":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1(51).png?v=1572025928017",
  "PogChamp":          "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(31).png?v=1572023659674",
  "PogW":              "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(32).png?v=1572023659232",
  "POGGERS":           "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1(52).png?v=1572026163406",
  "Pog":               "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(30).png?v=1572023658989",
  "ResidentSleeper":   "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(33).png?v=1572024273721",
  "SeemsGood":         "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(34).png?v=1572023659400",
  "VoHiYo":            "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(35).png?v=1572024252643",
  "voteYea":           "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(36).png?v=1572023659927",
  "WutFace":           "https://cdn.glitch.com/7cd0afc9-1177-4a8c-b108-1a9956a78c77%2F1%20(37).png?v=1572023662358",
  "KEKWait":           "https://cdn.betterttv.net/frankerfacez_emote/390750/1",
  "KEKW":              "https://cdn.betterttv.net/frankerfacez_emote/395453/1",
  "qqqqRoflan":        "https://static-cdn.jtvnw.net/emoticons/v1/300967153/1.0",
}











const iconsObj = {
  none: "https://image.flaticon.com/icons/svg/64/64299.svg",
  
  day: "https://image.flaticon.com/icons/svg/60/60967.svg",
  night: "https://image.flaticon.com/icons/svg/1415/1415431.svg",
  guru: "https://image.flaticon.com/icons/svg/697/697109.svg",
  dandelion: "https://image.flaticon.com/icons/svg/2577/2577543.svg",
  
  main: "https://image.flaticon.com/icons/svg/44/44499.svg",
  fbi: "https://image.flaticon.com/icons/svg/1039/1039481.svg",
  notes: "https://image.flaticon.com/icons/svg/2119/2119695.svg",
  tags: "https://image.flaticon.com/icons/png/64/1873/1873920.png",
  archive: "https://www.flaticon.com/premium-icon/icons/svg/2169/2169319.svg",
  calendar: "https://image.flaticon.com/icons/svg/1535/1535952.svg",   
  settings: "https://image.flaticon.com/icons/svg/70/70367.svg",
  database: "https://image.flaticon.com/icons/svg/76/76725.svg",
  
  scrollTop: "https://image.flaticon.com/icons/svg/2089/2089751.svg",
  theme: "https://image.flaticon.com/icons/svg/483/483619.svg",
  same: "https://image.flaticon.com/icons/svg/639/639219.svg",
  filter: "https://image.flaticon.com/icons/svg/1159/1159884.svg",    
  autoload: "https://image.flaticon.com/icons/svg/1437/1437788.svg",   
  chat: "https://image.flaticon.com/icons/svg/992/992450.svg",
  username: "https://image.flaticon.com/icons/svg/2089/2089136.svg",
  old: "https://image.flaticon.com/icons/svg/812/812680.svg",
  url: "https://image.flaticon.com/icons/svg/455/455691.svg",
  smile: "https://image.flaticon.com/icons/svg/1933/1933575.svg",
  resettings: "https://image.flaticon.com/icons/svg/1632/1632932.svg",
  arrow: "https://image.flaticon.com/icons/svg/566/566004.svg",
  maxline: "https://image.flaticon.com/icons/svg/1828/1828961.svg",
  midnight: "https://image.flaticon.com/icons/svg/359/359866.svg",
  help: "https://image.flaticon.com/icons/svg/2088/2088076.svg",
  first: "https://image.flaticon.com/icons/svg/1292/1292970.svg",
  best: "https://image.flaticon.com/icons/svg/1152/1152861.svg",
  
  sort_order: "https://image.flaticon.com/icons/svg/626/626013.svg",
  sort_id: "https://image.flaticon.com/icons/svg/929/929307.svg",
  sort_duration: "https://image.flaticon.com/icons/svg/1479/1479995.svg",
  sort_pop: "https://image.flaticon.com/icons/svg/1828/1828961.svg",
}

var cookie = {},
    cookieDOM = document.cookie.split("; ").filter(e => e),
    cookieDate = "Fri, 7 Aug 2020 00:00:00 UTC";

for(let i = 0; i < cookieDOM.length; i++){ 
  let key = cookieDOM[i].split("=")[0],
      value = cookieDOM[i].split("=")[1];
  cookie[key] = filter(["{"], value) ? JSON.parse(value) : value
}  

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(!cookie["lang"] || !langObj[cookie["lang"]]){
  cookie["lang"] = Object.keys(langObj)[0];
  document.cookie = `lang=${cookie["lang"]};expires=${cookieDate}`;
}
if(!cookie["theme"] || !colorObj[cookie["theme"]]){
  cookie["theme"] = Object.keys(colorObj)[0];
  document.cookie = `theme=${cookie["theme"]};expires=${cookieDate}`;
}
if(!cookie["UTC"] || isNaN(cookie["UTC"]) || +cookie["UTC"] > 56 || +cookie["UTC"] < -44){
  cookie["UTC"] = new Date().getTimezoneOffset() / -15;
  document.cookie = `UTC=${cookie["UTC"]};expires=${cookieDate}`;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(!cookie["turn"]) cookie["turn"] = {}
for(let p = 0; p < pageSet["turn"]["list"].length; p++){
  let name = pageSet["turn"]["list"][p];
  if(!cookie["turn"][name]){
    cookie["turn"][name] = {};
    for(let i = 0; i < settingsPages.length; i++){
      let page = settingsPages[i];
      cookie["turn"][name][page] = filterOnly(pageSet["turn"]["auto"][name], page) ? "1" : "0"
    }
  }else{
    let keys = Object.keys(cookie["turn"][name]),
        values = Object.values(cookie["turn"][name]);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i],
          value = values[i];
      if(!filterOnly(settingsPages, key)){
        delete cookie["turn"][name][key];
      }else{
        cookie["turn"][name][key] = !filterOnly(["0", "1"], value)
          ? cookie["turn"][name][page] = filterOnly(pageSet["turn"]["auto"][name], page) ? "1" : "0" : value;        
      }
    }
    if(Object.keys(cookie["turn"][name]).length != settingsPages.length){      
      for(let i = 0; i < settingsPages.length; i++){
        if(!filterOnly(cookie["turn"][name], settingsPages[i]))
          cookie["turn"][name][settingsPages[i]] = filterOnly(pageSet["turn"]["auto"][name], page) ? "1" : "0"          
      }    
    }
  }
}

document.cookie = `turn=${JSON.stringify(cookie["turn"])};expires=${cookieDate}`;  

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let allTheme = Object.keys(colorObj);
if(!cookie["hueRotate"]){
  cookie["hueRotate"] = {};
  for(let i = 0; i < allTheme.length; i++){
    let key = allTheme[i];
    cookie["hueRotate"][key] = "000";
  }
}else{
  let keys = Object.keys(cookie["hueRotate"]),
      values = Object.values(cookie["hueRotate"]);
  for(let i = 0; i < keys.length; i++){
    let key = keys[i],
        value = values[i];
    if(!filterOnly(allTheme, key) || Number(value) == NaN || +value < 0 || +value > 359 || value.length != 3){
      delete cookie["hueRotate"][key];
    }
  }
  if(Object.keys(cookie["hueRotate"]).length != allTheme.length){      
    for(let i = 0; i < allTheme.length; i++){
      if(!filterOnly(cookie["hueRotate"], allTheme[i]))
        cookie["hueRotate"][allTheme[i]] = "000";        
    }    
  }
}
document.cookie = `hueRotate=${JSON.stringify(cookie["hueRotate"])};expires=${cookieDate}`;  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////










var title = translate(["loading"]);
$("#title, title").html(title);
(function loading(){
  if($("title").html().slice(0, title.length) == title){
    $("title").html($("title").html().length < title.length+3 ? $("title").html() + "." : title)
  }
  setTimeout(() => loading(), 250)
})();

function getLang(ths){
  let lang = String(ths).length != 2 ? $(ths).attr("for").slice(0, -4) : String(ths);
  cookie["lang"] = lang;
  document.cookie = `lang=${cookie["lang"]};expires=${cookieDate}`;
  $("#title").html(translate(["pages", pathname]));
  
  for(let page = 0; page < allPages.length; page++){
    let key = allPages[page],
        value = translate(["pages", allPages[page]]);
    $(`label[for='${key}Page']`).attr({name: `» ${value}`})
  }
  
  $(`label[for='filter']`).attr({name: translate(["menu", "filter", "name"])})
  $("title").html(`${translate(["pages", pathname])}${
    $(`label[for='autoload']`).attr("status") == "completed"
    ? " | " + $(".bottomMenu label[for='autoload']").attr("number") + " | " + translate(["menu", "autoloadCompleted"])
      : $(`label[for='autoload']`).attr("status") == "nodata"
      ? " | " + translate(["menu", "autoloadNodata"])
        : !filter(pageSet.ban.autoload, pathname)
        ? " | " + $(".bottomMenu label[for='autoload']").attr("number")
          : ""
  }`);
  
  $(`label[for='autoload']`).attr({name: 
    $(`label[for='autoload']`).attr("status") == "completed" 
    ? translate(["menu", "autoloadCompleted"])
      : $(`label[for='autoload']`).attr("status") == "nodata"
      ? translate(["menu", "autoloadNodata"])
        : translate(["menu", "autoload"])
  })
  
  $(".rightFilter #resetAll").attr({name: translate(["menu", "filter", "resetAll"+(pathname=="settings"?"Settings":"")])})
  if($("ul>div[load]").length){
    if($("ul>div[load]").attr("status") == "completed"){
      $("ul>div[load]").attr({name: translate(["menu", "autoloadCompleted"])})
    }else{
      $("ul>div[load]").attr({name: translate(["menu", "autoloadNodata"])})
    }
  }
  switch(pathname){
    case "settings": 
      for(let i = 0; i < settingsPages.length; i++){
        $(`.rightFilter label[for="${settingsPages[i]}FilterMax"]`).attr({
          name: i == 0 || i == 1 ? translate(["menu", "filter", settingsPages[i]]) : translate(["pages", settingsPages[i]]),
        })
      }
      
      $("ul .add").attr({name: translate([pathname, "add"])})
      $("ul .delete").attr({name: translate([pathname, "delete"])})
      $("ul .ignore").attr({name: translate([pathname, "ignore"])})
      $("ul .reset[onclick*='Reset']").attr({name: translate([pathname, "reset"])})
      $("ul .reset[onclick*='Save']").attr({name: translate([pathname, "save"])})
      
      $(`li[content$='Add'] h8`).attr({meme: translate([pathname, "total"])})
      if(pageSet[pathname]["add"][hash]){
        for(let li = 0; li < pageSet[pathname]["add"][hash].length; li++){
          let type = pageSet[pathname]["add"][hash][li] || "";
          $(`li[content$='${type}Add'] h4 a`).html(translate([pathname, hash, "add"+type]))
          $(`li[content='${hash+type}'] h4 a`).html(translate([pathname, hash, "title"+type]))
          if($(`li[content='${hash+type}'] h4>div`).length)
            $(`li[content='${hash+type}'] h4>div`).html(translate([pathname, hash, "subtitle"+type]))
        }
      }
      
      $("li[for='cookieRightFilter'] h4 a").html(translate([pathname, "activePage"]))
      switch(hash){
        case "theme":
          $("ul li h4 a").html(translate([pathname, hash, "title"]))
        break;
        case "same":
          $("li[content='UTC'] h4 a").html(translate([pathname, "UTC"]))
        break;
      }
    break;
    default: 
      $("li>h4>a[datetype='yesterday']").attr({date: translate(["time", "yesterday"])})
      $("li>h4>a[datetype='online']").attr({date: translate(["time", "online"])})
      $("#filterOrder").attr({more: translate(["menu", "filter", "more"]), less: translate(["menu", "filter", "less"])})
      $("#activeFilter").attr({name: translate(["menu", "filter", "active"])})
      let filters = ["date", "pop", "duration", "channel"];
      for(let i = 0; i < filters.length; i++){
        $(`label[for='${filters[i]}FilterWrap']`).attr({name: translate(["menu", "filter", "wrap", filters[i]])})
      }
      let pStMt = pageSet.topMenu.tracking;
      for(let i = 0; i < pStMt.length; i++){
        $(`li>h4>a[fn][type='${pStMt[i]}']`).html(translate(["pages", pStMt[i]]))
      }  
  }
}
function loadArchive(type, result, step, oldget){
  try{
    if(result == "end"){
      endAutoload();
      $("#autoload").attr({act: "stop"})
    }else{
      (function startLoad(page = 0){
        if(window.location.href == type && Object.keys(result).length && oldget == get){
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

          let key   = Object.keys(result)[page],
              sID   = key.slice(2),
              ch    = result[key]["c"],
              sS    = result[key]["sS"]*1000,
              dur   = result[key]["d"],
              title = result[key]["sN"],
              sN    = result[key]["sN"].length > (70 - ch.length) 
                      ? result[key]["sN"].slice(0, (67 - ch.length)) + "..." 
                      : result[key]["sN"];

          let vDur  = (+dur.split(":")[0]*60*60 + +dur.split(":")[1]*60 + +dur.split(":")[2])*1000,
              vTime = tLS(sS - utc(), timeSet),
              vDate = tLS(sS - utc()),
              tDay  = tLS(Date.now() - utc()),
              yDay  = tLS(Date.now() - utc() - 24*60*60*1000);   

          let date = 5*60*1000 - (Date.now() - sS - vDur) > 0
                ? translate(["time", "online"]) : vDate == tDay 
                  ? vTime : vDate == yDay 
                    ? translate(["time", "yesterday"]) : vDate,
              dateType = 5*60*1000 - (Date.now() - sS - vDur) > 0
                  ? "online" : vDate == tDay 
                    ? "today" : vDate == yDay 
                      ? "yesterday" : "time";
          
          let tTypes = ["main", "fbi", "notes", "tags"];
/*////////////////////////////////////////////////////////////////////////////////////////////*/
          for(let ttt = 0; ttt < tTypes.length; ttt++){
            let pn = tTypes[ttt];
            if(result[Object.keys(result)[page]][pn]){
              
            let [gmax, allMaxLine, ggg, gggres] = [0, "", "", "0:0"],
                gmin = Math.floor((sS % 86400000) / 120000);
/*//////////*/if(pn == "main"){
                
                let memes = result[key][pn];
                content[sID] = memes
                
                for(let i = 0; i < Object.keys(memes).length; i++){
                  let memKey = memes[Object.keys(memes)[i]],
                      memVal = Object.keys(memKey),
                      dmax = 0;
                  ggg = `${i}:0`
                  gmax = gmax < +memVal[Object.keys(memKey).length-1].slice(1) ? +memVal[Object.keys(memKey).length-1].slice(1) : gmax
                  for(let u = 0; u < memVal.length; u++){
                    ggg = `${i}:${+ggg.split(":")[1] + +Object.values(memKey)[u]}`
                    dmax = dmax < Object.values(memKey)[u] ? Math.round(Object.values(memKey)[u]) : dmax
                  }
                  gggres = +gggres.split(":")[1] < +ggg.split(":")[1] ? ggg : gggres
                  allMaxLine += `<dot meme="m${i}" memename="${Object.keys(memes)[i]}" style="bottom: ${dmax*2+10 > 207 ? 207 : dmax*2+10}px; background: ${colorArr[infoBot["memes"][Object.keys(memes)[i]]]};" alt="${dmax}" hover="${!i?1:0}" onclick="dotclick(this);"></dot>`;
                }  
                let width = (gmax-gmin+xW(ch))*xW(ch) < widthLi() ? widthLi() : Math.round((gmax-gmin+xW(ch))/5)*5*xW(ch);
                let rangeMax = Math.round((gmax-gmin)/5) - widthLi()/(5*xW(ch));
                    rangeMax = rangeMax < 0 ? 0 : rangeMax + 1;
                let bottomThumb = (widthLi(60)/(rangeMax+1))*1.5 > widthLi(60) ? widthLi(60) : (widthLi(60)/(rangeMax+1))*1.5,
                    rightThumb  = (heightLi(60)/Object.keys(memes).length)*1.5 > heightLi(60) ? heightLi(60) : (heightLi(60)/Object.keys(memes).length)*1.5

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
                
                if(!$(`li[sID="${sID}"][pathname="${pn}"]`).length){
                  $("main ul div[load]").before(`
                    <input type="checkbox" id="arrow_comments_${pn+sID}" ${cookie["turn"]["arrow"][pathname] == "1" ? "checked" : ""}>
                    <label for="arrow_comments_${pn+sID}" icon="arrow" username="${ch}"></label>
                    <li sID="${sID}" type="main" username="${ch}" pathname="${pn}" ${dateType == "time" && cookie["turn"]["old"][pathname] == "1" ? "old" : ""} counter archive>
                      <h4 meme="${Object.keys(memes)[0]}" sum="0">
                        <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>   
                        <a target="_blank" href="${url(sID)}" title="${title}" sN>${sN}</a>   
                        <a target="_blank" href="/archive?date=${vDate}-${vDate}" date="${date}" fulldate="${tLS3(dur, gmax-gmin)}" datetype="${dateType}" onmouseover="help(this, ['archive'], ' [${vDate}]')"></a>
                      </h4>
                      <div class="deleteLi" onclick="dlt(this, 'main', 'block');"></div>
                      <h8>
                        <div class="graphX" onwheel="event.preventDefault()" min="${gmin}" max="${gmax}" sS="${sS}">
                          <canvas class="graph" id="canvas${sID}" height="200" width="${width}" style="height: 200px; width: ${width}px"></canvas>
                          <canvas class="graphMin" id="min${sID}" height="40" width="${width}" style="height: 40px; width: ${width}px" onwheel='graphXWheel(this, event, 1)' onclick="openLi(this)"></canvas>
                          <canvas class="graphAim" id="aim${sID}" height="200" width="${widthLi()}"onmousemove="getCanvasXY(this, event);" onmouseout="clearCanvas(this);"></canvas>
                        </div>   
                        <div fn><a target="_blank" href="/archive?sID=${sID}" onmouseover="help(this, ['pages', 'main'])" view="icon" icon="main"></a></div>
                        <div class="allMaxLine">${allMaxLine}</div>
                        <div class="mainMenu"></div>
                        <input type="range" name="bottomRange" class="bottomRange" max="${rangeMax}" step="1" value="0" percent="${!rangeMax ? 100 : 0}" oninput="bottomRange(this);">
                        <input type="range" name="rightRange" class="rightRange" min="0" max="${Object.keys(memes).length-1}" step="1" value="${+gggres.split(":")[0]}" orient="vertical" oninput="rightRange(this);">
                      </h8> 
                      <style>
                        li[sID="${sID}"][pathname="${pn}"] .bottomRange::-webkit-slider-thumb{width: ${Math.round(bottomThumb)}px}
                        li[sID="${sID}"][pathname="${pn}"] .rightRange::-webkit-slider-thumb{width: ${Math.round(rightThumb)}px}
                      </style>
                    </li>
                  `);

                  for(let i = 0; i < Object.keys(memes).length; i++){
                    let meme = Object.keys(memes)[i]
                    $(`li[sID="${sID}"] .rightRange`).attr(`m${i}`, Object.keys(memes[meme]).length)
                  }

                  rightRange($(`li[sID="${sID}"] .rightRange`))

                  if($(`#channel_${ch}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
                    $(`ul li[sID='${sID}'][pathname="${pn}"]`).hide();
                    $(`ul label[for='arrow_comments_${pn+sID}']`).hide();
                  }

                }
                
/*//////////*/}else{
                
                let mArr  = result[key][pn]
                if(!$(`li[sID="${sID}"][pathname="${pn}"]`).length){
                  $("main ul div[load]").before(`
                    <input type="checkbox" id="arrow_comments_${pn+sID}" ${$(`li[sID="${sID}"]`).length ? `next`:""} ${cookie["turn"]["arrow"][pathname] == "1" ? "checked" : ""}>
                    <label for="arrow_comments_${pn+sID}" icon="arrow" username="${ch}"></label>
                    <li sID="${sID}" type="comments" pathname="${pn}" username="${ch}" ${!$(`li[sID="${sID}"]`).length ? `counter`: `next`} ${dateType == "time" && cookie["turn"]["old"][pathname] == "1" ? "old" : ""}>
                      <h4 meme="0" sum="0">       
                        ${!$(`li[sID="${sID}"]`).length ? `
                          <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>   
                          <a target="_blank" href="${url(sID)}" title="${title}" sN>${sN}</a>
                          <a target="_blank" href="/archive?date=${vDate}-${vDate}"  date="${date}" fulldate="${tLS3(dur, gmax-gmin)}" datetype="${dateType}" onmouseover="help(this, ['archive'], ' [${vDate}]')"></a>
                        ` : ``}   
                      </h4>
                      <div class="deleteLi" onclick="dlt(this, '${pn}', 'block');"></div>
                      <h8>
                        <div fn><a target="_blank" href="/archive?sID=${sID}" onmouseover="help(this, ['pages', '${pn}'])" view="icon" icon="${pn}"></a></div>
                      </h8>
                    </li>
                  `);
                  
/****************/for(let i = 0; i < mArr.length; i++){
                    let ts = tLS(mArr[i]["t"] - sS - new Date().getTimezoneOffset()*-60000, timeSet),
                        user = mArr[i]["u"],
                        mes = wwwFilter(smilesFilter(mArr[i]["m"]));

                    let urlMes = url(sID) + `&t=${ts.split(":")[0]}h${ts.split(":")[1]}m${ts.split(":")[2]}s`;

                    let meme = $(`ul li[sID="${sID}"][pathname="${pn}"] h4`).attr("meme"),
                        sum  = $(`ul li[sID="${sID}"][pathname="${pn}"] h4`).attr("sum");
                    $(`ul li[sID="${sID}"][pathname="${pn}"] h4`).attr({sum: +sum+1})
                    if(cookie["turn"]["same"][pn] == "0" || !filter([`#${user}:</b> ${mes}`], $(`ul li[sID="${sID}"] h8`).html())){
                      $(`ul li[sID="${sID}"][pathname="${pn}"] h4`).attr({meme: +meme+1})
                      $(`ul li[sID="${sID}"][pathname="${pn}"] h8`).append(`
                        <div>
                          <a target="_blank" href="${urlMes}"><b>[${ts}] #${user}:</b></a>
                          <div delete onclick="dlt(this, '${pn}', 'message', ${mArr[i]["t"]});"></div>
                        </div>
                      `);
                      $(`ul li[sID="${sID}"][pathname="${pn}"] h8 a[href='${urlMes}']`).append(` ${mes}`)
                    }
/****************/}

                  if($(`#channel_${ch}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
                    $(`ul li[sID='${sID}']`).hide();
                    $(`ul label[for='arrow_comments${sID}']`).hide();
                  }
                  
                }
/*//////////*/}

            }
          }
/*////////////////////////////////////////////////////////////////////////////////////////////*/
          addTitleNum();
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          
          setTimeout(() => {
            page++;
              if(page < Object.keys(result).length){
                if(window.location.href == type){reload();}
              }else{getContent(pathname, +step+1);}
            function reload(){
              let sH = +$("html").prop('scrollHeight'),
                  sT = +$(document).scrollTop();
              if(window.location.href == type){
                if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){
                  startLoad(page);
                  $("#autoload").attr({act: "load"})
                }else{setTimeout(() => {
                  if(window.location.href == type){
                    reload();
                    $("#autoload").attr({act: "stop"})
                  }
                }, 50)}
              }
            }
          }, 50) 

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

        }
      })()
    }
  }catch(e){
    console.error(e);
    setTimeout(() => loadArchive(type, result, step), 200);
  }  
}
function loadBest(type, result, step, oldget){
  try{
    if(result == "end"){
      endAutoload();
      $("#autoload").attr({act: "stop"})
    }else{
      (function startLoad(page = 0){
        if(window.location.href == type && Object.keys(result).length && oldget == get){
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          
          if(result[Object.keys(result)[page]][pathname]){

            let key   = Object.keys(result)[page],
                sID   = key.slice(2),
                ch    = result[key]["c"],
                sS    = result[key]["sS"]*1000,
                dur   = result[key]["d"],
                title = result[key]["sN"],
                memes = result[key][pathname],
                sN    = result[key]["sN"].length > (70 - ch.length) 
                        ? result[key]["sN"].slice(0, (67 - ch.length)) + "..." 
                        : result[key]["sN"];

            content[sID] = memes; 
                       
            let vDur  = (+dur.split(":")[0]*60*60 + +dur.split(":")[1]*60 + +dur.split(":")[2])*1000,
                vTime = tLS(sS - utc(), timeSet),
                vDate = tLS(sS - utc()),
                tDay  = tLS(Date.now() - utc()),
                yDay  = tLS(Date.now() - utc() - 24*60*60*1000);   

            let date = 5*60*1000 - (Date.now() - sS - vDur) > 0
                  ? translate(["time", "online"]) : vDate == tDay 
                    ? vTime : vDate == yDay 
                      ? translate(["time", "yesterday"]) : vDate,
                dateType = 5*60*1000 - (Date.now() - sS - vDur) > 0
                    ? "online" : vDate == tDay 
                      ? "today" : vDate == yDay 
                        ? "yesterday" : "time";
            
            let fns = "";
            for(let i = 0; i < commentPages.length; i++){
              let link = commentPages[i],
                  num = result[key][`t${link.toUpperCase().slice(0, 1)}`]
              fns += `<a target="_blank" href="/archive?sID=${sID}" onmouseover="help(this, ['pages', '${link}'])" view="icon" icon="${link}" name="${num}"></a>`
            }
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
            
            // let [gmax, allMaxLine, ggg, gggres] = [0, "", "", "0:0"],
            //     gmin = Math.floor((sS % 86400000) / 120000);
            let [gmin, gmax] = [0, memes["allTriggers"]["map"].length]
            // for(let i = 0; i < Object.keys(memes).length; i++){
            //   let memKey = memes[Object.keys(memes)[i]],
            //       memVal = Object.keys(memKey),
            //       dmax = 0;
            //   ggg = `${i}:0`
            //   gmax = gmax < +memVal[Object.keys(memKey).length-1].slice(1) ? +memVal[Object.keys(memKey).length-1].slice(1) : gmax
            //   for(let u = 0; u < memVal.length; u++){
            //     ggg = `${i}:${+ggg.split(":")[1] + +Object.values(memKey)[u]}`
            //     dmax = dmax < Object.values(memKey)[u] ? Math.round(Object.values(memKey)[u]) : dmax
            //   }
            //   gggres = +gggres.split(":")[1] < +ggg.split(":")[1] ? ggg : gggres
            //   allMaxLine += `<dot meme="m${i}" memename="${Object.keys(memes)[i]}" style="bottom: ${dmax*2+10 > 207 ? 207 : dmax*2+10}px; background: ${atColor[i]};" alt="${dmax}" hover="0" onclick="dotclick(this);"></dot>`;
            // }  
            // let width = (gmax-gmin+xW(ch))*xW(ch) < widthLi() ? widthLi() : Math.round((gmax-gmin+xW(ch))/5)*5*xW(ch);
            let rangeMax = Math.round((gmax-gmin)/5) - widthLi()/(5*xW(ch));
                rangeMax = rangeMax < 0 ? 0 : rangeMax + 1;
            let bottomThumb = (widthLi(60)/(rangeMax+1))*1.5 > widthLi(60) ? widthLi(60) : (widthLi(60)/(rangeMax+1))*1.5,
                rightThumb  = (heightLi(60)/1)*1.5 > heightLi(60) ? heightLi(60) : (heightLi(60)/1)*1.5
            
            let width = (gmax+xW(ch)) * xW(ch) < widthLi() ? widthLi() : Math.round((gmax+xW(ch)/5))*5*xW(ch);
            
            
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
            if(!$(`li[sID="${sID}"]`).length){
              $("main ul div[load]").before(`
                <input type="checkbox" id="arrow_comments${sID}" ${cookie["turn"]["arrow"][pathname] == "1" ? "checked" : ""}>
                <label for="arrow_comments${sID}" icon="arrow" username="${ch}"></label>
                <li sID="${sID}" type="main" username="${ch}" ${dateType == "time" && cookie["turn"]["old"][pathname] == "1" ? "old" : ""} counter>
                  <h4 sum="${gmax}">
                    <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>   
                    <a target="_blank" href="${url(sID)}" title="${title}" sN>${sN}</a>   
                    <a target="_blank" href="/archive?date=${vDate}-${vDate}" date="${date}" fulldate="${tLS3(dur)}" datetype="${dateType}" onmouseover="help(this, ['archive'], ' [${vDate}]')"></a>
                  </h4>
                  <div class="deleteLi" onclick="dlt(this, 'main', 'block');"></div>
                  <h8>
                    <div class="graphX" onwheel="event.preventDefault()" min="${gmin}" max="${gmax}" sS="${sS}">
                      <canvas class="graph" id="canvas${sID}" height="${heightLi()}" width="${width}" style="height: 200px; width: ${width}px"></canvas>
                      <canvas class="graphMin" id="min${sID}" height="40" width="${width}" style="height: 40px; width: ${width}px" onwheel='graphXWheel(this, event, 1)' onclick="openLi(this)"></canvas>
                      <canvas class="graphAim" id="aim${sID}" height="${heightLi()}" width="${widthLi()}"onmousemove="getCanvasXY(this, event);" onmouseout="clearCanvas(this);"></canvas>
                    </div>  
                    <div fn>${fns}</div>
                    <div class="mainMenu"></div>
                    <input type="range" name="bottomRange" class="bottomRange" max="${rangeMax}" step="1" value="0" percent="${!rangeMax ? 100 : 0}" oninput="bottomRange(this);">
                    <input type="range" name="rightRange" class="rightRange" min="0" max="${memes["list"].length-1}" step="1" value="${memes["list"].length-1}" orient="vertical" oninput="rightRange(this);">
                  </h8>
                </li>
                <style>
                  li[sID="${sID}"] .bottomRange::-webkit-slider-thumb{width: ${Math.round(bottomThumb)}px}
                </style>
              `);
              
              
              rightRange($(`li[sID="${sID}"] .rightRange`))
              
              if($(`#channel_${ch}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
                $(`ul li[sID='${sID}']`).hide();
                $(`ul label[for='arrow_comments${sID}']`).hide();
              }

              addTitleNum();
            }
          }
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

          setTimeout(() => {
            page++;
              if(page < Object.keys(result).length){
                if(window.location.href == type){reload();}
              }else{getContent(pathname, +step+1);}
            function reload(){
              let sH = +$("html").prop('scrollHeight'),
                  sT = +$(document).scrollTop();
              if(window.location.href == type){
                if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){
                  startLoad(page);
                  $("#autoload").attr({act: "load"})
                }else{setTimeout(() => {
                  if(window.location.href == type){
                    reload();
                    $("#autoload").attr({act: "stop"})
                  }
                }, 50)}
              }
            }
          }, 50) 

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

        }
      })()
    }
  }catch(e){
    console.error(e);
    setTimeout(() => loadBest(type, result, step), 200);
  }  
}
function loadComments(type, result, step, oldget){
  try{
    if(result == "end"){
      endAutoload();
      $("#autoload").attr({act: "stop"})
    }else{
      (function startLoad(page = 0){
        if(type == window.location.href && Object.keys(result).length && oldget == get){
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          
          if(result[Object.keys(result)[page]][pathname]){

            let key   = Object.keys(result)[page],
                sID   = key.slice(2),
                mArr  = result[key][pathname];
            let ch    = result[key]["c"],
                sS    = result[key]["sS"]*1000,
                dur   = result[key]["d"],
                title = result[key]["sN"],
                sN    = result[key]["sN"].length > (80 - ch.length) 
                        ? result[key]["sN"].slice(0, (77 - ch.length)) + "..." 
                        : result[key]["sN"];

            let vDur  = (+dur.split(":")[0]*60*60 + +dur.split(":")[1]*60 + +dur.split(":")[2])*1000,
                vTime = tLS(sS - utc(), timeSet),
                vDate = tLS(sS - utc()),
                tDay  = tLS(Date.now() - utc()),
                yDay  = tLS(Date.now() - utc() - 24*60*60*1000);   

            let date = 5*60*1000 - (Date.now() - sS - vDur) > 0
                  ? translate(["time", "online"]) : vDate == tDay 
                    ? vTime : vDate == yDay 
                      ? translate(["time", "yesterday"]) : vDate,
                dateType = 5*60*1000 - (Date.now() - sS - vDur) > 0
                    ? "online" : vDate == tDay 
                      ? "today" : vDate == yDay 
                        ? "yesterday" : "time";
            
            let fns = "";
            for(let i = 0; i < commentPages.length; i++){
              let link = commentPages[i];
              if(link != pathname){
                let num = result[key][`t${link.toUpperCase().slice(0, 1)}`]
                fns += `<a target="_blank" href="/archive?sID=${sID}" onmouseover="help(this, ['pages', '${link}'])" view="icon" icon="${link}" name="${num}"></a>`
              }
            }
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
              if(!$(`li[sID="${sID}"]`).length){
                $("main ul div[load]").before(`
                  <input type="checkbox" id="arrow_comments${sID}" ${cookie["turn"]["arrow"][pathname] == "1" ? "checked" : ""}>
                  <label for="arrow_comments${sID}" icon="arrow" username="${ch}"></label>
                  <li sID="${sID}" type="comments" username="${ch}" ${dateType == "time" && cookie["turn"]["old"][pathname] == "1" ? "old" : ""} counter>
                    <h4 meme="0" sum="0">
                      <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>   
                      <a target="_blank" href="${url(sID)}" title="${title}" sN>${sN}</a>   
                      <a target="_blank" href="/archive?date=${vDate}-${vDate}" date="${date}" fulldate="${tLS3(dur)}" datetype="${dateType}" onmouseover="help(this, ['archive'], ' [${vDate}]')"></a>
                    </h4>
                    <div class="deleteLi" onclick="dlt(this, '${pathname}', 'block');"></div>
                    <h8><div fn>${fns}</div></h8>
                  </li>
                `);

/**************/for(let i = 0; i < mArr.length; i++){
                  let ts = tLS(mArr[i]["t"] - sS - new Date().getTimezoneOffset()*-60000, timeSet),
                      user = mArr[i]["u"],
                      mes = wwwFilter(smilesFilter(mArr[i]["m"]));

                  let urlMes = url(sID) + `&t=${ts.split(":")[0]}h${ts.split(":")[1]}m${ts.split(":")[2]}s`;

                  let meme = $(`ul li[sID="${sID}"] h4`).attr("meme"),
                      sum  = $(`ul li[sID="${sID}"] h4`).attr("sum");
                  $(`ul li[sID="${sID}"] h4`).attr({sum: +sum+1})
                  if(cookie["turn"]["same"][pathname] == "0" || !filter([`#${user}:</b> ${mes}`], $(`ul li[sID="${sID}"] h8`).html())){
                    $(`ul li[sID="${sID}"] h4`).attr({meme: +meme+1})
                    $(`ul li[sID="${sID}"] h8`).append(`
                      <div>
                        <a target="_blank" href="${urlMes}"><b>[${ts}] #${user}:</b></a>
                        <div delete onclick="dlt(this, '${pathname}', 'message', ${mArr[i]["t"]});"></div>
                      </div>
                    `);
                    $(`ul li[sID="${sID}"] h8 a[href='${urlMes}']`).append(` ${mes}`)
                  }
/**************/}

                if($(`#channel_${ch}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
                  $(`ul li[sID='${sID}']`).hide();
                  $(`ul label[for='arrow_comments${sID}']`).hide();
                }

                addTitleNum();
              }
          }
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          
          setTimeout(() => {
            page++;
              if(page < Object.keys(result).length){
                if(window.location.href == type){reload();}
              }else{getContent(pathname, +step+1);}
            function reload(){
              let sH = +$("html").prop('scrollHeight'),
                  sT = +$(document).scrollTop();
              if(window.location.href == type){
                if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){
                  startLoad(page);
                  $("#autoload").attr({act: "load"})
                }else{setTimeout(() => {
                  if(window.location.href == type){
                    reload();
                    $("#autoload").attr({act: "stop"})
                  }
                }, 50)}
              }
            }
          }, 50) 

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

        }
      })()
    }
  }catch(e){
    console.error(e);
    setTimeout(() => loadComments(type, result, step), 200);
  }  
}
function loadMain(type, result, step, oldget){
  try{
    if(result == "end"){
      endAutoload();
      $("#autoload").attr({act: "stop"})
    }else{
      (function startLoad(page = 0){
        if(window.location.href == type && Object.keys(result).length && oldget == get){
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          
          if(result[Object.keys(result)[page]][pathname]){
 
            let key   = Object.keys(result)[page],
                sID   = key.slice(2),
                ch    = result[key]["c"],
                sS    = result[key]["sS"]*1000,
                dur   = result[key]["d"],
                title = result[key]["sN"],
                memes = result[key][pathname],
                sN    = result[key]["sN"].length > (70 - ch.length) 
                        ? result[key]["sN"].slice(0, (67 - ch.length)) + "..." 
                        : result[key]["sN"];

            content[sID] = memes;

            let vDur  = (+dur.split(":")[0]*60*60 + +dur.split(":")[1]*60 + +dur.split(":")[2])*1000,
                vTime = tLS(sS - utc(), timeSet),
                vDate = tLS(sS - utc()),
                tDay  = tLS(Date.now() - utc()),
                yDay  = tLS(Date.now() - utc() - 24*60*60*1000);   

            let date = 5*60*1000 - (Date.now() - sS - vDur) > 0
                  ? translate(["time", "online"]) : vDate == tDay 
                    ? vTime : vDate == yDay 
                      ? translate(["time", "yesterday"]) : vDate,
                dateType = 5*60*1000 - (Date.now() - sS - vDur) > 0
                    ? "online" : vDate == tDay 
                      ? "today" : vDate == yDay 
                        ? "yesterday" : "time";
            
            let fns = "";
            for(let i = 0; i < commentPages.length; i++){
              let link = commentPages[i],
                  num = result[key][`t${link.toUpperCase().slice(0, 1)}`]
              fns += `<a target="_blank" href="/archive?sID=${sID}" onmouseover="help(this, ['pages', '${link}'])" view="icon" icon="${link}" name="${num}"></a>`
            }
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
            
            let [gmax, allMaxLine, ggg, gggres] = [0, "", "", "0:0"],
                gmin = Math.floor((sS % 86400000) / 120000);
            for(let i = 0; i < Object.keys(memes).length; i++){
              let memKey = memes[Object.keys(memes)[i]],
                  memVal = Object.keys(memKey),
                  dmax = 0;
              ggg = `${i}:0`
              gmax = gmax < +memVal[Object.keys(memKey).length-1].slice(1) ? +memVal[Object.keys(memKey).length-1].slice(1) : gmax
              for(let u = 0; u < memVal.length; u++){
                ggg = `${i}:${+ggg.split(":")[1] + +Object.values(memKey)[u]}`
                dmax = dmax < Object.values(memKey)[u] ? Math.round(Object.values(memKey)[u]) : dmax
              }
              gggres = +gggres.split(":")[1] < +ggg.split(":")[1] ? ggg : gggres
              allMaxLine += `<dot meme="m${i}" memename="${Object.keys(memes)[i]}" style="bottom: ${dmax*2+10 > 207 ? 207 : dmax*2+10}px; background: ${colorArr[infoBot["memes"][Object.keys(memes)[i]]]};" alt="${dmax}" hover="0" onclick="dotclick(this);"></dot>`;
            }  
            let width = (gmax-gmin+xW(ch))*xW(ch) < widthLi() ? widthLi() : Math.round((gmax-gmin+xW(ch))/5)*5*xW(ch);
            let rangeMax = Math.round((gmax-gmin)/5) - widthLi()/(5*xW(ch));
                rangeMax = rangeMax < 0 ? 0 : rangeMax + 1;
            let bottomThumb = (widthLi(60)/(rangeMax+1))*1.5 > widthLi(60) ? widthLi(60) : (widthLi(60)/(rangeMax+1))*1.5,
                rightThumb  = (heightLi(60)/Object.keys(memes).length)*1.5 > heightLi(60) ? heightLi(60) : (heightLi(60)/Object.keys(memes).length)*1.5         
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
            if(!$(`li[sID="${sID}"]`).length){
              $("main ul div[load]").before(`
                <input type="checkbox" id="arrow_comments${sID}" ${cookie["turn"]["arrow"][pathname] == "1" ? "checked" : ""}>
                <label for="arrow_comments${sID}" icon="arrow" username="${ch}"></label>
                <li sID="${sID}" type="main" username="${ch}" ${dateType == "time" && cookie["turn"]["old"][pathname] == "1" ? "old" : ""} counter>
                  <h4 meme="${Object.keys(memes)[0]}" sum="0">
                    <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>
                    <a target="_blank" href="${url(sID)}" title="${title}" sN>${sN}</a>   
                    <a target="_blank" href="/archive?date=${vDate}-${vDate}" date="${date}" fulldate="${tLS3(dur, gmax-gmin)}" datetype="${dateType}" onmouseover="help(this, ['archive'], ' [${vDate}]')"></a>
                  </h4>
                  <div class="deleteLi" onclick="dlt(this, '${pathname}', 'block');"></div>
                  <h8>
                    <div class="graphX" onwheel="event.preventDefault()" min="${gmin}" max="${gmax}" sS="${sS}">
                      <canvas class="graph" id="canvas${sID}" height="${heightLi()}" width="${width}" style="height: ${heightLi()}px; width: ${width}px"></canvas>
                      <canvas class="graphMin" id="min${sID}" height="40" width="${width}" style="height: 40px; width: ${width}px" onwheel='graphXWheel(this, event, 1)' onclick="openLi(this)"></canvas>
                      <canvas class="graphAim" id="aim${sID}" height="${heightLi()}" width="${widthLi()}"onmousemove="getCanvasXY(this, event);" onmouseout="clearCanvas(this);"></canvas>
                    </div>   
                    <div fn>${fns}</div>
                    <div class="allMaxLine">${allMaxLine}</div>
                    <div class="mainMenu"></div>
                    <input type="range" name="bottomRange" class="bottomRange" max="${rangeMax}" step="1" value="0" percent="${!rangeMax ? 100 : 0}" oninput="bottomRange(this);">
                    <input type="range" name="rightRange" class="rightRange" min="0" max="${Object.keys(memes).length-1}" step="1" value="${+gggres.split(":")[0]}" orient="vertical" oninput="rightRange(this);">
                  </h8> 
                  <style>
                    li[sID="${sID}"] .bottomRange::-webkit-slider-thumb{width: ${Math.round(bottomThumb)}px}
                    li[sID="${sID}"] .rightRange::-webkit-slider-thumb{width: ${Math.round(rightThumb)}px}
                  </style>
                </li>
              `);
              
              for(let i = 0; i < Object.keys(memes).length; i++){
                let meme = Object.keys(memes)[i]
                $(`li[sID="${sID}"] .rightRange`).attr(`m${i}`, Object.keys(memes[meme]).length)
              }
              
              rightRange($(`li[sID="${sID}"] .rightRange`))
              
              if($(`#channel_${ch}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
                $(`ul li[sID='${sID}']`).hide();
                $(`ul label[for='arrow_comments${sID}']`).hide();
              }

              addTitleNum();
            }
          }
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

          setTimeout(() => {
            page++;
              if(page < Object.keys(result).length){
                if(window.location.href == type){reload();}
              }else{getContent(pathname, +step+1);}
            function reload(){
              let sH = +$("html").prop('scrollHeight'),
                  sT = +$(document).scrollTop();
              if(window.location.href == type){
                if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){
                  startLoad(page);
                  $("#autoload").attr({act: "load"})
                }else{setTimeout(() => {
                  if(window.location.href == type){
                    reload();
                    $("#autoload").attr({act: "stop"})
                  }
                }, 50)}
              }
            }
          }, 50) 

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

        }
      })()
    }
  }catch(e){
    console.error(e);
    setTimeout(() => loadMain(type, result, step), 200);
  }  
}
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
          if(filterOnly(pageSet["turn"]["show"][list[i]], hash)){
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
function start(ths, pass = ""){
  pathname = !pass ? $(ths).attr("id").slice(0, -4).toLowerCase() : pathname;
  if(location.pathname.slice(1) != pathname || pass){
    $("label[for='autoload']").attr({status: "process"})
    $("#title, title").html(translate(["pages", pathname]));
    // $("#title").attr({onclick: pathname != "settings" ? "allReset()" : ""})
    pass = pass == 1 ? "" : pass;
    history.replaceState('', null, pathname + getToString());
    
    $(document).scrollTop(0);
    $("input#filter").prop("checked", false);  
    $("main ul, .rightFilter").html("");
    $("#awayMove, .getColor").detach();
 
    content = {};
    getBottomMenu();       // при необходимости скрывает и активирует filter и autoload
    getReloadAutoload();   // обнуляет значение autoload
    getRightFilter();      // загружает новый фильтр
    getContent(pathname);  // загружает контент характерный для pathname  
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getContent(type, step = 0){
  let href = window.location.href;
  createGet();
  let oldget = get;
  if(!$("ul div[load]").length && !filter(["settings"], pathname)){
    $("ul").append(`<div view="button" load></div>`);
    $("main").css({cursor: "wait"});
    if(filter(["main", "best", "archive"], pathname)) 
      $("ul").prepend("<a id='awayMove' target='_blank' onclick='awayMove(this)' onmouseout='awayMove(this)' onwheel='graphXWheel(this, event)'></a>")
  }
  
  switch(type){
    case "settings": loadSettings(type); break;
    case "main": case "fbi": case "notes": case "tags": case "archive": case "best":
      $("#autoload").attr({act: "load"})
      $.ajax({
        url: "listStream",
        data: {
          type: type, 
          from: step*(filterOnly(["fbi", "notes", "tags"], type) ? loadLimit : loadLimit/2), 
          limit: (filterOnly(["fbi", "notes", "tags"], type) ? loadLimit : loadLimit/2),
          channel: get[pathname]["channel"] || 0, 
          sort: get[pathname]["sort"] || "DESC",
          by: get[pathname]["by"] || "sI",
          date: get[pathname]["date"] || 0,
          duration: get[pathname]["duration"] || 0,
          pop: get[pathname]["pop"] || 0,
          sID: get[pathname]["sID"] || 0,
        },
        method: 'get',
        error: err => setTimeout(() => {if(pathname == type) getContent(type, step)}, 3000),
        success: data => {
          // console.log(data)
          $("main").css({cursor: ""})
          switch(type){
            case "main": loadMain(href, data, step, oldget); break;
            case "best": loadBest(href, data, step, oldget); break;
            case "archive": loadArchive(href, data, step, oldget); break;
            default: loadComments(href, data, step, oldget);
          }
          $(`.loadCode input`).prop("checked", false)
        }
      })
    break;
    default: 
      $("main").css({cursor: ""}); 
      endAutoload()
  }
}
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
  if(turn("filter") && !filterOnly(pageSet.ban.filter, pathname)){  
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
    $("body").append(`<div class="getColor" style="top: ${top - 72.5}px" group="${group}">${colors}</div>`)
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
  let status = filterOnly(["completed", "nodata"], $("label[for='autoload']").attr("status"))
      ? !value 
        ? `| ${translate(["menu", "autoloadNodata"])}`
        : `| ${value} | ${translate(["menu", "autoloadCompleted"])}`
      : "";
  setTimeout(() => {
    let title = filter(["settings"], pathname)
              ? translate(["pages", pathname])
              : `${translate(["pages", pathname])} | ${status}`
    $("title").html(title)
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
  if(turn("autoload") && !filterOnly(pageSet.ban.autoload, pathname)){
    $("#autoload").prop("checked", true);
  }  
}
function endAutoload(){
  let oldpathname = pathname
  let name = $("ul li").length ? translate(["menu", "autoloadCompleted"]) : translate(["menu", "autoloadNodata"]),
      statusIcon = $("ul li").length ? "completed" : "nodata",
      value = $("label[for='autoload']").attr("number"),
      status = !value ? name : `${value} | ${name}`;
  $("label[for='autoload'], ul>div[load]").attr({name: name, status: statusIcon})
  setTimeout(() => {
    if(oldpathname == pathname){
      $("#autoload").prop("checked", false); 
      $("title").html(`${$("#title").html()} | ${status}`)
    }
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
        for(let i = 0; i < Object.keys(infoBot.channels).length; i++){
          let username = Object.keys(infoBot.channels)[i]
          cookie["graph"]["xH"][username] = coo.xH
          cookie["graph"]["xW"][username] = coo.xW
        }
        document.cookie = `graph=${JSON.stringify(cookie["graph"])};expires=${cookieDate}`;
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
  if(turn("help")){
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
    }, 100)
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
            if($(`li[sID="${sID}"] h8 div`).length == 1){
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
function fns(ths, e){
  if(+keyFilter == 16){
    helpOut(ths)
    e.preventDefault();
    let href = $(ths).attr("href").slice(1).split("?")
    let pn = href[0],
        key = href[1].split("=")[0],
        value = href[1].split("=")[1];
    let pass = pn == pathname ? 1 : 0;
    start($(`input#${pn}Page`), pass, `?${key}=${value}`)
  }  
}





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
  if(cookie["turn"]["filter"][pathname] == "1" 
     // && !filterOnly(pageSet.bottomMenu.hide_filter, pathname)
    ){  
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
  if(cookie["turn"]["autoload"][pathname] == "1" && !filterOnly(pageSet.bottomMenu.hide_autoload, pathname)){
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
        document.cookie = `hueRotate=${JSON.stringify(cookie["hueRotate"]).replace(/"/g,"")};expires=${cookieDate}`; 
      break;
      default: 
        for(let i = 0; i < pageSet.bottomMenu.list.length; i++){
          let key = pageSet.bottomMenu.list[i],
              value = filterOnly(["help"], key) ? 1 : filterOnly(pageSet["bottomMenu"][`turn_${key}`], url) ? 1 : 0;
          cookie[`turn_${key}`][url] = value;
          $(`ul input#${key}Cookie`).prop("checked", value);
          document.cookie = `turn_${key}=${JSON.stringify(cookie[`turn_${key}`]).replace(/"/g,"")};expires=${cookieDate}`; 
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
      top = $(ths).offset().top,
      left = $(ths).offset().left;
  if(cookie["turn"]["help"][pathname] == "1"){
    $(ths).attr({event: "hover", onmouseout: "helpOut(this);"}).css({cursor: "help"})
    setTimeout(() => {
      if($(ths).attr("event") == "hover"){
        $(ths).css({cursor: ""})
        text[0] = text[0] == 1 ? pathname : text[0];
        $(".help").html(translate(["help", ...text])+text2).show();
        let hHelp = $(".help").height(),
            wHelp = $(".help").width();

        let position = left > $(window).width()*0.75 ? "right" : "left";
        left = left > $(window).width()*0.75 ? left - 30 - wHelp : 10+wDiv+left;
        $(".help").css({
          left: left+"px",
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
    let sID = parent(ths, 2).attr("sID"),
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
function h4MenuOut(){$("#h4Menu").css({display: "none"}).html("")}
function h4MenuOver(){
  let sID = $("#h4Menu").attr("sID")
  $("#h4Menu").css({display: "flex"})
    .html(`
      <div view="button" name="${translate(["settings", "delete"])}" onclick="dlt(this, 'fbi', 'block');" delete=""></div>
      <a view="button" target="_blank" href="/archive?sID=${sID}" name="${translate(["pages", "archive"])}" bg="_b:dark_h:dark_c:color_ch:color"></a>
    `)
}
function h4Menu(ths){
  let left = $(ths).offset().left,
      width = $(ths).width(),
      top = $(ths).offset().top,
      sID = parent(ths, 2).attr("sID");
  $("#h4Menu").attr({sID: sID})
    .css({
      display: "flex",
      right: `${$(window).width() - left - width}px`,
      top: `${top}px`,
    })
    .html(`
      <div view="button" name="${translate(["settings", "delete"])}" onclick="dlt(this, 'fbi', 'block');" delete=""></div>
      <a view="button" target="_blank" href="/archive?sID=${sID}" name="${translate(["pages", "archive"])}" bg="_b:dark_h:dark_c:color_ch:color"></a>
    `)
}





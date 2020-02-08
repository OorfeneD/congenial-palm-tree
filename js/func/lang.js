function getLang(ths){
  let lang = String(ths).length != 2 ? $(ths).attr("for").slice(0, -4) : String(ths);
  cookie["lang"] = lang;
  document.cookie = `lang=${cookie["lang"]};expires=${cookieDate}`;
  $("#title").html(translate(["pages", pathname]));
  
  $("label[for='getTheme']").attr({name: translate(["menu", "getTheme"])})
  for(let page = 0; page < allPages.length; page++){
    let key = allPages[page],
        value = translate(["pages", allPages[page]]);
    $(`label[for='${key}Page']`).attr({name: `» ${value}`})
  }
  
  $(`label[for='filter']`).attr({name: translate(["menu", "filter", "name"])})
  $("title").html(`${translate(["pages", pathname])}${
    $(`label[for='autoload']`).attr("status") == "completed"
    ? " - " + translate(["menu", "autoloadcompleted"])
      : !filter(pageSet["bottomMenu"].hide_autoload, pathname)
        ? " - " + $(".bottomMenu label[for='autoload']").attr("number")
          : ""
  }`);
  
  $(`label[for='autoload']`).attr({name: 
    $(`label[for='autoload']`).attr("status") == "completed" 
    ? translate(["menu", "autoloadcompleted"])
      : translate(["menu", "autoload"])
  })
  
  $(".rightFilter .reset").attr({name: translate(["menu", "filter", "resetAll"])})
  switch(pathname){
    case "settings":   
      $("ul .reset").attr({name: translate(["menu", "filter", "reset"])})
      let labelArr = ["theme", "same", ...allPages];
      for(let i = 0; i < labelArr.length; i++){
        $(`.rightFilter label[for="${labelArr[i]}FilterMax"]`).attr({
          name: i == 0 || i == 1 ? translate(["menu", "filter", labelArr[i]]) : translate(["pages", labelArr[i]]),
        })
      }
      $("li[for='cookieRightFilter'] h4 a").html(translate(["settings", "activePage"]))
      switch(hash){
        case "theme":
          $("ul li h4 a").html(translate(["settings", "hueRotate"]))
        break;
        default: 
          $("ul li[for='cookieBottomMenu'] h4 a").html(translate(["settings", "activePage"]))
        break;
      }
    break;
  }
}
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
      $("ul .reset[onclick^='reset']").attr({name: translate(["menu", "filter", "reset"])})
      $("ul .reset[onclick^='save']").attr({name: translate(["settings", "save"])})
      let labelArr = ["theme", "same", ...allPages];
      for(let i = 0; i < labelArr.length; i++){
        $(`.rightFilter label[for="${labelArr[i]}FilterMax"]`).attr({
          name: i == 0 || i == 1 ? translate(["menu", "filter", labelArr[i]]) : translate(["pages", labelArr[i]]),
        })
      }
      $("li[for='cookieRightFilter'] h4 a").html(translate(["settings", "activePage"]))
      $("li .add").attr({name: translate(["settings", "add"])})
      $("li .delete").attr({name: translate(["settings", "delete"])})
      switch(hash){
        case "theme":
          $("ul li h4 a").html(translate(["settings", "hueRotate"]))
        break;
        case "same":
          $("li[content='UTC'] h4 a").html(translate(["settings", "UTC"]))
          $("li[content$='Add'] h4 a").html(translate(["settings", "streamers", "add"]))
          $("li[content$='Add'] h8").attr({meme: translate(["settings", "total"])})
          $("li[content='streamers'] h4 a").html(translate(["settings", "streamers", "names"]))
          $("li[content='streamers'] h4>div").html(translate(["settings", "streamers", "tracking"]))
        break;
        case "main":
          $("li[content$='Add'] h4 a").html(translate(["settings", hash, "add"]))
          $("li[content$='Add'] h8").attr({meme: translate(["settings", "total"])})
          $("li[content='"+hash+"'] h4 a").html(translate(["settings", hash, "groups"]))
          $("li[content='"+hash+"'] h4>div").html(translate(["settings", hash, "triggers"]))
        break;
        default: 
          $("ul li[for='cookieBottomMenu'] h4 a").html(translate(["settings", "activePage"]))
        break;
      }
    break;
  }
}
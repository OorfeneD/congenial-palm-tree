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
        : !filter(pageSet["bottomMenu"].hide_autoload, pathname)
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
  
  $(".rightFilter #resetAll").attr({name: translate(["menu", "filter", "resetAll"])})
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
      if(pageSet[pathname][hash]){
        for(let li = 0; li < pageSet[pathname][hash].length; li++){
          let type = pageSet[pathname][hash][li] || "";
          $(`li[content$='${type}Add'] h4 a`).html(translate([pathname, hash, "add"+type]))
          $(`li[content='${hash+type}'] h4 a`).html(translate([pathname, hash, "title"+type]))
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
  }
}
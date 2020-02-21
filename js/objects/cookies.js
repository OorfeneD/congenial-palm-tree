var cookie = {},
    cookieDOM = document.cookie.split("; ").filter(e => e),
    cookieDate = "Fri, 7 Aug 2020 00:00:00 UTC";

for(let i = 0; i < cookieDOM.length; i++){ 
  let key = cookieDOM[i].split("=")[0],
      value = cookieDOM[i].split("=")[1];
  cookie[key] = value.slice(0, 1) != "{" ? value : {}
  if(value.slice(0, 1) == "{"){
    let cookieArr = value.slice(1, -1).split(",")
    for(let u = 0; u < cookieArr.length; u++){
      cookie[key][cookieArr[u].split(":")[0]] = cookieArr[u].split(":")[1]
    }
  }
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
if(!cookie["UTC"] || isNaN(cookie["UTC"]) || cookie["UTC"] > 56 || cookie["UTC"] < -44){
  cookie["UTC"] = new Date().getTimezoneOffset() / -15;
  document.cookie = `UTC=${cookie["UTC"]};expires=${cookieDate}`;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
for(let p = 0; p < pageSet["bottomMenu"]["list"].length; p++){
  let turn = `turn_${pageSet["bottomMenu"]["list"][p]}`;
  if(!cookie[turn]){
    cookie[turn] = {};
    for(let i = 0; i < allPages.length; i++){
      let key = allPages[i];
      cookie[turn][key] = pageSet["bottomMenu"][turn] ? filterOnly(pageSet["bottomMenu"][turn], key) ? "1" : "0" : "0"
    }
  }else{
    let keys = Object.keys(cookie[turn]),
        values = Object.values(cookie[turn]);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i],
          value = values[i];
      if(!filterOnly(allPages, key)){
        delete cookie[turn][key];
      }else{
        cookie[turn][key] = !filterOnly(["0", "1"], value)
          ? "0" : pageSet["bottomMenu"][turn] 
            ? filterOnly(pageSet["bottomMenu"][turn], key)
              ? "1" : value : value;        
      }
    }
    if(Object.keys(cookie[turn]).length != allPages.length){      
      for(let i = 0; i < allPages.length; i++){
        if(!filterOnly(cookie[turn], allPages[i]))
          cookie[turn][allPages[i]] = filterOnly(pageSet["bottomMenu"][turn], allPages[i]) ? "1" : "0"          
      }    
    }
  }
  document.cookie = `${turn}=${JSON.stringify(cookie[turn]).replace(/"/g,"")};expires=${cookieDate}`;  
}

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
document.cookie = `hueRotate=${JSON.stringify(cookie["hueRotate"]).replace(/"/g,"")};expires=${cookieDate}`;  










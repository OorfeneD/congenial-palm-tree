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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let bfB = ["turn_filter", "turn_autoload"];
for(let p = 0; p < bfB.length; p++){
  if(!cookie[bfB[p]]){
    cookie[bfB[p]] = {};
    for(let i = 0; i < allPages.length; i++){
      let key = allPages[i];
      cookie[bfB[p]][key] = filterOnly(pageSet["bottomFilter"][bfB[p]], key) ? "1" : "0"
    }
  }else{
    let keys = Object.keys(cookie[bfB[p]]),
        values = Object.values(cookie[bfB[p]]);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i],
          value = values[i];
      if(!filterOnly(allPages, key)){
        delete cookie[bfB[p]][key];
      }else{
        cookie[bfB[p]][key] = !filterOnly(["0", "1"], value)
          ? "0" : filterOnly(pageSet["bottomFilter"][bfB[p]], key)
            ? "1" : value;        
      }
    }
    if(Object.keys(cookie[bfB[p]]).length != allPages.length){      
      for(let i = 0; i < allPages.length; i++){
        if(!filterOnly(cookie[bfB[p]], allPages[i]))
          cookie[bfB[p]][allPages[i]] = filterOnly(pageSet["bottomFilter"][bfB[p]], allPages[i]) ? "1" : "0"          
      }    
    }
  }
  document.cookie = `${bfB[p]}=${JSON.stringify(cookie[bfB[p]]).replace(/"/g,"")};expires=${cookieDate}`;  
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










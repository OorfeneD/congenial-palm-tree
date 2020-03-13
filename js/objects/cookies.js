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
if(!cookie["graph"]){
  cookie["graph"] = {xH: {}, xW: {}}
}else{
  for(let i = 0; i < Object.keys(cookie["graph"]).length; i++){
    let name = Object.keys(cookie["graph"])[i]
    for(let u = 0; u < Object.keys(cookie["graph"][name]).length; i++){
      let key = Object.keys(cookie["graph"][name])[u],
          value = +Object.values(cookie["graph"][name])[u];
      if(isNaN(value) || value <= 0){
        cookie["graph"][name][key] = coo[name]
      } 
    }
  }
  document.cookie = `graph=${JSON.stringify(cookie["graph"])};expires=${cookieDate}`;
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











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

if(!cookie["lang"] || !langSet[cookie["lang"]]){
  cookie["lang"] = Object.keys(langSet)[0];
  document.cookie = `lang=${cookie["lang"]};expires=${cookieDate}`;
}
if(!cookie["theme"] || !colorSet[cookie["theme"]]){
  cookie["theme"] = Object.keys(colorSet)[0];
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
      cookie[bfB[p]][key] = filter(pageSet["bottomFilter"][bfB[p]], key) ? "1" : "0"
    }
  }else{
    let keys = Object.keys(cookie[bfB[p]]),
        values = Object.values(cookie[bfB[p]]);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i],
          value = values[i];
      if(!filter(allPages, key)){
        delete cookie[bfB[p]][key];
      }else{
        cookie[bfB[p]][key] = !filterOnly(["0", "1"], value)
          ? "0" : filter(pageSet["bottomFilter"][bfB[p]], key)
            ? "1" : value;        
      }
    }
    if(Object.keys(cookie[bfB[p]]).length != allPages.length){      
      for(let i = 0; i < allPages.length; i++){
        if(!filter(cookie[bfB[p]], allPages[i]))
          cookie[bfB[p]][allPages[i]] = filter(pageSet["bottomFilter"][bfB[p]], allPages[i]) ? "1" : "0"          
      }    
    }
  }
  document.cookie = `${bfB[p]}=${JSON.stringify(cookie[bfB[p]]).replace(/"/g,"")};expires=${cookieDate}`;  
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

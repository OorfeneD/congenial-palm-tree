var cookie = {},
    cookieDOM = document.cookie.split("; "),
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
let bfB = ["turn_filter", "turn_autoload"];
for(let p = 0; p < bfB.length; p++){
  if(!cookie[bfB[p]]){
    let result = {},
        keys = Object.keys(langSet[cookie["lang"]]["pages"]);
    for(let i = 0; i < keys.length; i++){
      result[keys[i]] = filter(pageSet["bottomFilter"][bfB[p]], keys[i])? "1" : "0"
    }
    cookie[bfB[p]] = result;
  }else{
    for(let i = 0; i < Object.keys(cookie[bfB[p]]).length; i++){ 
      let key = Object.keys(cookie[bfB[p]])[i];
      if(!filterOnly(["0", "1"], Object.values(cookie[bfB[p]])[i])){
        cookie[bfB[p]][key] = "0";
      }else if(filter(pageSet.bottomFilter.turn_filter, key) && bfB[p] == "turn_filter"){
        cookie[bfB[p]][key] = "1";
      }
    }
  }
  document.cookie = `${bfB[p]}=${JSON.stringify(cookie[bfB[p]]).replace(/"/g,"")};expires=${cookieDate}`;  
}




if(!cookie["lang"] || !langSet[cookie["lang"]]){
  cookie["lang"] = Object.keys(langSet)[0];
  document.cookie = `lang=${cookie["lang"]};expires=${cookieDate}`;
}
if(!cookie["theme"] || !colorSet[cookie["theme"]]){
  cookie["theme"] = Object.keys(colorSet)[0];
  document.cookie = `theme=${cookie["theme"]};expires=${cookieDate}`;
}
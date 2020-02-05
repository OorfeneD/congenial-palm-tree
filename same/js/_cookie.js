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
let bfB = ["filter", "autoload"];
for(let p = 0; p < ["filter", "autoload"].length; p++){
  
}
if(!cookie["autoload"]){
  let result = {};
  for(let i = 0; i < Object.keys(langSet[cookie["lang"]]["pages"]).length; i++){
    result[Object.keys(langSet[cookie["lang"]]["pages"])[i]] = "0"
  }
  cookie["autoload"] = result;
}else{
  for(let i = 0; i < Object.keys(cookie["autoload"]).length; i++){ 
    if(!filterOnly(["0", "1"], Object.values(cookie["autoload"])[i])){
      cookie["autoload"][Object.keys(cookie["autoload"])[i]] = "0";
    }
  }
}
document.cookie = `autoload=${JSON.stringify(cookie["autoload"]).replace(/"/g,"")};expires=${cookieDate}`;



if(!cookie["lang"] || !langSet[cookie["lang"]]){
  cookie["lang"] = Object.keys(langSet)[0];
  document.cookie = `lang=${cookie["lang"]};expires=${cookieDate}`;
}
if(!cookie["theme"] || !colorSet[cookie["theme"]]){
  cookie["theme"] = Object.keys(colorSet)[0];
  document.cookie = `theme=${cookie["theme"]};expires=${cookieDate}`;
}
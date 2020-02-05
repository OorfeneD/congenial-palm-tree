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
  let pages = Object.keys(langSet[cookie["lang"]]["pages"]);
  if(!cookie[bfB[p]]){
    cookie[bfB[p]] = {};
    for(let i = 0; i < pages.length; i++){
      let key = pages[i];
      cookie[bfB[p]][key] = filter(pageSet["bottomFilter"][bfB[p]], key) ? "1" : "0"
    }
  }else{
    let keys = Object.keys(cookie[bfB[p]]),
        values = Object.values(cookie[bfB[p]]);
    for(let i = 0; i < keys.length; i++){
      let key = keys[i],
          value = values[i];
      if(!filter(pages, key)){
        delete cookie[bfB[p]][key];
      }else{
        cookie[bfB[p]][key] = !filterOnly(["0", "1"], value)
          ? "0" : filter(pageSet["bottomFilter"][bfB[p]], key)
            ? "1" : value;        
      }
    }
    if(keys.length != pages.length){
      let lostPages = pages.slice(0);
      for(let i = 0; i < pages.length; i++){
        let key = keys[i];
        // console.log(key)
        if(!key || !filter(pages, key)) 
          lostPages = i == 0 
          ? lostPages.slice(1) 
            : i == pages.length-1 
            ? lostPages.slice(0, -1) 
              : lostPages.slice(0, i-1) + "," + lostPages.slice(i);
        console.log(lostPages)
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
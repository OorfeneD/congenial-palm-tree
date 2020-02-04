var cookie = {},
    cookieDOM = document.cookie.split("; "),
    cookieDate = "Fri, 7 Aug 2020 00:00:00 UTC";
for(let i = 0; i < cookieDOM.length; i++){
  cookie[cookieDOM[i].split("=")[0]] = cookieDOM[i].split("=")[1];
}  


if(!cookie["lang"] || !langSet[cookie["lang"]]){
  cookie["lang"] = Object.keys(langSet)[0];
  document.cookie = `lang=${Object.keys(langSet)[0]};expires=${cookieDate}`;
}
if(!cookie["theme"] || !colorSet[cookie["theme"]]){
  cookie["theme"] = Object.keys(colorSet)[0];
  document.cookie = `theme=${Object.keys(colorSet)[0]};expires=${cookieDate}`;
}

let get = {};
function createGet(){
  if(!get[pathname]) get[pathname] = {}
  if(window.location.search.slice(1) != ""){
    let href = window.location.search.slice(1).split("&");
    for(let i = 0; i < href.length; i++){
      get[pathname][href[i].split("=")[0]] = href[i].split("=")[1];
    }
  }
}

function getToObj(string){
  get[pathname] = {}
  if(string!=1){
    string = string.slice(1).split("&");
    for(let i = 0; i < string.length; i++){
      get[pathname][string[i].split("=")[0]] = string[i].split("=")[1];
    }
  }
}

function getToString(){
  if(get[pathname] && Object.keys(get[pathname]).length){
    let result = "";
    for(let i = 0; i < Object.keys(get[pathname]).length; i++){
      result += `&${Object.keys(get[pathname])[i]}=${Object.values(get[pathname])[i]}`
    }
    return "?" + result.slice(1)
  }else{return ""}
}
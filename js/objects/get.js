
let get = {};
function createGet(){
  // let result = "";
  if(!get[pathname]) get[pathname] = {}
  if(window.location.search.slice(1) != ""){
    let href = window.location.search.slice(1).split("&");
    for(let i = 0; i < href.length; i++){
      get[pathname][href[i].split("=")[0]] = href[i].split("=")[1];
      // result += `&${href[i].split("=")[0]}=${href[i].split("=")[1]}`
    }
    // result = "?" + result.slice(1)
  }
  // history.replaceState('', null, pathname + result);
}
// createGet()

function newGet(string){
  if(!get[pathname]) get[pathname] = {}
  if(window.location.search.slice(1) != ""){
    string = string.slice(1).split("&");
    for(let i = 0; i < string.length; i++){
      get[pathname][string[i].split("=")[0]] = string[i].split("=")[1];
    }
  }
}

function getToString(){
  if(get[pathname]){
    let string = window.location.search.slice(1).split("&");
    for(let i = 0; i < string.length; i++){
      get[pathname][string[i].split("=")[0]] = string[i].split("=")[1];
      // result += `&${string[i].split("=")[0]}=${string[i].split("=")[1]}`
    }
    // result = "?" + result.slice(1)
  }
}
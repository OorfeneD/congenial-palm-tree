
let get = {};
function createGet(){
  // get = {};
  if(!get[pathname]) get[pathname] = {}
  if(window.location.search.slice(1) != ""){
    let href = window.location.search.slice(1).split("&");
    
    for(let i = 0; i < href.length; i++){
      get[pathname][href[i].split("=")[0]] = href[i].split("=")[1]
    }
  }
}
createGet()
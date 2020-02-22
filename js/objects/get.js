
let get = {};
function createGet(){
  get = {};
  if(window.location.search.slice(1) != ""){
    let href = window.location.search.slice(1).split("&");
    for(let i = 0; i < href.length; i++){
      get[href[i].split("=")[0]] = href[i].split("=")[1]
    }
  }
}
createGet()
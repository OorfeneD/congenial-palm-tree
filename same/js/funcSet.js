
function hueRotate(ths){
  cookie["hueRotate"][cookie["theme"]] = zero($(ths).val(), 3);
  document.cookie = `hueRotate=${JSON.stringify(cookie["hueRotate"]).replace(/"/g,"")};expires=${cookieDate}`;   
  getHueRotate();
}
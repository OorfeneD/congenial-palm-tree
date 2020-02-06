
function hueRotate(ths){
  let value = zero($(ths).val(), 3);
  $(ths).attr({deg: +value})
  cookie["hueRotate"][cookie["theme"]] = value;
  document.cookie = `hueRotate=${JSON.stringify(cookie["hueRotate"]).replace(/"/g,"")};expires=${cookieDate}`;   
  getHueRotate();
}

function getHueRotate(){
  if($("style[hueRotate]")){$("style[hueRotate]").remove()}
  $("head").append(`
    <style hueRotate>
      .activeBottomFilter, #title, .getLang:before, .rightFilter label, 
      .rightFilter:before, .scrollTop:before, ul li h4, ul li[type="comments"] h8>div,
      input[type="range"][name="hueRotate"]
      {filter: hue-rotate(${cookie["hueRotate"][cookie["theme"]]}deg)}
    </style>
  `)
}



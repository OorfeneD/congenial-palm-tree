
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
      .rightFilter>div, .rightFilter:before, #title, .getLang:before, .rightMenu label, 
      .rightMenu:before, .scrollTop:before, ul li h4, ul li[type="comments"] h8>div,
      input[type="range"][name="hueRotate"], li[type="settings"] label, ul .reset
      {filter: hue-rotate(${cookie["hueRotate"][cookie["theme"]]}deg)}
    </style>
  `)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function objectCookie(ths){
  let value = +$(ths).prop("checked"),
      name = $(ths).attr("id").slice(0, -6);
  cookie[`turn_${name}`][hash] = value;
  document.cookie = `turn_${name}=${JSON.stringify(cookie[`turn_${name}`]).replace(/"/g,"")};expires=${cookieDate}`;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////













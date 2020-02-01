function changeUrl(ths){
  let url = $(ths).attr("for").slice(0, -4).toLowerCase(),
      archive = $(`label[for="${url}Page"]`).attr("name");

  if(location.pathname.slice(1) != url){
    $("#archive, title").html(archive)
    $(`input#${url}Page`).prop("checked", true)  
    history.replaceState('', null, url)

    let tN = url == "setting" ? "" : 0;
    $(".totalLI").attr({totalNum: tN, total: tN})

    $("ul").html("");
    getEmpty(1);
    $(document).scrollTop(0);
    $(".autoload").html(0);
    $(".rightFilter input").prop("checked", false);  
    if(coo["graph"].slice(2,3) == 1){$("#autoload").prop("checked", true)}
      else{$("#autoload").prop("checked", false)}

    url != "setting" ? $(".rightFilter, .autoload").show() : $(".rightFilter, .autoload").hide();
    if(url == "stats"){
      $(".graphMeme").show();
      for(let i = 0; i < streamers.length; i++){
        coo["loadGraph"].slice(i, +i+1) == 0 ? $(".rightFilter>div").eq(i).css({height: 0, padding: 0, transform: "scaleY(0)"}) : "";
      }
    }else{
      $(".graphMeme").hide()
      $(".rightFilter>div").css({height: "34px", padding: "0 6px 6px 6px", transform: "scaleY(1)"})
    }

    switch(url){
      case "stats": stats(url); break;
      case "fbi": fbiNotes(url); break;
      case "notes": fbiNotes(url); break;
      case "setting": setting(); break;
    }
  }
}
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
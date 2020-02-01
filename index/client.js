function choicePage(ths){
  let url = $(ths).attr("id").slice(0, -4).toLowerCase(),
      archive = langSet[lang]["pages"][url];
  if(location.pathname.slice(1) != url){
    $("#archive, title").html(archive);
    history.replaceState('', null, url);

//     let tN = url == "setting" ? "" : 0;
//     $(".totalLI").attr({totalNum: tN, total: tN})

//     $("ul").html("");
//     getEmpty(1);
    $(document).scrollTop(0);
    $("input[id='autoload']").prop("checked", false);  
    $("label[for='autoload']")
      .attr("number", 0)
      .
    // if(coo["graph"].slice(2,3) == 1){$("#autoload").prop("checked", true)}
    //   else{$("#autoload").prop("checked", false)}

    // url != "setting" ? $(".rightFilter, .autoload").show() : $(".rightFilter, .autoload").hide();
    // if(url == "stats"){
    //   $(".graphMeme").show();
    //   for(let i = 0; i < streamers.length; i++){
    //     coo["loadGraph"].slice(i, +i+1) == 0 ? $(".rightFilter>div").eq(i).css({height: 0, padding: 0, transform: "scaleY(0)"}) : "";
    //   }
    // }else{
    //   $(".graphMeme").hide()
    //   $(".rightFilter>div").css({height: "34px", padding: "0 6px 6px 6px", transform: "scaleY(1)"})
    // }

    // switch(url){
    //   case "stats": stats(url); break;
    //   case "fbi": fbiNotes(url); break;
    //   case "notes": fbiNotes(url); break;
    //   case "setting": setting(); break;
    // }
  }
}
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
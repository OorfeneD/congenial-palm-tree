function getPage(ths){
      pathname = $(ths).attr("id").slice(0, -4).toLowerCase();
  let title = langSet[lang()]["pages"][pathname];
  if(location.pathname.slice(1) != pathname){
    $("#title, title").html(title);
    history.replaceState('', null, pathname);

    $(document).scrollTop(0);
    $("input[id='autoload'], input[id='filterMenu']").prop("checked", false);  
    $("label[for='autoload']").attr({number: 0})
    
    $(".bottomFilter").css({
      transform: `translateY(-${
        filter(pageSet.hideBottomFilter, pathname) 
          ? $(".bottomFilter").height() + $(".rightFilter").width()
          : 0
      }px)`
    })
    // if(coo["graph"].slice(2,3) == 1){$("#autoload").prop("checked", true)}
    //   else{$("#autoload").prop("checked", false)}


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
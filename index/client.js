function getPage(ths){
      pathname = $(ths).attr("id").slice(0, -4).toLowerCase();
  let title = langSet[lang()]["pages"][pathname];
  if(location.pathname.slice(1) != pathname){
    $("#title, title").html(title);
    history.replaceState('', null, pathname);

    $(document).scrollTop(0);
    $("input[id='autoload'], input[id='filter']").prop("checked", false);  
    $("label[for='autoload']").attr({number: 0})
    $(".activeBottomFilter").remove();
    
    for(let i = 0; i < $(".bottomFilter label").length; i++){
      let name = $(".bottomFilter label").eq(i).attr("for");
      console.error(filter(pageSet["bottomFilter"][`hide_${name}`], pathname))
      if(filter(pageSet["bottomFilter"][`hide_${name}`], pathname)){$(`.bottomFilter label[name=${name}]`).hide()}
        else{$(`.bottomFilter label[name=${name}]`).show()}
    }
    // if(filter(pageSet.bottomFilter.hide_filter, pathname)){$(".bottomFilter label[name='filter']").hide()}
    //   else{$(".bottomFilter label[name='filter']").show()}
    // if(filter(pageSet.bottomFilter.hide_autoload, pathname)){$(".bottomFilter label[name='autoload']").hide()}
    //   else{$(".bottomFilter label[name='autoload']").show()}
    
    // $(".bottomFilter").css({
    //   transform: `translateY(-${
    //     filter(pageSet.hideBottomFilter, pathname) 
    //       ? $(".bottomFilter").height() + $(".rightFilter").width()
    //       : 0
    //   }px)`
    // })
    if(cookie["autoload"]){$("#autoload").prop("checked", true)}
      else{$("#autoload").prop("checked", false)}


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
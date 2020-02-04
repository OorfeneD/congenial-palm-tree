function getPage(ths){
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// измненеие названия и url путя страницы
  pathname = $(ths).attr("id").slice(0, -4).toLowerCase();
  if(location.pathname.slice(1) != pathname){
    let title = langSet[lang()]["pages"][pathname];
    $("#title, title").html(title);
    history.replaceState('', null, pathname);

/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// после смены страницы обнулить все данные
    $(document).scrollTop(0);
    $("input#autoload, input#filter").prop("checked", false);  
    $("label[for='autoload']").attr({number: 0})
    $(".activeBottomFilter").remove();
 
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// скрыть/показать иконки нижнего меню в зависимости от страницы
    let hideFilter = "bottomFilter";
    for(let i = 0; i < $(`.${hideFilter} label`).length; i++){
      let name = $(`.${hideFilter} label`).eq(i).attr("for");
      if(filter(pageSet[hideFilter][`hide_${name}`], pathname)){$(`.${hideFilter} label[for='${name}']`).hide()}
        else{$(`.${hideFilter} label[for='${name}']`).show()}
    }  
    $(`.${hideFilter}`).css({
      display: `${!$(`.${hideFilter} label:visible`).length ? "none" : "flex"})`,
    })
    
/////////////////////////////////////////////////////////////////////////////////////////////
    
    
    if(filter(pageSet[hideFilter].show_filter, pathname)){
      $("input#filter").prop("checked", true); 
      openRightFilter();
    }
    
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
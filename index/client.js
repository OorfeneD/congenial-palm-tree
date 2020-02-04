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
    getBottomFilter()
    
/////////////////////////////////////////////////////////////////////////////////////////////

    
    // if(cookie["autoload"]){$("#autoload").prop("checked", true)}
    //   else{$("#autoload").prop("checked", false)}



    switch(url){
      case "stats": loadMain(url); break;
      case "fbi", "notes", "tags": loadComments(url); break;
      case "archive": loadArchive(url); break;
      case "settings": loadSettings(url); break;
      case "database": loadDatabase(url); break;
    }
  }
}
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
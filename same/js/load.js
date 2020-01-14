let title = languageSet[language]["loading"];
$("title").html(title)
(function loading(){
  if($("title").html().slice(0, String(title).length) == title){
    if($("title").html().length < 12){
      $("title").html($("title").html() + ".")
    }else{
      $("title").html("Загружаем")
    }
  }
  setTimeout(() => loading(), 500)
})()
let title = langSet[lang]["loading"];
$("title").html(title);
(function loading(){
  if($("title").html().slice(0, title.length) == title){
    if($("title").html().length < title.length+3){
      $("title").html($("title").html() + ".")
    }else{
      $("title").html(title)
    }
  }
  setTimeout(() => loading(), 500)
})()
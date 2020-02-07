var title = translate(["loading"]);
$("#title, title").html(title);
(function loading(){
  if($("title").html().slice(0, title.length) == title){
    $("title").html($("title").html().length < title.length+3 ? $("title").html() + "." : title)
  }
  setTimeout(() => loading(), 250)
})()
var streamers = [],
    memes     = ["lul", "nice", "smorc", "gachi", "coolstory", "dance", "mericcat", "pog", "monka"];
$.ajax({
  url: "streamers",
  method: 'get',
  success: res => {
    for(let i = 0; i < res.length; i++){
      streamers[i] = res[i]["username"];
    }
  },
})




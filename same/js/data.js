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

let pathname = location.pathname.slice(1);
const pageSet = {
        bottomFilter: {
          hide_filter: [],
          hide_autoload: ["settings", "database"],
        },
      };



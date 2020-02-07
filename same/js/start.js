let scriptsArr = {
  same: {
    func: ["return", "doit", "settings"],
    objects: ["database", "cookies", "languages", "pages", "get", "hash", "colors", "smiles"],
    pages: ["main", "comments", "settings"],
    default: ["load"],
  },
  index: ["client"],
}

for(let aa = 0; aa < Object.keys(scriptsArr).length; aa++){
  let dir = Object.keys(scriptsArr)[aa],
      value = scriptsArr[dir];
  console.log(scriptsArr[dir])
  if($.isArray(scriptsArr[dir])){
    console.log(dir)
  }
}

$("head").append(`
  <script src="_/_/func.js"></script>
  <script src="_/settings/pages.js"></script>
  <script src="_/settings/languages.js"></script>
  <script src="_/settings/colors.js"></script>
  <script src="_/settings/cookies.js"></script>
  <script src="_/settings/smiles.js"></script>
  <script src="_/_/data.js"></script>
  <script src="_/_/funcGet.js"></script>
  <script src="_/_/funcSet.js"></script>
  <script src="_/_/load.js"></script>
  <script src="index/client.js"></script>
`)

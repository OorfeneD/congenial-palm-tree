let scriptsArr = {
  same: {
    func: ["return"],
    objects: ["colors", "cookies", "languages", "", "", ""],
    default: ["load"],
  },
  index: ["client"],
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

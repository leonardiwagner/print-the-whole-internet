'use strict';

let pageReader = require('./page-reader')
let pageParser = require('./page-parser')


pageReader.login('johnpetruccishredder@gmail.com', 'junior2112')
  .then((a) => {
    console.log(a)
    kill
   pageReader.readUrl("https://www.linkedin.com/profile/view?id=AAkAAAAATGMB70B4VYs8dcTVRIm1Px3TmH-sL0s&authType=NAME_SEARCH&authToken=oekN&locale=en_US&trk=tyah&trkInfo=clickedVertical%3Amynetwork%2CclickedEntityId%3A19555%2CauthType%3ANAME_SEARCH%2Cidx%3A1-7-7%2CtarId%3A1455903205848%2Ctas%3Ajohnathan")
      .then((b) => {
        console.log("ocre", b)
        let info = pageParser.parseInfoFromHtml(b)
        console.log(info)
    })
    .catch((x) => console.log("b", x))
  }).catch((x) => console.log("b", x))



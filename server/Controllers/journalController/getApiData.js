const request = require('request');

exports.getApiData = async (req, res) => { 
    const doi = req.body.DOI;
    const url = `https://api.crossref.org/works/${doi}`;
    console.log(req.body.DOI);

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let data = JSON.parse(body);
          data = data?.message;
          let otherAuthorsFromDDU, otherAuthors;
          data?.author?.map((item,index) => {
            if(index!=0){
              if(item?.affiliation[0]?.name.contains("Dharmsinh Desai University"))
                otherAuthorsFromDDU += item?.given + " " + item?.family + "; ";
              else
              otherAuthors += item?.given + " " + item?.family + "; ";
            }
          })
          const resMsg = {
            "DOI":doi,
            "Title_of_Research_Paper": data?.title[0],
            "Number": data["journal-issue"]?.issue,
            "Pages_xx_yy": data.page,
            "Volume": data.volume,
            "ISSN_Print": data.ISSN[0],
            "First_Author_name" : data.author[0].given + " " + data.author[0].family,
            // "Names_of_Other_Author_From_DDU" : otherAuthorsFromDDU,
            // "Names_of_Other_Author_From_other_Organization" : otherAuthors,
            "Year" : data["published-online"]["date-parts"][0][0],
            "month": data?.indexed?.["date-parts"][0][1],
            // "affiliation" : data?.author[0]?.affiliation[0]?.name,
            "Journal_publisher" : data.publisher,
            "Publication_Level" : data["container-title"][0]
          }
          console.log(data.title[0]);
          console.log(resMsg);
          return res.status(200).send({
            success: 1,
            message:"fetch succefuly",
            data:resMsg
          })
          res.json(data.message);
        } else {
          res.status(200).send({
            success:0,
            message:"Error is occure while fetching something"
          });
        }
      });
    console.log("hii");
}
const request = require('request');

exports.getApiData = async (req, res) => { 
    const doi = "10.1109/IPACT.2017.8245062";
    const url = `https://api.crossref.org/works/${doi}`;
    console.log(req.body);

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const data = JSON.parse(body);
          data = data.message;

          let otherAuthorsFromDDU, otherAuthors;
          date.author.map((item,index) => {
            if(index!=0){
              if(item.affiliation[0].name.contains("Dharmsinh Desai University"))
                otherAuthorsFromDDU += item.given + " " + item.family + "; ";
              else
              otherAuthors += item.given + " " + item.family + "; ";
            }
          })

          const resMsg = {
            "title": data.title,
            "pages": data.pages,
            "volume": data.volume,
            "ISSN": data.ISSN,
            "firstAuthorName" : data.author[0].given + " " + data.author[0].family,
            "otherAuthorsFromDDU" : otherAuthorsFromDDU,
            "otherAuthors" : otherAuthors,
            "year" : data.published-print.date-parts[0],
            "month": data.published-print.date-parts[1],
            "affiliation" : data.author[0].affiliation[0].name,
          }
          console.log(data.message.title);
          res.json(data.message);
        } else {
          res.status(response.statusCode).send(error);
        }
      });
    console.log("hii");
}
const request = require('request');

exports.getApiData = async (req, res) => { 
    const doi = "10.1109/IPACT.2017.8245062";
    const url = `https://api.crossref.org/works/${doi}`;

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const data = JSON.parse(body);
          console.log(data);
          console.log(data.message);
          res.json(data.message);
        } else {
          res.status(response.statusCode).send(error);
        }
      });
    console.log("hii");
}
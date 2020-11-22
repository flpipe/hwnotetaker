// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
//===============================================================================
var fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(data);
  });

  app.get("/api/notes/:id", function(req, res) {
    res.json(data[Number(req.params.id)]);
  });

  // API POST Requests
//---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {

    // req.body is available since we're using the body parsing middleware
      inputdata = req.body;
      uniqueid = Math.floor(Math.random()*100);
      inputdata.id = uniqueid
      data.push(inputdata);

      fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err){
        if (err) throw (err);
      });
      res.json(data);

  });

};

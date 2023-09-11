const { authJwt } = require("../middleware");
const controller = require("../controllers/reviews");

module.exports = function (app) {
    app.post("/api/reviews/add", controller.AddRecord);
    app.get("/api/reviews/all/:name", controller.GetRecords);


};

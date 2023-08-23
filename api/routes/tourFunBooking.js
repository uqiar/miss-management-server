const { authJwt } = require("../middleware");
const controller = require("../controllers/tourFunBooking");

module.exports = function (app) {
    app.post("/api/tourfun/newBooking", controller.addNewBooking);
};

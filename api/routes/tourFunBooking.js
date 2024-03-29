const { authJwt } = require("../middleware");
const controller = require("../controllers/tourFunBooking");

module.exports = function (app) {
    app.post("/api/tourfun/newBooking", controller.addNewBooking);
    app.post("/api/tourfun/allBooking",[authJwt.verifyToken], controller.findAllBooking);
    app.put("/api/tourfun/update/:id",[authJwt.verifyToken], controller.updateBooking);

};

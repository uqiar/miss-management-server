const { authJwt } = require("../middleware");
const controller = require("../controllers/myBook");

module.exports = function (app) {
    app.post("/api/myBook/new",[authJwt.verifyToken], controller.addNewBook);
    app.get("/api/myBook/all",[authJwt.verifyToken], controller.getAllBookes);
    app.delete("/api/myBook/delete/:id",[authJwt.verifyToken], controller.deleteUserBook);
    app.post("/api/myBook/addAmount/:id",[authJwt.verifyToken], controller.addAmunt);
    app.post("/api/myBook/receiveAmount/:id",[authJwt.verifyToken], controller.ReceiveAmunt);
    app.post("/api/myBook/deleteAddAmount/:id",[authJwt.verifyToken], controller.deleteAddAmountList);
    app.post("/api/myBook/deleteCollectAmount/:id",[authJwt.verifyToken], controller.deleteColectAmountList);
};

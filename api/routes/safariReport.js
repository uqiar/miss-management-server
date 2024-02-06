const { authJwt } = require("../middleware");
const controller = require("../controllers/safariReport");

module.exports = function (app) {
    app.post("/api/safariReport/add",[authJwt.verifyToken], controller.addNewItem);
    app.post("/api/safariReport/find",[authJwt.verifyToken], controller.getItems);
    app.put("/api/safariReport/update/:id",[authJwt.verifyToken], controller.updateItem);
    app.delete("/api/safariReport/delete/:id",[authJwt.verifyToken], controller.deleteItem);
};

const { authJwt } = require("../middleware");
const controller = require("../controllers/items");

module.exports = function (app) {
    app.post("/api/items/add",[authJwt.verifyToken], controller.addNewItem);
    app.post("/api/items/find",[authJwt.verifyToken], controller.getItems);
    app.put("/api/items/update/:id",[authJwt.verifyToken], controller.updateItem);
    app.delete("/api/items/delete/:id",[authJwt.verifyToken], controller.deleteItem);
};

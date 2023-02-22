const { authJwt } = require("../middleware");
const controller = require("../controllers/otherExpenses");

module.exports = function (app) {
    app.post("/api/otherExpense/add",[authJwt.verifyToken], controller.addNewItem);
    app.post("/api/otherExpense/find",[authJwt.verifyToken], controller.getItems);
    app.put("/api/otherExpense/update/:id",[authJwt.verifyToken], controller.updateItem);
    app.delete("/api/otherExpense/delete/:id",[authJwt.verifyToken], controller.deleteItem);
};

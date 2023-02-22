const { authJwt } = require("../middleware");
const controller = require("../controllers/monthly_config");

module.exports = function (app) {
    app.post("/api/monthlyConfig/get",[authJwt.verifyToken], controller.getConfigByMonth);
    app.put("/api/monthlyConfig/newConfigure",[authJwt.verifyToken], controller.configureNewUser);
    app.delete("/api/monthlyConfig/delete/:id",[authJwt.verifyToken], controller.deleteConfigUser);
    app.put("/api/monthlyConfig/update/:id",[authJwt.verifyToken], controller.updatedUserMonthsDays);
};

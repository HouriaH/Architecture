"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../Controllers/userController");
class UserRoute {
    constructor() {
        this.userAPIController = new userController_1.UserController();
    }
    routes(app) {
        app.route('/userAPI/postInscription').post(this.userAPIController.postInscription);
        app.route('/userAPI/postConnexion').post(this.userAPIController.postConnexion);
    }
}
exports.UserRoute = UserRoute;
//# sourceMappingURL=userRoute.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forumController_1 = require("../Controllers/forumController");
class ForumRoute {
    constructor() {
        this.forumAPIController = new forumController_1.ForumController();
    }
    routes(app) {
        app.route('/forumAPI/postSection').post(this.forumAPIController.postSection);
        app.route('/forumAPI/getAllSection').get(this.forumAPIController.getAllSection);
        app.route('/forumAPI/createTopic').post(this.forumAPIController.createTopic);
        app.route('/forumAPI/getAllTopics').get(this.forumAPIController.getAllTopics);
        app.route('/forumAPI/retrieveTopic').get(this.forumAPIController.retrieveTopic);
        app.route('/forumAPI/postMessageTopic').post(this.forumAPIController.postMessageTopic);
    }
}
exports.ForumRoute = ForumRoute;
//# sourceMappingURL=forumRoute.js.map
import { ForumController } from "../Controllers/forumController";
export class ForumRoute {
    public forumAPIController: ForumController = new ForumController();
    public routes(app): void {
        app.route('/forumAPI/postSection').post(this.forumAPIController.postSection);
        app.route('/forumAPI/getAllSection').get(this.forumAPIController.getAllSection);
        app.route('/forumAPI/createTopic').post(this.forumAPIController.createTopic);
        app.route('/forumAPI/getAllTopics').get(this.forumAPIController.getAllTopics);
        app.route('/forumAPI/retrieveTopic').get(this.forumAPIController.retrieveTopic);
        app.route('/forumAPI/postMessageTopic').post(this.forumAPIController.postMessageTopic);
    }
}
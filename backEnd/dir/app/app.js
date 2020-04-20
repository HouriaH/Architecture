"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoute_1 = require("./Routes/userRoute");
const forumRoute_1 = require("./Routes/forumRoute");
const swaggerRoute_1 = require("./Routes/swaggerRoute");
class App {
    constructor() {
        this.userRoute = new userRoute_1.UserRoute();
        this.forumRoute = new forumRoute_1.ForumRoute();
        this.swaggerRoute = new swaggerRoute_1.SwaggerRoute();
        this.db = "mongodb+srv://Houria:Houria1996@cluster0-4jauw.mongodb.net/test?retryWrites=true&w=majority";
        this.app = express_1.default();
        this.config();
        this.forumRoute.routes(this.app);
        this.userRoute.routes(this.app);
        this.swaggerRoute.routes(this.app);
    }
    config() {
        this.app.use(cors_1.default({ credentials: true, origin: true }));
        this.app.use(body_parser_1.default.json({ limit: '5mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '5mb', extended: false }));
        this.app.use(express_1.default.static('upload'));
        this.app.all('*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
            next();
        });
        this.dbConnection();
    }
    dbConnection() {
        mongoose_1.default.connect(this.db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            if (err) {
                console.error('Error!' + err);
            }
            else {
                console.log('database on');
            }
        });
        mongoose_1.default.set('useCreateIndex', true);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map
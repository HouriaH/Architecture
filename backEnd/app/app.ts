import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from 'mongoose';
import { UserRoute } from "./Routes/userRoute";
import { ForumRoute } from "./Routes/forumRoute";
import { SwaggerRoute } from "./Routes/swaggerRoute";

class App {

    public app: express.Application;
    public userRoute: UserRoute = new UserRoute();
    public forumRoute: ForumRoute = new ForumRoute();
    public swaggerRoute: SwaggerRoute = new SwaggerRoute();
    public db = "mongodb+srv://Houria:Houria1996@cluster0-4jauw.mongodb.net/test?retryWrites=true&w=majority";
    constructor() {
        this.app = express();
        this.config();
        this.forumRoute.routes(this.app);
        this.userRoute.routes(this.app);
        this.swaggerRoute.routes(this.app);
    }

    private config(): void {
        this.app.use(cors({ credentials: true, origin: true }));
        this.app.use(bodyParser.json({ limit: '5mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
        this.app.use(express.static('upload'));
        this.app.all('*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*"); // keep this if your api accepts cross-origin requests
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
            next();
        });
       this.dbConnection();
    }

    private dbConnection(): void {
        mongoose.connect(this.db, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
            if (err) {
                console.error('Error!' + err);
            } else {
                console.log('database on');
            }
        });
        mongoose.set('useCreateIndex', true);
    }
}

export default new App().app;
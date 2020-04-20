"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sectionDB_1 = require("../Models/Forum/sectionDB");
const topicDB_1 = require("../Models/Forum/topicDB");
class ForumController {
    postSection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ForumNewSection = new sectionDB_1.Section(req.body);
                const ForumNewSectionResult = yield ForumNewSection.save();
                if (ForumNewSectionResult._id) { // si l'id existe
                    res.status(200).send(ForumNewSectionResult);
                    return;
                }
                res.status(400).send();
                return;
            }
            catch (err) {
                res.status(400).send(err);
                return;
            }
        });
    }
    getAllSection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sectionResult = yield sectionDB_1.Section.find({}).select('-__v');
                if (sectionResult.length > 0) {
                    res.status(200).send(sectionResult);
                    return;
                }
                res.status(400).send();
                return;
            }
            catch (err) {
                res.status(400).send(err);
                return;
            }
        });
    }
    createTopic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let countTopicName = yield topicDB_1.Topic.countDocuments({ idTopic: { $regex: '.*' + req.body.idTopic + '.*' } });
                countTopicName++;
                req.body.idTopic += `-${countTopicName}`;
                const newTopic = new topicDB_1.Topic(req.body);
                const newTopicResult = yield newTopic.save();
                if (newTopicResult.idTopic) { // si l'id existe
                    if (yield ForumController.updateSectionOnTopicCreation(newTopicResult.urlSection, newTopicResult.creator, newTopicResult.lastUpdateDate)) {
                        const idTopic = JSON.stringify(newTopicResult.idTopic);
                        res.status(200).send(idTopic);
                        return;
                    }
                }
                res.status(400).send();
                return;
            }
            catch (err) {
                res.status(400).send(err);
                return;
            }
            // update le dernier utilisateur de la section dans Section
        });
    }
    getAllTopics(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let listTopicPinSection = [];
                let listTopicSection = [];
                const listTopicGlobalResult = yield topicDB_1.Topic.find({ urlSection: "global" }).select('-__v -Messages').lean();
                const listTopicBySectionResult = yield topicDB_1.Topic.find({ urlSection: req.query.urlSection }).select('-__v -Messages').lean();
                if (listTopicBySectionResult) {
                    listTopicBySectionResult.forEach(topic => {
                        if (topic.pinSection) {
                            listTopicPinSection.push(topic);
                        }
                        else {
                            listTopicSection.push(topic);
                        }
                    });
                }
                res.status(200).send({ globalList: listTopicGlobalResult, pinList: listTopicPinSection, sectionList: listTopicSection });
                return;
            }
            catch (err) {
                res.status(400).send(err);
                return;
            }
        });
    }
    retrieveTopic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listTopicResult = yield topicDB_1.Topic.findOne({ idTopic: req.query.idTopic })
                    .select('-__v').lean();
                if (listTopicResult) {
                    res.status(200).send(listTopicResult);
                    return;
                }
                res.status(400).send();
                return;
            }
            catch (err) {
                res.status(400).send(err);
                return;
            }
        });
    }
    postMessageTopic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let incNbParticipant = 1;
                if (req.body.userFound) {
                    incNbParticipant = 0;
                }
                const topicUpdateResult = yield topicDB_1.Topic.updateOne({ idTopic: req.body.idTopic }, {
                    $push: {
                        Messages: [{
                                user: req.body.user,
                                content: req.body.content,
                                date: Date.now(),
                                userUpdateMessage: null
                            }]
                    },
                    $set: {
                        lastUpdateDate: Date.now(),
                        lastUser: req.body.user
                    },
                    $inc: {
                        nbMessage: 1,
                        nbParticipant: incNbParticipant
                    }
                });
                if (topicUpdateResult.nModified > 0) {
                    if (!req.body.pinSection) {
                        yield sectionDB_1.Section.updateOne({ urlSection: req.body.urlSection }, {
                            $inc: {
                                nbMessage: 1
                            }
                        });
                    }
                    res.status(200).send();
                    return;
                }
                res.status(400).send();
                return;
            }
            catch (err) {
                res.status(400).send(err);
            }
        });
    }
    static updateSectionOnTopicCreation(urlSectionNewTopic, userNewTopic, dateNewTopic) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (urlSectionNewTopic == 'global') {
                    return true;
                }
                const topicUpdateResult = yield sectionDB_1.Section.updateOne({ urlSection: urlSectionNewTopic }, {
                    $set: {
                        lastUser: userNewTopic,
                        lastMessageDate: dateNewTopic
                    },
                    $inc: {
                        nbMessage: 1,
                        nbTopic: 1
                    }
                });
                return (topicUpdateResult.nModified > 0);
            }
            catch (err) {
                return false;
            }
        });
    }
}
exports.ForumController = ForumController;
//# sourceMappingURL=forumController.js.map
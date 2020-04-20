import mongoose from "mongoose";
import { Request, Response } from "express";
import { ISectionModel } from "../Interfaces/Forum/ISection";
import { ITopicModel } from "../Interfaces/Forum/ITopic";
import { IMessageModel } from "../Interfaces/Forum/IMessage";
import { Section } from "../Models/Forum/sectionDB";
import { Topic } from "../Models/Forum/topicDB";
import { IUser } from "../Interfaces/User";

export class ForumController {

    public async postSection(req: Request, res: Response) {
        try {
            const ForumNewSection = new Section(req.body);
            const ForumNewSectionResult: ISectionModel = await ForumNewSection.save();
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
    }

    public async getAllSection(req: Request, res: Response) {
        try {
            let sectionResult = await Section.find({}).select('-__v');
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
    }

    public async createTopic(req: Request, res: Response) {
        try {
            let countTopicName = await Topic.countDocuments({ idTopic: { $regex: '.*' + req.body.idTopic + '.*' } });
            countTopicName++;
            req.body.idTopic += `-${countTopicName}`;
            const newTopic = new Topic(req.body);
            const newTopicResult: ITopicModel = await newTopic.save();
            if (newTopicResult.idTopic) { // si l'id existe
                if (await ForumController.updateSectionOnTopicCreation(newTopicResult.urlSection, newTopicResult.creator, newTopicResult.lastUpdateDate)) {
                    const idTopic = JSON.stringify(newTopicResult.idTopic)
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
    }

    public async getAllTopics(req: Request, res: Response) {
        try {
            let listTopicPinSection = [];
            let listTopicSection = [];
            const listTopicGlobalResult =
                await Topic.find({ urlSection: "global" }).select('-__v -Messages').lean();
            const listTopicBySectionResult =
                await Topic.find({ urlSection: req.query.urlSection }).select('-__v -Messages').lean();
            if (listTopicBySectionResult) {
                listTopicBySectionResult.forEach(topic => {
                    if (topic.pinSection) {
                        listTopicPinSection.push(topic);
                    } else {
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
    }

    public async retrieveTopic(req: Request, res: Response) {
        try {
            const listTopicResult =
                await Topic.findOne({ idTopic: req.query.idTopic })
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
    }

    public async postMessageTopic(req: Request, res: Response) {
        try {
            let incNbParticipant = 1;
            if (req.body.userFound) {
                incNbParticipant = 0;
            }
            const topicUpdateResult =
                await Topic.updateOne({ idTopic: req.body.idTopic },
                    {
                        $push:
                        {
                            Messages: [{
                                user: req.body.user,
                                content: req.body.content,
                                date: Date.now(),
                                userUpdateMessage: null
                            }]
                        },
                        $set:
                        {
                            lastUpdateDate: Date.now(),
                            lastUser: req.body.user
                        },
                        $inc:
                        {
                            nbMessage: 1,
                            nbParticipant: incNbParticipant
                        }
                    });
            if (topicUpdateResult.nModified > 0) {
                if (!req.body.pinSection) {
                    await Section.updateOne({ urlSection: req.body.urlSection },
                        {
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
    }
    static async updateSectionOnTopicCreation(urlSectionNewTopic: String, userNewTopic: IUser, dateNewTopic: Date): Promise<Boolean> {
        try {
            if (urlSectionNewTopic == 'global') {
                return true;
            }
            const topicUpdateResult =
                await Section.updateOne({ urlSection: urlSectionNewTopic },
                    {
                        $set:
                        {
                            lastUser: userNewTopic,
                            lastMessageDate: dateNewTopic
                        },
                        $inc:
                        {
                            nbMessage: 1,
                            nbTopic: 1
                        }
                    });
            return (topicUpdateResult.nModified > 0);
        }
        catch (err) {
            return false;
        }
    }

}


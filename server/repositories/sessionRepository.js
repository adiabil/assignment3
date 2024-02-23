const sessionModel = require("../models/sessionModel");

const getAllSessions =async () => {
    return sessionModel.find();
};

const getSessionById = async (id) => {
    return sessionModel.findOne({id:id});
};


const updateSession = async (id, updateData) => {
    return sessionModel.findOneAndUpdate({id:id},updateData, {new:true, runValidators:true});
}


const createSession = async (addData) => {
    return sessionModel.create(addData);
}


const deleteSession = async (id) => {
    return sessionModel.deleteOne({id:id});
}

module.exports={
    getAllSessions,
    getSessionById,
    createSession,
    updateSession,
    deleteSession,
};
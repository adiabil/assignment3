const { Console } = require("winston/lib/winston/transports");
const sessionRepository = require("../repositories/sessionRepository");
const { BadRequest, NotFoundError,ServerError, Idconflict} = require("../errors/errors");
const logger = require("../logger");


const getAllSessions = async (req, res) => {
  try {
    const sessions = await sessionRepository.getAllSessions();//give me all the sessions from the repository
    logger.error("sessions not found");
    if(!sessions || sessions.length === 0) throw new NotFoundError("sessions")
    logger.info("All sessions found");
    return res.status(200).json(sessions);
  } catch (error) {
    res.status(error?.status || 500).json({message: error.message});
  }
};


const getSessionById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    if (isNaN(id)) {
      throw new BadRequest("id");
    }
    const session = await sessionRepository.getSessionById(id);

    if (!session || Object.keys(session).length === 0) {
      throw new NotFoundError(`Session with id ${id} not found`);
    }

    logger.info(`Session with id ${id} found`);
    return res.status(200).json(session);
  } catch (error) {
    res.status(error?.status || 500).json({ message: error.message });
  }
};


const updateSession = async (req, res) => {
  try {
    const sessionID = parseInt(req.params.id);
    
    if (isNaN(sessionID)) {
      throw new BadRequest("id");
    }

    const update = await sessionRepository.updateSession(sessionID, req.body);
    
    if (!update) {
      logger.error(`Session with id ${sessionID} not found`);
      throw new NotFoundError(`Session with id ${sessionID}`);
    }

    logger.info(`Session with id ${sessionID} is updated`);
    res.status(200).json(update);
  } catch (error) {
    res.status(error?.status || 500).json({ message: error.message });
  }
};


const createSession = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      logger.error(`Empty request body`);
      throw new NotFoundError("Request body is empty");
    }
    const { id, crisis, clientName, counslerName, date, sessionStatus } = req.body;
    if (!id || !crisis || !clientName || !counslerName || !date || !sessionStatus) {
      logger.error(`id, crisis, clientName, counslerName, date, sessionStatus are required`);
      throw new BadRequest("id, crisis, clientName, counslerName, date, sessionStatus are required");
    }
    const sessionExists = await sessionRepository.getSessionById(req.body.id);
    if(sessionExists) {
      logger.error(`session with id ${id} already exists`);
      throw new Idconflict(`session with id ${id} already exists`);
    }
    const newSession = await sessionRepository.createSession({ id, crisis, clientName, counslerName, date, sessionStatus });
    logger.info("Session created");
    res.status(200).json(newSession);
  } catch (error) {
    res.status(error?.status || 500).json({ message: error.message });
  }
};

const deleteSession = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    if (isNaN(id)) throw new BadRequest("id"); 

    const result = await sessionRepository.deleteSession(id);

    if (result.deletedCount === 0) {
      throw new NotFoundError(`Session with id ${id} not found`);
    }

    logger.info(`Session with id ${id} deleted`);
    return res.status(200).json({ message: `Session with id ${id} deleted` });
  } catch (error) {
    console.error(error);
    res.status(error?.status || 500).json({ message: error.message });
  }
};

module.exports={
  getAllSessions,
  getSessionById,
  updateSession,
  createSession,
  deleteSession,
};
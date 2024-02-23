const request = require("supertest");
const app = require("../server.js");
const sessionRepository = require("../repositories/sessionRepository");
const {BadRequest, NotFoundError, ServerError} = require("../errors/errors");


jest.mock("../repositories/sessionRepository");

//GET all sessions
describe("GET /counselingSession", () => {//כשמריצים את הטסט ויודעים מה נכשל , בדרך כלל מביאים את הפונקציה ואת הראוטאר
    beforeEach(() =>jest.clearAllMocks());
    //SUCCESS 200
    it("should return all sessions",async() => {
        const mockSession = [
            {id:"11",crisis:"Mental Health",clientName:"liran",counslerName:"",date:"2024-07-27",sessionStatus:"in process"}
        ];
        sessionRepository.getAllSessions.mockResolvedValue(mockSession);
        const res = await request(app).get("/counselingSession");//res hendle the answer
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockSession);
    });
    //FAIL 404 ERROR
    it("should return 404 error when no sessions found",async() => {
        sessionRepository.getAllSessions.mockResolvedValue([]);
        const res = await request(app).get("/counselingSession");
        expect(res.statusCode).toEqual(404);
    });
    //FAILL 500 ERROR
    it("should return 500 when an error",async() =>{
        sessionRepository.getAllSessions.mockRejectedValue(new ServerError("Internal Server Error"));
        const res = await request(app).get("/counselingSession");
        expect(res.statusCode).toEqual(500);
    });
});
// GET one session by ID
describe("GET /counselingSession/:id", () => {
    beforeEach(() =>jest.clearAllMocks());
    //SUCCESS 200
    it("should return all sessions by id",async() => {
        const mockSession = {id:"11"};
        sessionRepository.getSessionById.mockResolvedValue(mockSession);
        const res = await request(app).get("/counselingSession/11");
        expect(res.statusCode).toEqual(200);
    });

    //FAIL 404 ERROR
    it("should return 404 error when no sessions found",async() => {
        sessionRepository.getSessionById.mockResolvedValue(null);
        const res = await request(app).get("/counselingSession/11");
        expect(res.statusCode).toEqual(404);
    });
    //FAILL 500 ERROR
    it("should return 500 when an error",async() =>{
        sessionRepository.getSessionById.mockRejectedValue(new ServerError("Internal Server Error"));
        const res = await request(app).get("/counselingSession/11");
        expect(res.statusCode).toEqual(500);
    });
});
//create a new session
describe("POST /counselingSession", () => {
       //SUCCESS 200
    it(" create new session",async() => {
    const mockSession = [
        {id:"12",crisis:"family crisis",clientName:"noam shvit",counslerName:"mira kibaibanocv",date:"2024-06-02",sessionStatus:"done"}
    ];
    sessionRepository.createSession.mockResolvedValue(mockSession);
    const res = await request(app).post("/counselingSession");
    });

// FAIL 404 ERROR
    it("should return 404 error", async () => {
        sessionRepository.createSession.mockRejectedValue(new NotFoundError("Session not found"));
        const res = await request(app).post("/counselingSession");
        expect(res.statusCode).toEqual(404);
    });
  
     // FAIL 500 ERROR
    it("should return 500", async () => {
        sessionRepository.createSession.mockRejectedValue(new ServerError("Internal Server Error"));
        const res = await request(app).post("/counselingSession");
        expect(res.statusCode).toEqual(404);
    });
  

});
//update a session
describe("PUT /counselingSession/:id", () =>{
    beforeEach(() =>jest.clearAllMocks());
    //SUCCESS 200
    it("should update session by id", async () => {
        const mockSession = { id: "13" };
        sessionRepository.updateSession.mockResolvedValue(mockSession);
        const res = await request(app).put("/counselingSession/13");
        expect(res.statusCode).toEqual(200);
    });
    
      // FAIL 404 ERROR
    it("should return 404", async () => {
        sessionRepository.updateSession.mockResolvedValue(null);
        const res = await request(app).put("/counselingSession/13");
        expect(res.statusCode).toEqual(404);
    });
    
    // FAIL 500 ERROR
    it("should return 500 when an error", async () => {
        sessionRepository.updateSession.mockRejectedValue(new ServerError("Internal Server Error"));
        const res = await request(app).put("/counselingSession/13");
        expect(res.statusCode).toEqual(500);
    });
});
//delete a session
describe("DELETE /counselingSession/:id", () => {
    beforeEach(() => jest.clearAllMocks());
  
    // SUCCESS 200
    it("delete session by id", async () => {
      const mockSession = { id: "14" };
      sessionRepository.deleteSession.mockResolvedValue(mockSession);
      const res = await request(app).delete("/counselingSession/14");
      expect(res.statusCode).toEqual(200);
    });
    // FAIL 404 ERROR
    it("should return 404 error", async () => {
      sessionRepository.deleteSession.mockResolvedValue({ deletedCount: 0 });
      const res = await request(app).delete("/counselingSession/14");
      expect(res.statusCode).toEqual(404);
    });
    // FAIL 500 ERROR
    it("should return 500", async () => {
      sessionRepository.deleteSession.mockRejectedValue(new ServerError("Internal Server Error"));
      const res = await request(app).delete("/counselingSession/14");
      expect(res.statusCode).toEqual(500);
    });
});
  
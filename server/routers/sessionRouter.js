const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/', sessionController.getAllSessions);
router.get('/:id', sessionController.getSessionById);
router.post('/', sessionController.createSession);
router.put('/:id', sessionController.updateSession);
router.delete('/:id', sessionController.deleteSession);

module.exports = router;
































// const url = require("url");
// const CounselingSession = require("./counselingsession.js");
// const manager = new CounselingSession.CounselingSessionsManager("./Counseling.json");
// function requestManager(req,res) {
//     let pathUrl = url.parse(req.url,true);
//     let pathname = pathUrl.pathname;

//     switch(pathname) {
//         case "/":
//             res.writeHead(200,{"Content-Type":"text/html"});
//             res.write("<h1>Hello World</h1>");
//             res.end();
//             break;
//         case "/addSession":
//             if(req.method  === "POST") {
//                 let body = "";
//                 req.on("data",(chunk) => {
//                     body += chunk;
//                 });
//                 req.on("end",() => {
//                     body = JSON.parse(body);
//                     console.log(body);
//                     manager.createSession(body);
//                     res.writeHead(200,{"Content-Type":"application/json"});
//                     res.write(JSON.stringify(body));
//                     res.end();
//                 });
              
//             }
        
//             else{
//                 res.writeHead(404,{"Content-Type":"text/html"});
//                 res.write("<h1>404 Not Found</h1>");
//                 res.end();
//             }
//             break;

//             case "/deleteSession":
//                 console.log("Received DELETE request for /deleteSession");
//                 if (req.method === "DELETE") {
//                     let body = "";
//                     req.on("data", (chunk) => {
//                         body += chunk;
//                     });
//                     req.on("end", () => {
//                         body = JSON.parse(body);
//                         console.log(body);
//                         manager.deleteSession(body.id);
//                         res.writeHead(200, {"Content-Type": "application/json"});
//                         res.write(JSON.stringify(body));
//                         res.end();
//                     });
//                 } else {
//                     console.log("Invalid method for /deleteSession:", req.method);
//                     res.writeHead(404, {"Content-Type": "text/html"});
//                     res.write("<h1>404 Not Found</h1>");
//                     res.end();
//                 }
//                 break;

//             case "/updateSession":
//                 console.log("Received PUT request for /updateSession");
//                 if (req.method === "PUT") {
//                     let body = "";
//                     req.on("data", (chunk) => {
//                         body += chunk;
//                     });
//                     req.on("end", () => {
//                         body = JSON.parse(body);
//                         console.log(body);
//                         manager.updateSession(body.id, body);
//                         res.writeHead(200, {"Content-Type": "application/json"});
//                         res.write(JSON.stringify(body));
//                         res.end();
//                     });
//                 } else {
//                     console.log("Invalid method for /updateSession:", req.method);
//                     res.writeHead(404, {"Content-Type": "text/html"});
//                     res.write("<h1>404 Not Found</h1>");
//                     res.end();
//                 }
//                 break;

//             case "/getAllSessions":
//                 console.log("Received GET request for /getAllSessions");
//                 if (req.method === "GET") {
//                     res.writeHead(200, {"Content-Type": "application/json"});
//                     res.write(JSON.stringify(manager.getAllSessions()));
//                     res.end();
//                 } else {
//                     console.log("Invalid method for /getAllSessions:", req.method);
//                     res.writeHead(404, {"Content-Type": "text/html"});
//                     res.write("<h1>404 Not Found</h1>");
//                     res.end();
//                 }
//                 break;
//                case "/getSession":
//                 console.log("Received GET request for /getSession");
//                 if (req.method === "GET") {
//                     let body = "";
//                     req.on("data", (chunk) => {
//                         body += chunk;
//                     });
//                     req.on("end", () => {
//                         body = JSON.parse(body);
//                         console.log(body);
//                         res.writeHead(200, {"Content-Type": "application/json"});
//                         res.write(JSON.stringify(manager.getSession(body.id)));
//                         res.end();
//                     });
//                 } else {
//                     console.log("Invalid method for /getSession:", req.method);
//                     res.writeHead(404, {"Content-Type": "text/html"});
//                     res.write("<h1>404 Not Found</h1>");
//                     res.end();
//                 }
//                 break;
//             default:     
//     }
// }

// module.exports=requestManager;
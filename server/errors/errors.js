class ServerError extends Error {
    constructor(action) {
      super(`internal server error couldn't ${action} session`);
      this.name = "ServerError";
      this.status = 500; // Set status to 500
    }
  }

class  NotFoundError extends Error {
    constructor(entity) {
        super(`${entity} not found`);
        this.name="NotFoundError";
        this.status = 404;
    }
}

class BadRequest extends Error {
    constructor(element) {
        super(`plese provide: ${element}`);
        this.name="BadRequest";
        this.status= 400;//bed request is 400 
    }
}

class Idconflict extends Error {
    constructor(element) {
        super(`plese provide: ${element}`);
        this.name="Idconflict";
        this.status= 409;//bed request is 400 
    }
}
module.exports = {
    ServerError,
    NotFoundError,
    BadRequest,
    Idconflict,
}
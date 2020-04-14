const user = require('../controllers/users.js');
//----^^-----------------------------------^^Change Controller
module.exports = function (app) {

    app.get("/api", (request, response) => user.index(request,response)); 
    app.get("/api/run", (request, response) => user.indexrun(request,response)); 
    app.get("/api/walk", (request, response) => user.indexwalk(request,response)); 

    app.get("/api/user/:id", (request, response) => user.show(request,response));

    app.post("/api/user/new", (request, response) => user.create(request,response)); 

    app.put("/api/user/update/:email", (request, response) => user.update(request,response));

    app.delete("/api/user/destroy/:id", (request, response) => user.destroy(request,response));  

}
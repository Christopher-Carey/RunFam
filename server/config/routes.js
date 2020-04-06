const restful = require('../controllers/restfuls.js');
//----^^-----------------------------------^^Change Controller
module.exports = function (app) {

    app.get("/api", (request, response) => restful.index(request,response));  

    app.get("/api/task/:id", (request, response) => restful.show(request,response));

    app.post("/api/task/new", (request, response) => restful.create(request,response)); 

    app.put("/api/task/update/:id", (request, response) => restful.update(request,response));

    app.delete("/api/task/destroy/:id", (request, response) => restful.destroy(request,response));  

}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const runBdd = require('./fachada');
const http = require('http');
// funcion para probar
function handleRequest(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        response.setHeader('Content-Type', 'application/json');
        yield runBdd.run("opera.js", "generaInsert", "local", []).then(i => {
            console.log("numero", i.length);
            response.end(JSON.stringify(i));
        }).catch(e => { response.end(e); });
    });
}
function createServer() {
    return __awaiter(this, void 0, void 0, function* () {
        var server = http.createServer(handleRequest);
        var PORT = 3000;
        server.listen(PORT, function () {
            console.log("Server listening   on: http://localhost:%s", PORT);
        });
    });
}
createServer();
//# sourceMappingURL=test1.js.map
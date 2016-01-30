var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var runBdd = require('./fachada');
var http = require('http');
// funcion para probar
function handleRequest(request, response) {
    return __awaiter(this, void 0, Promise, function* () {
        response.setHeader('Content-Type', 'application/json');
        yield runBdd.runQuery("select count(*) contador from p_persona ", "local", [])
            .then(i => {
            response.write(JSON.stringify(i.rows));
        });
        yield runBdd.run("Operacion_f1", "local", []).then(i => {
            response.end(JSON.stringify(i[0].rows));
        });
    });
}
var server = http.createServer(handleRequest);
var PORT = 3000;
server.listen(PORT, function () {
    console.log("Server listening   on: http://localhost:%s", PORT);
});

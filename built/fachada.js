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
var pgLib = require('./pgLib');
var fs = require('fs');
// array de modulos
exports.arrOp = {};
// operación para la carga de los modulos
// esta operación se realiza de manera sincrona
var files = fs.readdirSync("built/Operaciones");
var f = files.filter(i => i.endsWith(".js"));
console.log("fichero", f);
f.forEach(i => { exports.arrOp[i] = require(`./Operaciones/${i}`); });
exports.refresh = (modulo, nombre) => {
    exports.arrOp[nombre] = require(nombre);
};
function runQuery(query, bddConnection, params) {
    return __awaiter(this, void 0, Promise, function* () {
        var conectado = 0;
        try {
            var cliente = yield pgLib.conn(bddConnection);
            conectado = 1;
            yield pgLib.q(cliente, "BEGIN", []);
            var r = yield pgLib.q(cliente, query, params);
            yield pgLib.q(cliente, "COMMIT ", []);
            cliente.end();
            return r;
        }
        catch (e) {
            // puede cascar en la conexión y entonces no 
            // tengo que hacer rollback
            if (conectado == 1) {
                yield pgLib.q(cliente, "ROLLBACK ", []);
                cliente.end();
            }
            throw e;
        }
    });
}
exports.runQuery = runQuery;
// llamada general a la base de datos 
// hace commit o rollback si la cosa va bien o mal.
// funcion llamada a una funcion 
// bddConnection Cadenas de conexión
// params : los parametros que devuelve
function run(modulo, funcion, bddConnection, params) {
    return __awaiter(this, void 0, Promise, function* () {
        var conectado = 0;
        try {
            var cliente = yield pgLib.conn(bddConnection);
            conectado = 1;
            yield pgLib.q(cliente, "BEGIN", []);
            var r = yield exports.arrOp[modulo][funcion](cliente, params);
            yield pgLib.q(cliente, "COMMIT ", []);
            cliente.end();
            return r;
        }
        catch (e) {
            // puede cascar en la conexión y entonces no 
            // tengo que hacer rollback
            if (conectado == 1) {
                yield pgLib.q(cliente, "ROLLBACK ", []);
                cliente.end();
            }
            throw e;
        }
    });
}
exports.run = run;
//# sourceMappingURL=fachada.js.map
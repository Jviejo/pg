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
var Op1 = require('./Operacion');
// en este fichero de hacen los import dinámicamente 
// a partir de los fichero que haya en el directorio 
// bdd ====> NO ESTA HECHO TODAVIA
exports.arrOp = {};
exports.refresh = (nombre, fc) => {
    exports.arrOp[nombre] = fc;
};
// array con todas las operaciones
exports.arrOp = {
    "Operacion_f1": Op1.f1
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
function run(funcion, bddConnection, params) {
    return __awaiter(this, void 0, Promise, function* () {
        var conectado = 0;
        try {
            var cliente = yield pgLib.conn(bddConnection);
            conectado = 1;
            yield pgLib.q(cliente, "BEGIN", []);
            var r = yield exports.arrOp[funcion](cliente, params);
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

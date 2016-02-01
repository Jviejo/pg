"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const pgLib = require('./pgLib');
const fs = require('fs');
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
    return __awaiter(this, void 0, void 0, function* () {
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
    return __awaiter(this, void 0, void 0, function* () {
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
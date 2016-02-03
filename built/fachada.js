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
// genera un objeto por tabla
exports.insert = (tabla, database, a) => __awaiter(this, void 0, void 0, function* () {
    var tmp = Object.keys(a).map((i, indice) => "$" + (indice + 1));
    var sql = `insert into ${tabla} (${Object.keys(a)}) values (${tmp})`;
    var params = Object.keys(a).map(j => a[j]);
    return runQuery(sql, database, params);
});
var setUpdate = (a) => Object.keys(a).map((i, indice) => `${i} = $${indice + 1} `);
var w = (o, inicial) => Object.keys(o).map((i, indice) => `${i}=$${indice + 1 + inicial}`).join('  and ');
var params = (a) => Object.keys(a).map(j => a[j]);
exports.update = (tabla, database, filtro, datos) => __awaiter(this, void 0, void 0, function* () {
    var sql = `update ${tabla} set ${setUpdate(datos)}  where  ${w(filtro, Object.keys(datos).length)} `;
    return runQuery(sql, database, params(datos).concat(params(filtro)));
});
exports.remove = (tabla, database, id) => {
    var sql = `delete from  ${tabla}  where id = $1 `;
    return runQuery(sql, database, [id]);
};
exports.select = (tabla, database, id) => {
    var sql = `select *  from  ${tabla}  where id = $1`;
    return runQuery(sql, database, [id]);
};
exports.selectAll = (tabla, database) => {
    var sql = `select *  from  ${tabla} `;
    return runQuery(sql, database, []);
};
exports.generaSQL = (texto, params) => {
    return new Function(params, "return `" + texto + "`;");
};
exports.selectFilter = (tabla, database, a) => {
    var sql = `select *  from  ${tabla}  where ${w(a, 0)}`;
    return runQuery(sql, database, params(a));
};
exports.selectFilterPagina = (tabla, database, datos, sortedBy, skip, take) => {
    var sql = `
            select * from
            (
                SELECT row_number() over(order by ${sortedBy}) rn, *
                FROM ${tabla}
                WHERE ${w(datos, 0)}
            ) r
            where r.rn between ${skip} and ${skip + take};
        `;
    return runQuery(sql, database, params(datos));
};
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
            console.log(query, params);
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
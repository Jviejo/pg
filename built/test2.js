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
// nombres de las tablas
var tablas = {
    p_persona: "p_persona"
};
// insert generica
exports.insert = (tabla, database, a) => __awaiter(this, void 0, void 0, function* () {
    var tmp = Object.keys(a).map((i, indice) => "$" + (indice + 1));
    var sql = `insert into ${tabla} (${Object.keys(a)}) values (${tmp})`;
    var params = Object.keys(a).map(j => a[j]);
    return runBdd.runQuery(sql, database, params);
});
var setUpdate = (a) => Object.keys(a).map((i, indice) => `${i} = $${indice + 1} `);
var w = (o, inicial) => Object.keys(o).map((i, indice) => `${i}=$${indice + 1 + inicial}`).join('  and ');
var params = (a) => Object.keys(a).map(j => a[j]);
exports.update = (tabla, database, filtro, datos) => __awaiter(this, void 0, void 0, function* () {
    var sql = `update ${tabla} set ${setUpdate(datos)}  where  ${w(filtro, Object.keys(datos).length)} `;
    return runBdd.runQuery(sql, database, params(datos).concat(params(filtro)));
});
exports.remove = (tabla, database, id) => {
    var sql = `delete from  ${tabla}  where id = $1 `;
    return runBdd.runQuery(sql, database, [id]);
};
exports.select = (tabla, database, id) => {
    var sql = `select *  from  ${tabla}  where id = $1`;
    return runBdd.runQuery(sql, database, [id]);
};
exports.selectAll = (tabla, database) => {
    var sql = `select *  from  ${tabla} `;
    return runBdd.runQuery(sql, database, []);
};
exports.generaSQL = (texto, params) => {
    return new Function(params, "return `" + texto + "`;");
};
exports.selectFilter = (tabla, database, a) => {
    var sql = `select *  from  ${tabla}  where ${w(a, 0)}`;
    return runBdd.runQuery(sql, database, params(a));
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
    return runBdd.runQuery(sql, database, params(datos));
};
// clone objetos simples
var clone = (origen) => {
    var tmp = {};
    Object.keys(origen).map(i => tmp[i] = origen[i]);
    return tmp;
};
// funcion para probar
function exec() {
    return __awaiter(this, void 0, void 0, function* () {
        var prueba = {
            email: "aa",
            g_nifnombre: "",
            telefono: "",
            telefono2: "",
            tipopersona: "",
            id: "aa" + Math.random()
        };
        var p1 = clone(prueba);
        exports.insert("p_persona", "local", p1).then(i => {
            console.log("insert", i);
        }).then(i => exports.update("p_persona", "local", { id: prueba.id, telefono: "222" }, prueba).then(i => {
            console.log("update", i);
        }))
            .then(i => { runBdd.select("p_persona", "local", prueba.id).then(i => { console.log("select", i.rows); }); })
            .then(i => { runBdd.selectAll("p_persona", "local").then(i => { console.log("selectAll", i.rows.length); }); })
            .then(i => { runBdd.selectFilter("p_persona", "local", { id: "aa0.9668956873938441" }).then(i => { console.log("selectFilter", i.rows); }); })
            .then(i => { runBdd.selectFilterPagina("p_persona", "local", { id: "aa0.9668956873938441" }, 'telefono', 0, 10).then(i => { console.log("selectFilterPagina", i.rows); }); });
        //   await runBdd.run("opera.js","getPersona",database,[]).then(i=>
        //   {
        //       var a:Array<bdd.p_persona> = i;
        //       console.log("resultado",a);
        //   }).catch(e => {console.log(e);})
        //   ;
        //   console.log("despues del await")
    });
}
exec();
//# sourceMappingURL=test2.js.map
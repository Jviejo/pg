"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
// nombres de las tablas
var tablas = {
    p_persona: "p_persona"
};
// insert generica
exports.insert = (tabla, a) => {
    var tmp = Object.keys(a).map((i, indice) => "$" + (indice + 1));
    var sql = `insert into ${tabla} (${Object.keys(a)}) values (${tmp})`;
    //await pgLib.q(cliente,sql, Object.keys(a).map(i=>a[i]));
    return sql;
};
exports.update = (tabla, id, a) => {
    var tmp = Object.keys(a)
        .filter(i => i != 'id')
        .map((i, indice) => `${i} = $${indice + 1} `);
    var sql = `update ${tabla} set ${tmp}  where id = ${id} `;
    //await pgLib.q(cliente,sql, [id]);
    return sql;
};
exports.remove = (tabla, id) => {
    var sql = `delete from  ${tabla}  where id = $1 `;
    //await pgLib.q(cliente,sql, [id]);
    return sql;
};
exports.select = (tabla, id) => {
    var sql = `select *  from  ${tabla}  where id = $1`;
    //await pgLib.q(cliente,sql, [id]);
    return sql;
};
exports.selectAll = (tabla) => {
    var sql = `select *  from  ${tabla} `;
    //await pgLib.q(cliente,sql, []);
    return sql;
};
exports.selectFilter = (tabla, a) => {
    var sql = `select *  from  ${tabla}  where ${a}`;
    //await pgLib.q(cliente,sql, []);
    return sql;
};
exports.selectFilterPagina = (tabla, a, filter, sortedBy, skip, take) => {
    var sql = `
            select * from
            (
            SELECT row_number() over(order by ${sortedBy}) rn, *
            FROM ${tabla}
            WHERE ${filter}
            ) r
            where r.rn between ${skip} and ${skip + take};
        `;
    //await pgLib.q(cliente,sql, []);
    return sql;
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
            id: "1",
        };
        console.log("insertar", exports.insert(tablas.p_persona, prueba));
        console.log("update", exports.update(tablas.p_persona, '1111', prueba));
        console.log("delete", exports.remove(tablas.p_persona, '1111'));
        console.log("select", exports.select(tablas.p_persona, '1'));
        console.log("selectAll", exports.selectAll(tablas.p_persona));
        console.log("selectAll", exports.selectFilter(tablas.p_persona, prueba));
        console.log("selectAll", exports.selectFilterPagina(tablas.p_persona, prueba, "id > '1'", "id", 10, 20));
        //   await runBdd.run("opera.js","getPersona","local",[]).then(i=>
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
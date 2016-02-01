"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const pgLib = require('../pgLib');
exports.f1 = (cliente, params) => __awaiter(this, void 0, void 0, function* () {
    var r = [];
    // diferenets accesos kkka las tablas
    yield pgLib.q(cliente, "insert into p_persona values($1,$2,$3,$4,$5,$6)", [Math.random(), 'a', 'b', 'c', 'd', 'e']);
    r.push(yield pgLib.q(cliente, "select count(*) contador1  from p_persona;select count(*) contador from p_persona", []));
    r.push(yield pgLib.q(cliente, "select count(*) c1 from p_persona;select count(*) contador2 from p_persona", []));
    return r;
});
exports.f2 = (cliente, params) => __awaiter(this, void 0, void 0, function* () {
    var r = [];
    // diferenets accesos a las tablas
    yield pgLib.q(cliente, "insert into p_persona values($1,$2,$3,$4,$5,$6)", [Math.random(), 'a', 'b', 'c', 'd', 'e']);
    r.push(yield pgLib.q(cliente, "select count(*) contador22221yyy  from p_persona;select count(*) contador from p_persona", []));
    r.push(yield pgLib.q(cliente, "select count(*) c1 from p_persona;select count(*) contador2 from p_persona", []));
    return r;
});
exports.generaInsert = (cliente, params) => __awaiter(this, void 0, void 0, function* () {
    var r = yield pgLib.q(cliente, `
        SELECT table_name,column_name
        FROM information_schema.columns
        WHERE table_schema = 'public';
    `, []);
    var r1 = r.rows.reduce((acc, v) => {
        if (!acc[v.table_name]) {
            acc[v.table_name] = [];
        }
        acc[v.table_name].push(v.column_name);
        return acc;
    }, {});
    var tablas = Object.keys(r1).forEach((index) => r1[index] = `insert into ${index} (${r1[index]}) values (${r1[index].reduce((acc, v, indice) => { return acc + (indice != 0 ? "," : "") + '$' + (indice + 1); }, "")})`);
    return r1;
});
exports.genera = (cliente, params) => __awaiter(this, void 0, void 0, function* () {
    // timestamp without time
    //character varying, integer, numeric
    var r = yield pgLib.q(cliente, `
                    SELECT table_name,column_name,ordinal_position,is_nullable,data_type,character_maximum_length,numeric_precision,numeric_precision_radix,numeric_scale
                    FROM information_schema.columns
                    WHERE table_schema = 'public';
                   `, []);
    var r1 = r.rows
        .map(i => {
        return i;
    });
    return r1;
});
exports.f3 = (cliente, params) => __awaiter(this, void 0, void 0, function* () {
    var r = [];
    // diferenets accesos a las tablas
    yield pgLib.q(cliente, "insert into p_persona values($1,$2,$3,$4,$5,$6)", [Math.random(), 'a', 'b', 'c', 'd', 'e']);
    r.push(yield pgLib.q(cliente, "select count(*) contador333333  from p_persona;select count(*) contador from p_persona", []));
    r.push(yield pgLib.q(cliente, "select count(*) c1 from p_persona;select count(*) contador2 from p_persona", []));
    return r;
});
//# sourceMappingURL=opera.js.map
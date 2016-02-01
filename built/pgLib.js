"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const pg = require('pg');
const pgConfig = require('./pgConfig');
// conversión de la conexión en una promise
exports.conn = (cadena) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((a, b) => {
        pg.connect(pgConfig.pgConfig[cadena], (error, client, done) => {
            if (error)
                b(error);
            a(client);
        });
    });
});
// conversion de la query en una promise
exports.q = (client, select, params) => __awaiter(this, void 0, void 0, function* () {
    var p = new Promise((a, b) => {
        client.query(select, params, (err, result) => {
            if (err) {
                console.log(err);
                b(err);
            }
            a(result);
        });
    });
    return p;
});
//# sourceMappingURL=pgLib.js.map
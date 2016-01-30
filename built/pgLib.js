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
var pg = require('pg');
var pgConfig = require('./pgConfig');
// conversión de la conexión en una promise
exports.conn = (cadena) => __awaiter(this, void 0, Promise, function* () {
    return new Promise((a, b) => {
        pg.connect(pgConfig.pgConfig[cadena], (error, client, done) => {
            if (error)
                b(error);
            a(client);
        });
    });
});
// conversion de la query en una promise
exports.q = (client, select, params) => __awaiter(this, void 0, Promise, function* () {
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
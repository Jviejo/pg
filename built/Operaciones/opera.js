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
var pgLib = require('../pgLib');
exports.f1 = (cliente, params) => __awaiter(this, void 0, Promise, function* () {
    var r = [];
    // diferenets accesos kkka las tablas
    yield pgLib.q(cliente, "insert into p_persona values($1,$2,$3,$4,$5,$6)", [Math.random(), 'a', 'b', 'c', 'd', 'e']);
    r.push(yield pgLib.q(cliente, "select count(*) contador1  from p_persona;select count(*) contador from p_persona", []));
    r.push(yield pgLib.q(cliente, "select count(*) c1 from p_persona;select count(*) contador2 from p_persona", []));
    return r;
});
exports.f2 = (cliente, params) => __awaiter(this, void 0, Promise, function* () {
    var r = [];
    // diferenets accesos a las tablas
    yield pgLib.q(cliente, "insert into p_persona values($1,$2,$3,$4,$5,$6)", [Math.random(), 'a', 'b', 'c', 'd', 'e']);
    r.push(yield pgLib.q(cliente, "select count(*) contador22221yyy  from p_persona;select count(*) contador from p_persona", []));
    r.push(yield pgLib.q(cliente, "select count(*) c1 from p_persona;select count(*) contador2 from p_persona", []));
    return r;
});
exports.f3 = (cliente, params) => __awaiter(this, void 0, Promise, function* () {
    var r = [];
    // diferenets accesos a las tablas
    yield pgLib.q(cliente, "insert into p_persona values($1,$2,$3,$4,$5,$6)", [Math.random(), 'a', 'b', 'c', 'd', 'e']);
    r.push(yield pgLib.q(cliente, "select count(*) contador333333  from p_persona;select count(*) contador from p_persona", []));
    r.push(yield pgLib.q(cliente, "select count(*) c1 from p_persona;select count(*) contador2 from p_persona", []));
    return r;
});
//# sourceMappingURL=opera.js.map
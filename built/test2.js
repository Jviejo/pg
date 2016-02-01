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
// funcion para probar
function exec() {
    return __awaiter(this, void 0, void 0, function* () {
        yield runBdd.run("opera.js", "generaInsert", "local", []).then(i => {
            // generación de insert table (nombres de campos separados por ,) values ($1,$2,$3,....)
            console.log("resultado", i);
        }).catch(e => { console.log(e); });
        console.log("despues del await");
    });
}
exec();
//# sourceMappingURL=test2.js.map
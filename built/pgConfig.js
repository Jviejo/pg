"use strict";
// connection string
// hay un problema en el tsd ya que no está definido el paraetro ssl en el tsd install pg --save
//    export interface ConnectionConfig {
//        user?: string;
//        database?: string;
//        password?: string;
//        port?: number;
//        host?: string;
//        ssl:boolean // he tenido que añadir este campo
//    }
// en este fichero meteremos las diferentes 
// parámetros de configuración para las
// diferentes bases de datos
var local = {
    user: "postgres",
    password: "postgres",
    database: "gt",
    port: 5432,
    host: "192.168.1.50",
    ssl: true
};
exports.pgConfig = {
    "local": local
};
//# sourceMappingURL=pgConfig.js.map
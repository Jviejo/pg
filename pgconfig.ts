import * as pg from 'pg';

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
var heroku:pg.ConnectionConfig = 
{
        user: "tzojnunoezgiml",
        password: "ORGE-1YfRVGURRVnQ4klTxWNij",
        database: "dlumuqapja3ep",
        port: 5432,
        host: "ec2-54-235-152-114.compute-1.amazonaws.com",
        ssl: true
};

var local:pg.ConnectionConfig = 
{
        user: "postgres",
        password: "postgres",
        database: "gt",
        port: 5432,
        host: "192.168.1.50",
        ssl: true
};
export var pgConfig = {
    "heroku": heroku,
    "local":local
}
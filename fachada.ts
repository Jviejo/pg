import * as pgLib from './pgLib';
import * as fs from 'fs';

// array de modulos
export var arrOp = {};

// operación para la carga de los modulos
// esta operación se realiza de manera sincrona
var files = fs.readdirSync("built/Operaciones")
var f = files.filter(i=> i.endsWith(".js"))
console.log("fichero", f);
f.forEach(i=>{arrOp[i] = require(`./Operaciones/${i}`)});
            
            
      

export var refresh = (modulo, nombre ) =>
{
    arrOp[nombre] = require(nombre)
}

export async function runQuery(query:string,bddConnection:string, params:any)
{
    var conectado = 0;
    try
    {    
        var cliente = await pgLib.conn(bddConnection);
        conectado = 1;
        await pgLib.q(cliente,"BEGIN",[]);
        var r =  await pgLib.q(cliente, query,params);
        await pgLib.q(cliente,"COMMIT ",[]);
        cliente.end();
        return r;
    }
    catch(e)
    {
        // puede cascar en la conexión y entonces no 
        // tengo que hacer rollback
        if (conectado == 1)
        {
            await pgLib.q(cliente,"ROLLBACK ",[]);
            cliente.end();
        }
        throw e;
    }
}

// llamada general a la base de datos 
// hace commit o rollback si la cosa va bien o mal.
// funcion llamada a una funcion 
// bddConnection Cadenas de conexión
// params : los parametros que devuelve
export async function run(modulo:string, funcion:string, bddConnection:string, params:{})
{
    var conectado = 0;
    try
    {    
        var cliente = await pgLib.conn(bddConnection);
        conectado = 1;
        await pgLib.q(cliente,"BEGIN",[]);
        var r =  await arrOp[modulo][funcion](cliente, params);
        await pgLib.q(cliente,"COMMIT ",[]);
        cliente.end();
        return r;
    }
    catch(e)
    {
        // puede cascar en la conexión y entonces no 
        // tengo que hacer rollback
        if (conectado == 1)
        {
            await pgLib.q(cliente,"ROLLBACK ",[]);
            cliente.end();
        }
        throw e;
    }
} 

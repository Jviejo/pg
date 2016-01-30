import * as pgLib from './pgLib';
import * as Op1 from './Operacion';

// en este fichero de hacen los import dinámicamente 
// a partir de los fichero que haya en el directorio 
// bdd ====> NO ESTA HECHO TODAVIA

export var arrOp = {};


export var refresh = (nombre ,fc) =>
{
    arrOp[nombre] = fc;
}

// array con todas las operaciones
arrOp = {
  "Operacion_f1":Op1.f1
};

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
export async function run(funcion:string, bddConnection:string, params:{})
{
    var conectado = 0;
    try
    {    
        var cliente = await pgLib.conn(bddConnection);
        conectado = 1;
        await pgLib.q(cliente,"BEGIN",[]);
        var r =  await arrOp[funcion](cliente, params);
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

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

// genera un objeto por tabla


export var  insert = async (tabla:string, database:string, a) =>
{
        var tmp = Object.keys(a).map( (i,indice)=>"$"+( indice + 1));
        var sql = `insert into ${tabla} (${Object.keys(a)}) values (${tmp})`;
        var params = Object.keys(a).map(j=> a[j]);
        return runQuery(sql,database,params)
}

var setUpdate = (a) => Object.keys(a).map( (i,indice)=>`${i} = $${indice+1} `);
var w = (o , inicial:number) =>  Object.keys(o).map((i, indice) => `${i}=$${indice+1+inicial}`).join('  and ');
var params = (a) => Object.keys(a).map(j=> a[j]);


export var  update =  async (tabla:string,database:string,filtro, datos) =>
{
        var sql = `update ${tabla} set ${setUpdate(datos)}  where  ${w(filtro,Object.keys(datos).length)} `;
        return runQuery(sql,database, params(datos).concat(params(filtro)));
}
export var  remove =  (tabla:string,database:string,id:string) =>
{
        var sql = `delete from  ${tabla}  where id = $1 `;
        return runQuery(sql,database,[id])
}
export var  select =  (tabla:string,database:string,id:string) =>
{
        var sql = `select *  from  ${tabla}  where id = $1`;
        return runQuery(sql,database,[id])

}
export var  selectAll =  (tabla:string,database:string) =>
{
        var sql = `select *  from  ${tabla} `;
        return runQuery(sql,database,[])
}
export var generaSQL = (texto,params) =>
{
 
    return new Function(params, "return `" + texto +"`;"); 
}

export var  selectFilter =  (tabla:string, database:string, a) =>
{
        var sql = `select *  from  ${tabla}  where ${w(a,0)}`;
        return runQuery(sql,database,params(a))
}

export var  selectFilterPagina =  ( tabla:string,
                                    database:string,
                                    datos,
                                    sortedBy:string,
                                    skip:number,
                                    take:number) =>
{
        var sql = 
        `
            select * from
            (
                SELECT row_number() over(order by ${sortedBy}) rn, *
                FROM ${tabla}
                WHERE ${w(datos,0)}
            ) r
            where r.rn between ${skip} and ${skip+take};
        `;
        return runQuery(sql,database,params(datos))
}
            
            
      

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
        console.log(query,params);
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

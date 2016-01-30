import * as pg from 'pg';
import * as pgConfig from './pgConfig'

// conversión de la conexión en una promise
export var conn = async (cadena:string) =>
{
    return new Promise<pg.Client>((a,b) =>
    {
        pg.connect(pgConfig.pgConfig[cadena], (error:Error, client:pg.Client, done) =>
        {
            if (error)
               b(error);
            a(client);   
        });  
    });
};
// conversion de la query en una promise
export var q = async (client:pg.Client, select:string, params)=>
{
var p = new Promise<pg.QueryResult>(
   (a,b)=>
    {
                client.query(select, params, (err,result) => 
                {
                        if (err) 
                        {
                            console.log(err);
                            b(err);
                        } 
                        a(result);
                });
    });
    return p;
};

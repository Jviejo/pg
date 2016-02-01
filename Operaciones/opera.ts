
import * as pgLib from '../pgLib';

export var f1 = async  (cliente,params) =>
{
    var r = [];
    // diferenets accesos kkka las tablas
    await pgLib.q(cliente,"insert into p_persona values($1,$2,$3,$4,$5,$6)",[Math.random(),'a','b','c','d','e']);
    r.push( await pgLib.q(cliente,"select count(*) contador1  from p_persona;select count(*) contador from p_persona",[]));
    r.push( await pgLib.q(cliente,"select count(*) c1 from p_persona;select count(*) contador2 from p_persona",[]));
    return r;
}

export var f2 = async  (cliente,params) =>
{
    var r = [];
    // diferenets accesos a las tablas
    await pgLib.q(cliente,"insert into p_persona values($1,$2,$3,$4,$5,$6)",[Math.random(),'a','b','c','d','e']);
    r.push( await pgLib.q(cliente,"select count(*) contador22221yyy  from p_persona;select count(*) contador from p_persona",[]));
    r.push( await pgLib.q(cliente,"select count(*) c1 from p_persona;select count(*) contador2 from p_persona",[]));
    return r;
}

export var generaInsert = async (cliente, params) =>
{
    var r = await pgLib.q(cliente,
    `
        SELECT table_name,column_name
        FROM information_schema.columns
        WHERE table_schema = 'public';
    `, []
    );
    
    var r1 = r.rows.reduce((acc,v) =>
    {
        if (!acc[v.table_name])
       {
         acc[v.table_name] = [];
       }
       acc[v.table_name].push(v.column_name); 
       return acc;
    }, {}); 
    var tablas = Object.keys(r1).forEach( (index) =>
          r1[index] =  `insert into ${index} (${r1[index]}) values (${r1[index].reduce((acc, v, indice) => { return acc + (indice != 0 ?",":"") + '$' + (indice + 1)  },"")})`
    )
    
    
    return r1;
}

export var genera = async (cliente, params) =>
{
    // timestamp without time
    //character varying, integer, numeric
    var r = await pgLib.q(cliente,`
                    SELECT table_name,column_name,ordinal_position,is_nullable,data_type,character_maximum_length,numeric_precision,numeric_precision_radix,numeric_scale
                    FROM information_schema.columns
                    WHERE table_schema = 'public';
                   `,[]);
                                                
    var r1 = r.rows
            .map(i=>{
                    return i}
                );
   
    return r1;                         
}

export var f3 = async  (cliente,params) =>
{
    var r = [];
    // diferenets accesos a las tablas
    await pgLib.q(cliente,"insert into p_persona values($1,$2,$3,$4,$5,$6)",[Math.random(),'a','b','c','d','e']);
    r.push( await pgLib.q(cliente,"select count(*) contador333333  from p_persona;select count(*) contador from p_persona",[]));
    r.push( await pgLib.q(cliente,"select count(*) c1 from p_persona;select count(*) contador2 from p_persona",[]));
    return r;
}

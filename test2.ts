import * as runBdd from './fachada';
import * as bdd from './bdd';

// nombres de las tablas
var tablas =
{
    p_persona:"p_persona"
}
// insert generica

export var  insert =  (tabla:string, a:bdd.p_persona) =>
{
        var tmp = Object.keys(a).map( (i,indice)=>"$"+( indice + 1));
        var sql = `insert into ${tabla} (${Object.keys(a)}) values (${tmp})`;
        //await pgLib.q(cliente,sql, Object.keys(a).map(i=>a[i]));
        return sql;
}
export var  update =  (tabla:string,id:string, a:bdd.p_persona) =>
{
        var tmp = Object.keys(a)
            .filter(i=>  i != 'id')
            .map( (i,indice)=>`${i} = $${indice+1} `);
        var sql = `update ${tabla} set ${tmp}  where id = ${id} `;
         //await pgLib.q(cliente,sql, [id]);
        return sql;
}
export var  remove =  (tabla:string,id:string) =>
{
        var sql = `delete from  ${tabla}  where id = $1 `;
         //await pgLib.q(cliente,sql, [id]);
        return sql;
}
export var  select =  (tabla:string,id:string) =>
{
        var sql = `select *  from  ${tabla}  where id = $1`;
         //await pgLib.q(cliente,sql, [id]);
       return sql;
}
export var  selectAll =  (tabla:string) =>
{
        var sql = `select *  from  ${tabla} `;
         //await pgLib.q(cliente,sql, []);
        return sql;
}
export var  selectFilter =  (tabla:string, a:bdd.p_persona) =>
{
        var sql = `select *  from  ${tabla}  where ${a}`;
         //await pgLib.q(cliente,sql, []);
        return sql;
}
export var  selectFilterPagina =  ( tabla:string,
                                    a:bdd.p_persona,
                                    filter:string,
                                    sortedBy:string,
                                    skip:number,
                                    take:number) =>
{
        var sql = `
            select * from
            (
            SELECT row_number() over(order by ${sortedBy}) rn, *
            FROM ${tabla}
            WHERE ${filter}
            ) r
            where r.rn between ${skip} and ${skip+take};
        `;
         //await pgLib.q(cliente,sql, []);
        return sql;
}



// funcion para probar
async function  exec()
{   
    
    
   var prueba :bdd.p_persona = 
    {
    email:"aa",
    g_nifnombre : "",
    telefono: "",
    telefono2:"",
    tipopersona:"",
    id:"1",
    
    };

console.log("insertar",insert(tablas.p_persona,prueba)); 
console.log("update",update(tablas.p_persona,'1111',prueba)); 
console.log("delete",remove(tablas.p_persona,'1111')); 
console.log("select",select(tablas.p_persona,'1')); 
console.log("selectAll",selectAll(tablas.p_persona)); 
console.log("selectAll",selectFilter(tablas.p_persona,prueba));
console.log("selectAll",selectFilterPagina(tablas.p_persona,prueba,"id > '1'","id",10,20) );
        
//   await runBdd.run("opera.js","getPersona","local",[]).then(i=>
//   {
//       var a:Array<bdd.p_persona> = i;
//       console.log("resultado",a);
//   }).catch(e => {console.log(e);})
//   ;
//   console.log("despues del await")
}
exec()
import * as runBdd from './fachada';
import * as bdd from './bdd';

// nombres de las tablas
var tablas =
{
    p_persona:"p_persona"
}
// insert generica

export var  insert = async (tabla:string, database:string, a) =>
{
        var tmp = Object.keys(a).map( (i,indice)=>"$"+( indice + 1));
        var sql = `insert into ${tabla} (${Object.keys(a)}) values (${tmp})`;
        var params = Object.keys(a).map(j=> a[j]);
        return runBdd.runQuery(sql,database,params)
}

var setUpdate = (a) => Object.keys(a).map( (i,indice)=>`${i} = $${indice+1} `);
var w = (o , inicial:number) =>  Object.keys(o).map((i, indice) => `${i}=$${indice+1+inicial}`).join('  and ');
var params = (a) => Object.keys(a).map(j=> a[j]);


export var  update =  async (tabla:string,database:string,filtro, datos) =>
{
        var sql = `update ${tabla} set ${setUpdate(datos)}  where  ${w(filtro,Object.keys(datos).length)} `;
        return runBdd.runQuery(sql,database, params(datos).concat(params(filtro)));
}
export var  remove =  (tabla:string,database:string,id:string) =>
{
        var sql = `delete from  ${tabla}  where id = $1 `;
        return runBdd.runQuery(sql,database,[id])
}
export var  select =  (tabla:string,database:string,id:string) =>
{
        var sql = `select *  from  ${tabla}  where id = $1`;
        return runBdd.runQuery(sql,database,[id])

}
export var  selectAll =  (tabla:string,database:string) =>
{
        var sql = `select *  from  ${tabla} `;
        return runBdd.runQuery(sql,database,[])
}
export var generaSQL = (texto,params) =>
{
 
    return new Function(params, "return `" + texto +"`;"); 
}

export var  selectFilter =  (tabla:string, database:string, a) =>
{
        var sql = `select *  from  ${tabla}  where ${w(a,0)}`;
        return runBdd.runQuery(sql,database,params(a))
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
        return runBdd.runQuery(sql,database,params(datos))
}


// clone objetos simples
var clone = (origen) => {
   var tmp = {};
   Object.keys(origen).map(i => tmp[i] = origen[i]);
   return tmp;    
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
        id:"aa"+Math.random()
    };
   
   var p1 = clone(prueba);

insert("p_persona","local",p1).then(i=>
{
  console.log("insert",i);
}
).then(i=>
update("p_persona","local",{id:prueba.id,telefono:"222"},prueba).then(i=>
{
  console.log("update",i);
}
))
.then(i=> {runBdd.select("p_persona","local",prueba.id).then(i=>{  console.log("select",i.rows);}) })
.then(i=> {runBdd.selectAll("p_persona","local").then(i=>{  console.log("selectAll",i.rows.length);}) })
.then(i=> {runBdd.selectFilter("p_persona","local",{id:"aa0.9668956873938441"}).then(i=>{  console.log("selectFilter",i.rows);}) })
.then(i=> {runBdd.selectFilterPagina("p_persona","local",{id:"aa0.9668956873938441"},'telefono',0,10).then(i=>{  console.log("selectFilterPagina",i.rows);}) })
;
 
        
//   await runBdd.run("opera.js","getPersona",database,[]).then(i=>
//   {
//       var a:Array<bdd.p_persona> = i;
//       console.log("resultado",a);
//   }).catch(e => {console.log(e);})
//   ;
//   console.log("despues del await")
}
exec()
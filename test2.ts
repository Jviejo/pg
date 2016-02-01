import * as runBdd from './fachada';
// funcion para probar
async function  exec()
{   
   await runBdd.run("opera.js","generaInsert","local",[]).then(i=>{
       // generación de insert table (nombres de campos separados por ,) values ($1,$2,$3,....)
      
       console.log("resultado",i );
   }).catch(e => {console.log(e);})
   ;
   console.log("despues del await")
}
exec()
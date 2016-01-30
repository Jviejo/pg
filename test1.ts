import * as runBdd from './fachada';
import * as http from 'http';

// funcion para probar
async function  handleRequest(request, response){
   response.setHeader('Content-Type', 'application/json');
   await runBdd.runQuery("select count(*) contador from p_persona ","local",[])
    .then(i=>{ 
        response.write(JSON.stringify(i.rows));
    });
    
   await runBdd.run("Operacion_f1","local",[]).then(i=>{
       response.end(JSON.stringify(i[0].rows));    
   });
}

var server = http.createServer(handleRequest);
var PORT = 3000;
server.listen(PORT, function(){
    console.log("Server listening   on: http://localhost:%s", PORT);
});
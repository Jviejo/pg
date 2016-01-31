import * as runBdd from './fachada';
import * as http from 'http';

// funcion para probar
async function  handleRequest(request, response){
   response.setHeader('Content-Type', 'application/json');
  
    
   await runBdd.run("opera.js","genera","local",[]).then(i=>{
       console.log("numero",i.length);
       response.end(JSON.stringify(i));    
   }).catch(e => {response.end(e);})
   ;
}

async function createServer()
{
    var server = http.createServer(handleRequest);
    var PORT = 3000;
    server.listen(PORT, function(){
        console.log("Server listening   on: http://localhost:%s", PORT);
    });    
}

createServer();
const WebSocket = require('ws');

const args = process.argv.reduce((acc,cur,i,arr)=>{
    if(i>1){
        acc.push(cur);
    }
    return acc;
},[]);

const is_server = args.includes("server");
const is_client =  args.includes("client");

console.log({args, is_server, is_client});

// set up server
(()=>{
    if(is_server!==true){
        return;
    }

    const wss = new WebSocket.Server({ port: 8080 });
    
    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.log('received: %s', new Date().getTime()-message);
      });
    
      ws.send('something');
    });
})();

// set up client
(()=>{
    if(is_client!==true){
        return;
    }

    const ws = new WebSocket('ws://localhost:8080');

    ws.on('open', function open() {
    ws.send(new Date().getTime());
    });

    // ws.on('message', function incoming(data) {
    //   console.log(data);
    // });
})();

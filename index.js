require("dotenv").config();

const { 
Client,
GatewayIntentBits,
ActivityType
} = require("discord.js");

const Gamedig = require("gamedig");

const config = require("./config.json");


const client = new Client({
    intents:[
        GatewayIntentBits.Guilds
    ]
});


async function checkServer(){

try {

const server = await Gamedig.query({

type:"scpsl",

host:config.ip,

port:config.port

});


let online = server.players.length;


client.user.setActivity(
`🟢 ${online}/${config.max_players}`,
{
type: ActivityType.Playing
});


console.log(
`Онлайн ${online}/${config.max_players}`
);


}

catch(e){

client.user.setActivity(
"🔴 Сервер выключен",
{
type: ActivityType.Playing
});


console.log(
"Сервер недоступен"
);

}

}



client.once("ready",()=>{

console.log(
"Бот запущен"
);


checkServer();


setInterval(
checkServer,
30000
);


});


client.login(
process.env.TOKEN
);

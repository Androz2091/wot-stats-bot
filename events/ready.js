const Discord = require('discord.js');

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        var client = this.client;

        // Logs some informations using the logger file
        this.client.logger.log("Loading a total of "+client.commands.size+" command(s).", "log");
        this.client.logger.log(client.user.tag+", ready to serve "+client.users.size+" users in "+client.guilds.size+" servers.", "ready");
        
        // Update the game every 20s
        var games = [
            {
                name:"w!help on ${servs} servers",
                type:"PLAYING"
            }
        ];
        var i = 0;
        setInterval(function(){
            client.user.setActivity(games[i].name.replace("${servs}", client.guilds.size).replace("${members}", client.users.size), {type: games[i].type});
            if(games[parseInt(i + 1, 10)]){
                i++;
            }
            else{
                i = 0;
            }
        }, 20000);
    }
};
const Discord = require('discord.js');

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        // Logs some informations using the logger file
        this.client.logger.log("Loading a total of "+this.client.commands.size+" command(s).", "log");
        this.client.logger.log(this.client.user.tag+", ready to serve "+this.client.users.size+" users in "+this.client.guilds.size+" servers.", "ready");
        
        // Update the game every 20s
        var games = [
            {
                name:"vous donner des stats WoT !",
                type:"PLAYING"
            },
            {
                name:"w!help | www.wot-stats-bot.fr",
                type:"PLAYING"
            },
            {
                name:this.client.guilds.size+" serveurs | "+this.client.users.size+" membres !",
                type:"PLAYING"
            }
        ];
        var client = this.client;
        var i = 0;
        setInterval(function(){
            client.user.setActivity(games[i].name, {type: games[i].type});
            if(games[parseInt(i + 1, 10)]){
                i++;
            }
            else{
                i = 0;
            }
        }, 20000);
    }
};
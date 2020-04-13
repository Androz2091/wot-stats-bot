const Discord = require('discord.js');

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run () {

        let client = this.client;

        // Logs some informations using the logger file
        this.client.logger.log("Loading a total of "+client.commands.size+" command(s). 👌", "log");
        this.client.logger.log(client.user.tag+", ready to serve "+client.users.cache.size+" users in "+client.guilds.cache.size+" servers.", "ready");

        // Post DBL stats
        if(this.client.config.dbl){
            const DBL = require("dblapi.js");
            const dbl = new DBL(this.client.config.dbl, this.client);
            dbl.postStats(this.client.guilds.cache.size, this.client.shard.ids[0], this.client.shard.count);
            dbl.on("posted", () => {
                client.logger.log("Server count posted to DBL!");
            });
        }
        
        // Update the game every 20s
        const games = [
            { name: "w!help on ${servs} servers", type: "PLAYING" }
        ];
        let i = 0;
        const updateActivity = () => {
            client.shard.fetchClientValues("guilds.cache.size").then((results) => {
                let count = results.reduce((prev, guildCount) => prev + guildCount, 0);
                client.user.setActivity(games[i].name.replace("${servs}", count), { type: games[i].type });
                if(games[parseInt(i + 1, 10)]) i++
                else i = 0;
            });
        };
        setInterval(updateActivity, 25000);

        if(client.shard.ids.includes(0)){
            // Load API
            const api = require("../includes/api");
            api.load(client);
        }
    }
};
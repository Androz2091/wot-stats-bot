const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Tanks extends Command {

    constructor (client) {
        super(client, {
            name: "tanks",
            description: (language) => language.get("TANKS_DESCRIPTION"),
            usage: "tanks (@member/wot-nickname)",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$tanks\n$tanks @ThibaudFvrx\n$tanks ThibaudFvrx",
            adminOnly: false
        });
    }

    async run (message, args, utils) {
        
        var client = this.client;

        message.channel.send(message.language.get("PLEASE_WAIT")).then(async (m) => {

            var ID;

            if(message.mentions.users.first()){
                if(utils.usersData[1].wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
                } else {
                    ID = utils.usersData[1].wot.account_id;
                }
            } else if(args[0]){
                // Search all accounts
                var account = await client.functions.searchAccount(args[0], client).catch((err) => {
                    return m.edit(message.language.get("ACCOUNT_NOT_FOUND", args[0]));
                });
                ID = account.account_id;
            } else if(!args[0]) {
                if(utils.usersData[0].wot === "unknow"){
                    return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
                } else {
                    ID = utils.usersData[0].wot.account_id;
                }
            };

            // Gets the stats of the user
            var stats = await client.functions.getStats(ID, client).catch((err) => {
                return message.channel.send(message.language.get("ERROR"));
            });

            // Gets the tanks of the user
            var tanks = await client.functions.getTanks(ID, client).catch((err) => {
                return message.channel.send(message.language.get("ERROR"));
            });
            

           var embed = new Discord.RichEmbed()
                .setColor(stats.wn8.color)
                .setFooter(utils.embed.footer)
                .setAuthor(stats.nickname, client.user.displayAvatarURL)
                .setDescription(message.language.get("TANKS_CHOOSE_TIER"));
            
            var msg = await m.edit(embed);
            var rCollector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

            await msg.react(client.emojis.find((e) => e.name === "E1"));
            await msg.react(client.emojis.find((e) => e.name === "E2"));
            await msg.react(client.emojis.find((e) => e.name === "E3"));
            await msg.react(client.emojis.find((e) => e.name === "E4"));
            await msg.react(client.emojis.find((e) => e.name === "E5"));
            await msg.react(client.emojis.find((e) => e.name === "E6"));
            await msg.react(client.emojis.find((e) => e.name === "E7"));
            await msg.react(client.emojis.find((e) => e.name === "E8"));
            await msg.react(client.emojis.find((e) => e.name === "E9"));
            await msg.react(client.emojis.find((e) => e.name === "E10"));

            var timeOut = setTimeout(function(){
                rCollector.stop();
            }, 60000);
            
            rCollector.on("end", (data, reason) => {
                msg.clearReactions();
                if(reason !== "OK"){
                    embed.setTitle("").setDescription(message.language.get("TANKS_TIMEOUT"));
                    msg.edit(embed);
                }
            });

            rCollector.on("collect", async (reaction) => {

                var users = await reaction.fetchUsers();
                if(!users.get(client.user.id)){
                    return;
                }
                
                rCollector.stop("OK");

                var tier = reaction._emoji.name;
                var star = client.emojis.find(e => e.name === "star");
                var toDisplay = tanks.filter(t => t.tier === parseInt(tier.substr(1, tier.length), 10)).sort( (a, b) => b.mark_of_mastery - a.mark_of_mastery);
                if(toDisplay.length < 1){
                    embed.setDescription(message.language.get("NO_TANKS", tier));
                } else {
                    toDisplay.forEach(tank => {
                        var title = (tank.is_premium ? star+" "+tank.short_name : tank.short_name);
                        embed.addField(title,
                            message.language.get("TANKS_FIELDS")[0]+tank.statistics.battles+"\n"+
                            message.language.get("TANKS_FIELDS")[1]+tank.mark_of_mastery+"\n"+
                            message.language.get("TANKS_FIELDS")[2]+tank.nation,
                            true
                        );
                    });
                    embed.setDescription("");
                }
                msg.edit(embed);
            });
        });
    }

};

module.exports = Tanks;
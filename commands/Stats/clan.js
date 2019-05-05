const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Clan extends Command {

    constructor (client) {
        super(client, {
            name: "clan",
            description: (language) => language.get("CLAN_DESCRIPTION"),
            usage: "clan (@member/clan-name)",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$clan\n$clan @ThibaudFvrx\n$clan Zira",
            owner: false
        });
    }

    async run (message, args, utils) {
        
        var client = this.client;

        message.channel.send(message.language.get("PLEASE_WAIT")).then(async m => {

            var clanID;

            if(message.mentions.users.first()){
                var data = utils.usersData[1];
                if(data.wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
                } else {
                    var clanData = await client.functions.getClan(data.wot.account_id, client).catch(err => {
                        return m.edit(message.language.get("NO_CLAN_USER", message.mentions.users.first().tag));
                    });
                    clanID = clanData.clan_id;
                }
            } else if(args[0]){
                // Search all clans
                var clanData = await client.functions.searchClan(args[0], client).catch(err => {
                    return m.edit(message.language.get("CLAN_NOT_FOUND", args[0]));
                });
                clanID = clanData.clan_id;
            } else if(!args[0]) {
                var data = utils.usersData[0];
                if(data.wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
                } else {
                    clanData = await client.functions.getClan(data.wot.account_id, client).catch(err => {
                        return m.edit(message.language.get("NO_CLAN"));
                    });
                    clanID = clanData.clan_id;
                }
            };

            // Gets the stats of the clan
            var clanStats = await client.functions.getClanStats(clanID, client);
            var clanWN8 = await client.functions.getClanWN8(clanID, clanStats.tag);
            
            console.log(clanStats);

            var embed = new Discord.RichEmbed()
                .setColor(clanWN8.color)
                .setFooter(utils.embed.footer)
                .setAuthor(clanStats.name, clanStats.emblems.x195.portal)
                .setImage(clanStats.emblems.x195.portal)
                .addField(message.language.get("CLAN_HEADERS")[0], "["+clanStats.name+"](https://eu.wargaming.net/clans/wot/"+clanID+")", true)
                .addField(message.language.get("CLAN_HEADERS")[1], "["+clanStats.creator_name+"](https://fr.wot-life.com/eu/player/"+clanStats.creator_name+"-"+clanStats.creator_id+")", true)
                .addField(message.language.get("CLAN_HEADERS")[2], message.language.printDate(new Date(clanStats.created_at*1000)), true)
                .addField(message.language.get("CLAN_HEADERS")[3], clanStats.members_count, true)
                .addField(message.language.get("CLAN_HEADERS")[4], (!clanStats.private) ? message.language.get("NO") : message.language.get("YES"), true)
                .addField(message.language.get("CLAN_HEADERS")[5], clanWN8.now, true)
                .addField(message.language.get("CLAN_HEADERS")[6], clanStats.description || message.language.get("NO_DESCRIPTION"), true);

            if(clanStats.motto) embed.setDescription(clanStats.motto);
            
            m.edit(message.language.get("CLAN_SUCCESS", clanStats.name), embed);
        });
    }

}

module.exports = Clan;
const Command = require("../../base/Command.js"),
Discord = require("discord.js");

class Profile extends Command {

    constructor (client) {
        super(client, {
            name: "profile",
            description: (language) => language.get("PROFILE_DESCRIPTION"),
            usage: "profile (@member/wot-nickname)",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["profil"],
            permission: false,
            botpermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            examples: "$profile\n$profile @ThibaudFvrx\n$profile ThibaudFvrx",
            owner: false
        });
    }

    async run (message, args, utils) {
        
        var client = this.client;

        message.channel.send(message.language.get("PLEASE_WAIT")).then(async m => {

            var ID;

            if(message.mentions.users.first()){
                var data = utils.usersData[1];
                if(data.wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
                } else {
                    ID = data.wot.account_id;
                }
            } else if(args[0]){
                // Search all accounts
                var account = await client.functions.searchAccount(args[0], client).catch(err => {
                    m.edit(message.language.get("ACCOUNT_NOT_FOUND", args[0]));
                });
                ID = account.account_id;
            } else if(!args[0]) {
                var data = utils.usersData[0];
                if(data.wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
                } else {
                    ID = data.wot.account_id;
                }
            };

            // Gets the stats of the user
            var stats = await client.functions.getStats(ID, client).catch(err => {
                return message.channel.send(message.language.get("ERROR"));
            });

            var embed = new Discord.RichEmbed()
                .setColor(stats.wn8.color)
                .setFooter(utils.embed.footer)
                .setAuthor(stats.nickname, client.user.displayAvatarURL)
                .addField(message.language.get("PROFILE_HEADERS")[0], "["+stats.nickname+"](https://fr.wot-life.com/eu/player/"+stats.nickname+"-"+ID+")", true)
                .addField(message.language.get("PROFILE_HEADERS")[1], message.language.printDate(new Date(stats.created_at*1000)), true)
                .addField(message.language.get("PROFILE_HEADERS")[2], message.language.printDate(new Date(stats.updated_at*1000)), true)
                .addField(message.language.get("PROFILE_HEADERS")[3], message.language.printDate(new Date(stats.last_battle_time*1000)), true)
                .addField(message.language.get("PROFILE_HEADERS")[4], (stats.clan_id) ? stats.clan : message.language.get("NO_CLAN"), true)
                .addField(message.language.get("PROFILE_HEADERS")[5], client.functions.percentage(stats.statistics.all.wins, stats.statistics.all.losses), true)
                .addField(message.language.get("PROFILE_HEADERS")[6], stats.wn8.now, true)
                .addField(message.language.get("PROFILE_HEADERS")[7], stats.wn8['24h'], true)
                .addField(message.language.get("PROFILE_HEADERS")[8], stats.wn8['30d'], true);

            m.edit(message.language.get("PROFILE_SUCCESS", stats.nickname), embed);
        });
    }

}

module.exports = Profile;
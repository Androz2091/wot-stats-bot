const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Profile extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "profile",
            // Displayed in the help command
            description: (language) => language.get("PROFILE_DESCRIPTION"),
            usage: (language) => language.get("PROFILE_USAGE"),
            examples: (languages) => languages.get("PROFILE_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [ "profil" ],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "User",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {
        
        var client = this.client;

        message.channel.send(message.language.get("PLEASE_WAIT")).then(async m => {

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
                if(utils.usersData[0].wot === 'unknow'){
                    return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
                } else {
                    ID = utils.usersData[0].wot.account_id;
                }
            }

            // Gets the stats of the user
            var stats = await client.functions.getStats(ID, client).catch((err) => {
                return message.channel.send(message.language.get("ERROR"));
            });

            var embed = new Discord.RichEmbed()
                .setColor(stats.wn8.color)
                .setFooter(utils.embed.footer)
                .setAuthor(stats.nickname, client.user.displayAvatarURL)
                .addField(message.language.get("PROFILE_HEADERS")[0], "["+stats.nickname+"](https://fr.wot-life.com/eu/player/"+stats.nickname+"-"+ID+")", true)
                .addField(message.language.get("PROFILE_HEADERS")[1], message.language.printDate(new Date(stats.created_at*1000)), true)
                .addField(message.language.get("PROFILE_HEADERS")[2], message.language.printDate(new Date(stats.updated_at*1000)), true)
                .addField(message.language.get("PROFILE_HEADERS")[3], (stats.last_battle_time > 0 ? message.language.printDate(new Date(stats.last_battle_time*1000)) : message.language.get("NO_BATTLES")), true)
                .addField(message.language.get("PROFILE_HEADERS")[4], (stats.clan_id) ? stats.clan.clan_tag : message.language.get("NO_CLAN1"), true)
                .addField(message.language.get("PROFILE_HEADERS")[5], (stats.statistics.all.battles > 0 ? client.functions.percentage(stats.statistics.all.wins, stats.statistics.all.battles) : message.language.get("NO_BATTLES")), true)
                .addField(message.language.get("PROFILE_HEADERS")[6], stats.wn8.now, true)
                .addField(message.language.get("PROFILE_HEADERS")[7], stats.wn8["24h"], true)
                .addField(message.language.get("PROFILE_HEADERS")[8], stats.wn8["30d"], true);

            m.edit(message.language.get("PROFILE_SUCCESS", stats.nickname), embed);
        });
    }

}

module.exports = Profile;
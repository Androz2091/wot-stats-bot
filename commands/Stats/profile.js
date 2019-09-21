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
        
        let client = this.client;

        let m = await message.channel.send(message.language.get("PLEASE_WAIT"));

        let userData;

        if(message.mentions.users.first()){
            if(utils.usersData[1].wot === "unknow"){
                return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
            } else {
                userData = utils.usersData[1].wot;
            }
        } else if(args[0]){
            let realm = client.realms.find((r) => r.name === args[0].toLowerCase() || r.aliases.includes(args[0].toLowerCase()));
            if(!realm) return m.edit(message.language.get("LINK_BAD_REALM", args[0]));
            if(!args[1]) return m.edit(message.language.get("VALID_NICKNAME"));
            userData = await client.Wargamer.findPlayer({ search: args.slice(1).join(" "), realm: args[0].toLowerCase() }).catch((err) => {
                return m.edit(message.language.get("ACCOUNT_NOT_FOUND", args.slice(1).join(" ")));
            });
        } else if(!args[0]){
            if(utils.usersData[0].wot === "unknow"){
                return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
            } else {
                userData = utils.usersData[0].wot;
            }
        }

        if(!userData) return;
        let stats = await client.Wargamer.getPlayerStats({ realm: userData.realm, ID: userData.ID }, true, false);

        let embed = new Discord.MessageEmbed()
            .setColor(stats.wn8.color)
            .setFooter(utils.embed.footer, stats.realmData.iconURL)
            .setAuthor(stats.nickname, client.user.displayAvatarURL())
            .addField(message.language.get("PROFILE_HEADERS")[0], "["+stats.nickname+"](https://fr.wot-life.com/eu/player/"+stats.nickname+"-"+userData.ID+")", true)
            .addField(message.language.get("PROFILE_HEADERS")[1], message.language.printDate(new Date(stats.created_at*1000)), true)
            .addField(message.language.get("PROFILE_HEADERS")[2], message.language.printDate(new Date(stats.updated_at*1000)), true)
            .addField(message.language.get("PROFILE_HEADERS")[3], (stats.last_battle_time > 0 ? message.language.printDate(new Date(stats.last_battle_time*1000)) : message.language.get("NO_BATTLES")), true)
            .addField(message.language.get("PROFILE_HEADERS")[4], (stats.clan_id) ? stats.clan.clan_tag : message.language.get("NO_CLAN1"), true)
            .addField(message.language.get("PROFILE_HEADERS")[5], (stats.statistics.all.battles > 0 ? client.functions.percentage(stats.statistics.all.wins, stats.statistics.all.battles) : message.language.get("NO_BATTLES")), true)
            .addField(message.language.get("PROFILE_HEADERS")[6], stats.wn8.now, true)
            .addField(message.language.get("PROFILE_HEADERS")[7], stats.wn8["24h"], true)
            .addField(message.language.get("PROFILE_HEADERS")[8], stats.wn8["30d"], true);

        m.edit(message.language.get("PROFILE_SUCCESS", stats.nickname), embed);
    }

}

module.exports = Profile;
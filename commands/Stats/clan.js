const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Clan extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "clan",
            // Displayed in the help command
            description: (language) => language.get("CLAN_DESCRIPTION"),
            usage: (language) => language.get("CLAN_USAGE"),
            examples: (languages) => languages.get("CLAN_EXAMPLES"),
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [],
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

        let clanData;

        if(message.mentions.users.first()){
            if(utils.usersData[1].wot === "unknow"){
                return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
            } else {
                let userStats = await client.Wargamer.getPlayerStats({ realm: utils.userData[1].wot.realm, ID: utils.userData[1].wot.ID }, false, false);
                if(!userStats.clan_id){
                    return m.edit(message.language.get("NO_CLAN_USER", message.mentions.users.first().tag));
                }
                clanData = { realm: utils.usersData[1].wot.realm, ID: userStats.clan_id };
            }
        } else if(args[0]){
            let realm = client.realms.find((r) => r.name === args[0].toLowerCase() || r.aliases.includes(args[0].toLowerCase()));
            if(!realm) return m.edit(message.language.get("LINK_BAD_REALM", args[0]));
            if(!args[1]) return m.edit(message.language.get("VALID_CLAN"));
            clanData = await client.Wargamer.findClan({ search: args.slice(1).join(" "), realm: args[0].toLowerCase() }).catch((err) => {
                return m.edit(message.language.get("CLAN_NOT_FOUND", args.slice(1).join(" ")));
            });
        } else if(!args[0]){
            if(utils.usersData[0].wot === "unknow"){
                return m.edit(message.language.get("NOT_LINKED", utils.guildData.prefix));
            } else {
                let userStats = await client.Wargamer.getPlayerStats({ realm: utils.usersData[0].wot.realm, ID: utils.usersData[0].wot.ID }, false, false);
                if(!userStats.clan_id){
                    return m.edit(message.language.get("NO_CLAN_USER", message.mentions.users.first().tag));
                }
                clanData = { realm: utils.usersData[0].wot.realm, ID: userStats.clan_id };
            }
        }

        if(!clanData) return;

        // Gets the stats of the clan
        let clanStats = await client.Wargamer.getClanStats({ realm: clanData.realm, ID: clanData.ID });

        let embed = new Discord.RichEmbed()
            .setColor(clanStats.wn8.color)
            .setFooter(utils.embed.footer, clanStats.realmData.iconURL)
            .setAuthor(clanStats.name, clanStats.emblems.x195.portal)
            .setImage(clanStats.emblems.x195.portal)
            .addField(message.language.get("CLAN_HEADERS")[0], "["+clanStats.name+"](https://eu.wargaming.net/clans/wot/"+clanData.ID+")", true)
            .addField(message.language.get("CLAN_HEADERS")[1], "["+clanStats.creator_name+"](https://fr.wot-life.com/eu/player/"+clanStats.creator_name+"-"+clanStats.creator_id+")", true)
            .addField(message.language.get("CLAN_HEADERS")[2], message.language.printDate(new Date(clanStats.created_at*1000)), true)
            .addField(message.language.get("CLAN_HEADERS")[3], clanStats.members_count, true)
            .addField(message.language.get("CLAN_HEADERS")[4], (!clanStats.private) ? message.language.get("NO") : message.language.get("YES"), true)
            .addField(message.language.get("CLAN_HEADERS")[5], clanStats.wn8.now, true)
            .addField(message.language.get("CLAN_HEADERS")[6], clanStats.description || message.language.get("NO_DESCRIPTION"), true);

        if(clanStats.motto){
            embed.setDescription(clanStats.motto);
        }
        
        m.edit(message.language.get("CLAN_SUCCESS", clanStats.name), embed);
    }

}

module.exports = Clan;
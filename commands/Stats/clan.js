const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

const dateAndTime = require("date-and-time");
const pattern = dateAndTime.compile('MMM D YYYY');

module.exports = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "clan",
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

        let m = await message.sendT("misc:PLEASE_WAIT", null, false, null, "loading");

        let clanData;

        if(message.mentions.users.first()){
            if(utils.usersData[1].wot === "unknow"){
                return m.error("account/unlink:NOT_LINKED_USER", {
                    user: message.mentions.users.first().tag
                }, true);
            } else {
                let userStats = await client.Wargamer.getPlayerStats({
                    realm: utils.userData[1].wot.realm,
                    ID: utils.userData[1].wot.ID
                }, false, false);
                if(!userStats.clan_id){
                    return m.error("stats/clan-stats:NO_CLAN_USER", {
                        user: message.mentions.users.first().tag
                    }, true);
                }
                clanData = {
                    realm: utils.usersData[1].wot.realm,
                    ID: userStats.clan_id
                };
            }
        } else if(args[0]){
            let realm = client.realms.find((r) => r.name === args[0].toLowerCase() || r.aliases.includes(args[0].toLowerCase()));
            if(!realm) return m.error("account/link:INVALID_REALM", {
                realm: args[0]
            }, true);
            if(!args[1]) return m.error("stats/clan-stats:MISSING_CLAN", null, true);
            clanData = await client.Wargamer.findClan({ search: args.slice(1).join(" "), realm: args[0].toLowerCase() }).catch((err) => {
                return m.error("stats/clan-stats:CLAN_NOT_FOUND", {
                    search: args.slice(1).join(" ")
                }, true);
            });
        } else if(!args[0]){
            if(utils.usersData[0].wot === "unknow"){
                return m.error("account/link:NOT_LINKED", {
                    prefix: utils.guildData.prefix
                });
            } else {
                let userStats = await client.Wargamer.getPlayerStats({
                    realm: utils.usersData[0].wot.realm,
                    ID: utils.usersData[0].wot.ID
                }, false, false);
                if(!userStats.clan_id){
                    return m.error("stats/clan-stats:NO_CLAN_USER", {
                        user: message.mentions.users.first().tag
                    }, true);
                }
                clanData = {
                    realm: utils.usersData[0].wot.realm,
                    ID: userStats.clan_id
                };
            }
        }

        if(!clanData) return;

        // Gets the stats of the clan
        let clanStats = await client.Wargamer.getClanStats({
            realm: clanData.realm,
            ID: clanData.ID
        });

        let embed = new Discord.MessageEmbed()
            .setColor(clanStats.wn8.color)
            .setFooter(utils.embed.footer, clanStats.realmData.iconURL)
            .setAuthor(clanStats.name, clanStats.emblems.x195.portal)
            .setImage(clanStats.emblems.x195.portal)
            .addField(message.translate("common:NAME"), "["+clanStats.name+"](https://eu.wargaming.net/clans/wot/"+clanData.ID+")", true)
            .addField(message.translate("stats/clan:HEADER_FOUNDER"), "["+clanStats.creator_name+"](https://fr.wot-life.com/eu/player/"+clanStats.creator_name+"-"+clanStats.creator_id+")", true)
            .addField(message.translate("stats/clan:HEADER_CREATED"), dateAndTime.format(new Date(clanStats.created_at*1000), pattern), true)
            .addField(message.translate("stats/clan:HEADER_MEMBERS"), clanStats.members_count, true)
            .addField(message.translate("stats/clan:HEADER_PRIVATE"), (!clanStats.private) ? message.translate("common:NO") : message.translate("common:YES"), true)
            .addField(message.translate("stats/clan:HEADER_WN8"), clanStats.wn8.now, true)
            .addField(message.translate("stats/clan:HEADER_DESCRIPTION"), clanStats.description || message.translate("stats/clan:NO_DESCRIPTION"), true);

        if(clanStats.motto){
            embed.setDescription(clanStats.motto);
        }
        
        message.channel.send(message.translate("CONTENT", {
            name: clanStats.name
        }), embed);
    }

};

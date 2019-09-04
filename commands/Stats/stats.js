const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

class Stats extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "stats",
            // Displayed in the help command
            description: (language) => language.get("STATS_DESCRIPTION"),
            usage: (language) => language.get("STATS_USAGE"),
            examples: (languages) => languages.get("STATS_EXAMPLES"),
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

        let userData;

        if(message.mentions.users.first()){
            if(utils.usersData[1].wot === "unknow"){
                return m.edit(message.language.get("NOT_LINKED_USER", message.mentions.users.first()));
            } else {
                userData = utils.usersData[1].wot;
            }
        } else if(args[0]){
            let realm = client.realms.find((r) => r.name === args[0] || r.aliases.includes(args[0]));
            if(!realm) return m.edit(message.language.get("LINK_BAD_REALM", args[0]));
            if(!args[1]) return m.edit(message.language.get("VALID_NICKNAME"));
            userData = await client.Wargamer.findPlayer({ search: args.slice(1).join(" "), realm: args[0] }).catch((err) => {
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
        let stats = await client.Wargamer.getPlayerStats({ realm: userData.realm, ID: userData.ID }, true);
            
        let embed = new Discord.RichEmbed()
            .setColor(stats.wn8.color)
            .setFooter(utils.embed.footer, stats.realmData.iconURL)
            .setAuthor(stats.nickname, client.user.displayAvatarURL)
            .addField(message.language.get("STATS_HEADERS")[0], "["+stats.nickname+"](https://fr.wot-life.com/eu/player/"+stats.nickname+"-"+userData.ID+")", true)
            .addField(message.language.get("STATS_HEADERS")[1], stats.statistics.all.battles, true)
            .addField(message.language.get("STATS_HEADERS")[2], stats.statistics.all.wins, true)
            .addField(message.language.get("STATS_HEADERS")[3], stats.statistics.all.losses, true)
            .addField(message.language.get("STATS_HEADERS")[4], stats.statistics.all.draws, true)
            .addField(message.language.get("STATS_HEADERS")[5], stats.statistics.all.survived_battles, true)
            .addField(message.language.get("STATS_HEADERS")[6], client.functions.percentage(stats.statistics.all.survived_battles, stats.statistics.all.battles), true)
            .addField(message.language.get("STATS_HEADERS")[7], client.functions.percentage(stats.statistics.all.wins, stats.statistics.all.battles), true)
            .addField(message.language.get("STATS_HEADERS")[8], stats.wn8.now, true)
            .addField(message.language.get("STATS_HEADERS")[9],
                message.language.get("STATS_FIELDS").total[0]+stats.statistics.all.damage_received+"\n"+
                message.language.get("STATS_FIELDS").total[1]+stats.statistics.all.damage_dealt+"\n"+
                message.language.get("STATS_FIELDS").total[2]+stats.statistics.all.frags+"\n"+
                message.language.get("STATS_FIELDS").total[3]+stats.statistics.all.shots,
                true
            )
            .addField(message.language.get("STATS_HEADERS")[10],
                message.language.get("STATS_FIELDS").max[0]+stats.statistics.all.max_frags+"\n"+
                message.language.get("STATS_FIELDS").max[1]+stats.statistics.all.max_damage,
                true
            )
            .addField(message.language.get("STATS_HEADERS")[11],
                message.language.get("STATS_FIELDS").wn8[0]+stats.wn8["24h"]+"\n"+
                message.language.get("STATS_FIELDS").wn8[1]+stats.wn8["7d"]+"\n"+
                message.language.get("STATS_FIELDS").wn8[2]+stats.wn8["30d"],
                true
            );

        m.edit(message.language.get("STATS_SUCCESS", stats.nickname), embed);
    }

}

module.exports = Stats;
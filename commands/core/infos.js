const Command = require("../../structures/Command.js"),
Discord = require("discord.js");

module.exports = class extends Command {

    constructor (client) {
        super(client, {
            // The name of the command
            name: "infos",
            // The name of the command folder, to detect the category
            dirname: __dirname,
            // Whether the command is enabled
            enabled: true,
            // The command aliases
            aliases: [ "info" ],
            // The required permissions (for the bot) to execute the command
            clientPermissions: [ "EMBED_LINKS" ],
            // The level required to execute the command
            permLevel: "User",
            // The command cooldown
            cooldown: 2000
        });
    }

    async run (message, args, utils) {

        let guildsCounts = await this.client.shard.fetchClientValues("guilds.cache.size");
        let guildsCount = guildsCounts.reduce((p, count) => p+count);
        let usersCounts = await this.client.shard.fetchClientValues("users.cache.size");
        let usersCount = usersCounts.reduce((p, count) => p+count);
        
        let results = await this.client.shard.broadcastEval(`
            [
                Math.round((process.memoryUsage().heapUsed / 1024 / 1024)),
                this.guilds.cache.size,
                this.shard.ids[0],
                Math.round(this.ws.ping)
            ]
        `);

        let embed = new Discord.MessageEmbed()
            .setColor(utils.embed.color)
            .setFooter(utils.embed.footer)
            .setAuthor(message.translate("core/infos:TITLE"))
            .setDescription(message.translate("core/infos:TITLE_CREDITS"))        
            .addField(message.translate("core/infos:TITLE_STATS"), message.translate("core/infos:CONTENT_STATS", {
                servers: guildsCount,
                users: usersCount
            }), true)
            .addField(message.translate("core/infos:TITLE_VERSION", {
                discord: Discord.version,
                node: process.versions.node
            }), true)
            .addField(message.translate("core/infos:TITLE_LINKS"), message.translate("core/infos:CONTENT_LINKS"))
            .addField("\u200B", "\u200B");
            const emojis = this.client.config.emojis;
            results.forEach((shard) => {
                const title = emojis.success + (this.client.shard.ids.includes(shard[2]) ? " Shard ("+message.translate("common:CURRENT")+") #"+(shard[2]+1) : " Shard #"+(shard[2]+1));
                embed.addField(title, message.translate("core/infos:SHARD", {
                    ram: shard[0],
                    servers: shard[1],
                    ping: shard[3]
                }), true);
            });


            message.channel.send(embed);
        
    }

};

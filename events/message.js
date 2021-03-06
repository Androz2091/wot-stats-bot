var Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run (message) {
    
        let client = this.client;
        
        if(message.author.bot || !message.guild) return;
        if(message.guild && !message.member) await message.guild.fetchMember(message.author.id);

        // utils object : to easly access to some variables
        const utils = {
            embed: {
                color: this.client.config.embed.color,
                footer: this.client.config.embed.footer
            },
            guildData: {
                lang: this.client.config.defaultLanguage,
                prefix: ""
            }
        };

        // Creates a profile for each users (the message author and the users mentionned)
        var users = [message.author].concat(message.mentions.users.array());
        utils.usersData = this.client.functions.getUsersData(users, this.client);
        utils.guildData = this.client.functions.getGuildData(message.guild, this.client);
        message.guild.language = utils.guildData.lang;

        // Checks if the bot was mentioned, with no message after it, returns the prefix.
        if(message.content.match(new RegExp(`^<@!?${this.client.user.id}>( |)$`))){
            return message.sendT("misc:PREFIX", {
                author: message.author.toString(),
                prefix: utils.guildData.prefix
            });
        }

        if(!message.content.startsWith(utils.guildData.prefix)) return;
        const args = message.content.slice(utils.guildData.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if(!cmd) return;

        // Check bot permissions
        const neededPermissions = [];
        cmd.conf.clientPermissions.forEach((perm) => { 
            if(!message.channel.permissionsFor(message.guild.me).has(perm)){
                neededPermissions.push(perm); 
            }
        });
        if(neededPermissions.length > 0){
            return message.error("misc:BOT_MISSING_PERMISSIONS", {
                permissions: neededPermissions.map((p) => p).join(", ")
            });
        }

        /* Command disabled */
        if(!cmd.conf.enabled){
            return message.error("misc:COMMAND_DISABLED");
        }

        /* User permissions */
        const permLevel = await client.getLevel(message);
        if(permLevel < client.levelCache[cmd.conf.permLevel]){
            return message.error("misc:USER_MISSING_PERMISSIONS", {
                level: cmd.conf.permLevel
            });
        }

        utils.cmd = cmd;

        // send logs
        client.logger.log(message.author.username+ " ("+message.author.id+") ran command "+cmd.help.name, "cmd");
        let embed = JSON.stringify(new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor("#DDA0DD")
            .setDescription(message.author.username+" a effectué la commande **"+cmd.help.name+"** sur **"+message.guild.name+"**"));
        embed = embed.replace(new RegExp("'"), "\\'");
        client.shard.broadcastEval(`
            let embed = JSON.parse('${embed}');
            let channel = this.channels.cache.get(this.config.supportGuild.commandsLogs);
            if(channel){
                channel.send({ embed });
                true;
            } else false;
        `);

        // run the command
        cmd.run(message, args, utils);

        if(!client.databases[2].get("commands")) client.databases[2].set("commands", []);
        client.databases[2].push("commands", {name:cmd.help.name,date:Date.now()});

    }
};
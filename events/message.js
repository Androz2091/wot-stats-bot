module.exports = class {
    constructor (client) {
        this.client = client;
    }

    async run (message) {

        // If the messagr author is a bot
        if(message.author.bot){
            return;
        }

        // If the member on a guild is invisible or not cached, fetch them.
        if(message.guild && !message.member){
            await message.guild.fetchMember(message.author.id);
        }

        // utils object : to easly access to some variables
        var utils = { 
            embed:{
                color:this.client.config.embed.color,
                footer:this.client.config.embed.footer
            },
            guildData:{
                lang:this.client.config.defaultLanguage,
                prefix:''
            }
        };

        // Creates a profile for each users (the message author and the users mentionned)
        var users = [message.author].concat(message.mentions.users.array());
        utils.usersData = this.client.functions.getUsersData(users, this.client);
        
        // if the message comes from direct messages
        if(message.channel.type === "dm"){
            // gets the default language
            message.language = new(require("../languages/"+this.client.config.defaultLanguage+".js"));
            // Gets the args of the message 
            let args = message.content.trim().split(/ +/g);
            // Gets the command
            let command = args.shift().toLowerCase();
            // Search the command in the commands and aliases collections
            let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            // if the command wasn't found
            if(!cmd){
                return message.channel.send(message.language.get("COMMAND_NOT_FOUND", command));
            }
            // if the command is unavailable via dm
            if(cmd.conf.guildOnly){
                return message.channel.send(message.language.get("DM_COMMAND_UNAVAILABLE"));
            }
            utils.cmd = cmd;
            // log in the console
            this.client.logger.log(message.author.username + " ("+message.author.id+") ran command "+cmd.help.name+" in DM", "cmd");
            // Run the command
            return cmd.run(message, args, utils);
        }

        // Gets the guild data
        utils.guildData = this.client.functions.getGuildData(message.guild, this.client);

        // gets the language of the guild
        message.language = new(require("../languages/"+utils.guildData.lang+".js"));

        // Checks if the bot was mentioned, with no message after it, returns the prefix.
        let prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
        if(message.content.match(prefixMention)){
            return message.reply(message.language.get('PREFIX_INFO', utils.guildData.prefix));
        }

        // Gets the message prefix
        var prefixes = [
            utils.guildData.prefix,
            `<@${this.client.user.id}> `,
            `<@!${this.client.user.id}> `,
            `<@?${this.client.user.id}> `
        ];
        var prefix;
        prefixes.forEach(p => {
            if(message.content.startsWith(p)) prefix = p;
        });
        if(!prefix){
            return;
        }

        // If the message content is "w!stats @Androz", the args will be : [ "pay", "@Androz" ]
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        // The command will be : "stats" and the args : [ "@Androz" ]
        const command = args.shift().toLowerCase();

        // Gets the command
        let cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

        // If no command found, return;
        if (!cmd) return;

        // Check bot permissions
        var neededPermission = [];
        cmd.conf.botpermissions.forEach(perm => { 
            if(!message.channel.permissionsFor(message.guild.me).has(perm)){
                neededPermission.push(perm); 
            }
        });
        if(neededPermission.length > 0){
            return message.channel.send(message.language.get('MISSING_BOT_PERMS', neededPermission.map(p => p).join(', ')));
        }

        // if only the owner can execute the command
        if(cmd.conf.owner && message.author.id !== this.client.config.owner){
            return message.channel.send(message.language.get('OWNER_ONLY'));
        }

        // check user permission
        if(cmd.conf.permission){
            if(!message.channel.permissionsFor(message.member).has(cmd.conf.permission)){
                return message.channel.send(message.language.get('MISSING_PERMS', cmd.conf.permission));
            }
        }

        utils.cmd = cmd;

        // log in the console
        this.client.logger.log(message.author.username+ " ("+message.author.id+") ran command "+cmd.help.name, "cmd");

        // run the command
        cmd.run(message, args, utils);

    }
}
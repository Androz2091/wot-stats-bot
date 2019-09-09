const { Client, Collection } = require("discord.js"),
path = require("path"),
Quickdb = require("quick.db");
Quickdb.init("./wot.sqlite");

// Creates new class
class Wot extends Client {

    constructor (options) {
        super(options);
        this.config = require("../config.js"); // Load the config file
        this.commands = new Collection(); // Creates new commands collection
        this.aliases = new Collection(); // Creates new command aliases collection
        this.logger = require("../includes/logger.js"); // Load the logger file
        this.wait = require("util").promisify(setTimeout); // client.wait(1000) - Wait 1 second
        this.functions = require("../includes/functions.js"); // Load the functions file
        this.databases = [ // Create tables (quick.db)
            new Quickdb.Table("users"),
            new Quickdb.Table("guilds"),
            new Quickdb.Table("commands")
        ];
        this.realms = require("../includes/realms.json");
    };

    // This function is used to load a command and add it to the collection
    loadCommand (commandPath, commandName) {
        try {
            const props = new (require("."+commandPath+path.sep+commandName))(this);
            props.conf.location = commandPath;
            if (props.init){
                props.init(this);
            }
            this.commands.set(props.help.name, props);
            props.conf.aliases.forEach((alias) => {
                this.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return "Unable to load command "+commandName+": "+e;
        }
    }

    // This function is used to unload a command (you need to load them again)
    async unloadCommand (commandPath, commandName) {
        let command;
        if (this.commands.has(commandName)) {
            command = this.commands.get(commandName);
        } else if (this.aliases.has(commandName)){
            command = this.commands.get(this.aliases.get(commandName));
        }
        if (!command){
            return "The command "+commandName+" doesn't seem to exist, nor is it an alias. Try again!";
        }
        if (command.shutdown){
            await command.shutdown(this);
        }
        delete require.cache[require.resolve("."+commandPath+path.sep+commandName+".js")];
        return false;
    }

    getLevel(message) {
        let permlvl = 0;
        const permOrder = this.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);
        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if(currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    }

}

module.exports = Wot;
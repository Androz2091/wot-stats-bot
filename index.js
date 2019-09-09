const { promisify } = require("util"),
fs = require("fs"),
readdir = promisify(require("fs").readdir);

// Creates new client
const Wot = require("./structures/Client"),
client = new Wot();

const init = async () => {

    // Search for all commands
    let directories = await readdir("./commands/");
    directories.forEach(async (dir) => {
        let commands = await readdir("./commands/"+dir+"/");
        commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
            const response = client.loadCommand("./commands/"+dir, cmd);
            if(response){
                client.logger.log(response, "error");
            }
        });
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    client.logger.log(`Loading a total of ${evtFiles.length} events. 👌`, "log");
    evtFiles.forEach((file) => {
        const eventName = file.split(".")[0];
        const event = new (require(`./events/${file}`))(client);
        client.on(eventName, (...args) => event.run(...args));
        delete require.cache[require.resolve(`./events/${file}`)];
    });

    // Gets commands permission
	client.levelCache = {};
	for (let i = 0; i < client.config.permLevels.length; i++) {
		const thisLevel = client.config.permLevels[parseInt(i, 10)];
		client.levelCache[thisLevel.name] = thisLevel.level;
    }

    const Wargamer = require("./includes/Wargamer");
    client.Wargamer = new Wargamer(client.config.wargaming);

    client.login(client.config.token); // Log to the discord api

};

init();

// if there are errors, log them
client.on("disconnect", () => client.logger.warn("Bot is disconnecting..."))
    .on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
    .on("error", (e) => client.logger.error(e))
    .on("warn", (info) => client.logger.warn(info));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
    console.error("Uncaught Promise Error: ", err);
});
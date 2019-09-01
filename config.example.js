module.exports = {
    token:              "your discord bot token",
    defaultLanguage:    "the default language of the bot",
    embed: {
        color:          "#FF0000",
        footer:         "World of Tanks Stats | Open source"
    },
    owners:             [ "array", "of", "owner", "ids" ],
    prefix:             "w!",
    wargaming:          "wargaming API key",
    supportGuild: {
        ID:             "ID of the support server",
        suggestions:    "ID of the suggestion channel",
        serversLogs:    "ID of the servers logs channel",
        commandsLogs:   "ID of the commands logs channels"
    },
    emojis: {
        success:        "Emoji string",
        error:          "Emoji string",
        loading:        "Emoji string",
        warn:           "Emoji string",
        stats:          "Emoji string",
    },
    dbl:                "Discordbots API Key",
    permLevels: [
		{ level: 0, name: "User", check: () => true, },
		{ level: 1, name: "Mod", check: (message) => (message.guild ? message.member.hasPermission("MANAGE_MESSAGES") : false), },
		{ level: 2, name: "Admin", check: (message) => (message.guild ? message.member.hasPermission("ADMINISTRATOR") : false), },
		{ level: 3, name: "Owner", check: (message) => (message.guild ? message.author.id === message.guild.ownerID : false), },
		{ level: 4, name: "Mega", check: (message) => message.client.config.owners.some((o) => o === message.author.id), },
    ]
};
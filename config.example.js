module.exports = {
    token:"Your DiscordBot Token", // Your discord bot token (https://discordapp.com/developers/applications/)
    defaultLanguage:"en", // The default language for new guilds and in direct messages (en or fr)
    embed:{
        color:"#FF0000", // The color for the rich embeds
        footer:"World of Tanks Stats | Open source" // The footer for the rich embeds
    },
    admins:["adminID","adminID"], // An array of bot owners discord ID
    prefix:"w!", // The default prefix for new guilds
    wargaming:"xxxxxxxxxx", // Your wargaming API key (https://eu.wargaming.net/id/signin)
    supportGuild: {
        ID:"xxxxxxxxxx", // The ID of your support guild
        suggestions:"xxxxxxxxxx", // The channel ID for suggestions
        serversLogs:"xxxxxxxxxx", // The channel ID for servers logs (new guilds)
        commandsLogs:"xxxxxxxxxx" // The channel ID for commands logs
    },
    emojis:{
        success:"<:success:575371114453139476>",
        error:"<:error:575371154999476224>",
        loading:"<a:loading:575370909087694849>",
        warn:"<:warn:575370981225398292>",
        stats:"<:stats:575371695746187314>"
    }
};
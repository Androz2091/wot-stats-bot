const Discord = require('discord.js');

module.exports = {

    /**
     * Creates a default configuration for the guild.
     * @param {object} guild The guild for which the configuration will be created
     * @param {object} client The Discord client
     */
    createGuild: function(guild, client){
        client.databases[1].set(guild.id, {
            prefix:client.config.prefix, // the prefix of the guild
            lang:client.config.defaultLanguage // the language of the guild
        });
        return client.databases[1].get(guild.id);
    },

    
}
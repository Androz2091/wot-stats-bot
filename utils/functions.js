const Discord = require('discord.js');

module.exports = {

    /**
     * Returns guild data or creates a default configuration for it
     * 
     * @param {object} guild A Discord guild
     * @param {object} client The Discord client
     * 
     * @return {object} The guild configuration
     */
    getGuildData: function(guild, client){
        // try to get the guild configuration
        var guildData = client.databases[1].get(guild.id);
        // if a configuration was found
        if(guildData){
            return guildData; // return the guild data
        } else {
            client.databases[1].set(guild.id, {
                prefix:client.config.prefix, // the prefix of the guild
                lang:client.config.defaultLanguage // the language of the guild
            });
            return client.databases[1].get(guild.id); // return the guild data
        }
        // Log in the console
        client.logger.log("Guild "+guild.name+" registered ! ID : "+guild.id);
    },

    /**
     * Returns user data or creates a profile for them
     * 
     * @param {array} users An array of Discord users
     * @param {object} client The Discord client
     * 
     * @return {array} The array of users profiles
     */
    getUsersData: function(users, client){
        var usersData = [];
        users.forEach(user => {
            // Try to get the profile of the user
            var userData = client.databases[0].get(user.id);
            // if the profile was found
            if(userData){
                usersData.push(userData);
            } else {
                // else creates a new account for the user
                client.databases[0].set(user.id, {
                    wot:'unknow', // The wot nickname
                    registeredAt:Date.now()
                });
                usersData.push(client.databases[0].get(user.id));
            }
        });
        return usersData; // the array of profiles
        // Log in the console
        client.logger.log("User "+user.username+" registered ! ID : "+user.id);
    }

    
}
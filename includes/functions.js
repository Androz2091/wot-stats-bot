const Discord = require("discord.js");
const fetch = require("node-fetch");
const tabletojson = require("tabletojson");

var vInfos = [];

module.exports = {

    /**
     * Returns guild data or creates a default configuration for it
     * 
     * @param {object} guild A Discord guild
     * @param {object} client The Discord client
     * 
     * @returns {object} The guild configuration
     */
    getGuildData(guild, client){
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
     * @returns {array} The array of users profiles
     */
    getUsersData(users, client){
        var usersData = [];
        users.forEach((user) => {
            // Try to get the profile of the user
            var userData = client.databases[0].get(user.id);
            // if the profile was found
            if(userData){
                usersData.push(userData);
            } else {
                // else creates a new account for the user
                client.databases[0].set(user.id, {
                    wot:"unknow", // The wot nickname
                    registeredAt:Date.now(),
                    id:user.id
                });
                usersData.push(client.databases[0].get(user.id));
            }
        });
        return usersData; // the array of profiles
        // Log in the console
        client.logger.log("User "+user.username+" registered ! ID : "+user.id);
    },

    /**
     * Gets the link of a Discord server
     * 
     * @param {object} guild The Discord server
     * @param {object} opt The options for create the invite
     * @param {object} client The Discord Client
     * 
     * @returns {string} The invite URL
     */
    async getInviteURL(guild, opt, client){
        return new Promise(async function(resolve, reject) {
            var channel = guild.channels.filter(ch => ch.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE")).first();
            if(channel){
                var invite = await channel.createInvite(opt || {}).catch(err => {
                    return reject("An error occurenced");
                });
                return resolve(invite.url);
            } else {
                return reject("Cannot create invite, missing permission.");
            }
        });
    },

    /**
     * Gets the percentage between two numbers
     * 
     * @param {number} nb1 The first number
     * @param {number} nb2 The second number
     * 
     * @returns {string} The percentage
     */
    percentage(nb1, nb2){
        nb1 = parseInt(nb1, 10);
        nb2 = parseInt(nb2, 10);
        var result = Math.round((nb1 * 100) / nb2);  
        return (String(result) + "%");
    },

    /**
     * Fetch an url and returns a json
     * 
     * @param {string} url The url to fetch
     * 
     * @returns {object} The json
     */
    async get(url){
        return new Promise(async function(resolve, reject) {
            var res = await fetch(encodeURI(url));
            var json = await res.json();
            if(!json){
                return reject("No value returned");
            }
            resolve(json.data);
        });
    }
};
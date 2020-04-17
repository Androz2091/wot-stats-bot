const Discord = require("discord.js");
const fetch = require("node-fetch");

const tabletojson = require("tabletojson").Tabletojson;

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
            if(guildData.language === "en"){
                client.databases[1].set(`${guild.id}.language`, "en-US");
            } else if(guildData.language === "fr"){
                client.databases[1].set(`${guild.id}.language`, "fr-FR");
            }
            return guildData; // return the guild data
        } else {
            client.databases[1].set(guild.id, {
                prefix:client.config.prefix, // the prefix of the guild
                lang: "en-US" // the language of the guild
            });
            // Log in the console
            client.logger.log("Guild "+guild.name+" registered ! ID : "+guild.id);
            return client.databases[1].get(guild.id); // return the guild data
        }
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
                // Log in the console
                client.logger.log("User "+user.username+" registered ! ID : "+user.id);
            }
        });
        return usersData; // the array of profiles
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
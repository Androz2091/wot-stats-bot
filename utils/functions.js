const Discord = require("discord.js");
const fetch = require("node-fetch");
const tabletojson = require('tabletojson');

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
     * Send back the found account with the nickname
     * 
     * @param {string} nickname The nickname
     * @param {object} client The Discord client
     * 
     * @return {object} The account found
     */
    searchAccount: async function(nickname, client){
        return new Promise(async function(resolve, reject) {
            if(!nickname.match(/^[0-9a-zA-Z\s]+$/)) return reject("Nickname must contains only alphanumeric characters");
            var nicknames = await client.functions.get("https://api.worldoftanks.eu/wot/account/list/?application_id="+client.config.wargaming+"&search="+nickname);
            if(nicknames.length < 1){
                reject("No account found");
            } else {
                resolve(nicknames[0]);
            }
        });
    },

    /**
     * Gets the stats of a player
     * 
     * @param {string} id The id of the player
     * @param {object} client The Discord client
     *
     * @return {object} The stats of the player
     */
    getStats: async function(id, client, language){
        return new Promise(async function(resolve, reject) {
            var stats = null;
            var data = await client.functions.get("https://api.worldoftanks.eu/wot/account/info/?application_id="+client.config.wargaming+"&account_id="+id);
            stats = data[id];
            if(stats.clan_id){
                var data = await client.functions.get("https://api.worldoftanks.eu/wot/stronghold/claninfo/?application_id="+client.config.wargaming+"&clan_id="+stats.clan_id);
                stats.clan = data[stats.clan_id];
            }
            stats.wn8 = await client.functions.getWN8(id, stats.nickname, client);
            resolve(stats);
        });
    },

    /**
     * Returns the wn8 stats of the player
     * 
     * @param {string} id The ID of the player
     * @param {string} nickname The nickname of the player
     * @param {object} client The Discord Client
     * 
     * @return {object} The wn8 stats
     */
    getWN8: async function(id, nickname, client){
        return new Promise(function(resolve, reject) {

            // Convert html table to json
            tabletojson.convertUrl("https://wot-life.com/eu/player/"+nickname+"-"+id+"/", function(tablesAsJson) {

                var stats = {
                    now: parseInt(tablesAsJson[0][tablesAsJson[0].length-1].WN8),
                    '24h': parseInt(tablesAsJson[0][tablesAsJson[0].length-1]["Past 24 hours"]),
                    '7d': parseInt(tablesAsJson[0][tablesAsJson[0].length-1]["Past 7 days"]),
                    '30d': parseInt(tablesAsJson[0][tablesAsJson[0].length-1]["Past 30 days"]),
                    color:null
                };

                // gets the color of the wn8
                if(stats.now < 300) stats['color'] = '#000000';
                else if(stats.now > 300 && stats.now < 599) stats['color'] = '#cd3333';
                else if(stats.now > 600 && stats.now < 899) stats['color'] = '#d77900';
                else if(stats.now > 900 && stats.now < 1249) stats['color'] = '#d7b600';
                else if(stats.now > 1250 && stats.now < 1599) stats['color'] = '#6d9521';
                else if(stats.now > 1600 && stats.now < 1899) stats['color'] = '#4c762e';
                else if(stats.now > 1900 && stats.now < 2349) stats['color'] = '#4a92b7';
                else if(stats.now > 2350 && stats.now < 2899) stats['color'] = '#83579d';
                else if(stats.now > 2899) stats['color'] = '#5a3175';

                resolve(stats);
            });
        });
    },

    /**
     * Gets the percentage between two numbers
     * 
     * @param {number} nb1 The first number
     * @param {number} nb2 The second number
     * 
     * @return {string} The percentage
     */
    percentage: function(nb1, nb2){
        nb1 = parseInt(nb1, 10);
        nb2 = parseInt(nb2, 10);
        var result = Math.round(result = (nb2 * 100) / nb1);  
        return (String(result) + "%");
    },

    /**
     * Fetch an url and returns a json
     * 
     * @param {string} url The url to fetch
     * 
     * @return {object} The json
     */
    get: async function(url){
        return new Promise(async function(resolve, reject) {
            var res = await fetch(encodeURI(url));
            var json = await res.json();
            if(!json) return reject("No value returned");
            resolve(json.data);
        });
    }
};
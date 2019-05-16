const Discord = require("discord.js");
const fetch = require("node-fetch");
const tabletojson = require('tabletojson');

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
     * @returns {array} The array of users profiles
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
     * @returns {object} The account found
     */
    searchAccount: async function(nickname, client){
        return new Promise(async function(resolve, reject) {
            if(!nickname.match(/^[0-9a-zA-Z\s_]+$/)) return reject("Nickname must contains only alphanumeric characters");
            var nicknames = await client.functions.get("https://api.worldoftanks.eu/wot/account/list/?application_id="+client.config.wargaming+"&search="+encodeURIComponent(nickname));
            if(nicknames.length < 1){
                reject("No account found");
            } else {
                resolve(nicknames[0]);
            }
        });
    },

    /**
     * Send back the found clan with the name
     * 
     * @param {sring} name Tha clan name
     * @param {object} client The Discord client
     * 
     * @returns {object} The clan found
     */

    searchClan: async function(name, client){
        return new Promise(async function(resolve, reject) {
            if(!name.match(/^[0-9a-zA-Z \s]+$/)) return reject("Name must contains only alphanumeric characters or spaces");
            var clans = await client.functions.get("https://api.worldoftanks.eu/wgn/clans/list/?application_id="+client.config.wargaming+"&search="+name);
            if(clans.length < 1){
                reject("No account found");
            } else {
                resolve(clans[0]);
            }
        });
    },

    /**
     * Gets the ID of the clan of a player 
     * 
     * @param {string} id The ID of the player
     * @param {object} client The Discord client
     * 
     * @returns {object} The ID of the clan of the player 
     */
    getClan: async function(id, client){
        return new Promise(async function(resolve, reject) {
            // Gets the clan ID 
            var data = await client.functions.get("https://api.worldoftanks.eu/wot/account/info/?application_id="+client.config.wargaming+"&account_id="+id);
            if(!data[id].clan_id){
                return reject("No clan");
            }
            resolve({clan_id:data[id].clan_id});
        });
    },

    /**
     * Gets the stats of a clan
     * 
     * @param {string} id The id of the clan
     * @param {object} client The Discord client
     * 
     * @returns {object} The stats of the clan
     */
    getClanStats: async function(id, client){
        return new Promise(async function(resolve, reject) {
            var clanData = await client.functions.get("https://api.worldoftanks.eu/wgn/clans/info/?application_id="+client.config.wargaming+"&clan_id="+id);
            clanData = clanData[id];
            var clanStats = await client.functions.get("https://api.worldoftanks.eu/wot/stronghold/claninfo/?application_id="+client.config.wargaming+"&clan_id="+id);
            clanStats = clanStats[id];
            resolve({...clanData, ...clanStats});
        });
    },

    /**
     * Gets clan WN8
     * 
     * @param {string} id The ID of the clan
     * @param {string} name The name of the clan
     * 
     * @returns {object} The WN8 stats of the clan
     */
    getClanWN8: async function(id, name){
        return new Promise(function(resolve, reject) {

            // Convert html table to json
            tabletojson.convertUrl("https://wot-life.com/eu/clan/"+name+"-"+id+"/", function(tablesAsJson) {

                var stats = {
                    now: parseInt(tablesAsJson[0][1].Total),
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
     * Gets the stats of a player
     * 
     * @param {string} id The id of the player
     * @param {object} client The Discord client
     *
     * @returns {object} The stats of the player
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
     * @returns {object} The wn8 stats
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
     * Gets the list of the vehicules of a player
     * 
     * @param {id} id the id of the player
     * @param {object} client The Discord Client
     * 
     * @returns {array} An array of the player vehicules
     */
    getTanks: async function(id, client){
        return new Promise(async function(resolve, reject) {
            var vehicules = await client.functions.get("https://api.worldoftanks.eu/wot/account/tanks/?application_id="+client.config.wargaming+"&account_id="+id);
            vehicules = vehicules[id];
            var vehiculesList = await client.functions.getTanksInfos(vehicules, client);
            resolve(vehiculesList);
        });
    },
    
    /**
     * Gets the information for vehicules
     * 
     * @param {array} vehicules The vehicules
     * @param {object} client The Discord Client
     * 
     * @returns {array} An array with the vehicules infos
     */
    getTanksInfos: async function(vehicules, client){
        return new Promise(async function(resolve, reject) {
            vInfos = [];
            var i = 0;
            var interval = setInterval(getInfos, 51, client, vehicules);

            async function getInfos(client, vehicules){
                i++;
                if(!vehicules[i]){
                    clearInterval(interval);
                    return resolve(vInfos);
                }
                var v = vehicules[i];
                var infos = await client.functions.get("https://api.worldoftanks.ru/wot/encyclopedia/vehicles/?application_id="+client.config.wargaming+"&tank_id="+v.tank_id);
                vInfos.push({...infos[v.tank_id], ...v});
            }
                
        });
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
    getInviteURL: async function(guild, opt, client){
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
    percentage: function(nb1, nb2){
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
    get: async function(url){
        return new Promise(async function(resolve, reject) {
            var res = await fetch(encodeURI(url));
            var json = await res.json();
            if(!json) return reject("No value returned");
            resolve(json.data);
        });
    }
};
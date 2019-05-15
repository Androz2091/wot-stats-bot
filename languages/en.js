var e = require("../config.js").emojis,
data = {
	owner:"ThibaudFvrx ⚓#8291",
	lang:"en"
}

// This class is used to store languages strings

module.exports = class {
    constructor(...args) {
		this.language = {

			// UTILS
			WELCOME:"Welcome",
			PREFIX_INFO: (prefix) => "My prefix on this server is `"+prefix+"` !",
			NO_CLAN: "No clan",
			YES:"Yes",
			NO:"No",
			NO_DESCRIPTION:"No description",
			WINS:"wins",
            NO_RECENT_BATTLE: "No recent battles",
			PAGE: "Page",
			MEMBERS: "Members",
			TOTAL_SERVERS:"Total servers",

			// ERROR MESSAGE
			COMMAND_NOT_FOUND: (cmd) => "No commands found for `"+cmd+"` !",
			DM_COMMAND_UNAVAILABLE: e.error+" | This command is not available in private messages. Join a server to run it!",
			MISSING_BOT_PERMS: (perms) => e.error+" | I am missing the following permissions to perform this command: "+perms,
			ADMIN_ONLY: e.error+" | Only bots administrators can execute this command!",
			MISSING_PERMS: (perm) => e.error+" | This command requires permission `"+perm+"` !",
			NOT_LINKED: (prefix) => e.error+" | You currently have no linked accounts! Please link one with `"+prefix+"link [nickname]` !",
			NOT_LINKED_USER: (user) => e.error+" | **"+user.tag+"** has no WoT account linked!",
			ACCOUNT_NOT_FOUND: (nickname) => e.error+" | No accounts found for `"+nickname+"` !",
			PLEASE_WAIT: e.loading+" | Please wait...",
			ERROR: e.error+" | An error has occurred.... If it happens again, you can report it on the Discord!",
			NO_CLAN: e.error+" | You're not in a clan!",
			NO_CLAN_USER: (nickname) => e.error+" | **"+nickname+"** is not in a clan!",
			CLAN_NOT_FOUND: (clan) => e.error+" | No clans found for `"+clan+"` !",

			HELP_DESCRIPTION: "Displays the list of commands!",
			HELP_HEADERS: [
				"Category",
				"Alias",
				"Usage",
				"Example(s)",
				"Description"
			],
			HELP_NO_ALIASES: "No aliases.",
			HELP_REMIND: "Reminder: `[]` means mandatory parameter while `()` means optional parameter",

			// link
			LINK_DESCRIPTION: "Link your WoT account to your Discord account!",
			LINK_ALREADY_LINKED: (prefix) => e.error+" | You have already linked a WoT account! Type `"+prefix+"unlink` and try again!",
			LINK_NICKNAME: e.error+" | Please enter your WoT nickname!",
			LINK_SEARCH: e.loading+" | Account search....",
			LINK_SUCCESS: (prefix) => e.success+" | Your WoT account has been correctly linked to your Discord account! To see your profile, type `"+prefix+"profile` !",

			// unlink
			UNLINK_DESCRIPTION: "Dissociate your WoT account!",
			UNLINK_SUCCESS: e.success+" | Your account is no longer linked!",

			// profile
			PROFILE_DESCRIPTION: "Shows the profile of a WoT player!",
			PROFILE_SUCCESS: (username) => e.stats+" | This is the profile of **"+username+"** :",
			PROFILE_HEADERS: [
				"Nickname",
				"Creation date",
				"Last update",
				"Last battle",
				"Clan",
				"Win Rate",
				"WN8",
				"WN8 - 24h",
				"WN8 - 30d"
			],

			// stats
			STATS_DESCRIPTION: "Displays the stats of a WoT player!",
			STATS_SUCCESS: (username) => e.stats+" | These are the stats of **"+username+"** :",
			STATS_HEADERS: [
				"Nickname",
				"Battles",
				"Wins",
				"Defeats",
				"Equalities",
				"Survived Battles",
				"Survived Battles Ratio",
				"Win rate",
				"WN8",
				"Total",
				"Maximum in one game",
				"History WN8"
			],
			STATS_FIELDS: {
				max: [
					"Destroyed vehicles: ",
					"Damage inflicted : "
				],
				total: [
					"Damage received: ",
					"Damage inflicted : ",
					"Destroyed vehicles: ",
					"Shots: "
				],
				wn8: [
					"24 hours : ",
					"7 days : ",
					"30 days : "
				]
			},

			// Clan 
			CLAN_DESCRIPTION: "Displays information about the clan!",
			CLAN_SUCCESS: (name) => e.stats+" | Here is the information for the clan **"+name+"** :",
			CLAN_HEADERS: [
				"Name",
				"Founder",
				"Created at",
				"Members",
				"Private",
				"WN8",
				"Description"
			],

			// clan stats
			CLANSTATS_DESCRIPTION: "Displays the statistics of a clan!",
			CLANSTATS_SUCCESS: (name) => e.stats+" | Here are the statistics for the clan **"+name+"** :",
			CLANSTATS_HEADERS: [
				"Name",
				"Tier X vehicles"
			],
			CLANSTATS_RANKS: {
				"X":"Tier X vehicles",
				"VIII":"Tier VIII vehicles",
				"VI":"Tier VI vehicles"
			},
			CLANSTATS_TITLES: [
				"__**Clan skirmish stats:**__",
				"__**Clan battles stats in Bastion mode:**__",
				"__**WN8 of the clan**__"
			],
			CLANSTATS_FIELDS: [
				[
					"Last battle: ",
					"Total battles : ",
					"Total battles (last 28 days): ",
					"Win rate: ",
					"Win rate (last 28 days) : "
				],
				[
					"Total level of the Bastion's structures: ",
					"Bastion level: ",
					"Last battle: ",
					"Total battles: ",
					"Total battles: (last 28 days): ",
					"Win rate: ",
					"Win rate (last 28 days): "
				]
			],

			// invite
			INVITE_DESCRIPTION: "Displays the bot's invitation links!",
			INVITE_HEADERS: [
				"Invitation",
				"Support"
			],

			// Setprefix
			SETPREFIX_DESCRIPTION: "Change the server prefix!",
			SETPREFIX_MISSING_PREFIX: e.error+" | Please enter a prefix!",
            SETPREFIX_SUCCESS: (prefix) => e.success+" | Your new prefix is `"+prefix+"` ! Type `"+prefix+"help` to see the list of commands!",

            // Setlang
			SETLANG_DESCRIPTION: "Change the server language!",
			SETLANG_VALID_LANGUAGES: e.error+" | Please enter a valid language (`fr` or `en`)!",
            SETLANG_SUCCESS: ":flag_gb: | Language set to \"English\" !",
            
            // Servers list
			SERVERSLIST_DESCRIPTION: "Displays the list of the servers of the bot!",
            SERVERSLIST_TIMEOUT: "The message has expired, type the command again!",
            
            // getinvite
			GETINVITE_DESCRIPTION: "Generates an invitation to the Discord!",
			GETINVITE_GUILD_NOT_FOUND: (id) => e.error+" | No servers found with `"+id+"`!",
            GETINVITE_MISSING_ID: e.error+" | You must enter a server ID!",

            // suggest
            SUGGEST_DESCRIPTION: "Submit a suggestion!",
			SUGGEST_MISSING_SUGGESTION: e.error+" | You must enter a suggestion!",
			SUGGEST_SUCCESS: e.success+" | Your suggestion has just been sent to the administrators!",

			// infos 
			INFOS_DESCRIPTION: "Display the stats of the bot!",
			INFOS_HEADERS: [
				"Stats of ",
				" is an open source bot developed by `Androz#2091` !",
				":bar_chart: • __Statistics__",
				":gear: • __Version__",
				":computer: • __RAM__",
				":sun_with_face: • __Online__",
				":link: • __Links__"
			],
			INFOS_FIELDS: (data, guilds, users) => [
				"`Servers: "+guilds+"`\n`Users: "+users+"`",
				"From "+data,
				"[Github](https://github.com/Androz2091/WorldOfTanks-Bot) | [Invitation](https://discordapp.com/oauth2/authorize?client_id=557649686417113149&permissions=2146958847&scope=bot) | [Support]("+data+")"
			],

			// tanks
			TANKS_DESCRIPTION: "Displays a player's tanks!",
			TANKS_FIELDS: [
				"Battles: ",
				"Mark of mastery:",
				"Nation: "
			],
			TANKS_CHOOSE_TIER: "Please choose the tier of the tanks to display!",
			TANKS_TIMEOUT:"The message has expired, type the command again!"

        }
    }

    /**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		//if (!this.enabled && this !== this.store.default) return this.store.default.get(term, ...args);
		const value = this.language[term];
		/* eslint-disable new-cap */
		switch (typeof value) {
			case "function": return value(...args);
			default: return value;
		}
	}

	/**
	 * Send the language of the file
	 */
	getLang(){
		return lang;
	}

	/**
	 * Print a date
	 * @param {Date} pdate The date to print
	 * @param {boolean} isLongDate if displays hours and minutes too
	 */
	printDate(pdate, isLongDate){
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        let day = pdate.getDate();
        let monthIndex = pdate.getMonth();
        let year = pdate.getFullYear();
        let hour = pdate.getHours();
		let minute = pdate.getMinutes();
        
        // monday decembr 1st
		var thedate = isLongDate  ? monthNames[monthIndex] + " " + day + " " + year + " at " + hour + "h" + minute : monthNames[monthIndex] + " " + day + " " + year;
		return thedate;
	}
	
	/**
	 * Convert milliseconds to a string
	 * @param {number} ms 
	 */
	convertMs(ms){
		var d, h, m, s;
		s = Math.floor(ms / 1000);
		m = Math.floor(s / 60);
		s = s % 60;
		h = Math.floor(m / 60);
		m = m % 60;
		d = Math.floor(h / 24);
		h = h % 24;
		h += d * 24;
		return h + " hour(s) " + m + " minute(s) " + s + " second(s)";
	}

}
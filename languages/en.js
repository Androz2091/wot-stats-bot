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
			NO_CLAN1: "No clan",
			YES:"Yes",
			NO:"No",
			NO_DESCRIPTION:"No description",
			WINS:"wins",
			NO_RECENT_BATTLE: "No recent battles",
			NO_BATTLES:"No battles",
			PAGE: "Page",
			MEMBERS: "Members",
			TOTAL_SERVERS:"Total servers",
			NO_TANKS: (tier) => "No tanks of `"+tier+"` tier to display!",
			CURRENT: "Current",

			/* DEFAULT MESSAGES */
			NO_DESCRIPTION_PROVIDED: "No description provided",
			NO_USAGE_PROVIDED: "No usage provided",
			NO_EXAMPLES_PROVIDED: "No examples provided",

			/* ERRORS */
			COMMAND_NOT_FOUND: (cmd) => "No commands found for `"+cmd+"` !",
			DM_COMMAND_UNAVAILABLE: e.error+" | This command is not available in private messages. Join a server to run it!",
			MISSING_BOT_PERMS: (perms) => e.error+" | I am missing the following permissions to perform this command: "+perms,
			ADMIN_ONLY: e.error+" | Only bots administrators can execute this command!",
			MISSING_PERMS: (perm) => e.error+" | This command requires permission `"+perm+"` !",
			NOT_LINKED: (prefix) => e.error+" | You currently have no linked accounts! Please link one with `"+prefix+"link [server] [nickname]` !",
			NOT_LINKED_USER: (user) => e.error+" | **"+user.tag+"** has no WoT account linked!",
			ACCOUNT_NOT_FOUND: (nickname) => e.error+" | No accounts found for `"+nickname+"` !",
			PLEASE_WAIT: e.loading+" | Please wait...",
			ERROR: e.error+" | An error has occurred.... If it happens again, you can report it on the Discord!",
			NO_CLAN: e.error+" | You're not in a clan!",
			NO_CLAN_USER: (nickname) => e.error+" | **"+nickname+"** is not in a clan!",
			CLAN_NOT_FOUND: (clan) => e.error+" | No clans found for `"+clan+"` !",

			/* HELP COMMAND */

			// Utils
			HELP_DESCRIPTION: "Displays the list of commands!",
			HELP_USAGE: "help [command]",
			HELP_EXAMPLES: "$help stats",
			// Content
			HELP_HEADERS: [
				"Category",
				"Alias",
				"Usage",
				"Example(s)",
				"Description"
			],
			HELP_NO_ALIASES: "No aliases.",
			HELP_REMIND: "Reminder: `[]` means mandatory parameter while `()` means optional parameter",

			/* LINK COMMAND */

			// Utils
			LINK_DESCRIPTION: "Link your WoT account to your Discord account!",
			LINK_USAGE: "link [na/asia/eu/ru] [nickname]",
			LINK_EXAMPLES: "$link eu ThibaudFvrx",
			// Errors
			LINK_ALREADY_LINKED: (prefix) => e.error+" | You have already linked a WoT account! Type `"+prefix+"unlink` and try again!",
			LINK_NICKNAME: e.error+" | Please enter your WoT nickname!",
			LINK_REALM: e.error+" | You must specify a server! Here's the list of servers: `asia`, `eu` (europe), `na` (north america), `ru` (russia)!",
			LINK_BAD_REALM: (realm) => e.error+" | `"+realm+"` is not a valid server! Here's the list of servers: `asia`, `eu` (europe), `na` (north america), `ru` (russia)!",
			// Success
			LINK_SEARCH: e.loading+" | Account search....",
			LINK_SUCCESS: (prefix) => e.success+" | Your WoT account has been correctly linked to your Discord account! To see your profile, type `"+prefix+"profile` !",

			/* UNLINK COMMAND */

			// Utils
			UNLINK_DESCRIPTION: "Dissociate your WoT account!",
			UNLINK_USAGE: "unlink",
			UNLINK_EXAMPLES: "$unlink",
			// Content
			UNLINK_SUCCESS: e.success+" | Your account is no longer linked!",

			/* PROFILE COMMAND */

			// Utils
			PROFILE_DESCRIPTION: "Shows the profile of a WoT player!",
			PROFILE_USAGE: "profile [@member/nickname]",
			PROFILE_EXAMPLES: "$profile ThibaudFvrx",
			// Success
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

			/* STATS COMMAND */

			// Utils
			STATS_DESCRIPTION: "Displays the stats of a WoT player!",
			STATS_USAGE: "stats [@member/nickname]",
			STATS_EXAMPLES: "$stats ThibaudFvrx",
			// Content
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

			/* CLAN COMMAND */

			// Utils
			CLAN_DESCRIPTION: "Displays information about the clan!",
			CLAN_USAGE: "clan [nom]",
			CLAN_EXAMPLES: "$clan LeClan",
			// Content
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

			/* CLANSTATS COMMAND */

			// Utils
			CLANSTATS_DESCRIPTION: "Displays the statistics of a clan!",
			CLANSTATS_USAGE: "clan-stats [name]",
			CLANSTATS_EXAMPLES: "$clanstats TheClan",
			// Content
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

			/* INVITE COMMAND */

			// Utils
			INVITE_DESCRIPTION: "Displays the bot's invitation links!",
			INVITE_USAGE: "invite",
			INVITE_EXAMPLES: "$invite",
			// Content
			INVITE_HEADERS: [
				"Invitation",
				"Support"
			],

			/* SETPREFIX COMMAND */

			// Utils
			SETPREFIX_DESCRIPTION: "Change the server prefix!",
			SETPREFIX_USAGE: "setprefix [prefix]",
			SETPREFIX_EXAMPLES: "$setprefix !",
			// Errors
			SETPREFIX_MISSING_PREFIX: e.error+" | Please enter a prefix!",
			// Content
			SETPREFIX_SUCCESS: (prefix) => e.success+" | ",

            /* SETLANG COMMAND */

			// Utils
			SETLANG_DESCRIPTION: "Change the server language!",
			SETLANG_USAGE: "setlang [lang]",
			SETLANG_EXAMPLES: "$setlang fr",
			// Errors
			SETLANG_VALID_LANGUAGES: e.error+" | Please enter a valid language (`fr` or `en`)!",
			// Success
			SETLANG_SUCCESS: ":flag_gb: | Language set to \"English\" !",
            
            /* SERVERSLIST COMMAND */

			// Utils
			SERVERSLIST_DESCRIPTION: "Displays the list of the servers of the bot!",
			SERVERSLIST_USAGE: "serverslist",
			SERVERSLIST_EXAMPLES: "$serverslist",
			// Content
			SERVERSLIST_TIMEOUT: "The message has expired, type the command again!",
            
            /* GETINVITE COMMAND */

			// Utils
			GETINVITE_DESCRIPTION: "Generates an invitation to the Discord!",
			GETINVITE_USAGE: "getinvite [ID]",
			GETINVITE_EXAMPLES: "$getinvite 457888575111954434",
			// Errors
			GETINVITE_GUILD_NOT_FOUND: (id) => e.error+" | No servers found with `"+id+"`!",
            GETINVITE_MISSING_ID: e.error+" | You must enter a server ID!",

			/* EVAL COMMAND */

			// Utils
			EVAL_DESCRIPTION: "Executes the code",
			EVAL_USAGE: "eval [code]",
			EVAL_EXAMPLES: "$eval message.channel.send('Hey');",

            /* SUGGEST COMMAND */

			// Utils
            SUGGEST_DESCRIPTION: "Submit a suggestion!",
			SUGGEST_USAGE: "suggest [suggestion]",
			SUGGEST_EXAMPLES: "$suggest A new command: this command will...",
			// Errors
			SUGGEST_MISSING_SUGGESTION: e.error+" | You must enter a suggestion!",
			// Success
			SUGGEST_SUCCESS: e.success+" | Your suggestion has just been sent to the administrators!",

			/* INFOS COMMAND */

			// Utils
			INFOS_DESCRIPTION: "Display the stats of the bot!",
			INFOS_USAGE: "infos",
			INFOS_EXAMPLES: "$infos",
			// Content
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
			FORMAT_SHARD: (d) => `\`${d[0]}\` mb ram\n\`${d[1]}\` servers\n\`${d[3]}\` ms`,

			/* TANKS COMMAND */

			// Utils
			TANKS_DESCRIPTION: "Displays a player's tanks!",
			TANKS_USAGE: "tanks [@member/nickname]",
			TANKS_EXAMPLES: "$tanks ThibaudFvrx",
			// Content
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
		return data.lang;
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

};
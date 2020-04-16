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
			NO_CLAN1: "No clan",
			YES:"Yes",
			NO:"No",
			NO_BATTLES:"No battles",
			PAGE: "Page",
			MEMBERS: "Members",
			TOTAL_SERVERS:"Total servers",
			NO_TANKS: (tier) => "No tanks of `"+tier+"` tier to display!",
			CURRENT: "Current",

			/* ERRORS */
			DM_COMMAND_UNAVAILABLE: e.error+" | This command is not available in private messages. Join a server to run it!",
			ADMIN_ONLY: e.error+" | Only bots administrators can execute this command!",
			MISSING_PERMS: (perm) => e.error+" | This command requires permission `"+perm+"` !",
			ERROR: e.error+" | An error has occurred.... If it happens again, you can report it on the Discord!",

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
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
			NO_BATTLES:"No battles",
			PAGE: "Page",
			MEMBERS: "Members",
			TOTAL_SERVERS:"Total servers",
			CURRENT: "Current",

			/* ERRORS */
			DM_COMMAND_UNAVAILABLE: e.error+" | This command is not available in private messages. Join a server to run it!",
			ADMIN_ONLY: e.error+" | Only bots administrators can execute this command!",
			MISSING_PERMS: (perm) => e.error+" | This command requires permission `"+perm+"` !",
			ERROR: e.error+" | An error has occurred.... If it happens again, you can report it on the Discord!"

		}
	}

};
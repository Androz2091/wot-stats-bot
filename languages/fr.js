var e = {
	error:"<:error:573897651330875394>",
	success:"<:success:573897847439622156>",
	warn:"<:warn:564131051425890321>",
	loading:"<a:loading:573925384114929684>"
}
var data = {
	owner:"ThibaudFvrx ⚓#8291",
	lang:"fr"
}

// This class is used to store languages strings

module.exports = class {
    constructor(...args) {
		this.language = {

			// UTILS
			WELCOME:"Bienvenue",
			PREFIX_INFO: (prefix) => "Mon préfixe sur ce serveur est \`"+prefix+"\` !",

			// ERROR MESSAGE
			COMMAND_NOT_FOUND: (cmd) => "Aucune commande trouvée pour `"+cmd+"` !",
			DM_COMMAND_UNAVAILABLE: e.error+" | Cette commande n'est pas disponible en messages privés. Rejoignez un serveur pour l'exécuter !",
			MISSING_BOT_PERMS: (perms) => e.error+" | Il me manque les permissions suivantes pour effectuer cette commande : "+perms,
			OWNER_ONLY: e.error+" | Seul "+data.owner+" peut effectuer cette commande !",
			MISSING_PERMS: (perm) => e.error+" | Cette commande nécessite la permission `"+perm+"` !",

			HELP_DESCRIPTION: "Affiche la liste des commandes !",
			HELP_HEADERS: [
				"Catégorie",
				"Alias",
				"Utilisation",
				"Exemple(s)",
				"Description"
			],
			HELP_NO_ALIASES: "Pas d'alias.",
			HELP_REMIND: "Rappel : `[]` signifie paramètre obligatoire tandis que `()` signifie paramètre facultatif",

			// link
			LINK_ALREADY_LINKED: (prefix) => e.error+" | Vous avez déjà lié un compte WoT ! Tapez `"+prefix+"unlink` puis rééssayez !",
			LINK_NICKNAME: e.error+" | Veuillez entrer votre pseudo WoT !",
			LINK_SEARCH: e.loading+" | Recherche du compte...",
			LINK_ACCOUNT_NOT_FOUND: (nickname) => e.error+" | Aucun compte trouvé pour `"+nickname+"` !",
			LINK_SUCCESS: (prefix) => e.success+" | Votre compte WoT a été correctement lié à votre compte Discord ! Pour voir votre profil, tapez `"+prefix+"profil` !"
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
            "janvier", "février", "mars",
            "avril", "mai", "juin", "juillet",
            "août", "septembre", "octobre",
            "novembre", "décembre"
        ];

        let day = pdate.getDate();
        let monthIndex = pdate.getMonth();
        let year = pdate.getFullYear();
        let hour = pdate.getHours();
		let minute = pdate.getMinutes();
		
        return thedate = isLongDate  ? day + " " + monthNames[monthIndex] + " " + year + " à " + hour + "h" + minute : day + " " + monthNames[monthIndex] + " " + year;
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
		return h + " heure(s) " + m + " minute(s) " + s + " seconde(s)";
	}

}
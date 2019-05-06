var e = {
	error:"<:error:573897651330875394>",
	success:"<:success:573897847439622156>",
	warn:"<:warn:564131051425890321>",
	loading:"<a:loading:573925384114929684>",
	stats:"<:stats:574159072878788608>"
},
data = {
	owner:"ThibaudFvrx ⚓#8291",
	lang:"fr"
}

// This class is used to store languages strings

module.exports = class {
    constructor(...args) {
		this.language = {

			// UTILS
			WELCOME:"Bienvenue",
			PREFIX_INFO: (prefix) => "Mon préfixe sur ce serveur est `"+prefix+"` !",
			NO_CLAN: "Aucun clan",
			YES:"Oui",
			NO:"Non",
			NO_DESCRIPTION:"Pas de description",
			WINS:"vict.",
			NO_RECENT_BATTLE: "Aucune bataille récente",

			// ERROR MESSAGE
			COMMAND_NOT_FOUND: (cmd) => "Aucune commande trouvée pour `"+cmd+"` !",
			DM_COMMAND_UNAVAILABLE: e.error+" | Cette commande n'est pas disponible en messages privés. Rejoignez un serveur pour l'exécuter !",
			MISSING_BOT_PERMS: (perms) => e.error+" | Il me manque les permissions suivantes pour effectuer cette commande : "+perms,
			OWNER_ONLY: e.error+" | Seul "+data.owner+" peut effectuer cette commande !",
			MISSING_PERMS: (perm) => e.error+" | Cette commande nécessite la permission `"+perm+"` !",
			NOT_LINKED: (prefix) => e.error+" | Vous n'avez actuellement aucun compte lié ! Veuillez en lier un avec `"+prefix+"link [nickname]` !",
			NOT_LINKED_USER: (user) => e.error+" | **"+user.tag+"** n'a pas de compte WoT relié !",
			ACCOUNT_NOT_FOUND: (nickname) => e.error+" | Aucun compte trouvé pour `"+nickname+"` !",
			PLEASE_WAIT: e.loading+" | Veuillez patienter...",
			ERROR: e.error+" | Une erreur est survenue... Si elle se reproduit, vous pouvez la signaler sur le Discord !",
			NO_CLAN: e.error+" | Vous n'êtes pas dans un clan !",
			NO_CLAN_USER: (nickname) => e.error+" | **"+nickname+"** n'est pas dans un clan !",
			CLAN_NOT_FOUND: (clan) => e.error+" | Aucun clan trouvé pour `"+clan+"` !",

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
			LINK_DESCRIPTION: "Lie votre compte WoT à votre compte Discord !",
			LINK_ALREADY_LINKED: (prefix) => e.error+" | Vous avez déjà lié un compte WoT ! Tapez `"+prefix+"unlink` puis rééssayez !",
			LINK_NICKNAME: e.error+" | Veuillez entrer votre pseudo WoT !",
			LINK_SEARCH: e.loading+" | Recherche du compte...",
			LINK_SUCCESS: (prefix) => e.success+" | Votre compte WoT a été correctement lié à votre compte Discord ! Pour voir votre profil, tapez `"+prefix+"profil` !",

			// unlink
			UNLINK_DESCRIPTION: "Dissocie votre compte WoT !",
			UNLINK_SUCCESS: e.success+" | Votre compte n'est maintenant plus lié !",

			// profile
			PROFILE_DESCRIPTION: "Affiche le profil d'un joueur WoT !",
			PROFILE_SUCCESS: (username) => e.stats+" | Voilà le profil de **"+username+"** :",
			PROFILE_HEADERS: [
				"Pseudo",
				"Date création",
				"Dernière mise à jour",
				"Dernière bataille",
				"Clan",
				"Pourcentage de victoires",
				"WN8",
				"WN8 - 24h",
				"WN8 - 30j"
			],

			// stats
			STATS_DESCRIPTION: "Affiche les stats d'un joueur WoT !",
			STATS_SUCCESS: (username) => e.stats+" | Voilà les stats de **"+username+"** :",
			STATS_HEADERS: [
				"Pseudo",
				"Batailles",
				"Victoires",
				"Défaites",
				"Égalités",
				"Batailles Survécues",
				"Ratio Batailles Survécues",
				"Pourcentage de victoires",
				"WN8",
				"Total",
				"Maximum en une partie",
				"Historique WN8"
			],
			STATS_FIELDS: {
				max: [
					"Véhicules détruits : ",
					"Dégâts infligés : "
				],
				total: [
					"Dégâts reçus : ",
					"Dégâts infligés : ",
					"Véhicules détruits : ",
					"Tirs : "
				],
				wn8: [
					"24 heures : ",
					"7 jours : ",
					"30 jours : "
				]
			},

			// Clan 
			CLAN_DESCRIPTION: "Affiche des informations sur le clan !",
			CLAN_SUCCESS: (name) => e.stats+" | Voilà les informations du clan **"+name+"** :",
			CLAN_HEADERS: [
				"Nom",
				"Fondateur",
				"Créé le",
				"Membres",
				"Privé",
				"WN8",
				"Description"
			],

			// clan stats
			CLANSTATS_DESCRIPTION: "Affiche les statistiques d'un clan !",
			CLANSTATS_SUCCESS: (name) => e.stats+" | Voilà les stats du clan **"+name+"** :",
			CLANSTATS_HEADERS: [
				"Nom",
				"Véhicules de rang X"
			],
			CLANSTATS_RANKS: {
				"X":"Véhicules de rang X",
				"VIII":"Véhicules de rang VIII",
				"VI":"Véhicules de rang VI"
			},
			CLANSTATS_TITLES: [
				"__**Statistiques d'escarmouche du clan :**__",
				"__**Statistiques des batailles du clan en mode Bastion :**__",
				"__**WN8 du clan**__"
			],
			CLANSTATS_FIELDS: [
				[
					"Dernière bataille : ",
					"Total batailles : ",
					"Total batailles (28 derniers jours) : ",
					"Ratio de victoires : ",
					"Ration de victoires (28 derniers jours) : "
				],
				[
					"Niveau total des structures du Bastion : ",
					"Niveau du Bastion : ",
					"Dernière bataille : ",
					"Total batailles : ",
					"Total batailles (28 derniers jours) : ",
					"Ratio de victoires : ",
					"Ration de victoires (28 derniers jours) : "
				]
			],

			// invite
			INVITE_DESCRIPTION: "Affiche les liens d'invitations du bot !",
			INVITE_HEADERS: [
				"Invitation",
				"Support"
			],

			// Setprefix
			SETPREFIX_DESCRIPTION: "Change le préfixe du serveur !",
			SETPREFIX_MISSING_PREFIX: e.error+" | Veuillez entrer un préfixe !",
			SETPREFIX_SUCCESS: (prefix) => e.success+" | Votre nouveau préfixe est `"+prefix+"` ! Tapez `"+prefix+"help` pour voir la liste des commandes !",

			// Setlang
			SETLANG_DESCRIPTION: "Change la langue du serveur !",
			SETLANG_VALID_LANGUAGES: e.error+" | Veuillez entrez une langue valide (`fr` ou `en`) !",
			SETLANG_SUCCESS: ":flag_fr: | Langue définie sur \"Français\" !"

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
		
		var thedate = isLongDate  ? day + " " + monthNames[monthIndex] + " " + year + " à " + hour + "h" + minute : day + " " + monthNames[monthIndex] + " " + year;
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
		return h + " heure(s) " + m + " minute(s) " + s + " seconde(s)";
	}

}
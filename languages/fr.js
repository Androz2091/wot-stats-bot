var e = require("../config.js").emojis,
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
			NO_CLAN1: "Aucun clan",
			YES:"Oui",
			NO:"Non",
			NO_DESCRIPTION:"Pas de description",
			WINS:"vict.",
			NO_RECENT_BATTLE: "Aucune bataille récente",
			NO_BATTLES:"Aucune bataille",
			PAGE: "Page",
			MEMBERS: "Membres",
			TOTAL_SERVERS:"Total serveurs",
			NO_TANKS: (tier) => "Aucun tanks de tier `"+tier+"` à afficher !",

			/* DEFAULT MESSAGES */
			NO_DESCRIPTION_PROVIDED: "Aucune description fournie",
			NO_USAGE_PROVIDED: "Aucune utilisation fournie",
			NO_EXAMPLES_PROVIDED: "Aucun exemple fourni",

			/* ERRORS */
			COMMAND_DISABLED: `${e.error} | Cette commande est actuellement désactivée !`,
			MISSING_PERMS: (permLevel) => `${e.error} | Cette commande nécessite le niveau de permission : \`"${permLevel}"\` !`,
			COMMAND_NOT_FOUND: (cmd) => "Aucune commande trouvée pour `"+cmd+"` !",
			DM_COMMAND_UNAVAILABLE: e.error+" | Cette commande n'est pas disponible en messages privés. Rejoignez un serveur pour l'exécuter !",
			MISSING_BOT_PERMS: (perms) => e.error+" | Il me manque les permissions suivantes pour effectuer cette commande : "+perms,
			ADMIN_ONLY: e.error+" | Seuls les administrateurs du bots peuvent effectuer cette commande !",
			MISSING_PERMS: (perm) => e.error+" | Cette commande nécessite la permission `"+perm+"` !",
			NOT_LINKED: (prefix) => e.error+" | Vous n'avez actuellement aucun compte lié ! Veuillez en lier un avec `"+prefix+"link [serveur] [pseudo]` !",
			NOT_LINKED_USER: (user) => e.error+" | **"+user.tag+"** n'a pas de compte WoT relié !",
			ACCOUNT_NOT_FOUND: (nickname) => e.error+" | Aucun compte trouvé pour `"+nickname+"` !",
			PLEASE_WAIT: e.loading+" | Veuillez patienter...",
			ERROR: e.error+" | Une erreur est survenue... Si elle se reproduit, vous pouvez la signaler sur le Discord !",
			NO_CLAN: e.error+" | Vous n'êtes pas dans un clan !",
			NO_CLAN_USER: (nickname) => e.error+" | **"+nickname+"** n'est pas dans un clan !",
			CLAN_NOT_FOUND: (clan) => e.error+" | Aucun clan trouvé pour `"+clan+"` !",
			VALID_NICKNAME: e.error+" | Veuillez entrer un pseudo Wot !",

			/* HELP COMMAND */

			// Utils
			HELP_DESCRIPTION: "Affiche la liste des commandes !",
			HELP_USAGE: "help [commande]",
			HELP_EXAMPLES: "$help stats",
			// Content
			HELP_HEADERS: [
				"Catégorie",
				"Alias",
				"Utilisation",
				"Exemple(s)",
				"Description"
			],
			HELP_NO_ALIASES: "Pas d'alias.",
			HELP_REMIND: "Rappel : `[]` signifie paramètre obligatoire tandis que `()` signifie paramètre facultatif",

			/* LINK COMMAND */

			// Utils
			LINK_DESCRIPTION: "Lie votre compte WoT à votre compte Discord !",
			LINK_USAGE: "link [na/asia/eu/ru] [pseudo]",
			LINK_EXAMPLES: "$link eu ThibaudFvrx",
			// Errors
			LINK_ALREADY_LINKED: (prefix) => e.error+" | Vous avez déjà lié un compte WoT ! Tapez `"+prefix+"unlink` puis rééssayez !",
			LINK_NICKNAME: e.error+" | Veuillez entrer votre pseudo WoT !",
			LINK_REALM: e.error+" | Vous devez entrer un serveur ! Voilà la liste des serveurs: `asia`, `eu` (europe), `na` (amérique du nord), `ru` (russie) !",
			LINK_BAD_REALM: (realm) => e.error+" | `"+realm+"` n'est pas un serveur valide ! Voilà la liste des serveurs: `asia`, `eu` (europe), `na` (amérique du nord), `ru` (russie) !",
			// Success
			LINK_SEARCH: e.loading+" | Recherche du compte...",
			LINK_SUCCESS: (prefix) => e.success+" | Votre compte WoT a été correctement lié à votre compte Discord ! Pour voir votre profil, tapez `"+prefix+"profil` !",

			/* UNLINK COMMAND */

			// Utils
			UNLINK_DESCRIPTION: "Dissocie votre compte WoT !",
			UNLINK_USAGE: "unlink",
			UNLINK_EXAMPLES: "$unlink",
			// Content
			UNLINK_SUCCESS: e.success+" | Votre compte n'est maintenant plus lié !",

			/* PROFILE COMMAND */

			// Utils
			PROFILE_DESCRIPTION: "Affiche le profil d'un joueur WoT !",
			PROFILE_USAGE: "profile [@membre/pseudo]",
			PROFILE_EXAMPLES: "$profile ThibaudFvrx",
			// Success
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

			/* STATS COMMAND */

			// Utils
			STATS_DESCRIPTION: "Affiche les stats d'un joueur WoT !",
			STATS_USAGE: "stats [@member/pseudo]",
			STATS_EXAMPLES: "$stats ThibaudFvrx",
			// Content
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

			/* CLAN COMMAND */

			// Utils
			CLAN_DESCRIPTION: "Affiche des informations sur le clan !",
			CLAN_USAGE: "clan [nom]",
			CLAN_EXAMPLES: "$clan LeClan",
			// Content
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

			/* CLANSTATS COMMAND */

			// Utils
			CLANSTATS_DESCRIPTION: "Affiche les statistiques d'un clan !",
			CLANSTATS_USAGE: "clan-stats [nom]",
			CLANSTATS_EXAMPLES: "$clanstats LeClan",
			// Content
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

			/* INVITE COMMAND */

			// Utils
			INVITE_DESCRIPTION: "Affiche les liens d'invitations du bot !",
			INVITE_USAGE: "invite",
			INVITE_EXAMPLES: "$invite",
			// Content
			INVITE_HEADERS: [
				"Invitation",
				"Support"
			],

			/* SETPREFIX COMMAND */

			// Utils
			SETPREFIX_DESCRIPTION: "Change le préfixe du serveur !",
			SETPREFIX_USAGE: "setprefix [préfixe]",
			SETPREFIX_EXAMPLES: "$setprefix !",
			// Errors
			SETPREFIX_MISSING_PREFIX: e.error+" | Veuillez entrer un préfixe !",
			// Content
			SETPREFIX_SUCCESS: (prefix) => e.success+" | Votre nouveau préfixe est `"+prefix+"` ! Tapez `"+prefix+"help` pour voir la liste des commandes !",

			/* SETLANG COMMAND */

			// Utils
			SETLANG_DESCRIPTION: "Change la langue du serveur !",
			SETLANG_USAGE: "setlang [langue]",
			SETLANG_EXAMPLES: "$setlang en",
			// Errors
			SETLANG_VALID_LANGUAGES: e.error+" | Veuillez entrez une langue valide (`fr` ou `en`) !",
			// Content
			SETLANG_SUCCESS: ":flag_fr: | Langue définie sur \"Français\" !",

			/* SERVERSLIST COMMAND */

			// Utils
			SERVERSLIST_DESCRIPTION: "Affiche la liste des serveurs du bot !",
			SERVERSLIST_USAGE: "serverslist",
			SERVERSLIST_EXAMPLES: "$serverslist",
			// Content
			SERVERSLIST_TIMEOUT: "Le message a expiré, tapez de nouveau la commande !",
			
			/* GETINVITE COMMAND */

			// Utils
			GETINVITE_DESCRIPTION: "Génère une invitation vers le Discord !",
			GETINVITE_USAGE: "getinvite [ID]",
			GETINVITE_EXAMPLES: "$getinvite 457888575111954434",
			// Errors
			GETINVITE_GUILD_NOT_FOUND: (id) => e.error+" | Aucun serveur trouvé avec `"+id+"` !",
			GETINVITE_MISSING_ID: e.error+" | Vous devez entrer une ID de serveur !",

			/* EVAL COMMAND */

			// Utils
			EVAL_DESCRIPTION: "Exécute le code",
			EVAL_USAGE: "eval [code]",
			EVAL_EXAMPLES: "$eval message.channel.send('Coucou');",

			/* SUGGEST COMMAND */

			// Utils
			SUGGEST_DESCRIPTION: "Soumettez une suggestion !",
			SUGGEST_USAGE: "suggest [suggestion]",
			SUGGEST_EXAMPLES: "$suggest Une nouvelle commande : cette commande fera....",
			// Errors
			SUGGEST_MISSING_SUGGESTION: e.error+" | Vous devez entrer une suggestion !",
			// Content
			SUGGEST_SUCCESS: e.success+" | Votre suggestion vient d'être envoyée aux administrateurs !",

			/* INFOS COMMAND */

			// Utils
			INFOS_DESCRIPTION: "Affiche les stats du bot !",
			INFOS_USAGE: "infos",
			INFOS_EXAMPLES: "$infos",
			// Content
			INFOS_HEADERS: [
				"Stats de ",
				" est un bot open source développé par `Androz#2091` !",
				":bar_chart: • __Statistiques__",
				":gear: • __Version__",
				":computer: • __RAM__",
				":sun_with_face: • __En ligne__",
				":link: • __Liens__"
			],
			INFOS_FIELDS: (data, guilds, users) => [
				"`Serveurs: "+guilds+"`\n`Utilisateurs: "+users+"`",
				"Depuis "+data,
				"[Github](https://github.com/Androz2091/WorldOfTanks-Bot) | [Invitation](https://discordapp.com/oauth2/authorize?client_id=557649686417113149&permissions=2146958847&scope=bot) | [Support]("+data+")"
			],
			FORMAT_SHARD: (d) => `\`${d[0]}\` mb ram\n\`${d[1]}\` serveurs\n\`${d[3]}\` ms`,

			/* TANKS COMMAND */

			// Utils
			TANKS_DESCRIPTION: "Affiche les tanks d'un joueur !",
			TANKS_USAGE: "tanks [@membre/pseudo]",
			TANKS_EXAMPLES: "$tanks ThibaudFvrx",
			// Content
			TANKS_FIELDS: [
				"Batailles : ",
				"Marque d'excellence : ",
				"Nation : "
			],
			TANKS_CHOOSE_TIER: "Veuillez choisir le tier des tanks à afficher !",
			TANKS_TIMEOUT: "Le message a expiré, tapez de nouveau la commande !"

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

};
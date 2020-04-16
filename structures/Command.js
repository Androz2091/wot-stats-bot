module.exports = class Command {
    constructor(client, {
        name = null,
        enabled = true,
        aliases = new Array(),
        clientPermissions = new Array(),
        permLevel = "Mega",
        cooldown = 5000,
        dirname = null
    })
    {
        let category = dirname ? dirname.split("/")[dirname.split("/").length-1] : "Other";
        this.client = client;
        this.conf = { enabled, aliases, permLevel, clientPermissions, cooldown};
        this.help = { name, category };
    }
};
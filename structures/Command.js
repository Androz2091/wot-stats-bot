module.exports = class Command {
    constructor(client, {
        name = null,
        enabled = true,
        description = (language) => language.get("NO_DESCRIPTION_PROVIDED"),
        usage = (language) => language.get("NO_USAGE_PROVIDED"),
        examples = (language) => language.get("NO_EXAMPLES_PROVIDED"),
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
        this.help = { name, description, usage, examples, category };
    }
};
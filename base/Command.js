module.exports = class Command {
    constructor(client, {
        name = null,
        description = false,
        usage = false,
        enabled = true,
        guildOnly = false,
        aliases = new Array(),
        permission = false,
        botpermissions = new Array(),
        examples = false,
        owner = false
    })
    {
        this.client = client;
        this.conf = { enabled, guildOnly, aliases, permission, botpermissions, owner};
        this.help = { name, description, usage, examples };
    };
};

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
        owner = false,
        dirname = false
    })
    {
        var category = 'Other';
        if(dirname){
            var folders = dirname.split('/');
            category = folders[folders.length - 1];
        };
        this.client = client;
        this.conf = { enabled, guildOnly, aliases, permission, botpermissions, owner};
        this.help = { name, description, usage, examples, category };
    };
};

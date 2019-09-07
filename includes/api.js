const express = require("express"),
app = express();

module.exports.load = (client) => {

    app.get("/guildsCount", (req, res) => {
        res.send({
            status: "success",
            guildsCount: client.guilds.size
        });
    });

    app.get("/usersCount", (req, res) => {
        res.send({
            status: "success",
            usersCount: client.users.size
        });
    });

    app.get("/commandsCount", (req, res) => {
        res.send({
            status: "success",
            commandsCount: client.databases[2].get("commands").length
        });
    });

    app.get("/commandsStats", (req, res) => {
        res.send({
            status: "success",
            commandsStats: client.databases[2].get("commands")
        });
    });

    app.get("/linkedUsersCount", (req, res) => {
        res.send({
            status: "success",
            linkedUsersCount: client.databases[0].all().filter((u) => u.data.wot && u.data.wot !== "unknow").length
        });
    });

    app.get("/", (req, res) => {
        res.send({
            status: "success",
            endpoints: [ "guildsCount", "usersCount", "commandsCount", "commandsStats", "linkedUsersCount" ]
        });
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send({
            status: "error"
        });
    });

    app.use((req, res, next) => {
        res.status(404).send({
            status: "Not found"
        });
    });

    app.listen(3000, () => {
        console.log("API is running on port 3000");
    });

}
const express = require('express');

const app = express();


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Destrin o Chris o Brabo do ritmo do YouTube');
});

app.listen(3000, () => console.log('connected the the services, please check the above for the following steps')); 
const DisTube = require("distube")
const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require("fs")
const config = require("./config.json")

client.config = require("./config.json")
client.distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: true })
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

client.on("ready", () => {
    console.log(`${client.user.tag} Está pronto.`)
    const server = client.voice.connections.size
    client.user.setActivity({ type: "LISTENING", name: `!Play YouTube, Boquinha ❤, Reinicialização 5:PM limpeza de Cache` })
})

client.on("message", async message => {
    const prefix = config.prefix
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) return message.channel.send(`${client.emotes.error} | Cria Você deve estar em um canal de voz!`)
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.reply(`Error: ${e}`)
    }
})

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toda a fila" : "Música" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `${client.emotes.play} | Tocando \`${song.name}\` - \`${song.formattedDuration}\`\nPedida por: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `${client.emotes.success} | Adicionada ${song.name} - \`${song.formattedDuration}\` a fila por ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `${client.emotes.play} | Play \`${playlist.title}\` playlist (${playlist.total_items} songs).\nPedida por: ${song.user}\nTocando Agora \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `${client.emotes.success} | Adicionada \`${playlist.title}\` playlist (${playlist.total_items} songs) Na fila\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Escolha uma opção abaixo**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Digite qualquer outra coisa ou aguarde 60 segundos para cancelar*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Pesquisa cancelada`))
    .on("error", (message, err) => message.channel.send(`${client.emotes.error} | Um erro encontrado: ${err}`))

client.login(config.token)

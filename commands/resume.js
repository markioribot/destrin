module.exports = {
    name: "resume",
    aliases: ["resume", "unpause"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila agora!`)
        client.distube.resume(message)
        message.channel.send("Retomada da música para você 😎👍")
    }
}

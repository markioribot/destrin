module.exports = {
    name: "pause",
    aliases: ["pause", "hold"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila agora! 😎👍`)
        if (queue.pause) {
            client.distube.resume(message)
            return message.channel.send("Retomada da música para você :)")
        }
        client.distube.pause(message)
        message.channel.send("Pausou a música para você 😎👍")
    }
}

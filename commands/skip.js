module.exports = {
    name: "skip",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila agora cria`)
        try {
            client.distube.skip(message)
            message.channel.send(`${client.emotes.success} | Bah Pulou a música guri:\n${queue.songs[0].name}`)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | ${e}`)
        }
    }
}

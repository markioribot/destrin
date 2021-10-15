module.exports = {
    name: "stop",
    aliases: ["disconnect", "leave"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila agora!`)
        client.distube.stop(message)
        message.channel.send(` ${client.emotes.success}| Bah Parou a Música Guri`)
    }
}

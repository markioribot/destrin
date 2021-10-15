module.exports = {
    name: "volume",
    aliases: ["v", "set", "set-volume"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila agora!`)
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Por favor insira um número válido!`)
        client.distube.setVolume(message, volume)
        message.channel.send(`${client.emotes.success} | Volume definido para \`${volume}\``)
    }
}

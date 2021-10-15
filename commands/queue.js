module.exports = {
    name: "queue",
    aliases: ["q"],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada jogando!`)
        const q = queue.songs.map((song, i) => `${i === 0 ? "Tocando:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
        message.channel.send(`${client.emotes.queue} | **Fila de servidor**\n${q}`)
    }
}

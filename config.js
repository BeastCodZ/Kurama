module.exports = {
  port: 3000,
  prefix: "-",
  id: "741349593127845989",
  usingCustomDomain: true,
  domain: "https://kurama.beastcodz.ml/",
  discordInvite: "https://discord.gg/VbgPYagUvg",
  mongodbUrl: "mongodb+srv://BeastCodZ:manan1934@cluster0.uxq6w.mongodb.net/Backend",
  clientSecret: "XMUNDrqd4l718qZ1G-d56ekNyzTbTpmc",
  opt: {
        DJ: {
            enabled: false,
            roleName: 'DJ',
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume']
        },
        maxVol: 100,
        loopMessage: true,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    },
};
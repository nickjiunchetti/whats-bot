const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')

const end = Date.now() + 1000
while (Date.now() < end);

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    browserWSEndpoint: process.env.BROWSERLESS_URL
  }
})

client.on('qr', qr => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client is ready!')
})

client.initialize()

client.on('message', async message => {
  console.log(message)
  // message.sendMessage('ad')
  if (
    !message.hasMedia ||
    message.type === 'sticker' ||
    message.type === 'ptt'
  ) {
    // client.sendMessage(
    //   message.from,
    //   'Envie uma imagem ou um gif para obter um sticker'
    // )

    return
  }

  const media = await message.downloadMedia()

  if (media) {
    client.sendMessage(message.from, media, { sendMediaAsSticker: true })
  }
})

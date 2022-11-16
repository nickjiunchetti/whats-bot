const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')
const numberMask = require('./masks')

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
  // message.sendMessage('ad')

  if (message.hasMedia && message.type != 'sticker' && message.type != 'ptt') {
    const media = await message.downloadMedia()

    if (media) {
      client.sendMessage(message.from, media, { sendMediaAsSticker: true })
    }

    return
  }

  if (message.type === 'chat') {
    const number = numberMask(message.body)
    if (number.length === 11) {
      client.sendMessage(message.from, `wa.me/55${number}`)

      return
    }
  }

  // client.sendMessage(
  //   message.from,
  //   'Envie uma imagem, video ou um gif para obter um sticker, ou envie um número com DDD para obter um link de whatsapp'
  // )
})

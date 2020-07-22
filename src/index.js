const TelegramBot = require('node-telegram-bot-api');
const token = '1290289986:AAH2Szfsv5Sgq7f93RMyliclpfzR2sVRUgU';
const weatherKey = '7f9790e9';
const bot = new TelegramBot(token, { polling: true });
const request = require('request');
bot.onText(/\/tempo (.+)/, function(msg, match){
    const chatId = msg.chat.id;
    const cityName = match[1];

    request(`https://api.hgbrasil.com/weather?format=json&key=${weatherKey}&city_name=${cityName}`, function(error, response, body){
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body) 
            const returnMessage = 
            `\n${data.results.city_name}\n` +
            `   Data/Hora: ${data.results.date} - ${data.results.time}\n` +
            `   Temperatura: ${data.results.temp}°\n` +
            `   Condição: ${data.results.description}\n` +
            `----------------- Próximo Dia -----------------\n` +
            `   Data: ${data.results.forecast[0].date}\n` +
            `   Temperatura Min/Máx: ${data.results.forecast[0].min}° ~ ${data.results.forecast[0].max}°\n` +
            `   Condição: ${data.results.forecast[0].description}\n`;
    
            bot.sendMessage(chatId, returnMessage);
        }
    })
})
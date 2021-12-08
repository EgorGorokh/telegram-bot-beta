
const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options.js');
const token ='5000313655:AAEjesh47tfYeq7rZZ5owj_yeU3uLDeQTf8';
const bot = new TelegramApi(token,{polling: true});
const chats={}


const gameOptions = {
    reply_markup:JSON.stringify({
        inline_keyboard:[
            [{text:'1', callback_data: '1'},{text:'2', callback_data: '2'},{text:'3', callback_data: '3'}],
            [{text:'4', callback_data: '4'},{text:'5', callback_data: '5'},{text:'6', callback_data: '6'}],
            [{text:'7', callback_data: '7'},{text:'8', callback_data: '8'},{text:'9', callback_data: '9'}],
            [{text:'0', callback_data: '0'}]
        ]
    })
}
const againOptions = {
    reply_markup:JSON.stringify({
        inline_keyboard:[
            [{text:'Играть еще раз', callback_data: '/again'}]
        ]
    })
}

const startGame = async (chatId) => {
    
       await bot.sendMessage(chatId,`Сейчас я загадаю тебя число от 1 до 9, попробуй угадать!` )
        const randomNumber = Math.floor(Math.random()*10)
        chats[chatId]=rendomNumber;
       await  bot.sendMessage(chatId,`Отгадывай`, gameOptions );
    
}




const start = () =>{
bot.setMyCommands([
    {command:'/start', description:  'Начальное приветствие'},
    {command:'/info', description:  'Информация о пользователе'},
    {command:'/game', description:  'Игра'},
])



bot.on('message',  msg=>{
    const text = msg.text;
    const chatId = msg.chat.id;

    if(text==='/start'){
        //bot.sendSticker(chatId, 'https://tlgrm.ru/stickers/RedwerkIT#view-6');
        return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот Егора Гороха`);
    }
  
    if(text==='/info'){
        return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name}${msg.from.last_name}`);
    }

    if(text==='/game'){
       return startGame(chatId);
    }

return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз')



})

bot.on('callback_query',  msg=>{
    const data =  msg.data;
    const chatId=msg.message.chat.id;
    if(data==='/again'){
return startGame(chatId);
    }
    if(data===chats[chatId]){
        return bot.sendMessage(chatId, `Поздравляю, ты угадал! Цифра ${chats[chatId]}`, againOptions)
    } else {
        return bot.sendMessage(chatId, `Ты не угадал, цифра ${chats[chatId]}`, againOptions)
    }
})
}
start()
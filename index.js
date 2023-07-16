const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters")
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.on(message("document") , async(ctx) => {
    try {
        ctx.sendChatAction("typing");
        const docId = ctx.message.document.file_id;
        const link = await bot.telegram.getFileLink(docId);
        ctx.reply("Your Download Link:" + link, {reply_to_message_id: ctx.message.message_id})
    } catch (error) {
        ctx.reply(error?.message ?? error?.description ?? "Some Error")
    }
});
bot.on(message("photo"), async(ctx) => {
    try {
        ctx.sendChatAction("typing");
        const photoId = ctx.message.photo[0].file_id;
        const link = await bot.telegram.getFileLink(photoId);
        ctx.reply("Your Download Link:" + link, {reply_to_message_id: ctx.message.message_id})
    } catch (error) {
        ctx.reply(error?.message ?? error?.description ?? "some Error")
    }
});

bot.launch();
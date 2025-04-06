
require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('remove', async (ctx) => {
  const reply = ctx.message.reply_to_message;

  if (!reply) return ctx.reply("Please reply to a scam message using /remove.");

  const scammerId = reply.from.id;
  const chatId = ctx.chat.id;
  const messageId = reply.message_id;

  try {
    await ctx.deleteMessage(messageId);
    await ctx.kickChatMember(scammerId); 
    await ctx.deleteMessage(ctx.message.message_id);
  } catch (error) {
    console.error('Error handling /remove:', error);
    ctx.reply("I need admin rights to delete messages and ban users.");
  }
});

bot.launch();
console.log('Bot is running...');

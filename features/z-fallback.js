
//
// Fallback Command
//
module.exports = function (controller) {

    controller.on( 'message,direct_message', async ( bot, message ) => {

        let markDown = `Desculpe, eu não entendi o que digitou.  \nTente digitar: menu `;
            
        await bot.reply( message, { markdown: markDown } );
    });
}
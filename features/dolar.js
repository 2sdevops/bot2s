
const { BotkitConversation } = require('botkit');

const f = require('../Functions/dolar');




module.exports = function (controller) {

    const convo = new BotkitConversation( 'dolar_chat', controller );
 

    controller.addDialog( convo );
    

    controller.hears( ['3', 'dolar'], 'message,direct_message', async ( bot, message ) => {
        let resultado = await f.dolar();
        await bot.say(resultado);
      });
      

    controller.commandHelp.push( { command: '3 - Consultar Dolar', text: ' Verificar valor atual do dolar' } );

    

}


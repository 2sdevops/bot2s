
const { BotkitConversation } = require('botkit');


module.exports = function (controller) {

    const convo = new BotkitConversation( 'guest_chat', controller );
 

    controller.addDialog( convo );
    

    controller.hears( ['2', 'guest'], 'message,direct_message', async ( bot, message ) => {
       
        await bot.say("Usuario: visitantes2s \nSenha: FBGbgsrKvzJzAUZNSinH@");
      });
      

    controller.commandHelp.push( { command: '2 - Rede guest', text: ' Criar usuario na rede guest' } );

    

}


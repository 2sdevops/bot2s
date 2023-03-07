//
// Command: help
//
module.exports = function (controller) {


    controller.hears( ['help', 'oi', 'ola', 'opa', 'ei', 'ooi', 'menu', 'Menu'], 'message,direct_message', async ( bot, message ) => {

        let markDown = '**Oi humano!** \n\n**Por favor digite o número correspondente ao que deseja :)** \n\n';

        controller.commandHelp.sort( ( a,b ) => {

            return ( ( a.command < b.command ) ? -1 : ( ( a.command > b.command ) ? 1 : 0 ));
        });

        controller.commandHelp.forEach( element => {
            
            markDown += `**${ controller.checkAddMention( message.roomType, element.command ) }**: ${ element.text }  \n`
        });

        await bot.reply( message, { markdown: markDown } );

        // text += "\n- " + bot.appendMention(message, "storage") + ": store picked color as a user preference";
    });

    
}

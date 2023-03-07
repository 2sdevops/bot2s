
const { BotkitConversation } = require( 'botkit' );
const f = require('../Functions/Cisco_2s');




module.exports = function (controller) {

    const convo = new BotkitConversation( 'eox_chat', controller );
    

    

    convo.ask( "Escolha o número correspondente ao que deseja verificar: \n\n1 - End-of-Sale e End-of-Support\n\n2 - Informações e cobertura via serial number\n\n3 - Voltar ao menu anterior", [
        {
            pattern: '1',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'ask_end_of_sale' );
            }
        },
        {
            pattern: '2',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'ask_end_of_support' );
            }
        },

        {
            pattern: '3',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'menu' );
            }
        },

        
        
        {
            default: true,
            handler: async ( response, convo ) => {
                await convo.gotoThread( 'bad_response' );
            }
        }
    ])


    convo.addMessage( {
        text: 'Não Entendemos sua resposta!\nTip: Tente "1" ou "2"',
        action: 'default'
    }, 'bad_response' );
    

    convo.addQuestion( "Por favor informe o part number completo do equipamento, para pesquisar vários pns de uma vez, separe-os por vírgulas sem deixar espaços. Ex. ATA190,WS-C2960-24PC-L", async (response, convo, bot) => {  
        let pn = await f.consultar_pn(response)
        console.log(pn.message)
        await bot.say(`${pn.message}`)

    } , 'stated_end_of_sale', 'ask_end_of_sale');

    convo.addQuestion( "Por favor informe o serial number do equipamento, para pesquisar vários seriais de uma vez, separe-os por vírgulas sem deixar espaços. Ex. FCH2226VA2J,FXS1643Q25Q", async (response, convo, bot) => {  
        let sn = await f.consultar_sn(response)
        console.log(sn.message)
        await bot.say(`${sn.message}`)

    } , 'stated_end_of_support', 'ask_end_of_support');
    


    convo.addMessage( {
        text: 'Favor digitar sua nova opção\n\n Caso não lembre digite "menu" ',
        action: 'stop'
    }, 'menu' );

    

    controller.addDialog( convo );


    controller.hears( ['1', 'eox'], 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'eox_chat' );
    });

    controller.commandHelp.push( { command: '1 - Consulta Cisco', text: ' Consultar SN ou PN Cisco' } );

    
    
    

}


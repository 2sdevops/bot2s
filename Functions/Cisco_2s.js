module.exports = { consultar_pn, consultar_sn }


var axios = require("axios")

async function geraToken(){
    var response = await axios.post('https://cloudsso.cisco.com/as/token.oauth2',{ 
        'grant_type':'client_credentials',
        'client_id': 'gr4kq52haysjpek3k62hyab2',
        'client_secret': 'QkWkkNxataHH9JvEbZ5W69ax'},{
        headers: 
        {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Charset': 'UTF-8'
        }
        
        })
        
        return response.data.access_token;
       
}



async function consultar_pn(pn_recebido) {
    try {
    var tokenGerado = await geraToken();
    var response = await axios.get('https://api.cisco.com/supporttools/eox/rest/5/EOXByProductID/' + pn_recebido, {
    headers: {
    Authorization: 'Bearer ' + tokenGerado,
    'Content-Type': 'application/json'
    },
    json: true
    });
    resposta = response.data.EOXRecord[0]
    retorno = (`Modelo: ${resposta.EOLProductID} \n\nEnd of Life: ${resposta.EOXExternalAnnouncementDate.value}\n\nEnd of Sale: ${resposta.EndOfSaleDate.value}\n\nEnd of Support: ${resposta.LastDateOfSupport.value}`);
    return { success: true, message: retorno };
    } catch (error) {
    console.error(error);
    return { success: false, message: 'Ocorreu um erro ao consultar o PN.' };
    }
    }



    async function consultar_sn(sn_recebido) {
        try {
        var tokenGerado = await geraToken();
        var response = await axios.get('https://api.cisco.com/sn2info/v2/coverage/summary/serial_numbers/' + sn_recebido, {
        headers: {
        Authorization: 'Bearer ' + tokenGerado,
        'Content-Type': 'application/json'
        },
        json: true
        });
        resposta = response.data
        retorno = (`Tem cobertura: ${resposta.serial_numbers[0].is_covered} \n\nData final: ${resposta.serial_numbers[0].covered_product_line_end_date}\n\nNome do cliente: ${resposta.serial_numbers[0].contract_site_customer_name}`);
        return { success: true, message: retorno };
        } catch (error) {
        console.error(error);
        return { success: false, message: 'Ocorreu um erro ao consultar o SN.' };
        }
        }


consultar_pn('ATA190')








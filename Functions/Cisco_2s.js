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
    console.log(resposta)

    const EOLProductID = resposta.EOLProductID;
    const EOXExternalAnnouncementDate = resposta.EOXExternalAnnouncementDate.value;
    const EndOfSaleDate = resposta.EndOfSaleDate.value;
    const LastDateOfSupport = resposta.LastDateOfSupport.value;

    

    if (!EOLProductID || !EOXExternalAnnouncementDate || !EndOfSaleDate || !LastDateOfSupport) {
        return { success: false, message: 'Partnumber não foi encontrado no sistema EOX da cisco, favor verificar se foi digitado corretamente' };
    } else {
        retorno = (`Modelo: ${EOLProductID} \n\nEnd of Life: ${EOXExternalAnnouncementDate}\n\nEnd of Sale: ${EndOfSaleDate}\n\nEnd of Support: ${LastDateOfSupport}`);
        return { success: true, message: retorno };
    }
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
        console.log(resposta.serial_numbers[0].covered_product_line_end_date)
    

        const contract_site_customer_name = resposta.serial_numbers[0].contract_site_customer_name;
        let cobertura = resposta.serial_numbers[0].is_covered;
        
        if (!contract_site_customer_name) {

            if (cobertura === "YES") {
                retorno = (`Tem cobertura por um contrato de serviço: Sim \n\nData final da garantia do produto: ${resposta.serial_numbers[0].warranty_end_date}\n\nNome do cliente: Não é cliente 2S`);
                return { success: true, message: retorno };
            } else {
                retorno = (`Tem cobertura por um contrato de serviço: Não \n\nData final da garantia do produto: ${resposta.serial_numbers[0].warranty_end_date}\n\nNome do cliente: Não é cliente 2S`);
                return { success: true, message: retorno };
            }

        }
        

        if (cobertura === "YES") {
            
            retorno = `Tem cobertura por um contrato de serviço: Sim\n\nData final do contrato de serviço: ${resposta.serial_numbers[0].covered_product_line_end_date} \n\nData final da garantia do produto: ${resposta.serial_numbers[0].warranty_end_date}\n\nNome do cliente: ${resposta.serial_numbers[0].contract_site_customer_name}`;
            return { success: true, message: retorno };
        } else {
            retorno = (`Tem cobertura por um contrato de serviço: Não \n\nData final do contrato de serviço: ${resposta.serial_numbers[0].covered_product_line_end_date}\n\nNome do cliente: ${resposta.serial_numbers[0].contract_site_customer_name}`);
            return { success: true, message: retorno };
        }
        

        
        } catch (error) {
        console.error(error);
        return { success: false, message: 'Ocorreu um erro ao consultar o SN.' };
        }
        }


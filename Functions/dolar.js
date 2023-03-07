process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
module.exports = { dolar }
var axios = require("axios")



async function dolar(){
    let valor_dolar
    
    try{
        var response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL')
        const valor = parseFloat(response.data['USDBRL']['ask']);
        valor_dolar = `O valor atual do dólar é: ${valor.toFixed(2)}`;
        
    }catch (error) {
        valor_dolar = ['Houve um erro ao calcular o dolar, caso continue o problema favor entrar em contato com o administrador']
      }
      return valor_dolar
}

dolar()


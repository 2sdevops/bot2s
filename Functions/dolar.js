process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
const { format } = require('date-fns');
module.exports = { dolar }
var axios = require("axios")



async function dolar(){
    let valor_dolar
    const hoje = new Date();
    const dataFormatada = format(hoje, 'dd-MM-yyyy');
    
    try{
        var response = await axios.get(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda=%27USD%27&@dataCotacao=%27${dataFormatada}%27&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao,tipoBoletim`)
        const lista = response.data.value
        const ultimacotacao = lista[lista.length - 1]; // Acessando o objeto de cotações do primeiro boletim
        valor_dolar = `Dolar EUA PTAX - Venda: ${ultimacotacao.cotacaoVenda}`;
        console.log(valor_dolar); // Imprimindo o valor da última cotação de compra do dólar
        
        
        
    }catch (error) {
        console.log(error)
        valor_dolar = ['Houve um erro ao calcular o dolar, caso continue o problema favor entrar em contato com o administrador']
      }
      return valor_dolar
}


dolar()


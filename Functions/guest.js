module.exports = { guest_main }

const axios = require('axios');
var data = new Date();

var diaAMais = new Date();
diaAMais.setDate(diaAMais.getDate() + 1);
    
var strfromDate = (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear() + ' ' + data.getHours() + ':' + data.getMinutes();
var strtoDate = (data.getMonth() + 1) + '/' + (data.getDate() + 1) + '/' + data.getFullYear() + ' 23:00';   


async function verifica_usuario(username){
  let retorno;

  await axios.get('https://ise2s01.2s.com.br:9060/ers/config/guestuser/name/' + username,{
        auth: {
        username: 'ise-api-sponsor',
        password: 'Brasil@2022'
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(response => {
        retorno = 'true'
        
    })
    .catch(error => {
        retorno = 'false'
        
    })
    return retorno
}




async function atualiza_guest(username){
  let retorno;

  var dados = {
      "GuestUser": {
        "name": "Severino",
        "description": "Teste 2S ",
        "guestType": "Convidado_API",
        "sponsorUserName": "ise-api-sponsor",
        "guestInfo": {
          "userName": username,
          "emailAddress": username,
          "phoneNumber": "",
          "enabled": true,
          "smsServiceProvider": ""
          
        },
        "guestAccessInfo": {
          "validDays": 1,
          "fromDate": strfromDate,
          "toDate": strtoDate,
          "location": "Arizona"
        },
        "portalId": "b2fea183-da44-4cdb-923c-3abc1b854ff0"
        
      }
    }
  await axios.put(`https://ise2s01.2s.com.br:9060/ers/config/guestuser/name/${username}`, dados,{
      auth: {
      username: 'ise-api-sponsor',
      password: 'Brasil@2022'
      },
  })
  .then(response => {
    retorno = 'true'
      
  })
  .catch(error => {
      retorno = 'false'
      console.log(error.response.data.ERSResponse)
      
      
  })
  return retorno
}


async function cria_guest(username){
  let retorno

    var dados = {
        "GuestUser": {
          "name": "Severino",
          "description": "Teste 2S ",
          "guestType": "Convidado_API",
          "sponsorUserName": "ise-api-sponsor",
          "guestInfo": {
            "userName": username,
            "emailAddress": username,
            "phoneNumber": "",
            "enabled": true,
            "smsServiceProvider": ""
            
          },
          "guestAccessInfo": {
            "validDays": 1,
            "fromDate": strfromDate,
            "toDate": strtoDate,
            "location": "Arizona"
          },
          "portalId": "b2fea183-da44-4cdb-923c-3abc1b854ff0"
          
        }
      }
    await axios.post('https://ise2s01.2s.com.br:9060/ers/config/guestuser', dados,{
        auth: {
        username: 'ise-api-sponsor',
        password: 'Brasil@2022'
        },
    })
    .then(response => {
      retorno = 'true'
        
        
    })
    .catch(error => {
      retorno = 'false'
        console.log(error.response.data.ERSResponse)
        
    })
    return retorno
}

async function password_guest(username) {
    let password
    try {
      const response = await axios.get(
        'https://ise2s01.2s.com.br:9060/ers/config/guestuser/name/' + username,
        {
          auth: {
            username: 'ise-api-sponsor',
            password: 'Brasil@2022',
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      )
      password = response.data.GuestUser.guestInfo.password
    } catch (error) {
      password = 'false'
    }
    return password
  }
  
async function guest_main(username){
    let retorno

    let v_usuario = await verifica_usuario(username)
    if (v_usuario == "true") {
      await atualiza_guest(username)
      let senha = await password_guest(username)
      retorno = `Segue abaixo as credencias de acesso a rede Guest 2S\n\nUsuario: ${username} \n\nSenha: ${senha}`
    } 
    else {
        let v_cria_usuario = await cria_guest(username)
          if (v_cria_usuario == "false"){
            retorno = 'Ocorreu um erro ao tentar criar o usuario na rede Guest \n\n Caso ocorra novamente, favor entrar em contato com o administrador'
        }
          else {
            let senha = await password_guest(username)
            retorno = `Usuario: ${username} \n\nSenha: ${senha}`
        }
      
    }
    return retorno
}












  
  
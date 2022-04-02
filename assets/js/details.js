let idDetails = sessionStorage.id // De onde pegamos a informação de qual pokemon buscar, pegamos da sessão para não guardar informações desnecessarias no localStorage do usuario 

const baseUrlPokeApi ="https://pokeapi.co/api/v2/pokemon/" // URL Base para busca de pokemons

//Função que forma o card principal com retorno de outras funções
const formingCard = (response) => {
    const card = `
                <div class="cardDetails">
                  <div id="titlePoke">
                    <h1 id="pokeNameDetails"> ${response.data.forms[0].name.toUpperCase()}</h1>
                  </div>
                  <div class="textDetails">
                    <div class="contType">
                      ${typeIdentifier(response.data.types)}
                    </div>
                    <div id="idDetails">
                      <p id="pokeID">#${response.data.id}</p>
                    </div>
                  </div>
                  <img src="${urlImg(response.data.sprites.other)}" id="pokeImg" class="imgHover" alt="Test">
                          
                  <div class="informations">
                          ${infoSearch(response.data)}
                  </div>

                  <div id="btnAbilities">
                    <button class="abilities">
                      Abilities
                    </button>
                    <button class="games">
                      Games
                    </button>
                    <button class="evolution">
                      Evolution
                    </button>
                  </div>
                </div>
                <div class="contAbilities">
                      
                </div>
                            `     
    document.querySelector(".conteiner").innerHTML += card
}


const infoSearch = (data) => {

  let info = ""

  for(i in data.stats){
      console.log(data.stats[i].base_stat)
      info += `
      <div id="${data.stats[i].stat.name}">
        <h2>${data.stats[i].stat.name.toUpperCase()}</h2>
        <div>
          <p> ${data.stats[i].base_stat}</p>
        </div>
      </div>
      `

  }

  return info
}

//Função Formadora do card de Erro
const cardError = () =>{
  let card = `   
  <div class="error">
    <img src="./assets/img/warning.png" alt="">
    <h1>Aviso! Pokemon Não encontrado</h1>
    <button id="btnError" onclick="backIndexError()">
      Fechar
    </button>
  </div>`


  document.querySelector(".conteiner").innerHTML += card
}
    
//Função para resolver problema de "-" no e acessar o item com o nome official-artwork
const urlImg = (dataUrl) =>{
          for(data in dataUrl){
             if (data == 'official-artwork'){
                let sprite = data
                return dataUrl[sprite].front_default;
              }
             }
} 

//Identificador de tipos, e caso de mais de um tipo ele retorna todos
 const typeIdentifier = (data) => {
            let urlImgType ="" 
            for(i in data){
                 urlImgType = urlImgType + `
                      <div class="${data[i].type.name}">
                        <img src="./assets/img/pokemon-types/${data[i].type.name}.png" id="type"  alt="">
                      </div>`
                    }
            return urlImgType
} 

//Consumidor da API (AXIOS)
//Caso de funcionar (then) ele formara o card do pokemon
//Caso erro (Catch) ele forma o card de Error
axios.get(`${baseUrlPokeApi}${idDetails}`).then(response =>{
      formingCard(response)
}).catch(
      error =>{cardError()
})

//Função para quando o user clicar no botão do card de erro, ele redirecionar para o index
const backIndexError = () =>{window.location.href = "./index.html"}
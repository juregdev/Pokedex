let idDetails = sessionStorage.id // De onde pegamos a informação de qual pokemon buscar, pegamos da sessão para não guardar informações desnecessarias no localStorage do usuario 

let idFornextAndPrevious = 0

const baseUrlPokeApi ="https://pokeapi.co/api/v2/pokemon/" // URL Base para busca de pokemons

//Função que forma o card principal com retorno de outras funções
const formingCard = (response) => {
  const card = `
    <div class="cardDetails transitionIn">
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
    <div class="informations transitionIn">
      ${infoSearch(response.data)}
    </div>
    <div id="moreInformations" class="transitionIn" onclick="moreInfo()">
      <h1>+</h1>
    </div>
  `     
  document.querySelector(".conteinerDetails").innerHTML = card
}

const formingCardNextPokemon = (response) => {
  const card = `
    <div class="cardDetails transitionInRight">
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
    <div class="informations transitionInRight">
      ${infoSearch(response.data)}
    </div>
    <div id="moreInformations" class="transitionInRight" onclick="moreInfo()">
      <h1>+</h1>
    </div>
  `     
  document.querySelector(".conteinerDetails").innerHTML = card
}


const infoSearch = (data) => {
  let info = ""
  for (i in data.stats) {
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
const cardError = () => {
  let card = `   
    <div class="error">
      <img src="./assets/img/warning.png" alt="">
      <h1>Aviso! Pokemon Não encontrado</h1>
      <button id="btnError" onclick="backIndexError()">
        Fechar
      </button>
    </div>`


  document.querySelector(".conteiner").innerHTML = card
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
      idFornextAndPrevious= response.data.id;
      formingCard(response)
}).catch(
      error => { cardError()
})

//Função para quando o user clicar no botão do card de erro, ele redirecionar para o index
const backIndexError = () => {window.location.href = "./index.html"}

/*
const moreInfo = () => {
  const info = document.querySelector("#moreInformations")
  const cardInfo = document.querySelector(".informations")
    if (info.style.left == "22%") {
      cardInfo.style.zIndex = "0";
      setTimeout(() =>{ info.style.left = "32.9%";
      cardInfo.style.left = "35%";
      info.children[0].textContent = "+"}, 170)
    } else {
        info.style.left = "22%";
        cardInfo.style.left = "24%";
        info.children[0].textContent = "-"
        setTimeout(() =>{cardInfo.style.zIndex = "1"}, 170)
      }
    }*/
      
      
      const nextPokemon = () => {
        
        idFornextAndPrevious++
 
        
        axios.get(`${baseUrlPokeApi}${idFornextAndPrevious}`).then(response =>{
          document.querySelector(".cardDetails").classList.remove('transitionInRight')
          document.querySelector(".cardDetails").classList.add('transitionOutRight')
          document.querySelector(".informations").classList.remove('transitionInRight')
          document.querySelector(".informations").classList.add('transitionOutRight')
          document.querySelector("#moreInformations").classList.remove('transitionInRight')
          document.querySelector("#moreInformations").classList.add('transitionOutRight')
          
   
              
setTimeout(() =>{
  formingCardNextPokemon(response)},500)
}).catch(
  error => { cardError()
  })
}

const previousPokemon = () => {
 
  idFornextAndPrevious--
   
  if (idFornextAndPrevious < 1) {
    idFornextAndPrevious = 1

  } else {  
  axios.get(`${baseUrlPokeApi}${idFornextAndPrevious}`).then(response =>{
    document.querySelector(".cardDetails").classList.remove('transitionIn')
    document.querySelector(".cardDetails").classList.add('transitionOut')
    document.querySelector(".informations").classList.remove('transitionIn')
    document.querySelector(".informations").classList.add('transitionOut')
    document.querySelector("#moreInformations").classList.remove('transitionIn')
    document.querySelector("#moreInformations").classList.add('transitionOut')
    document.querySelector("#moreInformations").classList.remove('transitionInRight')
    document.querySelector(".informations").classList.remove('transitionInRight')
    document.querySelector(".cardDetails").classList.remove('transitionInRight')
    

    setTimeout(() =>{ formingCard(response)}, 500)
   
  }).catch(
    error => { cardError()
  })}
}
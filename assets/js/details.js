let idDetails = sessionStorage.id // De onde pegamos a informação de qual pokemon buscar, pegamos da sessão para não guardar informações desnecessarias no localStorage do usuario 

let idFornextAndPrevious = 0

const baseUrlPokeApi ="https://pokeapi.co/api/v2/pokemon/" // URL Base para busca de pokemons

//Função que forma o card principal com retorno de outras funções
const formingCard = (response) => {
  const card = `
    <div class="cardDetails transitionIn">
      <div id="titlePoke">
        <h1 id="pokeNameDetails">${response.data.forms[0].name.toUpperCase()}</h1>
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
        <button class="abilities" onclick="moves(this)">
          Abilities
        </button>       
        <button class="evolution" onclick="evolution()">
          Evolution
        </button>
      </div>
      <div class="informations" onclick="moreInfo()">
      ${infoSearch(response.data)}
    </div>
    <div id="moreInformations" class="transitionIn" onclick="moreInfo()">
      <h1>+</h1>
    </div>
    </div>
    <div class="contAbilities"> 
    </div>
   
  `     
  document.querySelector(".conteinerDetails").innerHTML = card
}

const formingCardNextPokemon = (response) => {
  const card = `
    <div class="cardDetails transitionInRight">
      <div id="titlePoke">
        <h1 id="pokeNameDetails">${response.data.forms[0].name.toUpperCase()}</h1>
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
        <button class="abilities" onclick="moves(this)">
          Abilities
        </button>
        <button class="evolution" onclick="evolution()">
          Evolution
        </button>
      </div>
      <div class="informations " onclick="moreInfo()">
      ${infoSearch(response.data)}
    </div>
    <div id="moreInformations" class="transitionInRight" onclick="moreInfo()">
      <h1>+</h1>
    </div>
    </div>
    <div class="contAbilities"> 
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


  document.querySelector(".conteinerDetails").innerHTML = card
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
     <div class="${data[i].type.name}" id="${data[i].type.name}" onclick="typeEnter(this)">
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

const moves = (element) => {

document.querySelector(".contAbilities").innerHTML=""

  if (element.style.background == "rgb(61, 125, 202)") {
    removeMoves(element)
  } else 
  {
  axios.get(`${baseUrlPokeApi}${idDetails}`).then(response =>{
    element.style = "background: rgb(61, 125, 202); color: rgb(255, 255, 255);"
    createMoves(response.data.moves)
}).catch(
    error => { cardError()
})
}}

const removeMoves = (element) =>{
  element.style = ""

 
document.querySelector(".contAbilities").innerHTML=""
  
}

const createMoves = (data) => {
  for (i in data){
    document.querySelector(".contAbilities").innerHTML += `<div class="move"
    style = "animation: swing-in-top-fwd 0.5s 0.${i}s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;    
  "
    id=${data[i].move}>
    <h1>${data[i].move.name}</h1>
  </div>
    `
  }
}

//Função para quando o user clicar no botão do card de erro, ele redirecionar para o index
const backIndexError = () => {window.location.href = "./index.html"}


const moreInfo = () => {
  const info = document.querySelector("#moreInformations")
  const cardInfo = document.querySelector(".informations")
    if (info.style.left == "-42%") {
      cardInfo.style.zIndex = "-1";
      setTimeout(() =>{ info.style.left = "-3rem";
      cardInfo.style.left = "0";
      cardInfo.style.opacity="0"
      info.children[0].textContent = "+"}, 170)
    } else {
        info.style.left = "-42%";
        cardInfo.style.left = "-33%";
        cardInfo.style.opacity ="1"
        info.children[0].textContent = "-"
        cardInfo.style.zIndex = "1"
      }
    }
      
      
      const nextPokemon = () => {
        
        idFornextAndPrevious++
        idDetails = idFornextAndPrevious
 
        
        axios.get(`${baseUrlPokeApi}${idFornextAndPrevious}`).then(response =>{
          document.querySelector(".cardDetails").classList.remove('transitionInRight')
          document.querySelector(".cardDetails").classList.add('transitionOutRight')
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
  idDetails = idFornextAndPrevious
   
  if (idFornextAndPrevious < 1) {
    idFornextAndPrevious = 1

  } else {  
  axios.get(`${baseUrlPokeApi}${idFornextAndPrevious}`).then(response =>{
    document.querySelector(".cardDetails").classList.remove('transitionIn')
    document.querySelector(".cardDetails").classList.add('transitionOut')
    document.querySelector("#moreInformations").classList.remove('transitionIn')
    document.querySelector("#moreInformations").classList.add('transitionOut')
    document.querySelector("#moreInformations").classList.remove('transitionInRight')
    document.querySelector(".cardDetails").classList.remove('transitionInRight')
    

    setTimeout(() =>{ formingCard(response)}, 500)
   
  }).catch(
    error => { cardError()
  })}
}

const typeEnter = (element) => {
  sessionStorage.setItem("id", element.id)
  window.location.href = "types.html" 
}

const evolution = () => {
  document.querySelector(".contAbilities").innerHTML=""
  const baseEvolve ='https://pokeapi.co/api/v2/pokemon-species/'

  axios.get(`${baseEvolve}${idDetails}`).then(response =>{
    evoChains(response.data.evolution_chain.url)
  }).catch(err =>{ console.log(err)})
}

const evoChains = (data) => {
  axios.get(`${data}`).then(response =>{
    evoChainsSearch(response.data.chain.species.name)
    contEvo(response.data.chain.evolves_to)
   
  }).catch(err =>{ console.log(err)})
}

const contEvo = (data) => {
if (data.length > 0) {
  for (i in data) {
    evoChainsSearch(data[i].species.name)
    contEvo(data[i].evolves_to)
  }
} else {
return
}

}

const evoChainsSearch = (data) => {
let nameCard =document.querySelector("#pokeNameDetails").textContent
  if (data == nameCard.toLowerCase()) {
console.log("caindo")
  } else {
  axios.get(`${baseUrlPokeApi}${data}`).then(response =>{
    formingCardEvo(response)
   
  }).catch(err =>{ console.log(err)})
}
}

const formingCardEvo = (response) => {
  const card = `
    <div class="card">
      <a href="./details.html" onclick="idStorage(this)" id="${response.data.forms[0].name.toUpperCase()}" title="Clique e veja mais detalhes do  ${response.data.forms[0].name}">
        <h1 id="pokeName"> ${response.data.forms[0].name.toUpperCase()}</h1>
      </a>
      <div class="text">
        <div>
          <div id="types">
            ${typeIdentifier(response.data.types)}
          </div>
          <p id="pokeID">#${response.data.id}</p>
        </div>
      </div>
      <img src="${urlImg(response.data.sprites.other)}" id="pokeImg" class="imgHover" alt="${response.data.forms[0].name}">
    </div>`

  document.querySelector(".contAbilities").innerHTML += card
}

const idStorage = (element) =>{
  sessionStorage.setItem("id", element.id.toLowerCase())
}
const baseUrlPokeApi ="https://pokeapi.co/api/v2/pokemon/" //Url base para fazer a função dos pokemons

let id = 1; //Id inicial para buscar 

// Função que automatiza a criação de cartoes com parametro para pausar
const cardCreate = (pause) =>{
  randomLoad() 
  const tempo =  setInterval(() =>{
    if (id > pause) {
      console.log("Caindo verdadeiro")
      clearInterval(tempo)
      clearInterval(timer)
      document.querySelector("#loading").classList.remove("visibleLoading")
      document.querySelector("#loading").classList.add("invisibleLoading")   
      document.querySelector("body").style.overflow = ""
     setTimeout(() =>{   document.querySelector("#loading").style.display = "none"}, 1000)
  } else {
      document.querySelector("#loading").classList.add("visibleLoading")
      document.querySelector("#loading").classList.remove("invisibleLoading")
      document.querySelector("body").style.overflow = "hidden"
      document.querySelector("#loading").style.display = ""
      axios.get(`${baseUrlPokeApi}${id}`).then(response => {
        formingCard(response);
      })
      id++
    }
  }, 200)

  let i = 0
  document.querySelector("#textLoad").textContent = ''
  const timer = setInterval(() =>{    
    switch (i){
      case 10: 
        i=0
        document.querySelector("#textLoad").textContent = ''
    }
    testLoanding(i)
    i++
  }, 500)
}

//Função do botao de Ver mais 
const more = () =>{
  let pause = id + 13;
  cardCreate(pause)
}

//Criador do card 
const formingCard = (response) => {
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

  document.querySelector(".content").innerHTML += card
}

// Função que identifica o Tipo do Pokemon
const typeIdentifier = (data) => {
  let url = "" 
  for (i in data) {
    url = url + ` 
      <img src="./assets/img/pokemon-types/${data[i].type.name}.png" id="${data[i].type.name}" onclick="typeEnter(this)" alt="">` 
  }
  return url
}

//Função para resolver problema de "-" no e acessar o item com o nome official-artwork
const urlImg = (dataUrl) => {
  for (data in dataUrl) {
    if (data == 'official-artwork') {
      let sprite = data
      return dataUrl[sprite].front_default;
    } 
  }
} 

//Função da pesquisa que envia o sessionStorage
const entrar = () => {
  sessionStorage.setItem("id", pokeSearch.value.toLowerCase())
  sessionStorage.setItem("idPrevious", pokeSearch.value.toLowerCase())
  window.location.href = "details.html" 
}

//Função que envia o sessionStorage com o id do card que foi clicado
const idStorage = (element) =>{
  sessionStorage.setItem("id", element.id.toLowerCase())
  sessionStorage.setItem("idPrevious", element.id.toLowerCase())
}

//função usada na tela de carregamento, fazendo um ramdom para imagens
function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Função que seleciona a foto da tela de Loading
const randomLoad = () => {
  let ramdom = getRandomIntInclusive(1,9);
  let element = document.querySelector("#imgLoad")

  switch (ramdom) {
    case 1:
      element.src = './assets/img/loading/pokebola.png';
      element.classList.remove("pokemon")
      element.classList.add("pokebola")
      break;

    case 2:
      element.src = './assets/img/loading/bullbasaur.png';
      element.classList.add("pokemon")
      element.classList.remove("pokebola")
      break;

    case 3:
      element.src = './assets/img/loading/charmander.png';
      element.classList.add("pokemon")
      element.classList.remove("pokebola")
      break;
       
    case 4:
      element.src = './assets/img/loading/eevee.png';
      element.classList.add("pokemon")
      element.classList.remove("pokebola")
      break;

    case 5:
      element.src = './assets/img/loading/jigglypuff.png';
      element.classList.add("pokemon")
      element.classList.remove("pokebola")
      break;

    case 6:
      element.src = './assets/img/loading/meowth.png';
      element.classList.add("pokemon")
      element.classList.remove("pokebola")
      break;

    case 7:
      element.src = './assets/img/loading/pikachu.png';
      element.classList.add("pokemon")
      element.classList.remove("pokebola")
      break;

    case 8:
      element.src = './assets/img/loading/squirtle.png';
      element.classList.add("pokemon")
      element.classList.remove("pokebola")
      break;

    case 9:
      element.src = './assets/img/loading/psyduck.png';
      element.classList.add("pokemon")
      element.classList.remove("pokebola")
      break;
  
    default: console.log("erro")
  }
}

//Adiciona letras do carregando é puxado pelo setInterval
const testLoanding = (i) =>{
  const carregando = ['C', 'A', 'R', 'R', 'E', 'G', 'A', 'N', 'D', 'O']
    document.querySelector("#textLoad").textContent += carregando[i]
    console.log("funfa")
  
}

//Verificação se a pagina esta correta
if (window.location.href.indexOf("index.html")) {
  cardCreate(14)
  randomLoad()
} else {
  console.log(ErrorEvent,"Por gentileza, entre em contato com o Desenvolvedor dessa aplicação")
}
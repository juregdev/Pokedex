
const baseUrlType = "https://pokeapi.co/api/v2/type/";

let id = sessionStorage.id;

let pausePosition = 0

let idPosition = 0

const getAPI = () =>{
axios.get(`${baseUrlType}${id}`).then((response) => {
  createCard(response.data)
}).catch((error) => {console.log(error)})
}

const getPosition = (pause) =>{
  axios.get(`${baseUrlType}${id}`).then((response) => {
  response.data.pokemon.push("teste")
  const idx = response.data.pokemon.lastIndexOf("teste") - 1
  if (pause < idx ){
    getPokemon(response.data.pokemon,pause)
  } else {
  document.querySelector(".more").style.display = "none"
  }

  }).catch((error) => {console.log(error)})
  }

  const getPokemon = (data,pause) =>{
    randomLoad()
    const timer = setInterval(() =>{
      if (idPosition <= pause) {
        document.querySelector("#loading").classList.add("visibleLoading")
        document.querySelector("#loading").classList.remove("invisibleLoading")
        document.querySelector("body").style.overflow = "hidden"
        document.querySelector("#loading").style.display = ""
        axios.get(data[idPosition].pokemon.url).then((response) =>{
          formingCard(response)
        }).catch((error) => {console.log("deu ruim")})
      } else {
        document.querySelector("#loading").classList.remove("visibleLoading")
        document.querySelector("#loading").classList.add("invisibleLoading")   
        document.querySelector("body").style.overflow = ""
        clearInterval(timer)
        clearInterval(time)
      }
idPosition++
    },200)

    let i = 0
    document.querySelector("#textLoad").textContent = ''
    const time = setInterval(() =>{    
      switch (i){
        case 10: 
          i=0
          document.querySelector("#textLoad").textContent = ''
      }
      testLoanding(i)
      i++
    }, 500)
  }

const damagesIdentifiers = (response) => {
  let elementReturn = ''

  if (response.length === 0) {
    elementReturn = `
    <div id="noExistDamage">
    <p>
      Oops, Não existe um pokemon qual o tipo procurado faça este tipo de dano!
    </p>
  </div>
  `
  return elementReturn
  } else {

  for (i in response){
    elementReturn += `
      <div class="cardType ${response[i].name}" id="${response[i].name}" onclick="idStorage(this)">
        <img src="./assets/img/pokemon-types/${response[i].name}.png" alt="${response[i].name}">
      </div>
      `    
  }
  return elementReturn
  }
}

const createCard = (response) => {
  const card = `
  <div class="contMainType">
      <div id="mainType" class="${response.name}">
        <img src="./assets/img/pokemon-types/${response.name}.png" alt="${response.name}">
      </div>
  </div>
      <div id="contTP">
        <div id="doubleFrom">
          <h1>DOUBLE DAMAGE FROM:</h1>
          ${damagesIdentifiers(response.damage_relations.double_damage_from)}
        
          </div>
        <div id="doubleTo">
          <h1>DOUBLE DAMAGE TO:</h1>
          ${damagesIdentifiers(response.damage_relations.double_damage_to)}

        </div>
        <div id="halfFrom">
          <h1>HALF DAMAGE FROM:</h1>
          ${damagesIdentifiers(response.damage_relations.half_damage_from)}

        </div>
        <div id="halfTo">
          <h1>HALF DAMAGE TO:</h1>
          ${damagesIdentifiers(response.damage_relations.half_damage_to)}
         
        </div>
        <div id="noFrom">
          <h1>NO DAMAGE FROM:</h1>
          ${damagesIdentifiers(response.damage_relations.no_damage_from)}
        </div>
        <div id="noTo">
          <h1>NO DAMAGE TO:</h1>
          ${damagesIdentifiers(response.damage_relations.no_damage_to)}

        </div>
      </div>
  `

  document.querySelector(".conteinerTypes").innerHTML += card 

}


const more = () => {
  pausePosition = pausePosition + 11;
  getPosition(pausePosition)

}

const formingCard = (response) => {
  const card = `
    <div class="cardPokeTypes">
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

    document.querySelector(".contentTypes").innerHTML += card
}

const urlImg = (dataUrl) => {
  for (data in dataUrl) {
    if (data == 'official-artwork') {
      let sprite = data
      return dataUrl[sprite].front_default;
    } 
  }
} 

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

const idStorage = (element) =>{
  sessionStorage.setItem("id", element.id.toLowerCase())
  location.reload()
}

function getRandomIntInclusive (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Função que seleciona a foto da telad de Loading
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

const testLoanding = (i) =>{
  const carregando = ['C', 'A', 'R', 'R', 'E', 'G', 'A', 'N', 'D', 'O']
    document.querySelector("#textLoad").textContent += carregando[i]  
}



randomLoad()
getAPI()
more()


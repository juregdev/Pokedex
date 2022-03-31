let input = document.querySelector('#pokeSearch');
let search = '';

const baseUrlPokeApi ="https://pokeapi.co/api/v2/pokemon/"


let id = 1;
let pagina = ""


const cardCreate = (pause) =>{

  randomLoad()

const tempo =  setInterval(() =>{
  if (id > pause){
    clearInterval(tempo)
    document.querySelector("#loading").classList.remove("invisibleLoading")
    document.querySelector("#loading").classList.add("visibleLoading")
  
   document.querySelector("body").style.overflow = ""
   setTimeout(() =>{   document.querySelector("#loading").style.display = "none"}, 1000)
  }else{
    document.querySelector("#loading").classList.add("invisibleLoading")
    document.querySelector("#loading").classList.remove("visibleLoading")
    document.querySelector("body").style.overflow = "hidden"
    document.querySelector("#loading").style.display = ""
  
  axios.get(`${baseUrlPokeApi}${id}`).then(response =>{
    formingCard(response);
    }
    )
    id = id + 1
}}, 200)}



 

  const more = () =>{
      let pause = id + 14;
      cardCreate(pause)
  }

const formingCard = (response) => {
  const card = `<div class="card">
  <a href="./details.html" onclick="idStorage(this)" id="${response.data.forms[0].name.toUpperCase()}" title="Clique e veja mais detalhes do  ${response.data.forms[0].name}">
  <h1 id="pokeName"> ${response.data.forms[0].name.toUpperCase()}</h1>
  </a>
  <div class="text">
    <div>
      
        ${typeIdentifier(response.data.types)}
      
      <p id="pokeID">#${response.data.id}</p>
    </div>
  </div>
  <img src="${urlImg(response.data.sprites.other)}" id="pokeImg" class="imgHover" alt="Test">
  
  </div>`

document.querySelector(".content").innerHTML += card
}


const typeIdentifier = (data) => {
  let url ="" 
 
  for(i in data){
    url = url + ` <img src="./assets/img/pokemon-types/${data[i].type.name}.png" alt="">
    `
    
  }

  return url
}

const pokeRecord =( ) =>{
  search = input.value;
 
  getPokemon(baseUrlPokeApi)
}

const getPokemon = (url) =>{
  axios.get(`${url}${search.toLowerCase()}`).then(response => {
    const data = response.data.sprites.other;
    const officialImg = urlImg(data)
console.log(response.data.types[0].type.name)

    pokeName.textContent = response.data.forms[0].name.toUpperCase()
    pokeID.textContent = `#${response.data.id}`
    pokeImg.src = officialImg; 
  
  }).catch(error =>{

  })
}

const urlImg = (dataUrl) =>{
  for(data in dataUrl){
    if (data == 'official-artwork'){
        let sprite = data
         return dataUrl[sprite].front_default;
    } 
  }
} //Função para pegar a foto oficial }



const entrar = () =>{
  sessionStorage.setItem("id", pokeSearch.value)
  window.location.href = "/details.html"
  
}

const idStorage = (element) =>{
      sessionStorage.setItem("id", element.id.toLowerCase())
}



function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomLoad =  () =>{
  let ramdom = getRandomIntInclusive(1,9);
  let element = document.querySelector("#imgLoad")

  switch(ramdom){
    case 1:
       element.src = './assets/img/loading/pokebola.png';
       element.classList.add("pokebola")
       break;

    case 2:
       element.src = './assets/img/loading/bullbasaur.png';
       element.classList.add("pokemon")
       break;
    case 3:
       element.src = './assets/img/loading/charmander.png';
       element.classList.add("pokemon")
       break;
       
    case 4:
        element.src = './assets/img/loading/eevee.png';
        element.classList.add("pokemon")
        break;
    case 5:
        element.src = './assets/img/loading/jigglypuff.png';
        element.classList.add("pokemon")
        break;
    case 6:
        element.src = './assets/img/loading/meowth.png';
        element.classList.add("pokemon")
        break;
    case 7:
        element.src = './assets/img/loading/pikachu.png';
        element.classList.add("pokemon")
        break;
    case 8:
          element.src = './assets/img/loading/squirtle.png';
          element.classList.add("pokemon")
          break;
    case 9:
            element.src = './assets/img/loading/psyduck.png';
            element.classList.add("pokemon")
            break;

            default: console.log("erro")
    }

  }

const loading = ()=>{
  let i=0
  const time = setInterval(()=>{
    let carregando = [
      "C",
      "A",
      "R",
      "R",
      "E",
      "G",
      "A",
      "N",
      "D",
      "O"
    ]
    

    if(i > 9){
      i=0
      textLoad.textContent = carregando[i]
      i++
    }else{
      textLoad.textContent += carregando[i]
      i++
    }
  

  },500)
}



  if(window.location.href.indexOf("index.html")){cardCreate(15)
    randomLoad()
    loading()
  }
  else{console.log(ErrorEvent,"Por gentileza, entre em contato com o Desenvolvedor dessa aplicação")}
  


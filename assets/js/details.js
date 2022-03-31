let idDetails = sessionStorage.id
const baseUrlPokeApi ="https://pokeapi.co/api/v2/pokemon/"

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
   </div>
        

  <button class="abilities">
        Habilidades
  </button>
  <div class="contAbilities">
    
  </div>
        `
        
        document.querySelector(".conteiner").innerHTML += card
      }

const cardError = () =>{
  let card = `   <div class="error">

  <img src="./assets/img/warning.png" alt="">

  <h1>Aviso! Pokemon Não encontrado</h1>

  <button id="btnError" onclick="backIndexError()">
    Fechar
  </button>
</div>`


document.querySelector(".conteiner").innerHTML += card
}
      
 const urlImg = (dataUrl) =>{
       for(data in dataUrl){
          if (data == 'official-artwork'){
            let sprite = data
            return dataUrl[sprite].front_default;
          } 
        }
      } 

 const typeIdentifier = (data) => {
        let url ="" 
        for(i in data){
           url = url + `
           <div class="${data[i].type.name}">
           <img src="./assets/img/pokemon-types/${data[i].type.name}.png" id="type"  alt="">
           </div>
           `
  }
        return url
}


axios.get(`${baseUrlPokeApi}${idDetails}`).then(response =>{
  formingCard(response)
}).catch(error =>{cardError()})

const backIndexError = () =>{
  window.location.href = "./index.html"}


fetch(`https://rickandmortyapi.com/api/character`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))


const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelector(element);


const $searchTitle = $("#search-title ");
const $searchSort = $("#search-sort ");
const $resultSection = $("#resultSection")

const $inputtextSearch = $("#input-text-search")
const $buttonSearch = $("#button-search")

//---botones paginacion--//
const $firstPage = $("#firstPage ");
const $previousPage = $("#previousPage");
const $nextPage = $("#nextPage")
const $lastPage = $("#lastPage")


//para acceder a u personaje especifico 
//{{baseUrl}}/characters/idCharacter?ts={{ts}}&hash={{hash}}
//para acceder a detalle de comic
//{{baseUrl}}/comics/idComic?ts={{ts}}&hash={{hash}}
///------boton de busqueda---//

$buttonSearch.addEventListener("click", async() => {
    const textoSearch = $inputtextSearch.value.trim()
    console.log(textoSearch)
try{
    const response =await axios(`https://rickandmortyapi.com/api/character/?name=${textoSearch.value}`)
    

    console.log(response.data)
    const comics =response.data.data.results;
    pintarDatos(personajes);
}catch(error){
    
}
})



//-----------pintar datos-------//
function pintarDatos(array) {
    $resultSection.innerHTML = '';
    for (const personaje of array) {
        $resultSection.innerHTML += ` <div class="comic sm: bg-black min-w-80 md:min-w-32 md:min-h-32">
        <div class="comic-img-container bg-lime-100 min-h-96 ">
              <img class=" " src="${personaje.image}" alt="">
        </div>
        <h3 class="comic-title min-h-24 bg-lime-50 ">${personaje.name}</h3>
  </div>`
    }
}

let currentPage = 1
//---------botones de paginacion--------//
$firstPage.addEventListener("click", () => {
    currentPage =1
    fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then(res => res.json())
      .then(response => {
  
        const personajes = response.results;
        console.log(personajes)
        pintarDatos(personajes)
      })
      .catch(error => {
        console.log(error)
      })
})
$lastPage.addEventListener("click", () => {
    // buscar los datos con lo escrito en $input=tex search pero en la ultima pag
    //si se cump[le pintar datos]
})

$previousPage.addEventListener("click", () => {
    currentPage -=1
    fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then(res => res.json())
      .then(response => {
  
        const personajes = response.results;
        console.log(personajes)
        pintarDatos(personajes)
      })
      .catch(error => {
        console.log(error)
      })
    
})
$nextPage.addEventListener("click", () => {
    currentPage +=1
    fetch(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then(res => res.json())
      .then(response => {
  
        const personajes = response.results;
        console.log(personajes)
        pintarDatos(personajes)
      })
      .catch(error => {
        console.log(error)
      })
    
})




window.onload = () => {
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(response => {
  
        const personajes = response.results
        console.log(personajes)
        pintarDatos(personajes)
      })
      .catch(error => {
        console.log(error)
      })
      
  }
  






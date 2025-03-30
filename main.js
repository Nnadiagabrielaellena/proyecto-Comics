

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
const $numeroPage = $("#numeroPage")

const $Episode = $("#Episode")


//para acceder a u personaje especifico 
//{{baseUrl}}/characters/idCharacter?ts={{ts}}&hash={{hash}}
//para acceder a detalle de comic
//{{baseUrl}}/comics/idComic?ts={{ts}}&hash={{hash}}
///------boton de busqueda---//
let currentPage = 1
let pageMax = 0;
console.log(pageMax)

$buttonSearch.addEventListener("click", async () => {
  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<h1>loading</h1>`


  try {
    const response = await axios(`https://rickandmortyapi.com/api/character?name=${$inputtextSearch.value}`, {
    })
      .then(response => {
        console.log(response.data)
        // pageMax = response.info.pages
        console.log(response.data)
        pintarDatos(response.data.results)
        //agregar aqui el evento onclick

      })
  } catch (error) {
    $resultSection.innerHTML = `<div><h1 class="text-white tex-2xl">no hay resultados</h1><img class="" src="./style/img/no.jpg"></div>`
    console.log(error)
  }
})

//-----------pintar datos-------//
function pintarDatos(array) {
  $resultSection.innerHTML = '';

  for (const personaje of array) {
    $resultSection.innerHTML += ` <div class="flex-wrap comic sm: bg-black min-w-80 md:min-w-32 md:min-h-32  ">
        <div class="comic-img-container bg-black min-h-96  ">
              <img class="" src="${personaje.image}" alt="">
        </div>
        <h1 class="comic-title min-h-24 bg-black text-white m-2">nombre :${personaje.name}</h1>
        <h3 class="comic-title min-h-24 bg-black text-white ">Genero:${personaje.gender === "Female" ? "Mujer" : "Hombre"}</h3>
        <h3 class="comic-title min-h-24 bg-black text-white ">Estado:${personaje.status === "alive" ? " Esta vivo" : " No esta vivo"}</h3>
        <h1 id="numeroPage"></h1>
  </div>`
  }

}



//---------botones de paginacion--------//
$firstPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div><img class="" src="./style/img/fin.jpg"></div>`
  currentPage = 1
  $numeroPage.innerText = currentPage

  try {
    const response = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}`)

      .then(response => {

        const personajes = response.data.results;
        console.log(personajes)
        pintarDatos(personajes)

      })
  } catch (error) {

  }
})

$lastPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`
  currentPage = 42
  console.log(currentPage)
  $numeroPage.innerText = currentPage

  try {
    const response = await axios(`https://rickandmortyapi.com/api/character?page=42`)

      .then(response => {

        const personajes = response.data.results;
        console.log(personajes)
        pintarDatos(personajes)
      })
  } catch (error) {

  }
})




$previousPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<1>loading</1>`
  currentPage -= 1
  $numeroPage.innerText = currentPage
  if (currentPage < 1) {
    alert("Ya estás en la primera página. No puedes ir a una página anterior.");
    return $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`;
  }
  try {
    const response = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}`)

      .then(response => {
        const personajes = response.data.results;
        console.log(personajes)
        pintarDatos(personajes)
      })
  } catch (error) {

  }
})

$nextPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<1>loading</1>`
  currentPage += 1
  $numeroPage.innerText = currentPage
  if (currentPage > 42) {
    alert("Ya estás en la ultima página. No puedes ir a una página posterior.");
    return $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`;
  }
  try {
    const response = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}`)

      .then(response => {

        const personajes = response.data.results;
        console.log(personajes)
        pintarDatos(personajes)
      })
  } catch (error) {

  }

})

//----filtro episodio-----//
/*$Episode.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`
 

  try {
    const response = await axios(`https://rickandmortyapi.com/api/episode`)

      .then(response => {

        const personajes = response.data.results;
        console.log(personajes)
        pintarDatos(personajes)
      })
  } catch (error) {

  }
})*/






window.onload = async () => {

  try {
    const response = await axios("https://rickandmortyapi.com/api/character/")

      .then(response => {
        const personajes = response.data.results
        console.log(personajes)
        pintarDatos(personajes)
      })
  } catch (error) {

  }


  
}







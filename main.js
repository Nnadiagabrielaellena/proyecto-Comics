




const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelector(element);

const $searchTitle = $("#search-title ");
const $searchSort = $("#search-sort ");
const $resultSection = $("#resultSection");
const $inputtextSearch = $("#input-text-search");
const $buttonSearch = $("#button-search");

// Botones de paginación
const $firstPage = $("#firstPage ");
const $previousPage = $("#previousPage");
const $nextPage = $("#nextPage");
const $lastPage = $("#lastPage");
const $numeroPage = $("#numeroPage");

const $Episode = $("#Episode");
const $containCharacter = $("#containCharacter");
const $pagination = $("#pagination");


let currentPage = 1;
let pageMax = 0;
let personajes = [];
let datos = [];



$buttonSearch.addEventListener("click", async () => {
  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="loader "></div>`

  const personajeBuscado = $inputtextSearch.value;

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?name=${personajeBuscado}`, {
    })
   

    pintarDatos(data.results)

    $resultSection.style.display = "block";
    $containCharacter.style.display = "none";
    $pagination.style.display = "none"

    //agregar aqui el evento onclick
  } catch (error) {
    $resultSection.innerHTML = `<div><h1 class="text-white tex-2xl">no hay resultados</h1><img class="" src="./style/img/no.jpg"></div>`
    console.log(error)
  }
})

///-----evento click para buscar episodio de personaje---//
let tipoBusqueda = "character"

const $TitleStatus = $("#TitleStatus")
const $TitleGender = $("#TitleGender")

const $selectFiltro = $("#selectFiltro");
console.log(tipoBusqueda)
$selectFiltro.addEventListener("change", async (e) => {

  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="h-full w-full flex justify-center items-center loader ">Loading...</div>`
  const selectedValue = e.target.value;

  if (selectedValue === "character") {
    tipoBusqueda = "character";
    $selectGender.style.display = "block"
    $TitleGender.style.display = "block"
    $TitleStatus.style.display = "block"
    $searchStatus.style.display = "block"
  } else {
    tipoBusqueda = "episode";



    $selectGender.style.display = "none"
    $TitleGender.style.display = "none"
    $TitleStatus.style.display = "none"
    $searchStatus.style.display = "none"
  }

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/${tipoBusqueda}`)


    const personajes = data.results;
    console.log(personajes)
    $resultSection.style.display = "block";
    $pagination.style.display = "block"
    $containCharacter.style.display = "none";

    pintarDatos(personajes)

  } catch (error) {
    console.log(error)
  }



})
/*//pintar
//data
const arrayPromises = data.episode.map(elem => axios(elem))
const response =  Promise.all(arrayPromises)
const arrayDetailEpisode = response.map(elem =>elem.data)
console.log(arrayDetailEpisode)
pintarDatos(personajes)*/










//----obtener datos----//
async function obtenerDatos(tipoBusqueda) {

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character`)
    
   
  


    console.log(datos)
  } catch (error) {
    console.log(error)
  }

}

//-----------pintar datos-------//
const $imgPreviousPage = $("#imgPreviousPage")

function pintarDatos(array) {
  $resultSection.innerHTML = '';

  for (const personaje of array) {
    $resultSection.innerHTML += `
   
    <div class=" column w-full flex-wrap  comic sm: bg-black min-w-80 md:min-w-32 md:min-h-15    justify-center items-center m-8  ">
        <div class="comic-img-container m-8 ">
              <img class="img" id ="${personaje.id}" src="${personaje.image}" alt="">
        </div>
        <h1 class="comic-title min-h-24 bg-black text-white m-2">nombre :${personaje.name}</h1>
        <h3 class="comic-title min-h-24 bg-black text-white ">Genero:  ${personaje.gender === "Female"
        ? "Mujer"
        : personaje.gender === "Male"
          ? "Hombre"
          : personaje.gender === "Genderless"
            ? "Sin género"
            : personaje.gender === "Unknown"
              ? "Género desconocido"
              : "Género no especificado"
      }</h3>
        <h3 class="comic-title min-h-24 bg-black text-white ">Estado: ${personaje.status === "Alive"
        ? "Está vivo"
        : personaje.status === "Dead"
          ? "No está vivo"
          : personaje.status === "Unknown"
            ? "Estado desconocido"
            : "Estado no especificado"
      }</h3>
        <h1 id="numeroPage"></h1>
  </div>
  `

  }
  const personajesDibujados = document.querySelectorAll('.img');

  personajesDibujados.forEach(elem => {
    elem.addEventListener("click", async (event) => {

      await obtenerDatos(elem.id)


      const clickId = event.target
      try {
        const { data } = await axios(`https://rickandmortyapi.com/api/character/${clickId.id}`, {

          Authorization: ""
        })
        const arrayPromises = data.episode.map(elem => axios(elem))
        console.log(elem)
        const response = await Promise.all(arrayPromises)
        // Extraer los nombres de los episodios de la respuesta
      const arrayDetailEpisode = response.map(ep => ep.data.name);
      
      console.log(arrayDetailEpisode);

        pintarDatos(data.episode)

        $containCharacter.innerHTML = ""
        $containCharacter.innerHTML = `
        <section id="containCharacter" class="containCharacter bg-white h-full w-full flex justify-center items-center text-2xl flex-wrap  " >
        <img src="${data.image}" alt="" class="character-portrait">
        <div class="character-details bg-white h-full w-full  justify-center items-center text-2xl flex-wrap">
              <h2 class="name h-800 ">${data.name} </h2>
              <h2 class="status">${data.status}</h2>
              <h2 class="species">${data.species}</h2>
              <h2 class="gender">${data.gender}</h2>
              <div>
              <button class="flex justify-end" id="buttonReturn" type="button" id="firstPage" class="first-page " aria-label="Pagina Previa">
              <i class="fa-solid fa-angles-left text-2xl md:text-4xl m-5  text-black"></i>
        </button>
              </div>
              <div>Episodios</div>
              <div class="flex flex-col   justify-center items-center m-8">${arrayDetailEpisode}</div>

        </div>
  </section>`
        $resultSection.style.display = "none";
        $containCharacter.style.display = "block";
        $pagination.style.display = "none"
        const $buttonReturn = $("#buttonReturn")

        //----boton volver----///

        $buttonReturn.addEventListener("click", async () => {
          console.log($buttonReturn)
          $resultSection.innerHTML = ""
          $resultSection.innerHTML = `<div class="loader "></div>`
          currentPage = 1
          $numeroPage.innerText = currentPage

          try {
            const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}`)



            const personajes = data.results;
            console.log(personajes)
            $resultSection.style.display = "block";
            $pagination.style.display = "block"
            $containCharacter.style.display = "none";

            pintarDatos(personajes)


          } catch (error) {
            console.log(error)
          }
        })



      } catch (error) {
        console.log(error)

      }
    })
  })
}



//---------botones de paginacion--------//
$firstPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div class="loader "></div>`
  currentPage = 1
  $numeroPage.innerText = currentPage

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}`)



    const personajes = data.results;
    console.log(personajes)


    pintarDatos(personajes)


  } catch (error) {

  }
})

$lastPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div class="loader "></div>`
  currentPage = 42
  console.log(currentPage)
  $numeroPage.innerText = currentPage

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=42`)
    const personajes = data.results;
    console.log(personajes)
    pintarDatos(personajes)

  } catch (error) {

  }
})

$previousPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div class="loader "></div>`
  currentPage -= 1
  $numeroPage.innerText = currentPage
  if (currentPage < 1) {
    alert("Ya estás en la primera página. No puedes ir a una página anterior.");
    return $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`;
  }
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}`)



    const personajes = data.results;
    console.log(personajes)
    pintarDatos(personajes)

  } catch (error) {

  }
})

$nextPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div class="loader "></div>`
  currentPage += 1
  $numeroPage.innerText = currentPage
  if (currentPage > 42) {
    alert("Ya estás en la ultima página. No puedes ir a una página posterior.");
    return $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`;
  }
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}&status=${inputPersonajeStatus}`)



    const personajes = data.results;

    console.log(personajes)
    pintarDatos(personajes)

  } catch (error) {

  }

})

//----filtro por status-----//

const $searchStatus = $("#search-status")

$searchStatus.addEventListener("change", async () => {
  console.log($searchStatus)

  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="loader "></div>`

  const inputPersonajeStatus = $searchStatus.value
  console.log(inputPersonajeStatus)
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character/?&status=${inputPersonajeStatus}`)

    console.log(data)
    console.log(7)
    $resultSection.style.display = "block";
    $containCharacter.style.display = "none";
    $pagination.style.display = "block"


    const personajes = data.results;
    console.log(personajes)
    pintarDatos(personajes)

  } catch (error) {
    console.log(error)
  }

})

//-----FILTRO POR GENERO ----///

const $selectGender = $("#selectGender")
const inputPersonajeStatus = $searchStatus.value
$selectGender.addEventListener("change", async () => {
  console.log($selectGender)


  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="loader "></div>`

  const inputGender = $selectGender.value
  console.log(inputGender)
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character/?gender=${inputGender}&status=${inputPersonajeStatus}`)



    console.log(data)
    console.log(7)
    $resultSection.style.display = "block";
    $containCharacter.style.display = "none";
    $pagination.style.display = "block"


    const personajes = data.results;
    console.log(personajes)
    pintarDatos(personajes)

  } catch (error) {
    console.log(error)
  }

})




window.onload = async () => {
  try {

    const { data } = await axios("https://rickandmortyapi.com/api/character/")
    const personajes = data.results
    console.log(personajes)
    pintarDatos(personajes)


  } catch (error) {
    console.log(error)
  }

}







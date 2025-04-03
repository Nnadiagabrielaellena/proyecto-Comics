

fetch(`https://rickandmortyapi.com/api/character`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))


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
  const $selectFiltro = $("#selectFiltro");
  
  let currentPage = 1;
  let pageMax = 0;
  let personajes = [];
  let datos = [];














////
$buttonSearch.addEventListener("click", async () => {
  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="loader "></div>`

  const personajeBuscado = $inputtextSearch.value;
  const episodioSeleccionado = $selectFiltro.value;
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
    $selectFiltro.addEventListener("input",async()=>{
      $resultSection.innerHTML = "";
      $resultSection.innerHTML = `<div class="loader "></div>`
      try {
        const {data}= await axios(`https://rickandmortyapi.com/api/episode/?${arrayDetailEpisode}`)
    
    //pintar
    //data
    const arrayPromises = data.episode.map(elem => axios(elem))
    const response = await Promise.all(arrayPromises)
    const arrayDetailEpisode = response.map(elem =>elem.data)
    console.log(arrayDetailEpisode)
    pintarDatos(personajes)
      } catch (error) {
        console.log(error)
      }
    
    })
    



    // pageMax = response.info.pages


//----obtener datos----//
async function obtenerDatos() {
  console.log(2)
  try {
    const { data } = await axios("https://rickandmortyapi.com/api/character")
    datos = data.results
    console.log(datos)
  } catch (error) {

  }
  console.log(obtenerDatos)
}

//-----------pintar datos-------//
function pintarDatos(array) {
  $resultSection.innerHTML = '';

  for (const personaje of array) {
    $resultSection.innerHTML += ` <div class="flex-wrap comic sm: bg-black min-w-80 md:min-w-32 md:min-h-32  ">
        <div class="comic-img-container bg-black min-h-96  ">
              <img class="img" id ="${personaje.id}" src="${personaje.image}" alt="">
        </div>
        <h1 class="comic-title min-h-24 bg-black text-white m-2">nombre :${personaje.name}</h1>
        <h3 class="comic-title min-h-24 bg-black text-white ">Genero:${personaje.gender === "Female" ? "Mujer" : "Hombre"}</h3>
        <h3 class="comic-title min-h-24 bg-black text-white ">Estado:${personaje.status === "alive" ? " Esta vivo" : " No esta vivo"}</h3>
        <h1 id="numeroPage"></h1>
  </div>`

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
        $containCharacter.innerHTML = ""
        $containCharacter.innerHTML = `
        <section id="containCharacter" class="containCharacter bg-white h-full w-full flex justify-center items-center text-2xl" >
        <img src="${data.image}" alt="" class="character-portrait">
        <div class="character-details">
              <h2 class="name h-800">${data.name}</h2>
              <h2 class="status">${data.status}</h2>
              <h2 class="species">${data.species}</h2>
              <h2 class="gender">${data.gender}</h2>

        </div>
  </section>`
        $resultSection.style.display = "none";
        $containCharacter.style.display = "block";
        $pagination.style.display = "none"


      } catch (error) {
        console.log(error)

      }
    })
  })
}




//---------botones de paginacion--------//
$firstPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div><img class="" src="./style/img/fin.jpg"></div>`
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
  $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`
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
  $resultSection.innerHTML = `<1>loading</1>`
  currentPage -= 1
  $numeroPage.innerText = currentPage
  if (currentPage < 1) {
    alert("Ya estás en la primera página. No puedes ir a una página anterior.");
    return $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`;
  }
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}`)



    const personajes = response.data.results;
    console.log(personajes)
    pintarDatos(personajes)

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
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}`)



    const personajes = data.results;

    console.log(personajes)
    pintarDatos(personajes)

  } catch (error) {

  }

})

//----filtro por status-----//

const $searchStatus =$("#search-status")

$searchStatus.addEventListener("change", async()=>{

  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="loader "></div>`

  inputPersonajeStatus= $searchStatus.value
  console.log(inputPersonajeStatus)
  try {
    const {data}=  await axios(`https://rickandmortyapi.com/api/character/?name=rick&status=${inputPersonajeStatus}`)
    
   
    console.log(7)
    $resultSection.style.display = "block";
    pintarDatos(data.results)
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
    pintarPersonajes(personajes)

  } catch (error) {

  }



}












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
const charactersSection = $("#charactersSection")

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
    console.log(data)
    pageMax = data.info.pages
    console.log(pageMax)
    pintarDatos(data.results)

    $resultSection.style.display = "flex";
    $containCharacter.style.display = "none";
    $pagination.style.display = "none"
    $charactersSection.style.display = "none"

  } catch (error) {
    $resultSection.innerHTML = `<div><h1 class="text-white tex-2xl flex flex-col justify-center items-center font-['Alfa_Slab_One'] ">no hay resultados</h1><img class=" flex flex-col justify-center items-center " src="./style/img/no.jpg"></div>`
    $pagination.style.display = "none"
    console.log(error)
  }
})


//----obtener datos----//
async function obtenerDatos(tipoBusqueda) {

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character`)
    console.log(data)
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
   
    <div class=" flex flex-col   comic sm: bg-black min-w-80 md:min-w-32 md:min-h-15    justify-center items-center m-8  ">
        <div class="comic-img-container m-8 ">
              <img class="img rounded-xl w-72 h-auto transition-all duration-300 ease-in-out 
              shadow-lg hover:scale-105 hover:shadow-cyan-400/50 
              cursor-pointer" id ="${personaje.id}" src="${personaje.image}" alt="">
        </div>
        <h1 class="comic-title min-h-24 bg-black text-white text-3xl font-['Lilita_One']  m-2">Nombre :${personaje.name}</h1>
        <h3 class="comic-title min-h-24 bg-black text-white text-2xl font-['Lilita_One'] ">Genero:  ${personaje.gender === "Female"
        ? "Mujer"
        : personaje.gender === "Male"
          ? "Hombre"
          : personaje.gender === "Genderless"
            ? "Sin género"
            : personaje.gender === "Unknown"
              ? "Género desconocido"
              : "Género no especificado"
      }</h3>
        <h3 class="comic-title min-h-24 bg-black text-white text-2xl font-['Lilita_One']">Estado: ${personaje.status === "Alive"
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

        const arrayDetailEpisode = response.map(ep => ep.data.name);

        console.log(arrayDetailEpisode);

        pintarDatos(data.episode)

        $containCharacter.innerHTML = ""
        $containCharacter.innerHTML = `
        <section id="containCharacter" class=" bg-white flex justify-center items-center flex-wrap sm: bg-black min-w-80 md:min-w-32 md:min-h-15  " >
        <img src="${data.image}" alt="" class="character-portrait ">
        <div class="flex flex-col character-details bg-white h-full w-full  justify-center items-center text-2xl flex-wrap">
              <h2 class="name h-800  h-full w-full flex justify-center items-center text-2xl font-['Lilita_One'] ">${data.name} </h2>
              
              <div>
              <button class="flex justify-end" id="buttonReturn" type="button"  class="first-page " aria-label="Pagina Previa">
              <i class="fa-solid fa-angles-left text-2xl md:text-4xl m-5  text-black rounded-xl w-72 h-auto transition-all duration-300 ease-in-out 
              shadow-lg hover:scale-105 hover:shadow-cyan-400/50 
              cursor-pointer"></i>
        </button>
              </div>
              <div class="flex flex-col   justify-center items-center m-8 text-3xl text-2xl font-['Lilita_One']">Episodios</div>
              <div class="flex flex-col   justify-center items-center m-8 text-2xl font-['Lilita_One'] ">
              ${arrayDetailEpisode.map((episode, index) => `
              <button class="episode-btn" data-index="${index}">${episode}</button>
            `).join('')}</div>

        </div>
  </section>`
        $resultSection.style.display = "none";
        $containCharacter.style.display = "block";
        $pagination.style.display = "none"
        $buttonReturn = $("#buttonReturn")

        //---------boton para obtener personajes de episodio---//

        const episodeButtons = document.querySelectorAll('.episode-btn');
        const $charactersSection = $("#charactersSection")

        episodeButtons.forEach((button) => {
          button.addEventListener('click', async (event) => {
            const episodeIndex = event.target.dataset.index;
            const episodeUrl = data.episode[episodeIndex];

            try {
              const episodeResponse = await axios(episodeUrl);
              console.log(episodeResponse)
              const characterUrls = episodeResponse.data.characters;


              const characterPromises = characterUrls.map(url => axios(url));
              const characterResponse = await Promise.all(characterPromises);


              const characterNames = characterResponse.map(character => character.data.name);


              const charactersList = characterNames.map(name => `<p>${name}</p>`).join('');

              $charactersSection.innerHTML = `<div class="flex justify-center items-center flex-wrap sm: bg-black min-w-80 md:min-w-32 md:min-h-15 ">
              <h2 class="text-3xl text-white"></h2>
                <h3 class="text-white text-3xl m-8  font-[Lilita One]">Personajes en este episodio: ${episodeResponse.data.name}</h3>
                <div class="flex flex-col text-white text-2xl  h-full w-full justify-center items-center bold">${charactersList}</div>
                <button id="buttonReturn2"  class="flex justify-center items-center rounded-xl w-72 h-auto transition-all duration-300 ease-in-out 
                shadow-lg hover:scale-105 hover:shadow-cyan-400/50 
                cursor-pointer" type="button"  class="first-page " aria-label="Pagina Previa">
              <i class="fa-solid fa-angles-left text-2xl md:text-4xl m-5  text-white"></i>
        </button>
        </div>
              `;

              $resultSection.style.display = "none";
              $containCharacter.style.display = "none";
              $charactersSection.style.display = "flex"
              $pagination.style.display = "none"
              const $buttonReturn2 = $("#buttonReturn2")

              $buttonReturn2.addEventListener("click", async () => {
                console.log($buttonReturn2)
                $resultSection.innerHTML = ""
                $resultSection.innerHTML = `<div class="loader "></div>`
                currentPage = 1
                $numeroPage.innerText = currentPage

                try {
                  const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}`)



                  const personajes = data.results;
                  console.log(personajes)
                  $resultSection.style.display = "flex";
                  $pagination.style.display = "block"
                  $containCharacter.style.display = "none";
                  $charactersSection.style.display = "none"

                  pintarDatos(personajes)


                } catch (error) {
                  console.log(error)
                }
              })


            } catch (error) {
              console.error('Error al obtener los personajes:', error);
            }
          });
        });






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
            $resultSection.style.display = "flex";
            $pagination.style.display = "flex"
            $containCharacter.style.display = "none";

            pintarDatos(array)


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
  const inputGender = $selectGender.value
  currentPage = 1
  $numeroPage.innerText = currentPage

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}&status=${inputPersonajeStatus}&gender=${inputGender}`)



    const personajes = data.results;
    console.log(personajes)


    pintarDatos(personajes)


  } catch (error) {

  }
})

$lastPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div class="loader "></div>`
  const inputGender = $selectGender.value
  currentPage = pageMax
  console.log(pageMax)

  console.log(currentPage)
  $numeroPage.innerText = currentPage

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}&status=${inputPersonajeStatus}&gender=${inputGender}`)
    const personajes = data.results;
    console.log(personajes)
    pintarDatos(personajes)
    pageMax = data.info.pages
  } catch (error) {

  }
})

$previousPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div class="loader "></div>`

  const inputGender = $selectGender.value
  currentPage -= 1
  $numeroPage.innerText = currentPage
  if (currentPage < 1) {
    alert("Ya estás en la primera página. No puedes ir a una página anterior.");
    return $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`;
  }
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}&status=${inputPersonajeStatus}&gender=${inputGender}`)



    const personajes = data.results;
    console.log(personajes)
    pintarDatos(personajes)
    pageMax = data.info.pages
  } catch (error) {

  }
})

$nextPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div class="loader "></div>`

  const inputGender = $selectGender.value
  currentPage += 1
  $numeroPage.innerText = currentPage

  if (currentPage > pageMax) {
    alert("Ya estás en la ultima página. No puedes ir a una página posterior.");
    return $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`;
  }
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}&status=${inputPersonajeStatus}&gender=${inputGender}`)



    const personajes = data.results;

    console.log(personajes)
    pintarDatos(personajes)

  } catch (error) {

  }

})

//----filtro por status-----//

const $searchStatus = $("#search-status")
const $charactersSection = $("#charactersSection")
$searchStatus.addEventListener("change", async () => {
  currentPage = 1;


  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="loader "></div>`
  const inputGender = $selectGender.value
  const inputPersonajeStatus = $searchStatus.value
  console.log(inputPersonajeStatus)
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character/?page=${currentPage}&status=${inputPersonajeStatus}&gender=${inputGender}`)
    pageMax = data.info.pages
    console.log(data)
    console.log(7)
    $resultSection.style.display = "block";
    $containCharacter.style.display = "none";
    $pagination.style.display = "flex"
    $charactersSection.style.display = "none"


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
  currentPage = 1;


  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="loader "></div>`

  const inputGender = $selectGender.value
  console.log(inputGender)

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character/?page=${currentPage}&gender=${inputGender}&status=${inputPersonajeStatus}`)
    pageMax = data.info.pages

    $resultSection.style.display = "block";
    $containCharacter.style.display = "none";
    $pagination.style.display = "flex";
    $charactersSection.style.display = "none"


    const personajes = data.results;
    
    pintarDatos(personajes)

  } catch (error) {
    console.log(error)
  }

})




window.onload = async () => {
  try {

    const { data } = await axios("https://rickandmortyapi.com/api/character/")
    const personajes = data.results

    pageMax = data.info.pages
    console.log(personajes)
    pintarDatos(personajes)


  } catch (error) {
    console.log(error)
  }

}







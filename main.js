




const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelector(element);

const $searchTitle = $("#search-title ");
const $searchSort = $("#search-sort ");
const $resultSection = $("#resultSection");
const $inputtextSearch = $("#input-text-search");
const $buttonSearch = $("#button-search");
const $sortContainer =$("#sort-container")
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
const $searchStatus = $("#search-status")
const $charactersSection = $("#charactersSection")
const $selectGender = $("#selectGender")
const inputPersonajeStatus = $searchStatus.value

let currentPage = 1;
let pageMax = 0;
let personajes = [];
let datos = [];
let tipoBusqueda = "character"



const $inputType = $("#inputType")
/////
$inputType.addEventListener("input", async (e) => {
  tipoBusqueda = e.target.value === "episode" ? "episode" : "character";
  $resultSection.innerHTML = `<div class="loader"></div>`;

  const personajeBuscado = $inputtextSearch.value;

  try {
    if (tipoBusqueda === "character") {
      // Búsqueda directa por personaje
      const { data } = await axios(`https://rickandmortyapi.com/api/character/?name=${personajeBuscado}`);
      console.log(data);
      pageMax = data.info.pages;
      pintarPersonajes(data.results);

    } else if (tipoBusqueda === "episode") {
      // Buscar personaje y luego sus episodios
      const { data } = await axios(`https://rickandmortyapi.com/api/character/?name=${personajeBuscado}`);
      const personaje = data.results[0]; // Tomamos el primero que coincida
      const arrayPromises = personaje.episode.map(url => axios(url));
      const response = await Promise.all(arrayPromises);
      const episodios = response.map(res => res.data);
      pintarEpisodios(episodios);
    }

    $resultSection.style.display = "flex";
    $containCharacter.style.display = "none";
    $pagination.style.display = "none";
    $charactersSection.style.display = "none";
    $sortContainer.style.display ="none"


  } catch (error) {
    $resultSection.innerHTML = `
      <div>
        <h1 class="text-white tex-2xl flex flex-col justify-center items-center font-['Alfa_Slab_One']">No hay resultados</h1>
        <img class="flex flex-col justify-center items-center" src="./style/img/no.jpg">
      </div>`;
    $pagination.style.display = "none";
    console.log(error);
  }
});
function pintarEpisodios(episodios) {
  if (!episodios || episodios.length === 0) {
    $resultSection.innerHTML = `<p class="text-white text-xl">No se encontraron episodios para este personaje.</p>`;
    return;
  }

  $resultSection.innerHTML = episodios.map(episodio => `
    <div class="card bg-gray-800 text-white p-4 m-2 rounded shadow card bg-gray-800 text-white p-4 m-2 rounded shadow ">
      <h2 class="text-lg font-bold text-white text-3xl font-['Lilita_One'] m-2">${episodio.name}</h2>
      <p><strong>Temporada / Episodio:</strong> ${episodio.episode}</p>
      <p><strong>Fecha de emisión:</strong> ${episodio.air_date}</p>
    </div>
  `).join('');
}
function pintarPersonajes(personajes) {
  $resultSection.innerHTML = personajes.map(personaje => `
    <div class="card">
      <img class="rounded-xl w-72 h-auto transition-all duration-300 ease-in-out shadow-lg hover:scale-105 hover:shadow-cyan-400/50 cursor-pointer" src="${personaje.image}" alt="${personaje.name}">
      <h2 class=" text-[#f25c05] text-3xl font-['Lilita_One'] m-2">${personaje.name}</h2>
      
    </div>
  `).join('');
}




//----obtener datos----//
async function obtenerDatos(tipoBusqueda) {
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/${tipoBusqueda}`)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

//-----------pintar datos-------//
const $imgPreviousPage = $("#imgPreviousPage")
function pintarDatos(array) {
  $resultSection.innerHTML = '';

  for (const item of array) {
    if (tipoBusqueda === "character") {
      // Pintar personajes
      $resultSection.innerHTML += `
        <div class="bg-green-500 m-4 p-4 rounded-xl shadow-xl border-4 border-green-400 transition hover:shadow-cyan-500/50 flex flex-col comic sm:bg-green-500 min-w-80 md:min-w-32 md:min-h-15 justify-center items-center m-8">
          <div class="comic-img-container m-8  ">
            <img class="img bg-[#f4f1e0] rounded-xl w-72 h-auto transition-all duration-300 ease-in-out shadow-lg hover:scale-105 hover:shadow-cyan-400/50 cursor-pointer" id="${item.id}" src="${item.image}" alt="">
          </div>
          <h1 class="comic-title min-h-24 bg-green-500 text-[#f25c05] text-shadow tracking-wide text-4xl font-['Lilita_One']  rounded-lg m-2"> ${item.name}</h1>
          <h3 class="comic-title min-h-24 bg-green-500 text-gray-800 text-2xl font-['Lilita_One'] inten-center"> ${item.gender === "Female"
              ? "Mujer"
              : item.gender === "Male"
              ? "Hombre"
              : item.gender === "Genderless"
              ? "Sin género"
              : item.gender === "Unknown"
              ? "Género desconocido"
              : "Género no especificado"
            }</h3>
          <h3 class="comic-title min-h-24 bg-green-500 text-gray-800 text-2xl font-['Lilita_One']"> ${item.status === "Alive"
              ? "Está vivo"
              : item.status === "Dead"
              ? "No está vivo"
              : item.status === "Unknown"
              ? "Estado desconocido"
              : "Estado no especificado"
            }</h3>
        </div>
      `;
    } else if (tipoBusqueda === "episode") {
     
      // Pintar episodios
      $resultSection.innerHTML += `
        <div class="bg-[#f4f1e0] m-4 p-4 rounded-lg shadow-md hover:shadow-green-500/50 flex flex-col min-w-80 md:min-w-32 justify-center items-center m-8">
          <h1 class="text-white text-3xl font-['Lilita_One'] m-2">Episodio: ${item.episode}${arrayDetailEpisode}</h1>
          <h2 class="text-white text-2xl font-['Lilita_One'] m-2">Nombre: ${item.name}</h2>
          <h3 class="text-white text-xl font-['Lilita_One'] m-2">Fecha de emisión: ${item.air_date}</h3>
        </div>
      `;
    }
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
        <section id="containCharacter" class=" bg-[#f4f1e0] flex justify-center items-center flex-wrap sm: bg-[#60a5fa] min-w-80 md:min-w-32 md:min-h-15  " >
        <img src="${data.image}" alt="" class="character-portrait bg-[#f4f1e0]">
        <div class="flex flex-col character-details bg-[#f4f1e0] h-full w-full  justify-center items-center text-2xl flex-wrap">
              <h2 class="name h-800  h-full w-full flex justify-center items-center text-2xl font-['Lilita_One'] ">${data.name} </h2>
              
              <div>
              <button class="flex justify-end" id="buttonReturn" type="button"  class="first-page " aria-label="Pagina Previa">
              <i class="fa-solid fa-angles-left text-2xl md:text-4xl m-5  text-black rounded-xl w-72 h-auto transition-all duration-300 ease-in-out 
              shadow-lg hover:scale-105 hover:shadow-cyan-400/50 
              cursor-pointer"></i>
        </button>
              </div>
              <div class="flex flex-col   justify-center items-center m-8 text-3xl text-2xl font-['Lilita_One']"> Elija episodio para ver sus personajes:</div>
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
              $charactersSection.innerHTML = `<div class="flex justify-center items-center flex-wrap sm:bg-[#f4f1e0] min-w-80 md:min-w-32 md:min-h-15 ">
              <h2 class="text-3xl text-white"></h2>
                <h3 class="text-gray-800 text-3xl m-8  font-[Lilita One]">Personajes en este episodio: ${episodeResponse.data.name}</h3>
                <div class="flex flex-col text-gray-800 text-2xl  h-full w-full justify-center items-center bold">${charactersList}</div>
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
  const inputGender = $selectGender.value;
  const inputPersonajeStatus = $searchStatus.value;
  currentPage = 1
  $numeroPage.innerText = currentPage

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}&status=${inputPersonajeStatus}&gender=${inputGender}`)
    const personajes = data.results;

    pintarDatos(personajes)
  } catch (error) {

  }
})

$lastPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div class="loader "></div>`
  const inputGender = $selectGender.value;
  const inputPersonajeStatus = $searchStatus.value;
  currentPage = pageMax

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

  const inputGender = $selectGender.value;
  const inputPersonajeStatus = $searchStatus.value;
  currentPage -= 1
  $numeroPage.innerText = currentPage
  if (currentPage < 1) {
    alert("Ya estás en la primera página. No puedes ir a una página anterior.");
    return $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`;
  }
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}&status=${inputPersonajeStatus}&gender=${inputGender}`)
    const personajes = data.results;

    pintarDatos(personajes)
    pageMax = data.info.pages
  } catch (error) {

  }
})

$nextPage.addEventListener("click", async () => {
  $resultSection.innerHTML = ""
  $resultSection.innerHTML = `<div class="loader "></div>`

  const inputGender = $selectGender.value;
  const inputPersonajeStatus = $searchStatus.value;
  currentPage += 1
  $numeroPage.innerText = currentPage

  if (currentPage > pageMax) {
    alert("Ya estás en la ultima página. No puedes ir a una página posterior.");
    return $resultSection.innerHTML = `<img class="" src="./style/img/fin.jpg">`;
  }
  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character?page=${currentPage}&status=${inputPersonajeStatus}&gender=${inputGender}`)
    const personajes = data.results;
    pintarDatos(personajes)

  } catch (error) {
  }
})

//----filtro por status-----//
$searchStatus.addEventListener("change", async () => {
  currentPage = 1;
  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="loader "></div>`
  const inputGender = $selectGender.value
  const inputPersonajeStatus = $searchStatus.value

  try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character/?page=${currentPage}&gender=${inputGender}&status=${inputPersonajeStatus}`)
    pageMax = data.info.pages
    $resultSection.style.display = "flex";
    $containCharacter.style.display = "none";
    $pagination.style.display = "flex"
    $charactersSection.style.display = "none"
const personajes = data.results;
    pintarDatos(personajes)

  } catch (error) {
    console.log(error)
  }

})

//-----FILTRO POR GENERO ----///
$selectGender.addEventListener("change", async () => {
  currentPage = 1;
  $resultSection.innerHTML = "";
  $resultSection.innerHTML = `<div class="loader "></div>`
const inputGender = $selectGender.value
  
try {
    const { data } = await axios(`https://rickandmortyapi.com/api/character/?page=${currentPage}&gender=${inputGender}&status=${inputPersonajeStatus}`)
    pageMax = data.info.pages

    $resultSection.style.display = "flex";
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
    const { data } = await axios(`https://rickandmortyapi.com/api/${tipoBusqueda}/`)
    const personajes = data.results
    pageMax = data.info.pages
    
    pintarDatos(personajes)
  } catch (error) {
    console.log(error)
  }

}







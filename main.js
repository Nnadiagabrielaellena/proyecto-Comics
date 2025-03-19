const ts = Date.now()
const publickey =`7c88bf808bf110223b5bd7ba75631e68`
const privateKey =`70691225ad343a98131b0d15185f1f45436f1273`

const hash = md5(`${ts}${privateKey}${publickey}`)

fetch(`https://gateway.marvel.com/v1/public/characters?&ts=${ts}&apikey=${publickey}&hash=${hash}`)
    .then(response =>response.json())
    .then(data =>console.log(data))
    .catch(error =>console.log(error))


    const $= (element) => document.querySelector(element);
    const $$ = (element) => document.querySelector(element);


    const $searchTitle = $("#search-title ") ;
    const $searchSort = $("#search-sort ") ;
    const $resultSection =$("#resultSection")
    

    function pintarDatos(array){
        for (const imagenesApi of array)
        $resultSection.innerHTML ="";
        $resultSection.innerHTML +=` ${response.data.results}`
    }
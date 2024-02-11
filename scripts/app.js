const $ = document
const inputWordElm = $.getElementById('inp-word')
const searchBtnElm = $.getElementById('search-btn')
const resultTemp = $.getElementById('result')
const audioElm = $.getElementById('sound')

async function sendReq() {
    try{
        let res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWordElm.value}`)
        if(res.status < 300) generateHTMLTemp(res.data)
    }catch (err){
        errHandler()
        console.log(err);
    }
}

function generateHTMLTemp(data) {
    const infos = data[0]
    resultTemp.innerHTML = `
        <div class="word">
          <h3>${infos.word}</h3>
          <button onclick="playAudioHandler('${infos.phonetics[0].audio}')">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="details">
          <p>${infos.meanings[0].partOfSpeech}</p>
          <p>${infos.phonetic}</p>
        </div>
        <p class="word-meaning">
            ${infos.meanings[0].definitions[0].definition}
        </p>
        <p class="word-example">
            ${infos.meanings[0].definitions[0].example ?? ''}
        </p>
    `
}

function playAudioHandler(src) {
    audioElm.src = src
    audioElm.play()
}

function errHandler() {
    resultTemp.innerHTML = `
        <h1 class="error">Couldn't find the world</h1>
    `
}

function checkInputHandler() {
    if(inputWordElm.value !== "" || inputWordElm.value !== " "){
        sendReq()
    }
}

searchBtnElm.addEventListener('click', sendReq)

inputWordElm.addEventListener('keyup', function (event){
    if(event.key === 'Enter') sendReq()
})
const audios = [{
    src: 'audios/audio1.wav',
    translate: 'Eles não estavam com fome.',
    sentence: "They weren't hungry"
},{
    src: 'audios/audio2.wav',
    translate: 'Taiwan é um país.',
    sentence: "Taiwan is a country"
},{
    src: 'audios/audio3.wav',
    translate: 'Ele vai para a Alemanha.',
    sentence: "He goes to Germany"
},{
    src: 'audios/audio4.wav',
    translate: 'Te vejo em um minuto.',
    sentence: "See you in a minute"
},{
    src: 'audios/audio5.wav',
    translate: 'Não tenho tempo livre.',
    sentence: "I have no free time"
}]


var currentAudio = 0

const translateButton = document.querySelector('#translate')
const myVoiceButton = document.querySelector('#my-voice')
const sentenceButton = document.querySelector('#sentence')

const translateArea = document.querySelector('#area-translate')
const myVoiceArea = document.querySelector('#area-my-voice')
const sentenceArea = document.querySelector('#area-sentence')

translateButton.addEventListener('click',()=>{
    
    if(translateButton.checked){
        translateArea.style.display = "block"
    }else{
        translateArea.style.display = "none"
    }
})

myVoiceButton.addEventListener('click',()=>{
    
    if(myVoiceButton.checked){
        myVoiceArea.style.display = "block"
    }else{
        myVoiceArea.style.display = "none"
    }
})

sentenceButton.addEventListener('click',()=>{
    
    if(sentenceButton.checked){
        sentenceArea.style.display = "block"
    }else{
        sentenceArea.style.display = "none"
    }
})


const play = document.querySelector('#start-bt')

const translateText = document.querySelector('#txt-translate')
const myVoiceText = document.querySelector('#txt-my-voice')
const sentenceText = document.querySelector('#txt-sentence')
const acertoMessage = document.querySelector('#txt-message')

play.addEventListener('click', () => {
    const audio = document.querySelector('#voice')
    play.textContent = 'Falando...'
    audio.play()

    audio.addEventListener('timeupdate', () => {
        
        
        if (audio.currentTime == audio.duration) {
            play.textContent = 'Sua vez!'
            play.style.backgroundColor = "green"
            start()
        }

    })
})


function start() {
    const recognition = new webkitSpeechRecognition()
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = function (e) {
        let transcript = e.results[0][0].transcript
        myVoiceText.textContent = transcript
        audioOver(transcript)
    }

    function audioOver(transcript){
        play.textContent = 'Play'
        play.style.backgroundColor = "red"
        let transcriptArr = transcript.split(' ') 
        let correctPercent = audios[currentAudio].sentence.split(' ')

        //console.log(correctPercent)
        let correctWords = 0

        console.log(correctPercent)
       for(let i = 0; i < transcriptArr.length; i++){
        if(transcriptArr[i] != undefined && correctPercent[i] != undefined){
            if(transcriptArr[i].toLowerCase() == correctPercent[i].toLowerCase()){
                correctWords ++
            }
        }
        }

        let acertosPercent = Math.ceil(correctWords * 100 / correctPercent.length)
      
        if(acertosPercent < 50){
            acertoMessage.textContent = "Não entendi nada!"
        }else if(acertosPercent > 50 && acertosPercent < 70){
            acertoMessage.textContent = "Consegui entender mais ou menos, pode repetir por favor?"
        }else if(acertosPercent > 70 && acertosPercent < 100){
            acertoMessage.textContent = "Nossa entendi quase tudo, fala mais uma vez, só pra eu ter certeza!"
        }else if(acertosPercent == 100){
            acertoMessage.textContent = "PERFEITO! FALOU IGUAL A UM NATIVO!!"
        }

    }
    
}

const nextButton = document.querySelector('#next')
const backButton = document.querySelector('#back')

nextButton.addEventListener('click',() =>{
    myVoiceText.textContent = ''
    acertoMessage.textContent = ''

    play.textContent = 'Play'
    play.style.backgroundColor = "red"

    const audio = document.querySelector('#voice')

    if(currentAudio >= 0){
        currentAudio ++
    }
    if (currentAudio == audios.length){
        currentAudio = 0
    }

    audio.src = audios[currentAudio].src
    translateText.textContent = audios[currentAudio].translate
    sentenceText.textContent = audios[currentAudio].sentence
})

backButton.addEventListener('click',() =>{
    myVoiceText.textContent = ''
    acertoMessage.textContent = ''

    play.textContent = 'Play'
    play.style.backgroundColor = "red"

    const audio = document.querySelector('#voice')

    if(currentAudio > 0){
        currentAudio --
    }
    if (currentAudio == 0){
        currentAudio = audios.length - 1
    }

    audio.src = audios[currentAudio].src
    translateText.textContent = audios[currentAudio].translate
    sentenceText.textContent = audios[currentAudio].sentence
})


function startConfigs (){
    const audio = document.querySelector('#voice')
    audio.src = audios[currentAudio].src
    translateText.textContent = audios[currentAudio].translate
    sentenceText.textContent = audios[currentAudio].sentence
}

startConfigs()
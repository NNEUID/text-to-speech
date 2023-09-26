"use strict";

const playBtn = document.getElementById('button')
const audioElement = document.getElementById('audio')

// Disacle/Enable Button

function toggleButton() {
  playBtn.disabled = !playBtn.disabled
}

const API_KEY = '6de0a0c28c084f9d8410ad7a34948813'
const JOKE_API_BASE_URL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'



// Passing Joke to VoiceRSS API
function tellMe(apiKey, joke) {
  VoiceRSS.speech({
    key: apiKey,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}



// Get Jokes from Jokes API
async function getJokes(URL) {
  // Disable button when fetching Joke
  let joke = ''
  try {
    const response = await fetch(URL)
    const data = await response.json()
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`
    } else {
      joke = data.joke
    }
    // Text-to-speech
    tellMe(API_KEY, joke)
    // Disable Button
    toggleButton()
  } catch (error) {
    console.log('Oops', error);
  }
  return joke
}


// Event Listeners
playBtn.addEventListener('click', () => {
  getJokes(JOKE_API_BASE_URL)
})
audioElement.addEventListener('ended', toggleButton)


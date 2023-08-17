const form = document.querySelector("#form");
const btnPlay = document.getElementById("btn-play");
const btnPause = document.querySelector(".btn-pause");
const btnNoun = document.querySelector(".btn-noun");
const btnVerb = document.querySelector(".btn-verb");

// Changing the button active state color
const buttons = document.querySelector('.tabs');
buttons.addEventListener('click', (e) => {
    if (e.target.className === 'btn-noun') {
        btnNoun.classList.add('active');
        btnVerb.classList.remove('active');
    } else if (e.target.className === 'btn-verb') {
        btnNoun.classList.remove('active');
        btnVerb.classList.add('active');
    }
});


//Updating the Tab container to preview the defination
const tabContainer = document.querySelector('.container .tab-container');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const value = document.querySelector(".searchBox").value;
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;

    try {
        const apiResponse = await fetch(apiUrl);
        const res = await apiResponse.json();

        //word
        const word = res[0].word;

        //meanings and part of speech
        const meanings = res[0].meanings;
        const nounMeaning = meanings.find(meaning => meaning.partOfSpeech === 'noun');
        const verbMeaning = meanings.find(meaning => meaning.partOfSpeech === 'verb');

        //definitions from noun and verb meanings
        const nounDefinitions = nounMeaning.definitions.map(definition => definition.definition);
        console.log(nounDefinitions[0]);
        console.log(nounDefinitions[1]);
        const verbDefinitions = verbMeaning.definitions.map(definition => definition.definition);
        console.log(verbDefinitions[0]);
        console.log(verbDefinitions[1]);

        //audio urls
        // const audioUrl = res[0].phonetics.map(phonetic => phonetic.text === "/ˈæp.əl/").audio;
        const audioUrl = res[0].phonetics[0].audio;

        const audioElement = document.getElementById("audio");
        audioElement.src = audioUrl;

        //Phonetic
        const phonetic = res[0].phonetic;
        const phoneticText = document.querySelector('.play p');
        phoneticText.textContent = phonetic;

        const meaningText = document.querySelector('.meaning-text');
        meaningText.innerHTML = `
            <p>1. ${nounDefinitions[0]}</p>
            <p>2. ${nounDefinitions[1]}</p>
        `;

        // Show the appropriate play/pause button
        if (audioUrl) {
            btnPlay.classList.remove('hide');
            btnPause.classList.add('hide');
        } else {
            btnPlay.classList.add('hide');
            btnPause.classList.add('hide');
        }

    } catch (error) {
        console.log('something went wrong', error);
    }
});

btnPlay.addEventListener('click', () => {
    const audioElement = document.getElementById("audio");

    if (audioElement.paused) {
        audioElement.play();
        btnPlay.classList.add('hide');
        btnPause.classList.remove('hide');
    } else {
        audioElement.pause();
        btnPause.classList.add('hide');
        btnPlay.classList.remove('hide');
    }
});

import {triggerConfetti} from "../src/confetti/confetti";
import {triggerColoredConfetti, triggerEmojiConfetti} from "../src/confetti/emoji-confetti";
import {createElement} from "../src/html-utils";
import {spaceCatEmojis} from "../src/emojis/sets";

import './index.scss';
import {getAvailableVoices, getSelectedVoice, getVoiceListElement, speak} from "../src/speech/speech";
// import {MatchingPairsField} from "../src/game-bases/matching-pairs/MatchingPairsField";
import {setOf12} from "../src/emojis/sets";
import {randomInt} from "../src/random-utils";

let speechBtn, voices, voiceListElement;

function initPlayground() {
    // const pairs = setOf12.map((text) => ({ card1: {text}, card2: {text} }));
    // const cardField = new MatchingPairsField(pairs);
    // document.body.appendChild(cardField.element);
    const confettiBtn = createElement({tag: 'button', text: 'Confetti!', onClick: () => triggerConfetti()});
    document.body.appendChild(confettiBtn);
    const emojiConfettiBtn = createElement({tag: 'button', text: '😻️ Confetti!', onClick: () => triggerEmojiConfetti(spaceCatEmojis)});
    document.body.appendChild(emojiConfettiBtn);
    const confettiBtn2 = createElement({tag: 'button', text: 'Other Confetti!', onClick: () => triggerColoredConfetti()});
    document.body.appendChild(confettiBtn2);

    speechBtn = createElement({tag: 'button', text: '📢', onClick: () => speakEmoji()});
    document.body.appendChild(speechBtn);

    // speech
    getAvailableVoices().then((_voices) => {
        voices = _voices;
        voiceListElement = getVoiceListElement(voices, true);
        document.body.appendChild(voiceListElement);
    });
}

async function speakEmoji() {
    const text = setOf12[randomInt(setOf12.length)];
    const voice = voiceListElement && getSelectedVoice(voiceListElement, voices);
    const prevText = speechBtn.innerHTML;
    speechBtn.innerHTML = text;
    speechBtn.setAttribute('disabled', 'disabled');
    speechBtn.classList.add('activated');
    await speak(text, voice);
    speechBtn.classList.remove('activated');
    speechBtn.removeAttribute('disabled');
    speechBtn.innerHTML = prevText;
}

// INIT
initPlayground();

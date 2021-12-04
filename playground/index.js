// import {triggerConfetti} from "../src/confetti/confetti";
// import {triggerColoredConfetti, triggerEmojiConfetti} from "../src/confetti/emoji-confetti";
// import {createElement} from "../src/html-utils";
// import { spaceCatEmojis} from "../src/emojis/sets";

import './index.scss';
import {MatchingPairsField} from "../src/game-bases/matching-pairs/MatchingPairsField";
import {setOf12} from "../src/emojis/sets";

function initPlayground() {
const pairs = setOf12.map((text) => ({ card1: {text}, card2: {text} }));

    const cardField = new MatchingPairsField(pairs);
    document.body.appendChild(cardField.element);
    // const confettiBtn = createElement({tag: 'button', text: 'Confetti!', onClick: () => triggerConfetti()});
    // document.body.appendChild(confettiBtn);
    // const emojiConfettiBtn = createElement({tag: 'button', text: '😻️ Confetti!', onClick: () => triggerEmojiConfetti(spaceCatEmojis)});
    // document.body.appendChild(emojiConfettiBtn);
    // const confettiBtn2 = createElement({tag: 'button', text: 'Other Confetti!', onClick: () => triggerColoredConfetti()});
    // document.body.appendChild(confettiBtn2);
}

// INIT
initPlayground();

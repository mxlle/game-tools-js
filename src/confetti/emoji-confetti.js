import JSConfetti from 'js-confetti';
import {addCanvasToBody, setElementToWindowSize} from "../html-utils";
import {allColors} from "../colors/consts";
import {rainbowEmojis} from "../emojis/sets";

let _confettiCannon, _canvas;

function getConfettiCannon() {
    if (!_canvas) {
        _canvas = addCanvasToBody();
        setElementToWindowSize(_canvas);
        window.addEventListener('resize', () => setElementToWindowSize(_canvas), false);
    }

    if (!_confettiCannon) {
        _confettiCannon = new JSConfetti({ canvas: _canvas });
    }

    return _confettiCannon;
}

export function triggerColoredConfetti(confettiColors, confettiNumber) {

    // initial values
    confettiColors = confettiColors ?? allColors;
    confettiNumber = confettiNumber ?? 250;

    const confettiCannon = getConfettiCannon();
    if (!confettiCannon) return;

    confettiCannon.addConfetti({
        confettiColors,
        confettiNumber,
        confettiRadius: 5,
    });
}

export function triggerEmojiConfetti(emojis, confettiNumber) {
    // initial values
    emojis = emojis ?? rainbowEmojis;
    confettiNumber = confettiNumber ?? 70;

    const confettiCannon = getConfettiCannon();
    if (!confettiCannon) return;

    confettiCannon.addConfetti({
        confettiNumber,
        emojiSize: 40,
        emojis,
    });
}

import { create } from 'canvas-confetti';
import {addCanvasToBody, setElementToWindowSize} from "../html-utils";
import {allColors} from "../colors/consts";

let _confettiCannon, _canvas;

function getConfettiCannon() {
    if (!_canvas) {
        _canvas = addCanvasToBody();
        setElementToWindowSize(_canvas);
        window.addEventListener('resize', () => setElementToWindowSize(_canvas), false);
    }

    if (!_confettiCannon) {
        _confettiCannon = create(_canvas, {
            resize: true,
        })
    }

    return _confettiCannon;
}

export function triggerConfetti(colors, particleCount) {
    // initial values
    colors = colors ?? allColors;
    particleCount = particleCount ?? 100;

    const confettiCannon = getConfettiCannon();
    if (!confettiCannon) return;

    const CONFETTI_BASE_OPTIONS = {
        colors: colors,
        startVelocity: 70,
        particleCount,
        spread: 60
    }
    confettiCannon({
        ...CONFETTI_BASE_OPTIONS,
        angle: 125,
        origin: { x: 1, y: 1 },
    });
    confettiCannon({
        ...CONFETTI_BASE_OPTIONS,
        angle: 55,
        origin: { x: 0, y: 1 }
    });
}

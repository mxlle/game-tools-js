import {createElement} from "../html-utils";

import './flip-card.scss';

const SHOW_BACK_CSS_CLASS = 'show-back-of-card';
const ANIMATION_CSS_CLASS = 'card-spin-animation';

export class FlipCard {
    id;
    element;

    constructor(id, frontText, frontImg, backText, onClick) {
        this.id = id;
        this.element = createElement({cssClass: 'card flip-card', onClick: () => onClick(this)});
        const frontEl = createElement({cssClass: 'card-front', text: frontText});
        if (frontImg) {
            const img = createElement({tag: 'img'});
            img.setAttribute('src', frontImg);
            frontEl.appendChild(img);
        }
        const backEl = createElement({cssClass: 'card-back', text: backText});
        const contentEl = createElement({cssClass: 'card-content'});
        contentEl.appendChild(frontEl);
        contentEl.appendChild(backEl);
        this.element.appendChild(contentEl);
    }

    showFront() {
        if (this.element.classList.contains(SHOW_BACK_CSS_CLASS)) {
            this.element.classList.remove(SHOW_BACK_CSS_CLASS);
            return true;
        }
    }

    showBack() {
        if (!this.element.classList.contains(SHOW_BACK_CSS_CLASS)) {
            this.element.classList.add(SHOW_BACK_CSS_CLASS);
            return true;
        }
    }

    addAnimation() {
        this.element.classList.add(ANIMATION_CSS_CLASS);
    }
}

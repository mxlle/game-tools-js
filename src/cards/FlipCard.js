import {createElement} from "../html-utils";

import './flip-card.scss';

const SHOW_BACK_CSS_CLASS = 'show-back-of-card';

export class FlipCard {
    content;
    element;

    constructor(frontText, backText, onClick) {
        this.content = {frontText, backText};
        this.element = createElement({cssClass: 'card flip-card', onClick: () => onClick(this)});
        const frontEl = createElement({cssClass: 'card-front', text: frontText});
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
}

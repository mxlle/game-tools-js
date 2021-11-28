import {FlipCard} from "./FlipCard";
import {createElement} from "../html-utils";

import './cards.scss';
import {shuffleArray} from "../random-utils";

const VISIBLE_CARDS_THRESHOLD = 2;

export class CardField {
    cards = [];
    visibleCards = [];
    element;

    constructor(cardTexts) {
        this.cards = [...cardTexts, ...cardTexts].map((text) => new FlipCard(text, '?', (card) => this.flipCard(card)));
        this.element = createElement({cssClass: 'card-field'});
        const cardsGrid = createElement({cssClass: 'cards-grid'});
        shuffleArray(this.cards).forEach((card) => {
            card.showBack();
            cardsGrid.appendChild(card.element);
        });
        this.element.appendChild(cardsGrid);
    }

    flipCard(card) {
        const flipped = card.showFront();

        if (flipped) {
            if (this.visibleCards.length === VISIBLE_CARDS_THRESHOLD) {
                this.visibleCards.forEach((card) => card.showBack());
                this.visibleCards = [card];
            } else {
                this.visibleCards.push(card);
            }
        } else {
            card.showBack();

            const index = this.visibleCards.indexOf(card);
            if (index > -1) {
                this.visibleCards.splice(index, 1);
            }
        }
    }
}

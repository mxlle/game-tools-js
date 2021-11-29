import {FlipCard} from "../../cards/FlipCard";
import {createElement, setBodyStyleProperty} from "../../html-utils";

import './matching-pairs.scss';
import {shuffleArray} from "../../random-utils";
import {triggerConfetti} from "../../confetti/confetti";

const VISIBLE_CARDS_THRESHOLD = 2;

export class MatchingPairsField {
    cards = [];
    visibleCards = [];
    wonPairs = [];
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
        this.calculateNumOfColumns();
        window.addEventListener('resize', () => this.calculateNumOfColumns(), false);
    }

    flipCard(card) {
        if (this.wonPairs.includes(card)) return;

        const flipped = card.showFront();

        if (flipped) {
            if (this.visibleCards.length === VISIBLE_CARDS_THRESHOLD) {
                this.visibleCards.forEach((card) => card.showBack());
                this.visibleCards = [card];
            } else {
                this.visibleCards.push(card);
            }
            this.checkForMatchingPair();
        } else {
            card.showBack();

            const index = this.visibleCards.indexOf(card);
            if (index > -1) {
                this.visibleCards.splice(index, 1);
            }
        }
    }

    checkForMatchingPair() {
        if (this.visibleCards.length === VISIBLE_CARDS_THRESHOLD) {
            const text = this.visibleCards[0].content.frontText;
            if (this.visibleCards.every((card) => card.content.frontText === text)) {
                this.wonPairs.push(...this.visibleCards);
                this.visibleCards = [];
                setTimeout(() => triggerConfetti(), 500);
                if (this.wonPairs.length === this.cards.length) {
                    this.triggerWinGame();
                }
            }
        }
    }

    triggerWinGame() {
        setTimeout(() => {
            this.cards.forEach((card) => {
                card.addAnimation();
            });
        }, 1000);
    }

    calculateNumOfColumns() {
        const height = window.innerHeight;
        const width = window.innerWidth;
        const sizeRatio = width / height;
        const cardRoot = Math.sqrt(this.cards.length);
        let num = Math.ceil(sizeRatio * cardRoot);
        const size = width / num;
        if (size * (this.cards.length / num) > height) {
            num++;
        }
        setBodyStyleProperty('--grid-columns', num);
    }
}

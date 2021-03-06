import {FlipCard} from "../../cards/FlipCard";
import {createElement, setBodyStyleProperty} from "../../html-utils";

import './matching-pairs.scss';
import {shuffleArray} from "../../random-utils";
import {triggerConfetti} from "../../confetti/confetti";
import {Toolbar} from "./Toolbar";

const VISIBLE_CARDS_THRESHOLD = 2;
const HIGH_SCORE_KEY = 'matching_pairs_score';

export class MatchingPairsField {
    cards = [];
    visibleCards = [];
    wonPairs = [];
    numOfMoves = 0;
    element;
    toolbar;

    constructor(pairs) {
        const BACK_TEXT = '?';
        const onClick = (card) => this.flipCard(card);
        const cards = [];
        pairs.forEach((pair, index) => {
            cards.push(new FlipCard(index, pair.card1.text, pair.card1.img, BACK_TEXT, onClick));
            cards.push(new FlipCard(index, pair.card2.text, pair.card2.img, BACK_TEXT, onClick));
        })
        this.cards = cards;
        this.element = createElement({cssClass: 'card-field'});
        const cardsGrid = createElement({cssClass: 'cards-grid'});
        shuffleArray(this.cards).forEach((card) => {
            card.showBack();
            cardsGrid.appendChild(card.element);
        });
        this.toolbar = new Toolbar(this.cards.length, window.localStorage.getItem(HIGH_SCORE_KEY));
        this.element.appendChild(this.getHeader());
        this.element.appendChild(cardsGrid);
        this.element.appendChild(this.toolbar.element);
        this.calculateNumOfColumns();
        window.addEventListener('resize', () => this.calculateNumOfColumns(), false);
    }

    flipCard(card) {
        if (this.wonPairs.includes(card)) return;

        this.numOfMoves++;
        this.toolbar.updateMoves(this.numOfMoves);

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
            const id = this.visibleCards[0].id;
            if (this.visibleCards.every((card) => card.id === id)) {
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
        this.updateHighScore();
        setTimeout(() => {
            this.cards.forEach((card) => {
                card.addAnimation();
            });
        }, 1000);
    }

    calculateNumOfColumns() {
        const height = window.innerHeight - 140; // - header & footer
        const width = window.innerWidth;
        const sizeRatio = width / height;
        const cardRoot = Math.sqrt(this.cards.length);
        let num = Math.ceil(sizeRatio * cardRoot);
        const size = width / num;
        if (size * (this.cards.length / num) > height) {
            num++;
        }
        num = Math.min(num, 8);
        setBodyStyleProperty('--grid-columns', num);
    }

    restartGame() {
        window.location.reload();
    }

    getHeader() {
        const startButton = createElement({tag: 'button', text: 'Restart', onClick: () => this.restartGame()});
        const header = createElement({cssClass: 'game-header', text: 'Matching Pairs'});
        header.appendChild(startButton);
        return header;
    }

    updateHighScore() {
        const currentHighScore = Number(window.localStorage.getItem(HIGH_SCORE_KEY) || undefined);
        if (isNaN(currentHighScore) || currentHighScore > this.numOfMoves) {
            window.localStorage.setItem(HIGH_SCORE_KEY, this.numOfMoves.toString());
        }
    }
}

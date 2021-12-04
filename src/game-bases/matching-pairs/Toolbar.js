import {createElement} from "../../html-utils";

export class Toolbar {
    element;
    movesElement;

    constructor(numOfCards, currentHighScore) {
        this.element = createElement({cssClass: 'game-toolbar'});
        this.movesElement = createElement({cssClass: 'game-toolbar-moves', text: 'Moves: 0'});
        const statisticsElement = createElement({cssClass: 'game-toolbar-statistics', text: `Best score: ${currentHighScore ?? '-'}, Min: ${numOfCards}, Med: ${numOfCards * 2.5}, Max: ${numOfCards * 4}`});
        this.element.appendChild(this.movesElement);
        this.element.appendChild(statisticsElement);
    }

    updateMoves(newValue) {
        this.movesElement.innerHTML = `Moves: ${newValue}`;
    }
}

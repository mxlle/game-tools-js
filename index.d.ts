declare module 'game-tools-js' {
    // colors
    export const allColors: string[];
    // confetti
    export const triggerConfetti: (colors: string[], particleCount: number) => void;
    export const triggerColoredConfetti: (colors: string[], particleCount: number) => void;
    export const triggerEmojiConfetti: (emojis: string[], particleCount: number) => void;
    // emoji util
    export const splitEmojis: (emojiString: string) => string[];
    export const isCharacterEmoji: (char: string) => boolean;
    export const isMovingEmoji: (emoji: string) => boolean;
    // emoji sets
    export const spaceCatEmojis: string[];
    export const rainbowEmojis: string[];
    export const christmasEmojis: string[];
    export const setOf12: string[];
    export const smileys: string;
    export const catSmileys: string;
    export const gestures: string;
    export const bodyParts: string;
    export const clothingAndAccessories: string;
    export const animals: string;
    export const nature: string;
    export const weatherAndEarth: string;
    export const foodAndDrink: string;
    export const activityAndSport: string;
    export const travelAndPlaces: string;
    export const objects: string;
    // random util
    export const shuffleArray: (array: any[]) => any[];
    export const randomInt: (max: number) => number;
}

declare module 'game-tools-js' {
    export const allColors: string[];
    export const triggerConfetti: (colors: string[], particleCount: number) => void;
    export const triggerColoredConfetti: (colors: string[], particleCount: number) => void;
    export const triggerEmojiConfetti: (emojis: string[], particleCount: number) => void;
    export const splitEmojis: (emojiString: string) => string[];
    export const isCharacterEmoji: (char: string) => boolean;
    export const isMovingEmoji: (emoji: string) => boolean;
    export const shuffleArray: (array: any[]) => any[];
    export const randomInt: (max: number) => number;
}

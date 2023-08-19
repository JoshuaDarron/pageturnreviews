export enum ReviewTypes {
    ChatGPT = 'ChatGPT',
    NYT = 'NYT',
    Amazon = 'Amazon'
}

export type Review = {
    title?: string,
    authors?: string,
    review: string,
    reason: string,
    rating: number,
    type: ReviewTypes
}
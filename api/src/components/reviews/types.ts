export enum ReviewTypes {
    ChatGPT = 'ChatGPT',
    NYT = 'NYT',
    Amazon = 'Amazon'
}

export type Review = {
    book_id: string,
    review: string,
    reason: string,
    rating: number,
    type: ReviewTypes
}
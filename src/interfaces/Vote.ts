export default interface Vote {
    user_id: string,
    split: boolean,
    votes: { submission_id: number, points: number }[]
}
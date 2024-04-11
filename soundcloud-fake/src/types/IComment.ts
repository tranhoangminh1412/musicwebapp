export type IComment = {
    id: number;
    contents: {
        id: number;
        authorId: number;
        content: string;
    }[];
};
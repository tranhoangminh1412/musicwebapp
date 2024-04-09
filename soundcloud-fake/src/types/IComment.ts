export type IComment = {
    id: number;
    contents: {
        authorId: number;
        content: string;
    };
};
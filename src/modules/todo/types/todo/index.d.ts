export module Todo {
    export interface ITodo {
        _id?: string
        description: string
        done: boolean
        createdAt?: Date
        startedAt?: Date
        workTime?: number
    }
}

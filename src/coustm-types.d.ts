interface AuthUser {
    id : string
    cid ?: string
    name :string
    email : string
}

declare namespace Express {
    export interface Request{
        user ?:AuthUser
    }
}


export interface userProps {
    id: string,
    admin: boolean,
    age: number,
    avatar: string,
    email: string,
    name: string,
    password: string,
    listMessage: any[]
    status: "active" | "inactive"
}
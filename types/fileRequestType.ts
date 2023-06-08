export default interface FileRequestType{
    id: number,
    creator_uid: string,
    accessor_uid: string,
    file_id: number,
    approved: boolean,
    created_at: any,
    [key:string]:any
}
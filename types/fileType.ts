export default interface FileTypes{
    id: number;
    creator_uid: string;
    title: string;
    file_url: string;
    created_at: any;
    secret_code: string;
    visibility: 'Private' | 'Public'
}
import { UploadFileType } from "~/types/formFieldTypes"

const user = useSupabaseUser()
const supabase = useSupabaseClient()

// save file
export default const save_user_file = async (file_url: string, formBody: UploadFileType) => {
    let { data, error: err } = await supabase
        .from("files")
        .insert([
            {
                secret_code: formBody.secretCode,
                file_url: file_url,
                visibility: formBody.visibility,
                title: formBody.file[0].name,
                creator_uid: user.value?.id
            } as never,
        ]);

    if (err) {
        throw createError({
            message: err.message,
            statusCode: 400
        })
    }

    return data;
};
import FileTypes from "~/types/fileType";

export async function createAndUploadTempFile(name: string, extension: string): Promise<any> {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()
    try {
        // Create a temporary file path
        let file = new File([""], `${name}${extension}`)

        // Upload the temporary file to Supabase storage
        const { data, error } = await supabase.storage
            .from(config.public.SUPABASE_BUCKET)
            .upload(`${new Date().toISOString()}_${name}${extension}`, file);

        if (error) {
            throw error.message;
        }

        // get public URL
        const file_url = supabase.storage.from(config.public.SUPABASE_BUCKET).getPublicUrl(data.path);
        return file_url.data.publicUrl;
    } catch (error: any) {
        console.error('Error:', error);
        throw error?.message;
    }
}

export async function saveFileDetails(formBody: any, file_url: string) {
    const supabase = useSupabaseClient()
    const user = useSupabaseUser()
    try {
        const { data, error } = await supabase.from('files').insert([
            {
                secret_code: formBody?.secret_code,
                file_url: file_url,
                visibility: formBody.visibility,
                title: `${formBody.file_name}${formBody.file_type}`,
                creator_uid: user.value?.id
            } as never
        ]);
        if (error) {
            throw error.message;
        }
        return data;
    } catch (error: any) {
        console.error('Error:', error);
        throw error?.message;
    }
}

export async function deleteSupabaseStorageFile(file_url: string) {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()
    try {
        const { data, error } = await supabase.storage
            .from(config.public.SUPABASE_BUCKET)
            .remove([file_url]);
        if (error) {
            throw error.message;
        }
        return data;
    } catch (error: any) {
        console.error('Error:', error);
        throw error?.message;
    }
}

export async function deleteSupabaseFile(file: FileTypes) {
    const supabase = useSupabaseClient()
    const config = useRuntimeConfig()

    try {
        let file_url = file.file_url.split(config.public.SUPABASE_BUCKET + '/')[1];
        await deleteSupabaseStorageFile(file_url);
        
        const { data, error } = await supabase.from('files').delete().eq('id', file.id);
        if (error) {
            throw error.message;
        }
        return data;
    } catch (error: any) {
        console.error('Error:', error);
        throw error?.message;
    }
}
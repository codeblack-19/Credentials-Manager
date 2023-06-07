import FileTypes from "~/types/fileType";

export const useFileStore = definePiniaStore("fileStore", () => {
  const files = ref<FileTypes[]>();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const selected_file = ref<FileTypes | null>(null);
  const previewUriToken = ref<string | null>(null);

  const getFiles = async () => {
    const { data } = await supabase
      .from("files")
      .select("*")
      .eq("creator_uid", user.value?.id)
      .order("id", { ascending: false });

    files.value = data ?? [];
  };

  const setPreviewUriToken = async (fileId: number, file: FileTypes) => {
    previewUriToken.value = crypto.randomUUID();
    selected_file.value = file;
  }

  return { files, selected_file, previewUriToken, getFiles, setPreviewUriToken };
});

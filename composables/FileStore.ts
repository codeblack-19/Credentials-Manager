import FileRequestType from "~/types/fileRequestType";
import FileTypes from "~/types/fileType";

export const useFileStore = definePiniaStore("fileStore", () => {
  const files = ref<FileTypes[]>();
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const selected_file = ref<FileTypes | null>(null);
  const previewUriToken = ref<string | null>(null);
  const requestFiles = ref<FileRequestType[]>();
  const public_files = ref<FileTypes[]>();
  const loading = ref<boolean>(false)
  const approvedRequestedFiles = ref<FileRequestType[]>();

  const getUserFiles = async () => {
    const { data } = await supabase
      .from("files")
      .select("*")
      .eq("creator_uid", user.value?.id)
      .order("id", { ascending: false });

    files.value = data ?? [];
  };

  const getOtherUserFiles = async () => {
    const { data } = await supabase
      .from("files")
      .select("*")
      .neq("creator_uid", user.value?.id)
      .eq("visibility", "Public")
      .order("id", { ascending: false });

    public_files.value = data ?? [];
  };

  const setPreviewUriToken = async (fileId: number, file: FileTypes) => {
    previewUriToken.value = crypto.randomUUID();
    selected_file.value = file;
  };

  const getRequestedFile = async (fileId: number) => {
    const { data } = await supabase
      .from("file_requests")
      .select("*")
      .eq("file_id", fileId)
      .single();

    return data;
  };

  const getOneFile = async (fileId: number) => {
    const { data } = await supabase
      .from("files")
      .select("*")
      .eq("id", fileId)
      .single();

    return data;
  }

  const getRequestedFiles = async () => {
    const { data } = await supabase
      .from("file_requests")
      .select("*")
      .or(`accessor_uid.eq.${user.value?.id}, creator_uid.eq.${user.value?.id}`)
      .order("id", { ascending: false })

    requestFiles.value =  data ?? [];
  }

  const getUserApprovedFiles = async () => {
    const { data } = await supabase
      .from("file_requests")
      .select("*, files(*)")
      .eq("accessor_uid", user.value?.id)
      .eq("approved", true)
      .order("id", { ascending: false })

    approvedRequestedFiles.value =  data ?? [];
  }
  
  return {
    loading,
    files,
    selected_file,
    previewUriToken,
    requestFiles,
    public_files,
    approvedRequestedFiles,
    getUserFiles,
    setPreviewUriToken,
    getOtherUserFiles,
    getRequestedFile,
    getOneFile,
    getRequestedFiles,
    getUserApprovedFiles
  };
});

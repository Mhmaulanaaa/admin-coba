import { api } from "~/services/ApiService";
export const usePPID = () => {
    const { toast, confirmDelete } = useSwal();
    const { $toast } = useNuxtApp();

    const ppid = useState<any[]>("ppid_data", () => []);
    const loading = useState<boolean>("ppid_loading", () => false);
    const loadingMore = useState<boolean>("ppid_loading_more", () => false);

    const currentPage = useState<number>("ppid_page", () => 1);
    const lastPage = useState<number>("ppid_last_page", () => 1);

    const URL = {
        base: "api/ppid",
    };

    /* =====================
       GET LIST + SEARCH + PAGINATION
    ===================== */
    const loadData = async (
        params?: { search?: string; jenis_ppid?: string; page?: number },
        isAppend = false
    ) => {
        if (typeof window === "undefined") return;

        if (isAppend) {
            loadingMore.value = true;
        } else {
            loading.value = true;
            currentPage.value = 1;
        }

        try {
            const response = await api.get(URL.base, {
                params,
            });

            if (response) {
                const result = response.data; // Laravel pagination

                if (isAppend) {
                    ppid.value = [...ppid.value, ...result.data];
                } else {
                    ppid.value = result.data;
                }

                currentPage.value = result.current_page;
                lastPage.value = result.last_page;

                return result;
            }
        } catch (error: any) {
            console.error(error);
            const msg =
                error.data?.message || error.message || "Terjadi kesalahan";
            $toast.error(`Gagal Load Data PPID: ${msg}`);
            return false;
        } finally {
            loading.value = false;
            loadingMore.value = false;
        }
    };

    /* =====================
       LOAD MORE (INFINITE SCROLL)
    ===================== */
    const loadMore = async (params?: { search?: string; jenis_ppid?: string }) => {
        if (currentPage.value >= lastPage.value) return;

        const nextPage = currentPage.value + 1;

        await loadData(
            {
                ...params,
                page: nextPage,
            },
            true
        );
    };

    /* =====================
       GET DETAIL
    ===================== */
    const getPPID = async (id: number | string) => {
        try {
            const response = await api.get(`${URL.base}/${id}`);
            return response;
        } catch (error: any) {
            console.error(error);
            const msg =
                error.data?.message || error.message || "Terjadi kesalahan";
            $toast.error(`Gagal Fetch Detail: ${msg}`);
            return false;
        }
    };

    /* =====================
       CREATE (UPLOAD FILE)
    ===================== */
    const addPPID = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append("nama_ppid", data.nama_ppid);
            formData.append("jenis_ppid", data.jenis_ppid);
            formData.append("file_ppid", data.file_ppid);

            const response = await api.post(URL.base, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast("Data PPID berhasil ditambahkan!");
            await loadData({ page: 1 });

            return true;
        } catch (error: any) {
            console.error(error);
            const msg =
                error.data?.message || error.message || "Terjadi kesalahan";
            $toast.error(`Gagal Tambah PPID: ${msg}`);
            return false;
        }
    };

    /* =====================
       UPDATE
    ===================== */
    const updatePPID = async (id: number | string, data: any) => {
        try {
            const formData = new FormData();
            formData.append("nama_ppid", data.nama_ppid);
            formData.append("jenis_ppid", data.jenis_ppid);

            // optional file
            if (data.file_ppid) {
                formData.append("file_ppid", data.file_ppid);
            }

            const response = await api.post(`${URL.base}/${id}?_method=PUT`, formData);

            toast("Data PPID berhasil diperbarui!");
            await loadData({ page: currentPage.value });

            return true;
        } catch (error: any) {
            console.error(error);
            const msg =
                error.data?.message || error.message || "Terjadi kesalahan";
            $toast.error(`Gagal Update PPID: ${msg}`);
            return false;
        }
    };

    /* =====================
       DELETE (SOFT DELETE)
    ===================== */
    const deletePPID = async (id: number | string) => {
        try {
            const result = await confirmDelete();
            if (!result.isConfirmed) return;

            await api.delete(`${URL.base}/${id}`);

            toast("Data PPID berhasil dinonaktifkan 🗑️");
            await loadData({ page: 1 });

            return true;
        } catch (error: any) {
            console.error(error);
            const msg =
                error.data?.message || error.message || "Terjadi kesalahan";
            $toast.error(`Gagal Hapus PPID: ${msg}`);
            return false;
        }
    };

    return {
        ppid,
        loading,
        loadingMore,
        currentPage,
        lastPage,
        loadData,
        loadMore,
        getPPID,
        addPPID,
        updatePPID,
        deletePPID,
    };
};
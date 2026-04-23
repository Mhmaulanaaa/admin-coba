import { setUnauthorizedHandler } from "~/services/ApiService";
import { destroyToken } from "~/services/StorageService";

export default defineNuxtPlugin(() => {
    setUnauthorizedHandler(() => {
        const { $toast } = useNuxtApp();

        $toast.error("Sesi Anda telah habis. Silakan login kembali.");

        destroyToken();
        navigateTo("/login");
    });
});
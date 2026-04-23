import { api } from "~/services/ApiService";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            api,
        },
    };
});
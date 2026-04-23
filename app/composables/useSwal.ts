import Swal from "sweetalert2"

export const useSwal = () => {

    // 🔔 TOAST (utama untuk notif sukses)
    const toast = (message: string, icon: any = "success") => {
        const colors: any = {
            success: "linear-gradient(135deg, #16a34a, #22c55e)",
            error: "linear-gradient(135deg, #dc2626, #ef4444)",
            warning: "linear-gradient(135deg, #f59e0b, #fbbf24)",
        }

        return Swal.fire({
            toast: true,
            position: "top-end",
            icon,
            title: message,
            showConfirmButton: false,
            timer: 2200,
            timerProgressBar: true,
            background: colors[icon] || colors.success,
            color: "#fff",
            customClass: {
                popup: "rounded-xl shadow-xl px-4 py-3",
                title: "text-sm font-semibold",
            },
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer)
                toast.addEventListener("mouseleave", Swal.resumeTimer)
            },
        })
    }

    // ⚠️ CONFIRM DELETE
    const confirmDelete = () => {
        return Swal.fire({
            title: "Hapus data?",
            text: "Data tidak bisa dikembalikan",
            icon: "warning",

            width: 380,
            padding: "0.5rem",

            showCancelButton: true,
            confirmButtonText: "Ya, hapus",
            cancelButtonText: "Batal",
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#64748b",
            customClass: {
                popup: "rounded-2xl",
                title: "text-base font-semibold text-xs",
                htmlContainer: "text-xs text-gray-500",
                confirmButton: "px-2 py-1 text-xs rounded-lg",
                cancelButton: "px-2 py-1 text-xs rounded-lg",
            },
        })
    }

    return {
        toast,
        confirmDelete,
    }
}
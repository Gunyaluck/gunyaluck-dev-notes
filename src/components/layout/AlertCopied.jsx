import { toast } from "sonner";

export function showCopiedToast() {
    toast.success("Copied!", {
        description: "This article has been copied to your clipboard.",
        duration: 3000,
        style: {
            backgroundColor: "var(--color-brand-green-neon)",
            border: "none",
        },
        classNames: {
            title: "text-headline-4 font-semibold text-brown-600",
            description: "body-1-brown-600",
            closeButton: "text-brown-600 hover:text-brown-800",
        },
    });
}
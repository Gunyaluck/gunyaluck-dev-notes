import { Copy, Facebook, Linkedin, Twitter } from "lucide-react";
import { showCopiedToast } from "../layout/AlertCopied";

export function ShareButtons({ url }) {
    return (
        <div className="w-full lg:w-auto h-[48px] flex items-center justify-between lg:justify-start gap-2 lg:gap-3">
            <button
                onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(url);
                        showCopiedToast();
                    } catch (err) {
                        console.error("Failed to copy:", err);
                    }
                }}
                className="w-[161px] h-[48px] flex items-center justify-center gap-2 px-4 py-2 border border-brown-300 rounded-full bg-white hover:bg-brown-100 transition-colors lg:w-[185px]"
            >
                <Copy className="w-4 h-4 text-brown-600" />
                <span className="body-1-brown-600">Copy link</span>
            </button>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
                <Facebook className="w-5 h-5 text-white" />
            </a>
            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#0A66C2] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
                <Linkedin className="w-5 h-5 text-white" />
            </a>
            <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
                <Twitter className="w-5 h-5 text-white" />
            </a>
        </div>
    );
}
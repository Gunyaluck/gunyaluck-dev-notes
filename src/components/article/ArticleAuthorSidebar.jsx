export function ArticleAuthorSidebar({ article }) {
    const author = article?.author ?? article?.author_name ?? article?.authorName ?? "";
    const authorAvatar = article?.authorAvatar ?? article?.author_avatar ?? article?.author_profile_pic ?? article?.profile_pic ?? null;
    const authorBio = article?.authorBio ?? article?.author_bio ?? article?.bio ?? "";

    return (
        <div className="hidden lg:block lg:w-[305px] lg:h-[400px] lg:shrink-0 lg:sticky lg:top-[775px] lg:mb-30">
            <div className="bg-brown-200 rounded-lg p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-4 border-b border-brown-300 pb-4">
                        {authorAvatar ? (
                            <img
                                src={authorAvatar}
                                alt={author || "Author"}
                                className="w-11 h-11 rounded-full object-cover shrink-0"
                            />
                        ) : (
                            <div className="w-11 h-11 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                                <span className="text-headline-4 text-white">
                                    {author ? author.charAt(0).toUpperCase() : "A"}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="body-3 text-brown-400">Author</span>
                            <h3 className="text-headline-4 font-semibold">{author || "Unknown Author"}</h3>
                        </div>
                    </div>
                </div>
                {authorBio ? (
                    <p className="body-1-brown-400">{authorBio}</p>
                ) : null}
            </div>
        </div>
    );
}
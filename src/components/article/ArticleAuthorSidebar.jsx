export function ArticleAuthorSidebar({ article }) {
    return (
        <div className="hidden lg:block lg:w-[305px] lg:h-[400px] lg:shrink-0 lg:sticky lg:top-[775px] lg:mb-30">
            <div className="bg-brown-200 rounded-lg p-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-start gap-4 border-b border-brown-300 pb-4">
                        {article?.authorAvatar ? (
                            <img
                                src={article.authorAvatar}
                                alt={article.author || "Author"}
                                className="w-11 h-11 rounded-full object-cover shrink-0"
                            />
                        ) : (
                            <div className="w-11 h-11 rounded-full bg-brand-orange flex items-center justify-center shrink-0">
                                <span className="text-headline-4 text-white">
                                    {article?.author ? article.author.charAt(0).toUpperCase() : "A"}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="body-3 text-brown-400">Author</span>
                            <h3 className="text-headline-4 font-semibold">{article?.author || "Unknown Author"}</h3>
                        </div>
                    </div>
                </div>
                <p className="body-1-brown-400">
                    {article?.authorBio || (
                        <>
                            I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
                            <br />
                            <br />
                            When I'm not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
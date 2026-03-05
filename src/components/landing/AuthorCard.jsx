import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* HeroSection */
export function HeroTitle() {
  return (
    <div className="w-full h-[184px] text-center flex flex-col items-center justify-center gap-4 lg:w-[347px] lg:h-[276px] lg:text-right lg:items-end">
      <h1 className="text-headline-2">
        Stay <br className="hidden lg:block" /> Informed,
        <br className="hidden lg:block" /> Stay Inspired
      </h1>
      <p className="body-1">
        Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
        Inspiration and Information.
      </p>
    </div>
  );
}

export function HeroImage() {
  const [heroImageUrl, setHeroImageUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchLandingAuthor = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/landing-author`);
        const data = response.data;
        const url = data?.profile_pic ?? data?.profilePic ?? data?.avatar ?? data?.hero_image ?? data?.heroImage ?? null;
        if (!cancelled && url) setHeroImageUrl(url);
      } catch (err) {
        if (!cancelled) setHeroImageUrl(null);
      }
    };
    fetchLandingAuthor();
    return () => { cancelled = true; };
  }, []);

  const src = heroImageUrl;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full h-full">
        <img
          src={src}
          alt="Author"
          className="w-[800px] h-[400px] object-fill rounded-2xl"
        />
      </div>
    </div>
  );
}

export function AuthorCard() {
  const [author, setAuthor] = useState({ name: "", bio: "" });

  useEffect(() => {
    let cancelled = false;
    const fetchLandingAuthor = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/landing-author`);
        const data = response.data;
        if (!cancelled) {
          setAuthor({
            name: data?.name ?? "",
            bio: data?.bio ?? "",
          });
        }
      } catch (err) {
        if (!cancelled) setAuthor({ name: "", bio: "" });
      }
    };
    fetchLandingAuthor();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="w-full h-[284px]">
      <div className="w-[347px] h-[284px] flex flex-col justify-center items-center gap-3">
        <div className="w-full flex flex-col gap-1">
          <p className="body-3">-Author</p>
          <h2 className="text-headline-3">{author.name || "Author"}</h2>
        </div>
        {author.bio ? (
          <div className="w-full">
            <p className="body-1 whitespace-pre-line">{author.bio}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/env";

/* HeroSection */
export function HeroTitle() {
  return (
    <div className="w-full h-[184px] text-center flex flex-col items-center justify-center gap-4 lg:w-[347px] lg:h-[276px] lg:text-right lg:items-end">
      <h1 className="text-headline-2">
        Stay Informed,{" "}
        <span className="whitespace-nowrap">Stay Inspired</span>
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
      } catch {
        if (!cancelled) setHeroImageUrl(null);
      }
    };
    fetchLandingAuthor();
    return () => { cancelled = true; };
  }, []);

  const src = heroImageUrl;
  return (
    <div className="w-full h-full flex justify-center items-center">
      <img
        src={src}
        alt="Author"
        className="h-[320px] w-[900px] max-w-full rounded-2xl object-cover"
      />
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
      } catch {
        if (!cancelled) setAuthor({ name: "", bio: "" });
      }
    };
    fetchLandingAuthor();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="w-full h-full">
      <div className="w-[347px] h-full flex flex-col items-center gap-3">
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

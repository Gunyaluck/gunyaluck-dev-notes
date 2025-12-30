import heroImage from "../../assets/images/herosection-pic.jpg";  
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
  return (
    <div className="w-full h-[470px] flex justify-center items-center lg:w-[386px] lg:h-[529px]">
      <div className="w-[343px] h-[470px] lg:w-[386px] lg:h-[529px]">
        <img
          src={heroImage}
          alt="Author with cat in autumn forest"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export function AuthorCard() {
  return (
    <div className="w-full h-[284px]">
      <div className="w-[347px] h-[284px] flex flex-col justify-center items-center gap-3">
        <div className="w-full flex flex-col gap-1">
          <p className="body-3">-Author</p>
          <h2 className="text-headline-3">Thompson P.</h2>
        </div>
        <div className="w-full">
          <p className="body-1">
            I am a pet enthusiast and freelance writer who specializes in animal
            behavior and care. With a deep love for cats, I enjoy sharing
            insights on feline companionship and wellness.
            <br />
            <br />
            When I'm not writing, I spend time volunteering at my local animal
            shelter, helping cats find loving homes.
          </p>
        </div>
      </div>
    </div>
  );
}

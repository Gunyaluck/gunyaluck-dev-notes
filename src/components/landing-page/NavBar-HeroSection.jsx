/* NavBar*/
import logo from "../assets/logo/logo.svg";

export function NavBar() {
  return (
    <nav className="w-full h-[48px] bg-brown-100 border-b border-brown-300 flex items-center justify-between">
      <div className="w-full bg-brown-100 rounded-lg px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="w-[24px] h-[24px] flex items-center gap-1">
          <img src={logo} alt="Logo" className="w-full h-full" />
        </div>

        {/* Hamburger Menu */}
        <button
          className="w-[18px] h-[12px] flex flex-col items-center justify-between cursor-pointer"
          aria-label="Open menu"
        >
          <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
          <span className="w-full h-[2px] rounded-full bg-brown-400"></span>
        </button>
      </div>
    </nav>
  );
}

/* HeroSection */
function HeroTitle() {
  return (
    <div className="w-full h-[184px] text-center flex flex-col items-center justify-center gap-4">
      <h1 className="text-headline-2">Stay Informed, Stay Inspired</h1>
      <p className="body-1">
        Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
        Inspiration and Information.
      </p>
    </div>
  );
}

import heroImage from "../assets/images/herosection-pic.jpg";

function HeroImage() {
  return (
    <div className="w-full h-[470px] flex justify-center items-center">
    <div className="w-[343px] h-[470px]">
      <img
        src={heroImage}
        alt="Author with cat in autumn forest"
        className="w-full h-full object-cover"
      />
    </div>
    </div>
  );
}

function AuthorCard() {
  return (
    <div className="w-full h-[284px] flex justify-center items-center">
    <div className="w-[347px] h-[284px] flex flex-col justify-center items-center gap-3">
      <div className="w-full flex flex-col gap-1">
        <p className="body-3">-Author</p>
        <h2 className="text-headline-3">Thompson P.</h2>
      </div>
      <div className="w-full">
        <p className="body-1">
          I am a pet enthusiast and freelance writer who specializes in animal
          behavior and care. With a deep love for cats, I enjoy sharing insights
          on feline companionship and wellness.
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

export function HeroSection() {
  return (
    <section className="w-full h-[1098px] py-10 px-4 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-10">
        <HeroTitle />
        <HeroImage />
        <AuthorCard />
      </div>
    </section>
  );
}

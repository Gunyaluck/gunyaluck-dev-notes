import { HeroTitle, HeroImage, AuthorCard } from "./AuthorCard";

export function HeroSection() {
  return (
    <section className="w-full h-full py-10 px-4 flex flex-col items-center lg:w-full lg:h-full lg:mx-30 lg:my-15 lg:px-0 lg:py-0 lg:items-center lg:justify-center">
      {/* Mobile View */}
      <div className="flex flex-col gap-10 lg:hidden">
        <HeroTitle />
        <HeroImage />
        <AuthorCard />
      </div>

      {/* Desktop View */}
      <div className="hidden lg:w-full lg:h-full lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-15 pl-40">
        <HeroTitle />
        <div className="flex flex-row gap-15 items-center">
          <HeroImage />
          <AuthorCard />
        </div>
      </div>
    </section>
  );
}

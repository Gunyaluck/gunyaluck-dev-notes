import id1Image from "../../assets/images/id-1.png";
import id2Image from "../../assets/images/id-2.png";
import id3Image from "../../assets/images/id-3.png";
import id4Image from "../../assets/images/id-4.png";
import id5Image from "../../assets/images/id-5.png";
import id6Image from "../../assets/images/id-6.png";
import heroSectionProfileImage from "../../assets/images/herosection-pic.jpg"; 

export function ArticleCard() {
  // Sample article data - replace with actual data later
  const articles = [
    {
      id: 1,
      image: id1Image,
      category: "Cat",
      title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
      description: "Dive into the curious world of cat behavior, exploring why cats knead, purr, and chase imaginary prey. This article helps pet owners decode their feline's actions and understand how their instincts as hunters shape their daily routines.",
      author: "Thompson P.",
      date: "1 September 2024",
      authorAvatar: heroSectionProfileImage 
    },
    {
      id: 2,
      image: id2Image,
      category: "Cat",
      title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
      description: "Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to millions of homes. But what makes cats so special? Let’s dive into the unique traits, behaviors, and quirks that make cats endlessly fascinating.",
      author: "Thompson P.",
      date: "1 September 2024",
      authorAvatar: heroSectionProfileImage 
    },
    {
      id: 3,
      image: id3Image,
      category: "Cat",
      title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
      description: "This article explores strategies to maintain motivation when faced with personal or professional challenges. From setting small goals to practicing mindfulness and surrounding yourself with positive influences, it provides actionable tips to reignite your passion and keep moving forward.",
      author: "Thompson P.",
      date: "1 September 2024",
      authorAvatar: heroSectionProfileImage 
    },
    {
      id: 4,
      image: id4Image,
      category: "Cat",
      title: "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike",
      description: "Discover the fascinating science behind the cat's purr, including its potential healing properties for both cats and humans. Learn how this unique sound is produced and the emotional and physical benefits it brings to both species.",
      author: "Thompson P.",
      date: "1 September 2024",
      authorAvatar: heroSectionProfileImage 
    },
    {
      id: 5,
      image: id5Image,
      category: "Cat",
      title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
      description: "Discover practical ways to nurture creativity in your everyday life. Whether it's through journaling, taking breaks, or exploring new hobbies, this article offers simple yet effective habits to help you tap into inspiration and stay creatively charged.",
      author: "Thompson P.",
      date: "1 September 2024",
      authorAvatar: heroSectionProfileImage 
    },
    {
      id: 6,
      image: id6Image,
      category: "Cat",
      title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
      description: "This guide offers essential tips on keeping your cat in peak health. Covering topics like proper nutrition, regular vet visits, grooming, and mental stimulation, it’s a must-read for cat owners who want to ensure their pets live long, happy lives.",
      author: "Thompson P.",
      date: "1 September 2024",
      authorAvatar: heroSectionProfileImage 
    }
  ];

  return (
    <div className="w-full mt-6 mb-30 px-4 py-0 flex flex-col gap-12 lg:w-full lg:grid lg:grid-cols-2 lg:gap-6">
      {/* Article Cards */}
      {articles.map((article) => (
        <article
          key={article.id}
          className="w-full bg-white rounded-lg flex flex-col gap-4 overflow-hidden cursor-pointer"
        >
          {/* Article Image */}
          <div className="w-full h-[212px] bg-brown-300 rounded-2xl overflow-hidden lg:h-[360px]">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="body-1-brown-400">Image placeholder</span>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="flex flex-col gap-4 px-4 pb-4">
            {/* Category Tag */}
            <div className="w-fit">
              <span className="px-3 py-1 rounded-full bg-brand-green-soft body-2-green-600 font-medium">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-headline-4">
              {article.title}
            </h3>

            {/* Description */}
            <p className="body-2 line-clamp-2">
              {article.description}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-2">
              {article.authorAvatar ? (
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brown-300 flex items-center justify-center">
                  <span className="body-3">TP</span>
                </div>
              )}
              <div className="flex flex-row gap-4 items-center">
                <span className="body-1-brown-600">{article.author}</span>
                <span className="w-px h-4 bg-brown-300"></span>
                <span className="body-2">{article.date}</span>
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* View More Link */}
      <div className="w-full flex justify-center pt-20 lg:col-span-2">
        <button className="body-1-brown-500 hover:text-brown-600 transition-colors underline cursor-pointer">
          View more
        </button>
      </div>
    </div>
  );
}


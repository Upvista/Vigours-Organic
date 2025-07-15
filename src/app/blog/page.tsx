"use client";
import Image from "next/image";

const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Organic Foods That Boost Your Immunity",
    excerpt: "Discover the top organic foods that can help strengthen your immune system and keep you healthy all year round.",
    image: "/assets/b1.jpg",
    date: "June 10, 2025",
    author: "Hamza Hafeez",
    category: "Wellness"
  },
  {
    id: 2,
    title: "How to Start a Healthy Grocery Routine",
    excerpt: "Learn how to build a sustainable, healthy grocery shopping routine with our expert tips and tricks.",
    image: "/assets/b2.jpg",
    date: "June 5, 2025",
    author: "Hamza Hafeez",
    category: "Lifestyle"
  },
  {
    id: 3,
    title: "The Benefits of Farm-to-Table Eating",
    excerpt: "Explore why farm-to-table is more than a trend and how it benefits your health and the planet.",
    image: "/assets/b3.jpg",
    date: "May 28, 2025",
    author: "Hamza Hafeez",
    category: "Sustainability"
  },
  {
    id: 4,
    title: "5 Easy Organic Recipes for Busy Weeknights",
    excerpt: "Quick, delicious, and organic! Try these easy recipes for a healthy dinner in under 30 minutes.",
    image: "/assets/b3.jpg",
    date: "May 20, 2025",
    author: "Hamza Hafeez",
    category: "Recipes"
  },
];

const CATEGORIES = ["All", "Wellness", "Lifestyle", "Sustainability", "Recipes"];

export default function Blog() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-emerald-600 via-emerald-400 to-emerald-200 py-16 px-4 text-center relative overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow mb-4">Inspiration & Insights</h1>
        <p className="text-lg md:text-2xl text-emerald-50 mb-6 max-w-2xl mx-auto">Explore the latest tips, recipes, and stories for a healthier, more organic lifestyle.</p>
        <div className="absolute right-0 top-0 w-64 h-64 opacity-10 pointer-events-none select-none">
          <svg viewBox="0 0 100 100" fill="none"><ellipse cx="50" cy="50" rx="50" ry="50" fill="#2dc870" /></svg>
        </div>
      </section>

      {/* Featured Post */}
      <section className="container mx-auto px-4 -mt-24 mb-12 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 h-64 md:h-96 relative">
            <Image src={BLOG_POSTS[0].image} alt={BLOG_POSTS[0].title} fill className="object-cover w-full h-full" priority />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <span className="text-emerald-600 font-bold uppercase text-xs mb-2">Featured</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">{BLOG_POSTS[0].title}</h2>
            <p className="text-gray-700 mb-4">{BLOG_POSTS[0].excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span>{BLOG_POSTS[0].author}</span>
              <span>•</span>
              <span>{BLOG_POSTS[0].date}</span>
              <span>•</span>
              <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">{BLOG_POSTS[0].category}</span>
            </div>
            <button className="w-max bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-base">Read More</button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((cat) => (
            <button key={cat} className="px-5 py-2 rounded-full font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-all shadow-sm text-sm md:text-base">{cat}</button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.slice(1).map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 group">
              <div className="h-56 relative overflow-hidden">
                <Image src={post.image} alt={post.title} fill className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-xs font-bold text-emerald-600 mb-2 uppercase">{post.category}</span>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors duration-200">{post.title}</h3>
                <p className="text-gray-700 mb-4 flex-1">{post.excerpt}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <button className="w-max bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold px-5 py-2 rounded-lg shadow transition-all text-sm">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      
    </main>
  );
} 
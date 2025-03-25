import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero 區塊 */}
      <section className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
          CoE Demo
        </h1>
       
      </section>
      {/* 導航卡片 */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {/* Async Card */}
          <Link href="/async" className="hover:underline hover:text-red-400">
           async
          </Link>

          {/* Sync Card */}
          <Link href="/sync" className="hover:underline hover:text-red-400">
            sync
          </Link>

          {/* Social Media Card */}
          <Link href="/socialMedia" className="hover:underline hover:text-red-400">
            infinity Scroll
          </Link>
        </div>
      </section>
    </div>
  );
}
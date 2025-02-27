import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 space-y-8 bg-background">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl font-bold text-white md:text-5xl">Welcome to morphy</h1>
        <p className="mt-2 text-gray-400 md:text-lg">A simple app to morph between things.</p>
        <Link href='/squish'>
          <Button className="mt-6 px-6 py-3 text-lg">Try it out</Button>
        </Link>
      </section>
    </div>
  );
}

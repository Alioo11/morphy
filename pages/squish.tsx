import Head from "next/head";
import SquishPage from "@/components/Pages/Squish";

export default function Home() {
  return (
    <>
      <Head>
        <title>Morphy</title>
        <meta name="description" content="a simple app to morph between things!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <SquishPage />
    </>
  );
}

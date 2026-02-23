import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-2">Flight Search App</h1>
      <Link href={'/flights'} className="text-xl underline ">Go to flights page</Link>
    </div>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-xl mb-8">Could not find the requested resource</p>
      <Link href="/" className="text-blue-500 hover:text-blue-700">
        Return Home
      </Link>
    </div>
  );
}
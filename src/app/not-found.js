import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div style={{ width:'100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="flex flex-col items-center text-center">
        
        <Image
          src="/images/not-found-image.jpg"
          alt="Not Found Illustration"
          width={400}
          height={387}
        />

        <h2 className="text-4xl font-bold mt-6 mb-4">Not Found</h2>

        <p className="text-xl mb-8">
          Could not find the requested resource
        </p>
        <p>
          You can return to the&nbsp;
          <Link href="/" style={{textDecoration: 'underline'}} className="text-blue-500 hover:text-blue-700">
            Home
          </Link>
        </p> 
        
      </div>
    </div>
  );
}
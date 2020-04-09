import Link from 'next/link';


export default function Index() {
    return (
      <div>
        <Link href="/dashboard">
            <a>Enter into dashboard</a>
        </Link>
        <p>Hello Next.js</p>
      </div>
    );
  }
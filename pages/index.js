import Link from 'next/link';


export default function Index(props) {
    const id = 'all';
    return (
      <div>
        <Link href="/dashboard/[id]" as={`/dashboard/${id}`}>
            <a>Enter into dashboard</a>
        </Link>
        <p>Hello Next.js</p>
      </div>
    );
  }
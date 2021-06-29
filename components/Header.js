import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="container ">
        <Link href="/" passHref>
          <h2>
            <a className="nav-link">Shivam&apos;s Log</a>
          </h2>
        </Link>
      </div>
    </header>
  );
}

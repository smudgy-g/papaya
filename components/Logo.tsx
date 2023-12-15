import Link from "next/link";

export default function Logo() {
  return (
    <>
    <Link href="/"
      className="text-3xl font-bold text-primary hover:cursor-pointer">
      <span>Papaya</span>
    </Link>
    </>
  )
}
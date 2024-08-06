import Link from "next/link"

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl">Welcome!</h1>
      <Link href='/properties'>Go to properties</Link>
    </div>
  )
}

export default Home

import dynamic from 'next/dynamic'

const Experience = dynamic(
  async () => await import('~/components/Experience'),
  {
    ssr: false,
  }
)

export default function Home() {
  return <Experience />
}

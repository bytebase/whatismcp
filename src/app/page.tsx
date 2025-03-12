import { Container } from '@/components/Container'

export default async function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            What is MCP?
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            The Model Context Protocol (MCP) is an open standard for managing context in AI systems.
            It addresses one of the most critical challenges in building reliable AI applications:
            efficiently handling context as models become more sophisticated.
          </p>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            At its core, MCP provides a structured approach to representing, transmitting, and
            managing context between AI models and applications. By standardizing context management,
            MCP helps developers create more efficient, reliable, and interoperable AI systems.
          </p>
          <h2 className="mt-10 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
            Key Benefits of MCP
          </h2>
          <ul className="mt-6 space-y-3 text-base text-zinc-600 dark:text-zinc-400 list-disc list-inside">
            <li>Optimizes token usage and reduces costs</li>
            <li>Manages context across large windows more efficiently</li>
            <li>Enables seamless context transitions between conversations</li> 
            <li>Maintains coherent interactions across multiple sessions</li>
            <li>Works across various AI models and implementations</li>
          </ul>
        </div>
      </Container>
    </>
  )
}
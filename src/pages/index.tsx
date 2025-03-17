import type { ReactElement } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../assets/lbc-logo.webp'

export default function Home(): ReactElement {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen p-2 flex flex-col justify-center items-center">
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr" />
      </Head>

      <main className="p-4 md:p-16 flex-1 flex flex-col justify-center items-center">
        <Image src={Logo} alt="Leboncoin Frontend Team" width={400} height={125} priority />
        <h1 className="mt-8 mb-4 text-4xl font-bold text-center">
          Welcome !
        </h1>

        <p className="text-xl leading-relaxed text-center">
          This test is based on a <a className="text-black underline hover:text-[--color-leboncoin-orange]" title="Next.js documentation" href="https://nextjs.org/docs/getting-started" target="_blank" rel="noopener noreferrer">Next.js</a> application.<br />
          Fork the repository and use the <code className="bg-gray-200 rounded px-1 py-0.5 text-base font-mono">main</code> branch as your starting point.
          <br /><br />

          Get started by reading{' '}
          <code className="bg-gray-200 rounded px-1 py-0.5 text-base font-mono">README.md</code> and editing <code className="bg-gray-200 rounded px-1 py-0.5 text-base font-mono">src/pages/index.js</code>
          <br />
          Once you are done, send the repository link to your HR contact.
        </p>

        <div className="flex flex-wrap justify-center items-center max-w-4xl mt-4 w-full">
          <article className="m-2 flex-[45%] p-6 text-left border border-gray-200 rounded-lg transition-colors hover:border-leboncoin-orange hover:text-leboncoin-orange">
            <h2 className="mb-4 text-2xl font-bold">Design</h2>
            <p className="text-lg leading-relaxed">Feel free to create any design you want for this exercise. Let your creativity talks !</p>
          </article>

          <article className="m-2 flex-[45%] p-6 text-left border border-gray-200 rounded-lg transition-colors hover:border-leboncoin-orange hover:text-leboncoin-orange">
            <h2 className="mb-4 text-2xl font-bold">Libraries</h2>
            <p className="text-lg leading-relaxed">Feel free to use any library you want. Only Next.js / React are required.</p>
          </article>

          <article className="m-2 flex-[45%] p-6 text-left border border-gray-200 rounded-lg transition-colors hover:border-leboncoin-orange hover:text-leboncoin-orange">
            <h2 className="mb-4 text-2xl font-bold">API Server</h2>
            <p className="text-lg leading-relaxed">
              Start the API server on port <code className="bg-gray-200 rounded px-1 py-0.5 text-base font-mono">3005</code> by running<br /><code className="bg-gray-200 rounded px-1 py-0.5 text-base font-mono">npm run start-server</code>.<br/>
              Find the swagger definitions in <code className="bg-gray-200 rounded px-1 py-0.5 text-base font-mono">docs/api-swagger.yml</code> or <a className="text-black underline hover:text-[--color-leboncoin-orange]" title="API Swagger documentation" href="https://leboncoin.tech/frontend-technical-test/" target="_blank" rel="noopener noreferrer">the online documentation</a>.
            </p>
          </article>

          <article className="m-2 flex-[45%] p-6 text-left border border-gray-200 rounded-lg transition-colors hover:border-leboncoin-orange hover:text-leboncoin-orange">
            <h2 className="mb-4 text-2xl font-bold">Timing</h2>
            <p className="text-lg leading-relaxed">We recommend 4 hours for this test. You are free to spend more (or less) time, let us know how much time did you spend.</p>
          </article>
        </div>
      </main>

      <footer className="w-full h-[50px] border-t border-gray-200 flex justify-center items-center">
        &copy; leboncoin - {year}
      </footer>
    </div>
  )
}
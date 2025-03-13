import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from '@/components/SocialIcons'
import logoImage from '@/images/logo.webp'

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About MCP',
  description:
    'Learn about the Model Context Protocol (MCP) project - an open standard for managing AI model interactions and context.',
}

export default function About() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <Image
              src={logoImage}
              alt="MCP Logo"
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            Hello, I'm Tianzhou. I'm learning MCP.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              Welcome to my personal learning journey about the Model Context Protocol (MCP).
              Through this website, I'm sharing my notes, experiments, and insights as I learn.
            </p>
            <p>
              I'm not an expert (yet!), but rather a fellow learner on this journey. My day job is
              sketching <a href="https://www.bytebase.com" className="text-teal-500 hover:text-teal-700 transition-colors">Bytebase</a>, an open-source Database DevSecOps platform. I spend my spare time
              vibe-coding <a href="https://github.com/bytebase/dbhub/" className="text-teal-500 hover:text-teal-700 transition-colors">DBHub</a>, a universal database gateway MCP server.
            </p>

            <p>
            I hope my experiences
              and resources will be helpful to you. Feel free to connect with me through the
              channels below to share your own insights or ask questions.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink href="https://github.com/tianzhou" icon={GitHubIcon} className="mt-4">
              GitHub
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/tianzhouchen" icon={LinkedInIcon} className="mt-4">
              LinkedIn
            </SocialLink>
          </ul>
        </div>
      </div>
    </Container>
  )
}
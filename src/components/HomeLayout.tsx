'use client'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { usePathname } from 'next/navigation'

export function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const getTitle = () => {
    switch (pathname) {
      case '/ja':
        return 'MCPとは何か？（Model Context Protocol） - 入門ガイド'
      case '/kr':
        return 'MCP란 무엇인가? (Model Context Protocol) - 입문서'
      case '/zh':
        return '究竟什么是 MCP？(Model Context Protocol) - 一文看懂'
      case '/es':
        return '¿Qué es MCP? (Model Context Protocol) - Una Introducción'
      case '/de':
        return 'Was ist MCP? (Model Context Protocol) - Eine Einführung'
      case '/fr':
        return 'Qu\'est-ce que le MCP ? (Model Context Protocol) - Une Introduction'
      case '/hi':
        return 'MCP क्या है? (Model Context Protocol) - एक परिचय'
      case '/pt':
        return 'O que é MCP? (Model Context Protocol) - Uma Introdução'
      case '/vi':
        return 'MCP là gì? (Model Context Protocol) - Giới thiệu cơ bản'
      case '/ru':
        return 'Что такое MCP? (Model Context Protocol) - Введение'
      default:
        return 'What is MCP? (Model Context Protocol) - A Primer'
    }
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col">
              <div className="mb-4">
                <LanguageSwitcher pathname={pathname} />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {getTitle()}
              </h1>
            </header>
            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
    </Container>
  )
}
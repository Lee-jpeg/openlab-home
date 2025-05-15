'use client';

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Vision from '../components/Vision'
import Definition from '../components/Definition'
import Portfolio from '../components/Portfolio'
import CTA from '../components/CTA'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-grow">
        {/* 히어로 섹션 */}
        <section className="relative">
          <Hero />
        </section>
        
        {/* 비전 섹션 */}
        <section className="py-20">
          <Vision />
        </section>
        
        {/* 정의 섹션 */}
        <section className="py-20 bg-gray-900">
          <Definition />
        </section>
        
        {/* 포트폴리오 섹션 */}
        <section className="py-20">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">포트폴리오</h2>
            <Portfolio />
          </div>
        </section>
        
        {/* CTA 섹션 */}
        <CTA />
      </main>
      <Footer />
    </div>
  )
} 
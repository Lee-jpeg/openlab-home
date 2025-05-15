'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const symbolRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // GSAP 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    // 심볼 초기 상태 설정 (꺼진 상태)
    if (symbolRef.current) {
      gsap.set(symbolRef.current, {
        background: 'linear-gradient(#1a1a1a 0%, #000814 100%)',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
        opacity: 0.7,
        scale: 0.9,
      });
    }

    // 스크롤 시작 시 심볼 조명 켜짐 효과
    const symbolTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 10%',
        end: 'center center',
        scrub: 1,
      }
    });

    symbolTimeline
      .to(symbolRef.current, {
        background: 'linear-gradient(#ffffff 0%, #4e72ff 100%)',
        boxShadow: '0 0 60px rgba(78, 114, 255, 0.5)',
        opacity: 1,
        scale: 1,
        duration: 1,
      });

    // 마우스 호버 이벤트
    const symbolElement = symbolRef.current;
    
    if (symbolElement) {
      const onMouseEnter = () => {
        gsap.to(symbolElement, {
          boxShadow: '0 0 80px rgba(78, 114, 255, 0.8)',
          scale: 1.05,
          duration: 0.6,
        });
      };
      
      const onMouseLeave = () => {
        const progress = ScrollTrigger.getAll().find(trigger => 
          trigger.vars.trigger === sectionRef.current
        )?.progress || 0;
        
        if (progress < 0.5) {
          gsap.to(symbolElement, {
            boxShadow: '0 0 60px rgba(78, 114, 255, 0.5)',
            scale: 1,
            duration: 0.6,
          });
        } else {
          gsap.to(symbolElement, {
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
            scale: 0.9,
            duration: 0.6,
          });
        }
      };
      
      symbolElement.addEventListener('mouseenter', onMouseEnter);
      symbolElement.addEventListener('mouseleave', onMouseLeave);
      
      return () => {
        symbolElement.removeEventListener('mouseenter', onMouseEnter);
        symbolElement.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-black"
    >
      {/* 콘텐츠 */}
      <div className="relative z-10 text-center hero-content">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 text-white">
          병원 마케팅, 한계를 열다.
        </h1>
        <h2 className="text-lg md:text-2xl font-medium mb-12 text-gray-300">
          오픈랩 마케팅
        </h2>
      </div>
      
      {/* 인터랙티브 심볼 - 훨씬 크게 설정 */}
      <div
        ref={symbolRef}
        id="symbol"
        className="triangle mx-auto w-80 h-80 md:w-[40vw] md:h-[40vw] max-w-[600px] max-h-[600px] transition-custom cursor-pointer absolute z-0"
      />
      
      {/* 스크롤 다운 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20">
        <span className="text-sm text-gray-400 mb-2">스크롤 다운</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-bounce text-white"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
} 
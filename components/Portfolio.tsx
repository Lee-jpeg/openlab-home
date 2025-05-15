'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Link from 'next/link';

// 포트폴리오 샘플 데이터
const portfolioItems = [
  {
    id: 1,
    title: '서울 OO 정형외과',
    description: '디지털 마케팅을 통한 예약률 320% 증가',
    imageUrl: '/images/portfolio-1.jpg', // 실제 이미지로 교체 필요
    bgColor: 'bg-blue-900/30',
  },
  {
    id: 2,
    title: '부산 OO 내과',
    description: '브랜딩 리뉴얼 및 SNS 마케팅으로 인지도 상승',
    imageUrl: '/images/portfolio-2.jpg',
    bgColor: 'bg-purple-900/30',
  },
  {
    id: 3,
    title: '대구 OO 피부과',
    description: '타겟 마케팅으로 신규 환자 유입 200% 증가',
    imageUrl: '/images/portfolio-3.jpg',
    bgColor: 'bg-primary-dark/30',
  },
  {
    id: 4,
    title: '인천 OO 치과',
    description: '콘텐츠 마케팅으로 브랜드 신뢰도 구축',
    imageUrl: '/images/portfolio-4.jpg',
    bgColor: 'bg-primary/30',
  },
  {
    id: 5,
    title: '광주 OO 한의원',
    description: '지역 기반 마케팅으로 방문율 150% 향상',
    imageUrl: '/images/portfolio-5.jpg',
    bgColor: 'bg-primary-light/30',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  // 슬라이드 변경 함수
  const changeSlide = (index: number) => {
    if (index < 0) {
      setActiveSlide(portfolioItems.length - 1);
    } else if (index >= portfolioItems.length) {
      setActiveSlide(0);
    } else {
      setActiveSlide(index);
    }
  };

  // itemRef 설정 함수
  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemRefs.current[index] = el;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // 섹션 애니메이션
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // 슬라이더 애니메이션
      if (sliderRef.current) {
        gsap.to(sliderRef.current, {
          x: `-${activeSlide * 100}%`,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    }
  }, [activeSlide]);

  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide(activeSlide + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSlide]);

  return (
    <section
      ref={sectionRef}
      className="py-10 bg-gradient-to-b from-black to-gray-900"
      id="portfolio-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 포트폴리오 슬라이더 */}
        <div className="overflow-hidden">
          <div
            ref={sliderRef}
            className="flex transition-all duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => setItemRef(el, index)}
                className="w-full min-w-full px-4 md:px-8"
              >
                <div className={`p-6 rounded-xl shadow-xl ${item.bgColor} border border-white/10`}>
                  <div className="aspect-video bg-gray-800 rounded-lg mb-6 overflow-hidden">
                    {/* 임시 이미지 대체 */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary-dark to-primary">
                      <span className="text-2xl font-semibold text-white">
                        {item.title} 사례 이미지
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-300 mb-6 text-lg">{item.description}</p>
                  <button className="px-5 py-2 bg-gradient-to-r from-primary-light to-primary text-white rounded-full transition-all hover:shadow-lg">
                    자세히 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 슬라이더 컨트롤 */}
        <div className="flex justify-center mt-8 space-x-2">
          {portfolioItems.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeSlide === index ? 'bg-primary' : 'bg-gray-600'
              }`}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>

        {/* 화살표 버튼 */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => changeSlide(activeSlide - 1)}
            className="p-2 rounded-full bg-gray-800 hover:bg-primary/80 transition-colors"
            aria-label="이전 슬라이드"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => changeSlide(activeSlide + 1)}
            className="p-2 rounded-full bg-gray-800 hover:bg-primary/80 transition-colors"
            aria-label="다음 슬라이드"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* 포트폴리오 페이지 링크 */}
        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-primary-light to-primary hover:from-primary hover:to-primary-dark shadow-md hover:shadow-lg transition-all"
          >
            더 많은 사례 보기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 
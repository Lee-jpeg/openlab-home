'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// 포트폴리오 샘플 데이터
const portfolioItems = [
  {
    id: 1,
    title: '서울 OO 정형외과',
    description: '디지털 마케팅을 통한 예약률 320% 증가',
    imageUrl: '/images/portfolio-1.jpg', // 실제 이미지로 교체 필요
    bgColor: 'bg-blue-500/20 dark:bg-blue-900/40',
  },
  {
    id: 2,
    title: '부산 OO 내과',
    description: '브랜딩 리뉴얼 및 SNS 마케팅으로 인지도 상승',
    imageUrl: '/images/portfolio-2.jpg',
    bgColor: 'bg-purple-500/20 dark:bg-purple-900/40',
  },
  {
    id: 3,
    title: '대구 OO 피부과',
    description: '타겟 마케팅으로 신규 환자 유입 200% 증가',
    imageUrl: '/images/portfolio-3.jpg',
    bgColor: 'bg-green-500/20 dark:bg-green-900/40',
  },
  {
    id: 4,
    title: '인천 OO 치과',
    description: '콘텐츠 마케팅으로 브랜드 신뢰도 구축',
    imageUrl: '/images/portfolio-4.jpg',
    bgColor: 'bg-yellow-500/20 dark:bg-yellow-900/40',
  },
  {
    id: 5,
    title: '광주 OO 한의원',
    description: '지역 기반 마케팅으로 방문율 150% 향상',
    imageUrl: '/images/portfolio-5.jpg',
    bgColor: 'bg-red-500/20 dark:bg-red-900/40',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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

    // 스크롤 기반 슬라이더 애니메이션
    if (sliderRef.current && portfolioItems.length > 0) {
      const totalWidth = 100 * (portfolioItems.length - 1);
      
      gsap.to(sliderRef.current, {
        x: `-${totalWidth}%`,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 10%',
          end: 'bottom top-=30%',
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        }
      });

      // 아이템 페이드인 애니메이션
      itemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { 
              opacity: 0.4,
              y: 30,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top+=${index * 100} 40%`,
                toggleActions: 'play none none reverse',
                end: `bottom-=${(portfolioItems.length - index - 1) * 100} top`,
              }
            }
          );
        }
      });
    }
  }, []);

  // 아이템 참조 설정 함수
  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="py-10 px-4 bg-primary/10"
      id="portfolio-section"
    >
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-white">포트폴리오</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            다양한 의료 분야에서 실질적인 성과를 이끌어낸 오픈랩의 마케팅 사례를 살펴보세요.
          </p>
        </div>
        
        {/* 포트폴리오 슬라이더 */}
        <div className="overflow-hidden py-8">
          <div
            ref={sliderRef}
            className="flex transition-transform duration-custom"
          >
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => setItemRef(el, index)}
                className="w-full min-w-full px-4 md:px-16"
              >
                <div className={`p-6 rounded-lg shadow-lg ${item.bgColor} border border-white/10`}>
                  <div className="aspect-video bg-gray-800 rounded-lg mb-6 overflow-hidden">
                    {/* 임시 이미지 대체 */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary/40 to-primary/20">
                      <span className="text-2xl font-semibold text-white">
                        {item.title} 사례 이미지
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-300 mb-6 text-lg">{item.description}</p>
                  <button className="px-4 py-2 bg-primary/20 hover:bg-primary/40 text-white rounded-full transition-colors">
                    자세히 보기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 포트폴리오 페이지 링크 */}
        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-lg transition-all"
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
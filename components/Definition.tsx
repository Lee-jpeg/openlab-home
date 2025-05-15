'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 서비스 목록 데이터
const services = [
  {
    title: '디지털 광고',
    description: '검색, SNS, 디스플레이 등 효과적인 광고 채널을 활용하여 병원의 가시성을 높이고 신규 환자를 유치합니다.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 mb-4 text-black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
        />
      </svg>
    ),
  },
  {
    title: '콘텐츠 제작',
    description: '환자의 니즈를 충족시키는 고품질 컨텐츠를 제작하여 병원의 전문성을 알리고 신뢰를 구축합니다.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 mb-4 text-black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },
  {
    title: 'CRM',
    description: '환자와의 장기적인 관계를 구축하고 유지하는 전략을 수립하여 충성 고객을 확보합니다.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 mb-4 text-black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
  },
  {
    title: '리퍼드 관리',
    description: '추천 환자 관리를 통해 기존 환자 네트워크를 활용하고 신규 환자 유입을 증대시킵니다.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 mb-4 text-black"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
  },
];

export default function Definition() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // 제목 및 문단 애니메이션
    gsap.fromTo(
      [titleRef.current, paragraphRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

    // 서비스 카드 애니메이션
    serviceRefs.current.forEach((service, index) => {
      if (service) {
        gsap.fromTo(
          service,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.2 + index * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          }
        );
      }
    });
  }, []);

  // 서비스 참조 설정 함수
  const setServiceRef = (el: HTMLDivElement | null, index: number) => {
    serviceRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2
            ref={titleRef}
            className="text-3xl font-bold mb-6 text-black"
          >
            우리가 생각하는 병원 마케팅
          </h2>
          <p
            ref={paragraphRef}
            className="text-lg text-gray-600"
          >
            병원 마케팅은 단순한 환자 유치를 넘어 의료기관의 가치와 경쟁력을 높이는 전략적 과정입니다. 
            오픈랩은 병원의 특성과 환경을 고려한 맞춤형 마케팅 솔루션을 제공하여 지속 가능한 성장을 실현합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={(el) => setServiceRef(el, index)}
              className="bg-gray-50 p-6 rounded-default shadow hover:shadow-md transition-custom border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="text-xl font-semibold mb-3 text-black">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
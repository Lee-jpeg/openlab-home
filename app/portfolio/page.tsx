'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// 포트폴리오 데이터
const portfolioItems = [
  {
    id: 1,
    title: '서울 OO 정형외과',
    description: '디지털 마케팅을 통한 예약률 320% 증가',
    category: '디지털 마케팅',
    imageUrl: '/images/portfolio-1.jpg',
    bgColor: 'bg-blue-900/30',
  },
  {
    id: 2,
    title: '부산 OO 내과',
    description: '브랜딩 리뉴얼 및 SNS 마케팅으로 인지도 상승',
    category: 'SNS 마케팅',
    imageUrl: '/images/portfolio-2.jpg',
    bgColor: 'bg-purple-900/30',
  },
  {
    id: 3,
    title: '대구 OO 피부과',
    description: '타겟 마케팅으로 신규 환자 유입 200% 증가',
    category: '타겟 마케팅',
    imageUrl: '/images/portfolio-3.jpg',
    bgColor: 'bg-primary-dark/30',
  },
  {
    id: 4,
    title: '인천 OO 치과',
    description: '콘텐츠 마케팅으로 브랜드 신뢰도 구축',
    category: '콘텐츠 마케팅',
    imageUrl: '/images/portfolio-4.jpg',
    bgColor: 'bg-primary/30',
  },
  {
    id: 5,
    title: '광주 OO 한의원',
    description: '지역 기반 마케팅으로 방문율 150% 향상',
    category: '지역 마케팅',
    imageUrl: '/images/portfolio-5.jpg',
    bgColor: 'bg-primary-light/30',
  },
  {
    id: 6,
    title: '대전 OO 성형외과',
    description: '소셜 미디어를 통한 브랜드 인지도 개선',
    category: '소셜 미디어',
    imageUrl: '/images/portfolio-6.jpg',
    bgColor: 'bg-blue-900/30',
  },
  {
    id: 7,
    title: '울산 OO 안과',
    description: '온라인 예약 시스템 개선으로 효율성 증대',
    category: '시스템 개선',
    imageUrl: '/images/portfolio-7.jpg',
    bgColor: 'bg-purple-900/30',
  },
  {
    id: 8,
    title: '세종 OO 병원',
    description: '통합 마케팅으로 브랜드 가치 상승',
    category: '통합 마케팅',
    imageUrl: '/images/portfolio-8.jpg',
    bgColor: 'bg-primary-dark/30',
  },
];

// 모든 카테고리 목록
const uniqueCategories = Array.from(new Set(portfolioItems.map(item => item.category)));
const allCategories = ['전체', ...uniqueCategories];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // 카테고리 필터링
  const filteredItems = activeCategory === '전체' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-8 text-center">포트폴리오</h1>
          
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeCategory === category 
                    ? 'bg-gradient-to-r from-primary-light to-primary text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* 노션 갤러리 스타일 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-all duration-300 hover:shadow-xl hover:border-primary/50"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* 이미지 영역 */}
                <div className={`aspect-video w-full ${item.bgColor} relative overflow-hidden`}>
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary-dark/70 to-primary/70">
                    <span className="text-xl font-semibold text-white">{item.title}</span>
                  </div>
                  
                  {/* 호버 시 오버레이 */}
                  <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 
                    ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="px-4 py-2 bg-primary rounded-full text-white font-medium transform transition-transform duration-300 hover:scale-105">
                      자세히 보기
                    </button>
                  </div>
                </div>
                
                {/* 컨텐츠 영역 */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <span className="text-xs bg-gray-800 text-primary px-2 py-1 rounded-full">{item.category}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 
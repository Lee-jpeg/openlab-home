'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// 컨텐츠 데이터
const contentItems = [
  {
    id: 1,
    title: '병원 마케팅의 핵심 요소',
    description: '환자 중심의 마케팅 전략에 대한 인사이트를 제공합니다.',
    category: '마케팅 전략',
    date: '2023-12-15',
    readTime: '5분',
    bgColor: 'bg-blue-900/30',
  },
  {
    id: 2,
    title: '의료 서비스의 디지털 전환',
    description: '디지털 시대에 병원이 적응하고 발전하는 방법을 알아봅니다.',
    category: '디지털 전환',
    date: '2023-11-28',
    readTime: '7분',
    bgColor: 'bg-purple-900/30',
  },
  {
    id: 3,
    title: '효과적인 의료 콘텐츠 제작 가이드',
    description: '환자들에게 가치를 제공하는 콘텐츠 제작 방법을 소개합니다.',
    category: '콘텐츠 제작',
    date: '2023-10-10',
    readTime: '6분',
    bgColor: 'bg-primary-dark/30',
  },
  {
    id: 4,
    title: '소셜 미디어를 활용한 병원 브랜딩',
    description: '소셜 미디어 플랫폼을 통해 병원 브랜드를 강화하는 방법을 알아봅니다.',
    category: '소셜 미디어',
    date: '2023-09-22',
    readTime: '8분',
    bgColor: 'bg-primary/30',
  },
  {
    id: 5,
    title: '데이터 기반 의료 마케팅의 미래',
    description: '데이터 분석을 통한 의료 마케팅의 효율 최적화에 대해 설명합니다.',
    category: '데이터 분석',
    date: '2023-08-15',
    readTime: '10분',
    bgColor: 'bg-primary-light/30',
  },
  {
    id: 6,
    title: '환자 경험 개선을 위한 UX 디자인',
    description: '병원 웹사이트와 애플리케이션의 사용자 경험 향상 방법을 소개합니다.',
    category: 'UX 디자인',
    date: '2023-07-30',
    readTime: '9분',
    bgColor: 'bg-blue-900/30',
  },
  {
    id: 7,
    title: '지역 기반 의료 마케팅 성공 사례',
    description: '지역 특성을 고려한 마케팅 전략과 성공 사례를 분석합니다.',
    category: '지역 마케팅',
    date: '2023-06-18',
    readTime: '7분',
    bgColor: 'bg-purple-900/30',
  },
  {
    id: 8,
    title: '의료 서비스의 온라인 예약 최적화',
    description: '온라인 예약 시스템 구축 및 최적화 방법에 대해 알아봅니다.',
    category: '시스템 최적화',
    date: '2023-05-05',
    readTime: '6분',
    bgColor: 'bg-primary-dark/30',
  },
];

// 모든 카테고리 목록
const uniqueCategories = Array.from(new Set(contentItems.map(item => item.category)));
const allCategories = ['전체', ...uniqueCategories];

export default function ContentPage() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // 카테고리 및 검색어 필터링
  const filteredItems = contentItems
    .filter(item => activeCategory === '전체' || item.category === activeCategory)
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold mb-8 text-center">컨텐츠</h1>
          
          {/* 검색 및 필터 */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="컨텐츠 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white"
                />
              </div>
              <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
          
          {/* 노션 갤러리 스타일 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="relative bg-gray-900 rounded-lg overflow-hidden shadow-lg border border-gray-800 transition-all duration-300 hover:shadow-xl hover:border-primary/50 cursor-pointer"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* 상단 색상 바 */}
                <div className={`h-2 w-full ${item.bgColor}`}></div>
                
                {/* 컨텐츠 영역 */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs bg-gray-800 text-primary px-2 py-1 rounded-full">{item.category}</span>
                    <div className="text-xs text-gray-400 flex items-center gap-2">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.readTime} 읽기</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-white mt-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  
                  <div className={`mt-4 transition-opacity duration-300 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button className="text-primary font-medium hover:underline flex items-center">
                      읽어보기
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* 결과가 없을 때 */}
          {filteredItems.length === 0 && (
            <div className="text-center py-10">
              <h3 className="text-xl text-gray-400">검색 결과가 없습니다</h3>
              <p className="mt-2 text-gray-500">다른 키워드로 검색하거나 필터를 초기화해보세요</p>
              <button 
                onClick={() => {setActiveCategory('전체'); setSearchTerm('');}}
                className="mt-4 px-4 py-2 bg-primary rounded-md text-white"
              >
                필터 초기화
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 
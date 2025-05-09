// localhost:3000/recommend_company/result

import { useState } from "react";
import { useLocation } from "react-router-dom";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import MemberNavigation from "../../Component/Navigation/MemberNavigation";
import "./corporateImageResult.css";
import ArrowIcon from "../../Image/Icon/ArrowIcon.svg";
import RecommandReport from "../../Component/RecommandComponent/CorporateImageReport";
import { motion, AnimatePresence } from "framer-motion";
import dummyCandidates from "../../data/dummyCandidate"; // 후보자 이력서 데이터

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const CorporateImageResult = () => {
  const location = useLocation();
  //const { companyName, data } = location.state; // 받아올 예정

  const companyDummydata = [
    { rank: "1", subject: "사내분위기", score: 80 },
    { rank: "2", subject: "ESG", score: 60 },
    { rank: "3", subject: "근무환경", score: 70 },
    { rank: "4", subject: "높은매출", score: 50 },
    { rank: "5", subject: "안녕", score: 40 },
    { rank: "6", subject: "성장률", score: 55 },
  ];

  const [showReport, setShowReport] = useState(false);

  // 후보자 추천 결과 요약 데이터
  const resultsSummary = [
    {
      title: "마케팅 팀장 직무 추천 결과",
      author: "유니코서치 대리 김가연",
      keywords: "[ ESG ] [ 높은 매출 ]",
      candidates: [
        { rank: 1, info: "김철수 (29), 남", score: "470 / 500" },
        { rank: 2, info: "김민지 (27), 여", score: "450 / 500" },
        { rank: 3, info: "박희망 (30), 남", score: "400 / 500" },
        { rank: 4, info: "박찬희 (30), 남", score: "390 / 500" },
        { rank: 5, info: "최민서 (30), 여", score: "385 / 500" },
      ],
    },
  ];

  return (
    <div className="image-recommend-result_wrapper">
      {/* 네비게이션. */}
      <MemberNavigation />

      <AnimatePresence mode="wait">
        {!showReport ? (
          <motion.div
            key="firstPage"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            <header>
              <div className="image-recommend-result_page-index-wrapper">
                <img src={FileLogo} alt="-" />
                <h2> [ ooo ] 기업 이미지 점수 / 점수 기반 후보자 추천</h2>
              </div>
            </header>

            <div className="image-recommend-result_first-page">
              <main>
                <h3 className="image-recommend-result_graph-header">
                  이미지 카테고리별 점수
                </h3>

                <div className="image-recommend-result_graph">
                  {/* 레이더 차트 */}
                  <RadarChart
                    cx={200}
                    cy={150}
                    outerRadius={120}
                    width={450}
                    height={350}
                    data={companyDummydata}
                  >
                    <PolarGrid />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: "#1e1e1e", fontSize: 16 }}
                      axisLine={{
                        strokeLinecap: "round",
                      }}
                    />
                    <PolarRadiusAxis
                      angle={60}
                      domain={[0, 100]}
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                    />
                    <Radar
                      name="점수"
                      dataKey="value"
                      stroke="#008A34"
                      fill="#008A34"
                      fillOpacity={0.5}
                    />
                  </RadarChart>

                  <div className="image-recommend-result_top2">
                    <p>ooo 기업 이미지 키워드 Top 2를 뽑았어요 !</p>
                    <span></span>
                    <div className="image-recommend-result_ketword">
                      <span>ESG</span>
                      <span>높은 매출</span>
                    </div>
                  </div>
                </div>

                <div className="image-recommend-result_score-header">
                  <h3>
                    전체 점수표 (기업 이미지 점수 / 후보자 추천 결과 요약)
                  </h3>
                  <div>
                    <div>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <p>점수 높음-보통-낮음 순</p>
                  </div>
                </div>

                <div className="company-result-summary-tables">
                  <table className="image-recommend-result_score-table">
                    <tbody>
                      {[...Array(6)].map((_, idx) => (
                        <tr key={idx}>
                          <td>사내분위기</td>
                          <td>100</td>
                          <td>
                            <span></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <table className="strength-category-result_score-table">
                    <tbody>
                      <tr>
                        <td>홍길동</td>
                        <td>100/100</td>
                        <td>
                          <span></span>
                        </td>
                      </tr>
                      <tr>
                        <td>홍길동</td>
                        <td>80/100</td>
                        <td>
                          <span></span>
                        </td>
                      </tr>
                      <tr>
                        <td>홍길동</td>
                        <td>78/100</td>
                        <td>
                          <span></span>
                        </td>
                      </tr>
                      <tr>
                        <td>홍길동</td>
                        <td>70/100</td>
                        <td>
                          <span></span>
                        </td>
                      </tr>
                      <tr>
                        <td>홍길동</td>
                        <td>66/100</td>
                        <td>
                          <span></span>
                        </td>
                      </tr>
                      <tr>
                        <td>홍길동</td>
                        <td>50/100</td>
                        <td>
                          <span></span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <button
                  className="image-recommend-result_job-seeker-button"
                  onClick={() => setShowReport(true)}
                >
                  <img src={ArrowIcon} alt="➜" />
                  <span>추천 결과 보고서 열람</span>
                </button>
              </main>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="reportPage"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4 }}
          >
            <RecommandReport
              onBack={() => setShowReport(false)}
              companySummary={companyDummydata}
              resultsSummary={resultsSummary}
              candidates={dummyCandidates}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CorporateImageResult;

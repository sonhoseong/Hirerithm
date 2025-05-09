import React, { useState, useEffect } from "react";
import FileLogo from "../../Image/Icon/FileLogo.svg";
import questions from "../../data/USER_CATEGORY.json";
import "./CompanyTest.css";

const CompanyTest = ({ onBackToResume }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  // 컴포넌트 마운트 시 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const handleSelect = (questionIndex, score) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = score;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    const isAllAnswered = answers.every((a) => a !== null);
    if (!isAllAnswered) {
      alert("모든 문항에 답해주세요!");
      return;
    }

    const categoryScores = {
      TeamCulture: 0,
      Evaluation: 0,
      PayLevel: 0,
      VisionDirection: 0,
      Welfare: 0,
      Workload: 0,
    };

    const categoryCounts = {
      TeamCulture: 0,
      Evaluation: 0,
      PayLevel: 0,
      VisionDirection: 0,
      Welfare: 0,
      Workload: 0,
    };

    questions.forEach((q) => {
      categoryCounts[q.positive_category]++;
      categoryCounts[q.negative_category]++;
    });

    questions.forEach((q, index) => {
      const r = answers[index];

      // 7점 척도를 1~5점으로 정규화
      const positiveScore = ((r - 1) / 6) * 4 + 1;
      const negativeScore = (1 - (r - 1) / 6) * 4 + 1;

      categoryScores[q.positive_category] += positiveScore;
      categoryScores[q.negative_category] += negativeScore;
    });

    // 평균 점수로 변환 (5점 만점 기준)
    Object.keys(categoryScores).forEach((category) => {
      if (categoryCounts[category] > 0) {
        categoryScores[category] =
          categoryScores[category] / categoryCounts[category];
        categoryScores[category] =
          Math.round(categoryScores[category] * 100) / 100;
      }
    });

    console.log("카테고리별 점수:", categoryScores);

    // 점수 Resume 컴포넌트로 넘기기
    onBackToResume(categoryScores);
  };

  return (
    <div className="image-recommend_wrapper">
      <header>
        <div className="image-recommend_page-index-wrapper">
          <img src={FileLogo} alt="-" />
          <h2>맞춤기업 TEST</h2>
        </div>
        <p></p>
      </header>

      <main className="company-test_main">
        {questions.map((q, idx) => (
          <div key={idx} className="company-test_question-block">
            <p className="company-test_question">
              Q{idx + 1}. {q.question}
            </p>
            <div className="company-test_choices">
              {[1, 2, 3, 4, 5, 6, 7].map((score) => {
                const sizeClass = [
                  "size-xs",
                  "size-sm",
                  "size-md",
                  "size-lg",
                  "size-md",
                  "size-sm",
                  "size-xs",
                ][score - 1];

                const labelText = {
                  1: "매우 그렇지 않다",
                  4: "보통이다",
                  7: "매우 그렇다",
                }[score];

                return (
                  <div
                    key={score}
                    className={`company-test_choice-wrapper ${sizeClass}`}
                    onClick={() => handleSelect(idx, score)}
                  >
                    <input
                      type="radio"
                      name={`q${idx}`}
                      id={`q${idx}_opt${score}`}
                      checked={answers[idx] === score}
                      onChange={() => handleSelect(idx, score)}
                    />
                    <label
                      htmlFor={`q${idx}_opt${score}`}
                      className="company-test_choice"
                    />
                    {labelText && (
                      <div className="company-test_choice-label">
                        {labelText}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <button onClick={handleSubmit} className="company-test_submit-btn">
          결과 제출하기
        </button>
      </main>
    </div>
  );
};

export default CompanyTest;

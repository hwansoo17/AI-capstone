"use client";
import { useState } from "react";
import axios from "axios";

const QuestionItem = ({ text }) => {
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null); // 오디오 URL 저장

  const handleTypecastTTS = async () => {
    setAudioLoading(true);
    try {
      const response = await axios.post("/api/tts", { text });
      setAudioUrl(response.data.audioUrl);
    } catch (error) {
      console.error("TTS 생성 중 오류:", error);
      alert("TTS 생성 중 오류가 발생했습니다.");
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <div className="question-item">
      <div className="question-text">{text}</div>
      <button
        className="tts-button"
        onClick={handleTypecastTTS}
        disabled={audioLoading}
      >
        {audioLoading ? "생성 중..." : "선택하기"}
      </button>
      {audioUrl && (
        <div className="audio-player">
          <audio
            controls
            preload="auto"
            onPlay={(e) => {
              e.target.currentTime = 0.0; // 시작 위치를 강제로 0으로 설정
            }}
          >
            <source src={audioUrl} type="audio/mp3" />
            브라우저에서 오디오를 지원하지 않습니다.
          </audio>
        </div>
      )}
    </div>
  );
};

export default QuestionItem;

import React, { useState } from 'react';
import axios from 'axios';
import styles from './ExpRatePage.module.css';

const ExpRatePage: React.FC = () => {
  const [expRate, setExpRate] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpRate(Number(event.target.value));
  };

  const updateExpRate = async () => {
    if (expRate <= 0) return; // 0 이하 막기 (추가!)

    try {
      setLoading(true);
      await axios.post('/api/expRate', expRate, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      showToast('✅ 경험치 배율이 성공적으로 변경되었습니다!');
      setExpRate(1); // 배율 변경 후 입력창 초기화
    } catch (error) {
      console.error('경험치 배율 변경 실패', error);
      showToast('❌ 변경 실패! 서버를 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // 3초 후 Toast 사라짐
  };

  const isSubmitDisabled = loading || expRate <= 0;

  return (
    <div className={styles.container}>
      <h2>경험치 배율 조절</h2>

      <div className={styles.controls}>
        <input
          type="number"
          min="1"
          step="1"
          className={styles.expInput}
          value={expRate}
          onChange={handleInputChange}
        />

        <button
          className={styles.updateButton}
          onClick={updateExpRate}
          disabled={isSubmitDisabled}
        >
          {loading ? '변경 중...' : '배율 변경'}
        </button>
      </div>

      {toastMessage && <div className={styles.toast}>{toastMessage}</div>}
    </div>
  );
};

export default ExpRatePage;

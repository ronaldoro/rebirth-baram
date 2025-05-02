import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './NoticePage.module.css';
import { API_BASE_URL } from './../envConfig';

const NoticePage: React.FC = () => {
  const [notice, setNotice] = useState<string>('');
  const [newNotice, setNewNotice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // 공지사항 불러오기
  const fetchNotice = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/notice`, {
        headers: {
          'Accept': 'application/json',
        },
      });
      const fetchedNotice = response.data;
      setNotice(fetchedNotice || "");  // null이나 undefined를 빈 문자열로 처리
    } catch (error) {
      console.error('공지사항 불러오기 실패', error);
      alert('공지사항을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotice(); // 페이지 로드 시 공지사항 불러오기
  }, []);

  // 새 공지사항 등록
  const addNotice = async () => {
    if (!newNotice) return alert('공지사항 내용을 입력해주세요!');
    
    try {
      setLoading(true);
      await axios.post('/api/notice', { content: newNotice });
      fetchNotice(); // 공지사항 갱신
      setNewNotice(''); // 등록 후 입력창 초기화
    } catch (error) {
      console.error('공지사항 등록 실패', error);
      alert('공지사항 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 공지사항 삭제 (현재는 그냥 공지사항을 빈 문자열로 설정하는 방식)
  const deleteNotice = async () => {
    try {
      setLoading(true);
      await axios.delete('/api/notice');
      fetchNotice(); // 공지사항 삭제 후 갱신
    } catch (error) {
      console.error('공지사항 삭제 실패', error);
      alert('공지사항 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>공지사항 관리</h2>

      <div className={styles.notice}>
        <h3>현재 공지사항</h3>
        <p className={styles.noticeContent}>{notice || '현재 공지사항이 없습니다.'}</p>
      </div>

      <div className={styles.addNotice}>
        <textarea
          className={styles.noticeInput}
          value={newNotice}
          onChange={(e) => setNewNotice(e.target.value)}
          placeholder="새 공지사항을 입력하세요..."
        />
        <button
          className={styles.addButton}
          onClick={addNotice}
          disabled={loading}
        >
          {loading ? '등록 중...' : '공지사항 등록'}
        </button>
      </div>

      {notice && (
        <div className={styles.deleteNotice}>
          <button
            className={styles.deleteButton}
            onClick={deleteNotice}
            disabled={loading}
          >
            {loading ? '삭제 중...' : '공지사항 삭제'}
          </button>
        </div>
      )}
    </div>
  );
};

export default NoticePage;

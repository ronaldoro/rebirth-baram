import React, { useState } from 'react';
import styles from './LoginPage.module.css'; // 스타일을 새로 추가할 거예요

const LoginPage: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = () => {
    if (id === 'rebirth-baram' && password === '1234') {
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/admin-main/adminPage';  // 어드민 페이지로 이동
    } else {
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2 className={styles.title}>관리자 로그인</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.inputGroup}>
          <label htmlFor="id">아이디</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={styles.inputField}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button onClick={handleLogin} className={styles.loginButton}>
          로그인
        </button>      
      </div>
    </div>
  );
};

export default LoginPage;

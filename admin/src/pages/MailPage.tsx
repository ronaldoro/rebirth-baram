import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MailPage.module.css';

interface Mail {
  itemId: string;
  senderName: string;
}

const MailPage: React.FC = () => {
  // 조회용 state
  const [queryUserId, setQueryUserId] = useState('');
  const [queryOwnerName, setQueryOwnerName] = useState('');
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState(false);

  // 추가용 state
  const [addUserId, setAddUserId] = useState('');
  const [addOwnerName, setAddOwnerName] = useState('');
  const [itemId, setItemId] = useState('');
  const [senderName, setSenderName] = useState('');

  // 인라인 토스트 메시지
  const [infoMessage, setInfoMessage] = useState('');

  const fetchMails = async () => {
    if (!queryUserId || !queryOwnerName) return;
    try {
      setLoading(true);
      const res = await axios.get<Mail[]>('/api/mail', {
        params: { userId: queryUserId, ownerName: queryOwnerName }
      });
      setMails(res.data);
    } catch (err) {
      console.error('메일 조회 실패', err);
      setMails([]);
    } finally {
      setLoading(false);
    }
  };

  const onAdd = async () => {
    if (!addUserId || !addOwnerName || !itemId || !senderName) return;
    try {
      await axios.post('/api/mail', null, {
        params: {
          userId: addUserId,
          ownerName: addOwnerName,
          itemId,
          senderName
        }
      });
      setItemId('');
      setSenderName('');
      setInfoMessage('메일이 추가되었습니다.');
      fetchMails();
    } catch (err) {
      console.error('메일 추가 실패', err);
    }
  };

  const onRemove = async (mail: Mail) => {
    try {
      const res = await axios.post<{ removed: boolean }>(
        '/api/mail/remove',
        {
          userId: queryUserId,
          ownerName: queryOwnerName,
          itemId: mail.itemId,
          senderName: mail.senderName,
        }
      );
  
      if (res.data.removed) {
        setInfoMessage('메일이 삭제되었습니다.');
      } else {
        setInfoMessage('삭제할 메일이 없습니다.');
      }
  
      fetchMails();
    } catch (err) {
      console.error('메일 삭제 실패', err);
      setInfoMessage('삭제 중 오류가 발생했습니다.');
    }
  };
  

  // 메시지 자동 클리어 (3초 후)
  useEffect(() => {
    if (!infoMessage) return;
    const timer = setTimeout(() => setInfoMessage(''), 3000);
    return () => clearTimeout(timer);
  }, [infoMessage]);

  return (
    <div className={styles.container}>
      <h2>메일 관리</h2>

      {/* 조회 영역 */}
      <div className={styles.actions}>
        <input
          className={styles.input}
          placeholder="userId (조회)"
          value={queryUserId}
          onChange={e => setQueryUserId(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="ownerName (조회)"
          value={queryOwnerName}
          onChange={e => setQueryOwnerName(e.target.value)}
        />
        <button
          className={styles.fetchButton}
          onClick={fetchMails}
          disabled={loading}
        >
          {loading ? '조회 중...' : '메일 조회'}
        </button>
      </div>

      {/* 토스트 메시지 */}
      {infoMessage && (
        <div className={styles.infoMessage}>{infoMessage}</div>
      )}

      {/* 테이블 */}
      <table className={styles.mailTable}>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Sender Name</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {mails.map(mail => (
            <tr key={mail.itemId}>
              <td>{mail.itemId}</td>
              <td>{mail.senderName}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => onRemove(mail)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
          {mails.length === 0 && (
            <tr>
              <td colSpan={3} className={styles.emptyMessage}>
                조회된 메일이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 추가 영역 */}
      <div className={styles.addSection}>
        <h3>메일 추가</h3>
        <div className={styles.actions}>
          <input
            className={styles.input}
            placeholder="userId (추가)"
            value={addUserId}
            onChange={e => setAddUserId(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="ownerName (추가)"
            value={addOwnerName}
            onChange={e => setAddOwnerName(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="itemId"
            value={itemId}
            onChange={e => setItemId(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="senderName"
            value={senderName}
            onChange={e => setSenderName(e.target.value)}
          />
          <button
            className={styles.addButton}
            onClick={onAdd}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default MailPage;

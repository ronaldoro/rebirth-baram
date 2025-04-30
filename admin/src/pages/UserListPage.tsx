import React, { useState } from 'react';
import axios from 'axios';
import styles from './UserListPage.module.css';

interface User {
  id: string;
  name: string;
  mapName: string;
}

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get<User[]>('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('사용자 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // 검색어에 따라 필터링된 사용자 리스트
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2>사용자 확인</h2>

      <div className={styles.actions}>
        <button
          className={styles.fetchButton}
          onClick={fetchUsers}
          disabled={loading}
        >
          {loading ? '조회 중...' : '사용자 조회'}
        </button>

        <input
          type="text"
          placeholder="이름으로 검색"
          className={styles.searchInput}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>유저 ID</th>
            <th>유저 이름</th>
            <th>현재 맵</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.mapName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserListPage;

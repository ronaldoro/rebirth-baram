import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPage.module.css';
import UserListPage from '../pages/UserListPage';
import ExpRatePage from '../pages/ExpRatePage';
import NoticePage from '../pages/NoticePage';

type MenuType = '사용자 확인' | '경험치 배율 조절' | '공지사항';

const AdminPage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('사용자 확인');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeMenu) {
      case '사용자 확인':
        return <UserListPage />;
      case '경험치 배율 조절':
        return <ExpRatePage />;
      case '공지사항':
        return <NoticePage />;
      default:
        return null;
    }
  };

  const menuItems: MenuType[] = ['사용자 확인', '경험치 배율 조절', '공지사항'];

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>관리 메뉴</h3>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li
              key={item}
              className={`${styles.menuItem} ${
                activeMenu === item ? styles.active : ''
              }`}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;

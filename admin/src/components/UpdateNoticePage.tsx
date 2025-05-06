// src/components/UpdateNoticePage.tsx
import React from 'react';
import styles from './UpdateNoticePage.module.css';

interface Section {
  label: string;
  icon: string;
  items: string[];
}

interface Notice {
  id: number;
  title: string;
  date: string;
  sections: Section[];
}

const mockNotices: Notice[] = [
  {
    id: 1,
    title: '서비스 점검 안내',
    date: '2025-05-06',
    sections: [
      {
        label: '점검 내용',
        icon: '🔧',
        items: [
          '데이터 안정화 및 기능 추가로 점검을 진행했습니다. 이용에 불편을 드려 죄송합니다.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: '버전 0.1.2 업데이트',
    date: '2025-05-06',
    sections: [
      {
        label: '신규 기능',
        icon: '🚀',
        items: [
          '스킬 스마트키 기능 추가',
          '편지함 기능 추가',
          '거미독창, 저주의단검 퀘스트 추가',
          '1차승급 추가',
          // 앞으로 여기다 목록을 더 추가하면 됩니다.
        ],
      },
      {
        label: '수정 사항',
        icon: '🐛',
        items: [
            '일부 아이템 유실되는문제 수정',
            '비정상적인 플레이어 이동 문제 수정',
            '아이템 조합이 되지 않던 문제 수정'
        ],
      },
      {
        label: '변경 및 개선 사항',
        icon: '⚡',
        items: [
            '체력비례 일반공격 데미지 변경',
            '전사 체력 회복량 대폭 상승',
            '주술사 탭탭 사거리 변경'
        ],
      },
    ],
  },
];

const UpdateNoticePage: React.FC = () => (
  <div className={styles.container}>
    <div className={styles.card}>
      {mockNotices.map((n) => (
        <div key={n.id} className={styles.noticeItem}>
          <div className={styles.noticeHeader}>
            <span className={styles.noticeTitle}>{n.title}</span>
            <span className={styles.noticeDate}>{n.date}</span>
          </div>
          {n.sections.map((sec) => (
            <div key={sec.label} className={styles.section}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>{sec.icon}</span>
                <span className={styles.sectionLabel}>{sec.label}</span>
              </div>
              <ul className={styles.sectionList}>
                {sec.items.map((item, idx) => (
                  <li key={idx} className={styles.sectionItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default UpdateNoticePage;

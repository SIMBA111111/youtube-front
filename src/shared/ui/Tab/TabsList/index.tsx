// shared/ui/Tabs/TabsList.tsx
'use client';

import React from 'react';
import { useTabsContext } from '../TabProvider';
// import styles from './Tabs.module.scss';

interface TabsListProps {
  classNameList?: string;
  classNameItem?: string;
  classNameActiveItem?: string
  children?: React.ReactNode; // можно передать кастомные кнопки, но обычно используем автоматические
}

export const TabsList = ({ classNameList, classNameItem, classNameActiveItem, children }: TabsListProps) => {
  const { tabs, activeTabId, setActiveTabId } = useTabsContext();

  // Если переданы children, используем их (для кастомной разметки)
  if (children) {
    return <div className={classNameList}>{children}</div>;
  }

  // Иначе рендерим автоматические кнопки из зарегистрированных табов
  return (
    <div className={` ${classNameList || ''}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={` ${activeTabId === tab.id ? classNameActiveItem : ''} ${classNameItem}`}
          onClick={() => setActiveTabId(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
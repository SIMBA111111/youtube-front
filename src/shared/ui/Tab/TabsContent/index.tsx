// shared/ui/Tabs/TabsContent.tsx
'use client';

import React, { ReactNode } from 'react';
import { useTabsContext } from '../TabProvider';

interface TabsContentProps {
  children: ReactNode;
  className?: string;
}

export const TabsContent = ({ children, className }: TabsContentProps) => {
  const { activeTabId, tabs } = useTabsContext();
  
  // Находим активный таб
  const activeTab = tabs.find(tab => tab.id === activeTabId);
  
  if (!activeTab) return null;

  // Ищем соответствующий дочерний элемент с нужным id
  let activeContent: ReactNode = null;
  
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.props?.id === activeTabId) {
      activeContent = child.props?.children;
    }
  });

  return (
    <div className={className}>
      {activeContent}
    </div>
  );
};
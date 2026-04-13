// shared/ui/Tabs/context.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useRef, useEffect } from 'react';

interface TabItem {
  id: string;
  label: ReactNode;
}

interface TabsContextValue {
  activeTabId: string;
  setActiveTabId: (id: string) => void;
  registerTab: (id: string, label: ReactNode) => void;
  unregisterTab: (id: string) => void;
  tabs: TabItem[];
}

const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab компоненты должны использоваться внутри TabsRoot');
  }
  return context;
};

interface TabsRootProps {
  children: ReactNode;
  defaultActiveTabId?: string;
  onTabChange?: (tabId: string) => void;
}

export const TabsRoot = ({ 
  children, 
  defaultActiveTabId, 
  onTabChange 
}: TabsRootProps) => {
  const [activeTabId, setActiveTabId] = useState(defaultActiveTabId || '');
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const isFirstTabRef = useRef(true);

  // Стабилизируем registerTab с помощью useCallback
  const registerTab = useCallback((id: string, label: ReactNode) => {
    setTabs(prev => {
      if (prev.some(tab => tab.id === id)) return prev;
      return [...prev, { id, label }];
    });
  }, []);

  // Стабилизируем unregisterTab с помощью useCallback
  const unregisterTab = useCallback((id: string) => {
    setTabs(prev => prev.filter(tab => tab.id !== id));
  }, []);

  // Устанавливаем первый таб активным, только если нет активного и нет defaultActiveTabId
  useEffect(() => {
    if (tabs.length > 0 && !activeTabId && !defaultActiveTabId && isFirstTabRef.current) {
      setActiveTabId(tabs[0].id);
      isFirstTabRef.current = false;
    }
  }, [tabs, activeTabId, defaultActiveTabId]);

  const handleSetActiveTab = useCallback((id: string) => {
    setActiveTabId(id);
    onTabChange?.(id);
  }, [onTabChange]);

  const contextValue = {
    activeTabId,
    setActiveTabId: handleSetActiveTab,
    registerTab,
    unregisterTab,
    tabs,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      {children}
    </TabsContext.Provider>
  );
};
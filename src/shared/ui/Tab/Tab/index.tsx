// shared/ui/Tabs/Tab.tsx
'use client';

import React, { ReactNode, useEffect } from 'react';
import { useTabsContext } from '../TabProvider';

interface TabProps {
  id: string;
  label: ReactNode;
  children: ReactNode;
  className?: string
}

export const Tab = ({ id, label, children, className }: TabProps) => {
  const { registerTab, unregisterTab, activeTabId } = useTabsContext();

  useEffect(() => {
    registerTab(id, label);
    return () => unregisterTab(id);
  }, [id, label, registerTab, unregisterTab]);

  if (activeTabId !== id) return null;

  return <div className={className}>{children}</div>;
};
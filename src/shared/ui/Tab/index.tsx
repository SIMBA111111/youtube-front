// shared/ui/Tabs/index.ts
'use client';

export { TabsRoot } from './TabProvider';
export { TabsList } from './TabsList';
export { Tab } from './Tab';
export { TabsContent } from './TabsContent';

// Удобный объект для импорта
import { TabsRoot, TabsList, Tab, TabsContent } from './index';

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: Tab,
  Content: TabsContent,
};
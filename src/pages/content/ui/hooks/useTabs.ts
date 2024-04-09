import { useState } from 'react';

export const useTabs = (initialTab: string) => {
  const [tab, setTab] = useState(initialTab);

  const changeTab = (tab: string) => {
    setTab(tab);
  };

  return { tab, changeTab };
};

import { atom, useAtom } from 'jotai';
import { FC } from 'react';
import { TabButtons } from './TabButtons';
import { tabObject } from './TabButtons/TabButtons';
import { TabContent } from './TabContent';

type Props = {};

export const activeTab = atom(tabObject.profile);

export const Tabs: FC<Props> = ({}) => {
  const [tabSelectedId, setTabSelectedId] = useAtom(activeTab);

  const handleClickTab = (id: number) => {
    setTabSelectedId(id);
  };

  return (
    <div>
      <TabButtons activeTabId={tabSelectedId} onClickTab={handleClickTab} />
      <TabContent tabSelectedId={tabSelectedId} />
    </div>
  );
};

Tabs.displayName = 'Tabs';

import { FC } from 'react';
import { TabButton } from './TabButton';

type Props = {
  activeTabId: number;
  onClickTab: (tabId: number) => void;
};

const tabs = [
  { id: 0, name: 'Hồ sơ' },
  { id: 1, name: 'Hợp đồng' },
];

export const tabObject = {
  profile: 0,
  contracts: 1,
};

export const TabButtons: FC<Props> = ({ activeTabId, onClickTab }) => {
  return (
    <ul className='mb-10 flex rounded-lg text-center text-sm font-medium text-gray-500 shadow dark:divide-gray-700 dark:text-gray-400 sm:flex'>
      {tabs.map((tab, index) => (
        <TabButton
          key={tab.id}
          tabName={tab.name}
          isPageSnapTab={index === 0}
          isActive={activeTabId === tab.id}
          isLast={index === tabs.length - 1}
          onClickTab={() => onClickTab(tab.id)}
        />
      ))}
    </ul>
  );
};

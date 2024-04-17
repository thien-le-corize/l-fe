import { useAtomValue } from 'jotai';
import { FC, memo } from 'react';

type Props = {
  isLast: boolean;
  tabName: string;
  isActive: boolean;
  isPageSnapTab: boolean;
  onClickTab: () => void;
};

export const TabButton: FC<Props> = memo(
  ({ isLast, tabName, isActive, isPageSnapTab, onClickTab }) => {

    return (
      <li onClick={onClickTab} className='w-full focus-within:z-10'>
        <span
          className={`${isPageSnapTab ? 'rounded-s-lg' : null} ${isLast ? 'rounded-e-lg' : null} ${isActive ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white' : 'cursor-pointer hover:bg-gray-50'} active inline-block w-full border-r border-gray-200 p-4 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-gray-700`}
        >
          {tabName}
        </span>
      </li>
    );
  }
);

TabButton.displayName = 'TabButton';

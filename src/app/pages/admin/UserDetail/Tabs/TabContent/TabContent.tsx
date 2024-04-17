import { FC } from 'react';
import { tabObject } from '../TabButtons';
import { UserProfile } from './UserProfile/UserProfile';
import { UserContracts } from './UserContracts/UserContracts';

type Props = {
  tabSelectedId: number;
};

const renderTab = (tabSelectedId: number) => {
  switch (tabSelectedId) {
    case tabObject.contracts:
      return <UserContracts />;

    case tabObject.profile:
      return <UserProfile />;

    default:
      return null;
  }
};

export const TabContent: FC<Props> = ({ tabSelectedId }) => {
  return renderTab(tabSelectedId);
};

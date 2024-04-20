import { atom, useAtom } from "jotai";
import { FC, useEffect } from "react";
import { TabButtons } from "./TabButtons";
import { tabObject } from "./TabButtons/TabButtons";
import { TabContent } from "./TabContent";
import { useSearchParams } from "next/navigation";

type Props = {};

export const activeTab = atom(tabObject.profile);

export const Tabs: FC<Props> = ({}) => {
  const [tabSelectedId, setTabSelectedId] = useAtom(activeTab);

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const handleClickTab = (id: number) => {
    setTabSelectedId(id);
  };

  useEffect(() => {
    if (tab === "contracts") {
      setTabSelectedId(tabObject.contracts);
    }
  }, [setTabSelectedId, tab]);

  return (
    <div>
      <TabButtons activeTabId={tabSelectedId} onClickTab={handleClickTab} />
      <TabContent tabSelectedId={tabSelectedId} />
    </div>
  );
};

Tabs.displayName = "Tabs";

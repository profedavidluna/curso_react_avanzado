import { createContext, useContext, useMemo, useState } from 'react';

const TabsContext = createContext(null);

function useTabsContext() {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs components must be used inside <Tabs>.');
  }

  return context;
}

export function Tabs({ children, defaultValue }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const contextValue = useMemo(
    () => ({ selectedValue, setSelectedValue }),
    [selectedValue],
  );

  return <TabsContext.Provider value={contextValue}>{children}</TabsContext.Provider>;
}

Tabs.List = function TabsList({ children }) {
  return <div role="tablist">{children}</div>;
};

Tabs.Trigger = function TabsTrigger({ children, value }) {
  const { selectedValue, setSelectedValue } = useTabsContext();

  return (
    <button
      type="button"
      aria-pressed={selectedValue === value}
      onClick={() => setSelectedValue(value)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ children, value }) {
  const { selectedValue } = useTabsContext();

  if (selectedValue !== value) {
    return null;
  }

  return <section>{children}</section>;
};

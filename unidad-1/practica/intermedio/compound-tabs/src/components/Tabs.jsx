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

Tabs.List = function TabsList({ children, label = 'Navegación de pestañas' }) {
  return (
    <div role="tablist" aria-label={label}>
      {children}
    </div>
  );
};

Tabs.Trigger = function TabsTrigger({ children, value }) {
  const { selectedValue, setSelectedValue } = useTabsContext();
  const triggerId = `tab-${value}`;
  const panelId = `panel-${value}`;

  return (
    <button
      type="button"
      role="tab"
      id={triggerId}
      aria-selected={selectedValue === value}
      aria-controls={panelId}
      tabIndex={selectedValue === value ? 0 : -1}
      onClick={() => setSelectedValue(value)}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({ children, value }) {
  const { selectedValue } = useTabsContext();
  const triggerId = `tab-${value}`;
  const panelId = `panel-${value}`;

  if (selectedValue !== value) {
    return null;
  }

  return (
    <section role="tabpanel" id={panelId} aria-labelledby={triggerId}>
      {children}
    </section>
  );
};

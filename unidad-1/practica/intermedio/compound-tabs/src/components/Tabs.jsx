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

  const handleKeyDown = (event) => {
    const tabList = event.currentTarget.closest('[role="tablist"]');

    if (!tabList) {
      return;
    }

    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const currentIndex = tabs.indexOf(event.currentTarget);

    if (currentIndex === -1 || tabs.length === 0) {
      return;
    }

    const focusTab = (index) => {
      const nextTab = tabs[index];

      if (!nextTab) {
        return;
      }

      nextTab.focus();
      nextTab.click();
    };

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab((currentIndex + 1) % tabs.length);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab((currentIndex - 1 + tabs.length) % tabs.length);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusTab(tabs.length - 1);
    }
  };

  return (
    <button
      type="button"
      role="tab"
      id={triggerId}
      aria-selected={selectedValue === value}
      aria-controls={panelId}
      tabIndex={selectedValue === value ? 0 : -1}
      onKeyDown={handleKeyDown}
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

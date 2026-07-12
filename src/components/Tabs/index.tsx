import React, { useState } from 'react';

export interface TabItem {
  label: React.ReactNode;
  value: string;
  /** Panel content shown when this tab is active. */
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  className?: string;
  tabs: TabItem[];
  /** Controlled active tab value. */
  value?: string;
  /** Initial active tab value when uncontrolled. Defaults to the first tab. */
  defaultValue?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}

/**
 * Tabbed navigation for switching between panels of content.
 * Uncontrolled by default (tracks its own active tab); pass `value` + `onChange` to control it.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-tabs--docs
 */
export function Tabs({ tabs = [], value, defaultValue, onChange, style, className = '' }: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? tabs[0]?.value);
  const active = value ?? internalValue;
  const activeTab = tabs.find((tab) => tab.value === active);

  const select = (tabValue: string) => {
    if (value === undefined) setInternalValue(tabValue);
    onChange?.(tabValue);
  };

  return (
    <div style={style} className={className}>
      <div
        role="tablist"
        className="flex gap-1 font-mono border-b"
      >
        {tabs.map((tab) => {
          const isActive = tab.value === active;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={tab.disabled ? undefined : () => select(tab.value)}
              className="text-xs tracking-wide uppercase"
              style={{
                appearance: 'none',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${isActive ? 'var(--primary-strong)' : 'transparent'}`,
                padding: '10px 14px',
                fontFamily: 'inherit',
                color: tab.disabled ? 'var(--fg-2)' : isActive ? 'var(--primary-strong)' : 'var(--fg-1)',
                cursor: tab.disabled ? 'not-allowed' : 'pointer',
                opacity: tab.disabled ? 0.5 : 1,
                outline: 'none',
                transition: 'color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out)',
              }}
              onMouseEnter={!tab.disabled && !isActive ? (e) => { e.currentTarget.style.color = 'var(--fg-0)'; } : undefined}
              onMouseLeave={!tab.disabled && !isActive ? (e) => { e.currentTarget.style.color = 'var(--fg-1)'; } : undefined}
              onFocus={(e) => { e.currentTarget.style.boxShadow = 'var(--ring-focus)'; }}
              onBlur={(e)  => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {activeTab?.content !== undefined ? (
        <div role="tabpanel" className="font-body text-default" style={{ padding: '16px 0' }}>
          {activeTab.content}
        </div>
      ) : null}
    </div>
  );
}

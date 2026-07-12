import React from 'react';

export interface TableColumn<T = any> {
  key: string;
  header: React.ReactNode;
  /** Text alignment for both header and cells. Defaults to 'left'. */
  align?: 'left' | 'center' | 'right';
  /** Overrides the default `row[key]` cell content. */
  render?: (row: T, rowIndex: number) => React.ReactNode;
}

export interface TableProps<T = any> {
  /** Column definitions, rendered left to right. */
  columns: TableColumn<T>[];
  /** Row data. Each cell renders `row[column.key]` unless `column.render` is given. */
  data?: T[];
  /** Alternate row background. */
  striped?: boolean;
  /** Tighter cell padding. */
  dense?: boolean;
  /** Makes rows interactive (hover + pointer cursor + click handling). */
  onRowClick?: (row: T, rowIndex: number) => void;
  /** Optional caption rendered above the table. */
  caption?: React.ReactNode;
  /** Rendered in place of the body when `data` is empty. */
  empty?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Simple data table for tabular display. Not paginated or sortable —
 * for advanced features (sorting, pagination, virtualization) a future
 * `walrus-design-extended` package will wrap this with TanStack Table.
 *
 * @see https://design.clintenhopkins.com/?path=/docs/components-table--docs
 */
export function Table<T = any>({
  columns,
  data = [],
  striped = false,
  dense = false,
  onRowClick,
  caption,
  empty = 'No data',
  className = '',
  style,
  ...rest
}: TableProps<T>) {
  const interactive = Boolean(onRowClick);
  const cellPadding = dense ? '6px 10px' : '10px 14px';

  return (
    <div className="w-full overflow-x-auto">
      {caption ? (
        <div className="font-mono text-xs tracking-wide uppercase text-secondary mb-2">
          {caption}
        </div>
      ) : null}
      <table
        className={`w-full font-body text-sm text-default rounded-md ${className}`}
        style={{
          borderCollapse: 'collapse',
          fontSize: 'var(--text-sm)',
          background: 'var(--bg-1)',
          border: '1px solid var(--border-0)',
          ...style,
        }}
        {...rest}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className="font-mono text-xs tracking-wide uppercase text-secondary"
                style={{
                  textAlign: col.align || 'left',
                  padding: cellPadding,
                  borderBottom: '1px solid var(--border-1)',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length || 1}
                className="text-secondary"
                style={{ padding: cellPadding, textAlign: 'center' }}
              >
                {empty}
              </td>
            </tr>
          ) : (
            data.map((row: any, rowIndex) => {
              const rowBg = striped && rowIndex % 2 === 1 ? 'var(--bg-2)' : 'transparent';
              return (
                <tr
                  key={row.id ?? rowIndex}
                  onClick={interactive ? () => onRowClick!(row, rowIndex) : undefined}
                  tabIndex={interactive ? 0 : undefined}
                  role={interactive ? 'button' : undefined}
                  onKeyDown={
                    interactive
                      ? (e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onRowClick!(row, rowIndex);
                          }
                        }
                      : undefined
                  }
                  style={{
                    background: rowBg,
                    cursor: interactive ? 'pointer' : 'default',
                    transition: 'background var(--duration-fast) var(--ease-out)',
                    outline: 'none',
                  }}
                  onMouseEnter={interactive ? (e) => { e.currentTarget.style.background = 'var(--bg-2)'; } : undefined}
                  onMouseLeave={interactive ? (e) => { e.currentTarget.style.background = rowBg; } : undefined}
                  onFocus={interactive    ? (e) => { e.currentTarget.style.boxShadow = 'inset var(--ring-focus)'; } : undefined}
                  onBlur={interactive     ? (e) => { e.currentTarget.style.boxShadow = 'none'; } : undefined}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="text-secondary"
                      style={{
                        textAlign: col.align || 'left',
                        padding: cellPadding,
                        borderBottom: '1px solid var(--border-0)',
                      }}
                    >
                      {col.render ? col.render(row, rowIndex) : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

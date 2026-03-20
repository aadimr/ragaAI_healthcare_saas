import type { ReactNode } from 'react';

export interface Column<T> {
  header: string;
  accessor: (item: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
}

export function Table<T>({ data, columns, keyExtractor }: TableProps<T>) {
  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, i) => (
                <th key={i} scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((item) => (
              <tr key={keyExtractor(item)} className="hover:bg-gray-50/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>
                    {col.accessor(item)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-sm text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

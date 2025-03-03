import React from 'react';

function PortfolioTable({ assets, totalValue, currency }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow-md">
        <thead className="bg-gray-100 dark:bg-gray-600">
          <tr>
            <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">ID</th>
            <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Type</th>
            <th className="py-3 px-6 text-left text-gray-600 dark:text-gray-200 font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
              <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{asset.id}</td>
              <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{asset.type}</td>
              <td className="py-3 px-6 text-gray-800 dark:text-gray-200">{currency}{asset.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">Total Value: {currency}{totalValue.toFixed(2)}</p>
    </div>
  );
}

export default PortfolioTable;
import React, { useState, useEffect } from 'react';
import StockTab from '../components/StockTab';
import FixedIncomeTab from '../components/FixedIncomeTab';
import MutualFundTab from '../components/MutualFundTab';
import CashTab from '../components/CashTab';
import RealEstateTab from '../components/RealEstateTab';

function AddUpdatePage() {
  const [activeTab, setActiveTab] = useState('Stock');

  const tabs = [
    { name: 'Stock', component: StockTab },
    { name: 'FixedIncome', component: FixedIncomeTab },
    { name: 'MutualFund', component: MutualFundTab },
    { name: 'Cash', component: CashTab },
    { name: 'RealEstate', component: RealEstateTab },
  ];

  const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component || StockTab;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Add/Update Portfolio</h1>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 dark:border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`py-2 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.name
                ? 'border-b-2 border-secondary text-secondary'
                : 'text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <ActiveComponent />
      </div>
    </div>
  );
}

export default AddUpdatePage;
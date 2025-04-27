import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaMoneyBillWave, FaChartLine, FaPiggyBank, FaUniversity, FaCoins, FaHome } from 'react-icons/fa';
import PortfolioTable from '../components/PortfolioTable';
import NetWorthCard from '../components/NetWorthCard';
import { fetchAssets } from '../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const currencyOptions = [
  { value: '₹', label: '₹ INR' },
  { value: '$', label: '$ USD' },
  { value: '€', label: '€ EUR' },
  { value: '£', label: '£ GBP' },
];

const getIconForType = (type) => {
  switch (type.toLowerCase()) {
    case 'cash':
      return <FaMoneyBillWave className="text-4xl" />;
    case 'stock':
      return <FaChartLine className="text-4xl" />;
    case 'fixedincome':
      return <FaPiggyBank className="text-4xl" />;
    case 'mutualfund':
      return <FaUniversity className="text-4xl" />;
    case 'realestate':
      return <FaHome className="text-4xl" />;
    default:
      return <FaCoins className="text-4xl" />;
  }
};

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState({ assets: [], total_value: 0, currency: '₹' });
  const [currency, setCurrency] = useState('₹');

  useEffect(() => {
    const fetchPortfolio = async () => {
      const data = await fetchAssets(); // Automatically uses global setLoading from api.js
      setPortfolio(data);
    };
    fetchPortfolio();
  }, []);

  useEffect(() => {
    setPortfolio((prevPortfolio) => ({
      ...prevPortfolio,
      currency,
    }));
  }, [currency]);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const { assets, total_value } = portfolio;

  const typeTotals = assets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + asset.value;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(typeTotals),
    datasets: [
      {
        data: Object.values(typeTotals),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#9966FF', '#FF9F40'],
        hoverOffset: 4,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: { position: 'top', labels: { color: '#4B5563', font: { size: 14 } } },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${currency}${context.raw.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Your Portfolio</h1>
        <div className="flex items-center space-x-4">
          <select
            value={currency}
            onChange={handleCurrencyChange}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {currencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Add dark/light mode toggle here */}
        </div>
      </div>

      <NetWorthCard currency={currency} totalValue={total_value} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Object.entries(typeTotals).map(([type, value]) => (
          <div
            key={type}
            className="p-6 rounded-lg shadow-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700 transform transition-transform hover:scale-105 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center space-x-4"
          >
            {getIconForType(type)}
            <div>
              <h3 className="text-lg font-semibold">{type}</h3>
              <p className="text-2xl">{currency}{value.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Investment Distribution</h2>
        <div className="max-w-md mx-auto">
          <Pie data={pieData} options={pieOptions} />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Detailed Breakdown</h2>
        <PortfolioTable assets={assets} totalValue={total_value} currency={currency} />
      </div>
    </div>
  );
};

export default PortfolioPage;
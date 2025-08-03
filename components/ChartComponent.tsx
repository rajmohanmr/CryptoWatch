'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
        <p className="text-sm text-yellow-400 font-bold">${payload[0].value.toFixed(2)}</p>
        <p className="text-xs text-gray-400">{new Date(label).toLocaleDateString()}</p>
      </div>
    );
  }
  return null;
};

interface ChartComponentProps {
  data: [number, number][]; // Array of [timestamp, price]
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
  // Recharts expects data in a specific format (array of objects)
  const formattedData = data.map(([timestamp, price]) => ({
    date: timestamp,
    price: price,
  }));

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <XAxis
            dataKey="date"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            stroke="#6B7280"
            tick={{ fill: '#D1D5DB', fontSize: 12 }}
          />
          <YAxis
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            stroke="#6B7280"
            tick={{ fill: '#D1D5DB', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="price" stroke="#FBBF24" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
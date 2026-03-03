"use client"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

const Risk = () => {
  return (
    <div className='p-1 m-1 rounded border border-stone-300 col-span-4 overflow-hidden shadow-md'>
      <div className='p-2 items-center'>
       <div className='flex items-center gap-1'> Risk Levels
        </div>
        <RiskBarChart/>
         </div>
    </div>
  )
}

export default Risk






const data = [
  { level: "Low", customers: 820 },
  { level: "Medium", customers: 640 },
  { level: "High", customers: 387 },
];

const COLORS = ["#33FF66", "#FFFF66", "#FF3333"]; // green, yellow, red

const RiskBarChart = () => {
  return (
    <div className="h-75 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="level" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="customers" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { RiskBarChart };    
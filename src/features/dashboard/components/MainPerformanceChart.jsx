import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-lg p-3">
        <p className="text-sm font-semibold text-slate-700 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: <span className="font-medium">{entry.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function MainPerformanceChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1A5FFF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#1A5FFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[60, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={85} stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={1.5} />
        <Area
          type="monotone"
          dataKey="value"
          name="OEE %"
          stroke="#1A5FFF"
          strokeWidth={3}
          fill="url(#colorValue)"
          dot={{ fill: '#1A5FFF', strokeWidth: 0, r: 4 }}
          activeDot={{ r: 6, fill: '#1A5FFF', stroke: '#fff', strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 shadow-lg p-3 text-sm">
        <p className="font-semibold text-slate-700 mb-1.5">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-slate-600" style={{ color: entry.color || '#64748b' }}>
            {entry.name}: <span className="font-medium">{entry.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PredictiveChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1A5FFF" stopOpacity={0.12} />
            <stop offset="95%" stopColor="#1A5FFF" stopOpacity={0.03} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} domain={[60, 100]} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine x="Hoy" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={1.5} label={{ value: 'INICIO PRONÓSTICO', position: 'top', fontSize: 11, fill: '#94a3b8' }} />

        <Area type="monotone" dataKey="p90_upper" stroke="none" fill="url(#confidenceGrad)" />
        <Area type="monotone" dataKey="p10_lower" stroke="none" fill="#FFFFFF" fillOpacity={1} />

        <Area type="monotone" dataKey="actualValue" stroke="#1A5FFF" strokeWidth={2.5} fill="none" dot={false} name="Valor Real" />

        <Area type="monotone" dataKey="predictedValue" stroke="#1A5FFF" strokeWidth={2.5} strokeDasharray="6 4" fill="none" dot={false} name="Pronóstico" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import "./gaugeChart.scss";

const GaugeChart = ({ value, label, color }) => {
  const maxValue = 80;

  const data = [
    { name: "Speed", value: Math.min(value, maxValue) },
    { name: "Remaining", value: maxValue - Math.min(value, maxValue) },
  ];

  return (
    <div className="gauge-chart">
      <ResponsiveContainer width={150} height={70}>
        <PieChart>
          {/* Background Arc */}
          <Pie
            data={[{ value: maxValue }]}
            dataKey="value"
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            outerRadius={50}
            innerRadius={40}
            fill="#e0e0e0"
            stroke="none"
          />
          {/* Foreground Arc (Actual Value) */}
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="100%"
            startAngle={180}
            endAngle={0}
            outerRadius={50}
            innerRadius={40}
            stroke="none"
          >
            <Cell fill={color} />
            <Cell fill="transparent" />
            <Label
              value={value}
              position="center"
              fill="white"
              style={{ fontSize: "16px", fontWeight: "bold" }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GaugeChart;

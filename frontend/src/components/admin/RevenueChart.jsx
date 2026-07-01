import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import "./AdminDashboard.css";

const RevenueChart = ({ revenue }) => {

  const data = [
    { month: "Jan", revenue: revenue * 0.18 },
    { month: "Feb", revenue: revenue * 0.30 },
    { month: "Mar", revenue: revenue * 0.45 },
    { month: "Apr", revenue: revenue * 0.60 },
    { month: "May", revenue: revenue * 0.82 },
    { month: "Jun", revenue: revenue },
  ];

  return (
    <div className="chart-card">

      <div className="chart-header">

        <div>

          <h2>Revenue Overview</h2>

          <p>
            Sales Performance (Last 6 Months)
          </p>

        </div>

        <button className="chart-btn">
          This Year
        </button>

      </div>

      <ResponsiveContainer
        width="100%"
        height={340}
      >

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="colorRevenue"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#0c831f"
                stopOpacity={0.45}
              />

              <stop
                offset="95%"
                stopColor="#0c831f"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#0c831f"
            strokeWidth={4}
            fill="url(#colorRevenue)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;
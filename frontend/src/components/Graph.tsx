import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./chart.css";

const Graph = () => {
  // 📈 Données ventes mensuelles
  const ventesData = [
    { mois: "Janv", ventes: 120 },
    { mois: "Févr", ventes: 180 },
    { mois: "Mars", ventes: 150 },
    { mois: "Avril", ventes: 200 },
    { mois: "Mai", ventes: 240 },
    { mois: "Juin", ventes: 280 },
  ];

  // 🍩 Données stock par article
  const articlesData = [
    { name: "Casques", value: 80 },
    { name: "Hoddie", value: 120 },
    { name: "Guitare", value: 60 },
    { name: "Gourde colorée", value: 45 },
    { name: "BLACKPINK", value: 20 },
  ];

  // 🎨 Palette de couleurs distinctes
  const COLORS = ["#FACC15", "#FDBA74", "#60A5FA", "#34D399", "#F472B6"];

  return (
    <section className="charts-section">
      {/* 📈 Graphique de gauche — Ventes mensuelles */}
      <div className="chart-card large">
        <h3>📈 Ventes mensuelles</h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={ventesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="mois" tick={{ fill: "#1e1e1e" }} />
            <YAxis tick={{ fill: "#1e1e1e" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #facc15",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="ventes"
              stroke="#FACC15"
              strokeWidth={4}
              dot={{ r: 6, fill: "#FACC15", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🍩 Graphique de droite — Répartition du stock */}
      <div className="chart-card large">
        <h3>🍩 Répartition du stock</h3>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={articlesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={4}
              label={({ name, value }) => `${name} (${value})`}
            >
              {articlesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #facc15",
                borderRadius: "8px",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default Graph;

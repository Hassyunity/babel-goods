import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useEffect, useState } from "react";
import "./chart.css";

interface ArticleData {
  name: string;
  value: number;
}

const Graph = () => {
  const [articlesData, setArticlesData] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);

  const ventesData = [
    { mois: "Janv", ventes: 120 },
    { mois: "Févr", ventes: 180 },
    { mois: "Mars", ventes: 150 },
    { mois: "Avril", ventes: 200 },
    { mois: "Mai", ventes: 240 },
    { mois: "Juin", ventes: 280 },
  ];

  const COLORS = ["#FACC15", "#FDBA74", "#60A5FA", "#34D399", "#F472B6", "#A78BFA"];

  useEffect(() => {
    fetch("http://localhost:3000/api/articles/stocks")
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur serveur ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("✅ Données reçues :", data);
        setArticlesData(Array.isArray(data) ? data : []);
      })
      .catch((error) => console.error("❌ Erreur chargement données :", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="charts-section">
      {/* === 📊 Ventes mensuelles === */}
      <div className="chart-card large">
        <h3>📊 Ventes mensuelles</h3>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={ventesData} margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FACC15" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FACC15" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e5e7eb" strokeOpacity={0.9} strokeWidth={3} />
            <XAxis dataKey="mois" stroke="#000" />
            <YAxis stroke="#000" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #facc15",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="ventes"
              stroke="#FACC15"
              fillOpacity={1}
              fill="url(#colorVentes)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* === 🍩 Répartition du stock === */}
      <div className="chart-card large">
        <h3>🍩 Répartition du stock</h3>
        {loading ? (
          <p>Chargement des données...</p>
        ) : Array.isArray(articlesData) && articlesData.length > 0 ? (
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={articlesData as any}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={4}
                label={({ name, value }) => `${name} (${value})`}
              >
                {articlesData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>Aucune donnée disponible.</p>
        )}
      </div>
    </section>
  );
};

export default Graph;

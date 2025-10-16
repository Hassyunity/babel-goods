import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import jsPDF from "jspdf";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

interface Commande {
  id: number;
  article_id: number;
  nom_personne: string;
  adresse_livraison: string;
  province: string;
  prix: number;
  telephone: string;
  etat: string;
  remarque: string;
  created_at: string;
  updated_at: string;
}

const CalendarSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [orders, setOrders] = useState<Commande[]>([]);

  // 🧩 Charger les données depuis ton backend Rails
  useEffect(() => {
    fetch("http://localhost:3000/api/commandes")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Erreur de chargement des commandes :", err));
  }, []);

  // 🎯 Formater la date sélectionnée
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const ordersOfTheDay = orders.filter(
    (o) => o.created_at.split("T")[0] === formattedDate
  );

  // 🔢 Compter les commandes par date
  const getOrderCountForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0];
    return orders.filter((o) => o.created_at.split("T")[0] === dateString).length;
  };

  // 📄 Fonction pour générer le PDF
  const handleDownloadPDF = (order: Commande) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const lineHeight = 10;
    let y = 40;

    const infos = [
      { label: "Nom", value: order.nom_personne },
      { label: "Adresse", value: order.adresse_livraison },
      { label: "Province", value: order.province },
      { label: "Téléphone", value: order.telephone },
      { label: "Prix total", value: `${order.prix.toLocaleString("fr-FR")} Ar` },
    ];

    infos.forEach((info) => {
      doc.text(`${info.label} : ${info.value}`, 20, y);
      y += lineHeight;
    });

    doc.setDrawColor(250, 204, 21);
    doc.line(20, 30, 190, 30);

    doc.save(`commande_${order.id}_${order.nom_personne}.pdf`);
  };

  return (
    <section className="calendar-section">
      {/* === GAUCHE : CALENDRIER === */}
      <div className="calendar-left">
        <h2>📅 Sélectionnez une date</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="custom-calendar"
          tileContent={({ date }) => {
            const count = getOrderCountForDate(date);
            return count > 0 ? (
              <sup className="calendar-badge">{count}</sup>
            ) : null;
          }}
        />
      </div>

      {/* === DROITE : DÉTAILS DES COMMANDES === */}
      <div className="calendar-right">
        <h2>
          Commandes du{" "}
          {selectedDate.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </h2>

        {ordersOfTheDay.length > 0 ? (
          <ul className="order-list">
            {ordersOfTheDay.map((order) => (
              <li key={order.id} className="order-item">
                <div className="order-header">
                  <h3>🧾 {order.nom_personne}</h3>
                  <div className="order-actions">
                    <span className={`order-status ${order.etat.toLowerCase()}`}>
                      {order.etat}
                    </span>
                    <button
                      className="download-btn"
                      title="Télécharger en PDF"
                      onClick={() => handleDownloadPDF(order)}
                    >
                      ⬇️
                    </button>
                  </div>
                </div>

                <div className="order-details">
                  <p>
                    <strong>📍 Adresse :</strong> {order.adresse_livraison}
                  </p>
                  <p>
                    <strong>Province :</strong> {order.province}
                  </p>
                  <p>
                    <strong>📞 Téléphone :</strong> {order.telephone}
                  </p>
                  <p>
                    <strong>💬 Remarque :</strong>{" "}
                    {order.remarque || "Aucune remarque"}
                  </p>
                  <p className="order-price">
                    💰 <strong>Total :</strong>{" "}
                    {Number(order.prix).toLocaleString("fr-FR")} Ar
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-orders">Aucune commande ce jour-là 😴</p>
        )}
      </div>
    </section>
  );
};

export default CalendarSection;

// --------------------------------------------------------------------
import { HomeCardData } from "../../components";

// CSS
import "./index.css";

// --------------------------------------------------------------------

const cardData = [
  { label: "Total Income", total: 579.0, percent: "25%", color: "#3b76ef" },
  { label: "Total Expences", total: 79.0, percent: "25%", color: "#63c7ff" },
  { label: "Cash on Hand", total: 92.0, percent: "25%", color: "#a66dd4" },
  { label: "Net Profit Margin", total: 61, percent: "65%", color: "#6dd4b1" },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <ul>
        {cardData.map((item, i) => (
          <HomeCardData data={item} key={i + 1} />
        ))}
      </ul>
    </main>
  );
}

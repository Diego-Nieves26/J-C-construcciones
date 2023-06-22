// CSS
import "./index.css";

// --------------------------------------------------------------------

export default function HomeCardData({ data }) {
  return (
    <div className="home-card-data" style={{ backgroundColor: data.color }}>
      <p>{data.label}</p>
      <h3>$ {data.total},000</h3>
      <span>Saved {data.percent}</span>
    </div>
  );
}

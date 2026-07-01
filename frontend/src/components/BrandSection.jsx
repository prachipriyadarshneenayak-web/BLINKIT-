import "./BrandSection.css";

const brands = [
  {
    name: "Amul",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Amul_official_logo.svg",
  },
  {
    name: "Coca Cola",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
  },
  {
    name: "Lay's",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Lay%27s_logo.svg",
  },
  {
    name: "Cadbury",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/70/Cadbury_logo.svg",
  },
  {
    name: "Nestlé",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Nestl%C3%A9.svg",
  },
];

const BrandSection = () => {
  return (
    <section className="brand-section">
      <div className="section-title">
        <h2>🏷️ Shop by Brand</h2>
        <p>Trusted brands you love</p>
      </div>

      <div className="brand-grid">
        {brands.map((brand) => (
          <div key={brand.name} className="brand-card">
            <img src={brand.logo} alt={brand.name} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
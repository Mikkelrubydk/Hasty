import { useState } from "react";

const categories = [
  { name: "Håndværker", image: "/hammer.webp" },
  { name: "Havearbejde", image: "/pruning-shears.webp" },
  { name: "VVS", image: "/spanner.webp" },
  { name: "Flytning", image: "/box.webp" },
  { name: "Rengøring", image: "/cleaning.webp" },
  { name: "Servering", image: "/serving-dish.webp" },
  { name: "Mekaniker", image: "/gears.webp" },
  { name: "Cykel", image: "/wheel.webp" },
  { name: "Maling", image: "/paint-brush.webp" },
  { name: "Tech", image: "/laptop.webp" },
  { name: "EL-arbejde", image: "/wire.webp" },
  { name: "Begivenhed", image: "/event.webp" },
  { name: "Levering", image: "/laptop.webp" },
  { name: "Vinduer", image: "/wire.webp" },
  { name: "Andet", image: "/event.webp" },
];

export default function StepOne() {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleClick = (index) => {
    setActiveIcon(index);
    console.log(index);
  };

  return (
    <section className="step1section">
      <h1 className="step1h1">Vælg Kategori</h1>

      <div className="boks-container">
        {categories.map((category, index) => (
          <div key={index}>
            <div
              className={`boks ${activeIcon === index ? "active" : ""}`}
              onClick={() => handleClick(index)}
            >
              <img src={category.image} alt={category.name} />
            </div>
            <p className="undertekst">{category.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

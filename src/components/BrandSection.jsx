import "../styles/brand_section.scss";
import brand1 from "../res/imgs/brand_1.jpg";
import brand2 from "../res/imgs/brand_2.jpg";
import brand3 from "../res/imgs/brand_3.jpg";
import brand4 from "../res/imgs/brand_4.jpg";
import { Link } from "react-router-dom";

const brands = [brand1, brand2, brand3, brand4];

export default function BrandSection({ className = "" }) {
  return (
    <section className={`brand-section section-container ${className}`}>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
        {brands.map((item, idx) => (
          <div key={idx} className="brand-section__item">
            <a href="">
              <img src={item} alt={item} className="w-full object-cover" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

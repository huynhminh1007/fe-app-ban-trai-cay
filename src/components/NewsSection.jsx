import "../styles/news.scss";
import { formatVND } from "./utils/Format";

const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const mdGridCols = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default function NewsSection({
  className = "",
  title,
  news = [],
  cols = {
    base: 2,
    md: 4,
  },
}) {
  return (
    <section className={`news-section section-container ${className}`}>
      <div className="container news-section__inner md:rounded-lg py-4">
        <div className="heading-bar flex items-center justify-between">
          <h2 className="title text-xl">
            <a href="">{title}</a>
          </h2>

          <button className="btn btn-filled">
            <a href=""> Xem thêm</a>
          </button>
        </div>

        <div
          className={`news-list mt-5 grid gap-4 md:gap-6 ${
            gridCols[cols.base]
          } ${mdGridCols[cols.md]}`}
        >
          {news.map((item, idx) => (
            <article
              key={item.id}
              className={`grid gap-4 md:gap-6 ${gridCols[cols.base]} ${
                mdGridCols[cols.md]
              }`}
            >
              <div className="">
                <a href="" className="img-thumbnail relative group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="icon zoom-hover opacity-0 group-hover:opacity-100">
                    <i class="fa-solid fa-magnifying-glass"></i>
                  </span>
                </a>
              </div>

              <div className="news-content">
                <a
                  href=""
                  className="block text-base font-bold truncate title leading-relaxed"
                  title={item.title}
                >
                  {item.title}
                </a>

                <p className="text-sm line-clamp-[6] left min-height-[85px] leading-relaxed">
                  {item.content}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

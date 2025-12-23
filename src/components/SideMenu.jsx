import { useEffect, useState } from "react";
import CircleIcon from "./utils/CircleIcon";
import "../styles/side_menu.scss";

export default function SideMenu({ onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);

    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Side menu */}
      <aside className={`side__menu ${visible ? "open" : ""}`}>
        <div className="menu__info flex items-center gap-3 p-4">
          <CircleIcon>
            <i className="fa-solid fa-user" />
          </CircleIcon>

          <div>
            <div className="font-semibold">Tài khoản</div>
            <button type="button" className="text-sm underline">
              Đăng nhập
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

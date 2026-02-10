import { useEffect, useState } from "react";

export default function FixedOrderButton() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const remaining =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);

      setVisible(remaining > 500);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button className="fixed-order-btn" onClick={scrollToBottom}>
      أطلب الآن – الدفع عند الاستلام{" "}
    </button>
  );
}

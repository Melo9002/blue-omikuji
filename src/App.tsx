import { useState } from "react";
import "./App.css";

type Fortune = {
  jp: string;
  en: string;
};

const fortunes: Fortune[] = [
  { jp: "大吉", en: "Great Blessing" },
  { jp: "中吉", en: "Middle Blessing" },
  { jp: "小吉", en: "Small Blessing" },
  { jp: "吉", en: "Blessing" },
  { jp: "凶", en: "Curse" },
];

function App() {
  const [fortune, setFortune] = useState<Fortune | null>(null);

  function drawFortune() {
    const random = Math.floor(Math.random() * fortunes.length);
    setFortune(fortunes[random]);
  }

  return (
    <main className="container">
      <h1>Blue’s Omikuji ⛩️</h1>

      <button onClick={drawFortune}>
        Draw your fortune
      </button>

      {fortune && (
        <div className="card">
          <p className="jp">{fortune.jp}</p>
          <p>{fortune.en}</p>
        </div>
      )}
    </main>
  );
}

export default App;

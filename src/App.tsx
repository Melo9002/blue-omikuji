import { useState } from "react";
import { domains } from "./data/fortunes";
import {
  drawFortune,
  generateFortune,
  fortuneLevels,
  type GeneratedFortune,
} from "./data/fortunes";


type RitualState = "idle" | "drawing" | "revealed";

function App() {
  const [state, setState] = useState<RitualState>("idle");
  const [result, setResult] = useState<GeneratedFortune | null>(null);

  function startDraw() {
    setState("drawing");

    setTimeout(() => {
      const level = drawFortune();
      setResult(generateFortune(level));
      setState("revealed");
    }, 1200);
  }

  return (
    <main className="container">
      <h1>御神籤</h1>

      {state === "idle" && (
        <button onClick={startDraw}>Draw your fortune</button>
      )}

      {state === "drawing" && <p>Drawing your fortune…</p>}

      {state === "revealed" && result && (
        <div className="card">
          <h2>{fortuneLevels[result.level].jp}</h2>

          {Object.entries(result.domains).map(
            ([key, text]: [string, string]) => {
              const meta = domains[key as keyof typeof domains];

              return (
                <section key={key} className="domain">
                  <div className="domain-header">
                    <span className="jp">{meta.jp}</span>
                    <span className="en">
                      {meta.en}
                      <span className="desc">({meta.description})</span>
                    </span>
                  </div>
                  <p className="fortune-line">{text}</p>
                </section>
             );
            }
          )}


          <button onClick={() => setState("idle")}>Draw again</button>
        </div>
      )}
    </main>
  );
}

export default App;

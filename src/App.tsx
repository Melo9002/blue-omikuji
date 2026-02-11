import { useState, useRef } from "react";
import { domains } from "./data/fortunes";
import { toPng } from "html-to-image";
import paperTexture from "./assets/paper.png";
import {
  drawFortune,
  generateFortune,
  fortuneLevels,
  type GeneratedFortune,
} from "./data/fortunes";

/**
 * RitualState represents the "ceremony phase"
 * - idle: before drawing
 * - drawing: anticipation delay
 * - revealed: fortune shown
 */
type RitualState = "idle" | "drawing" | "revealed" | "tied";

function App() {
  const [state, setState] = useState<RitualState>("idle");
  const [result, setResult] = useState<GeneratedFortune | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const levelMeta = result ? fortuneLevels[result.level] : null;

  /**
   * Starts the ritual:
   * 1. Enter drawing state
   * 2. Wait a bit (ceremony)
   * 3. Generate and reveal fortune
   */
  function startDraw() {
    setState("drawing");

    setTimeout(() => {
      const level = drawFortune();
      setResult(generateFortune(level));
      setState("revealed");
    }, 1200);
  }

  function tieFortune() {
    setState("tied");
  }

  async function downloadOmikuji() {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: "#f9f7f3",
      });

      const link = document.createElement("a");
      link.download = "ao-no-kamidana-omikuji.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export omikuji", err);
    }
  }

  return (
    <main className="container">
      <div className="ritual">
        {/* Shrine Header */}
        <header className="site-header">
          <div className="header-inner">
            <div className="header-row">
              <img
                src="/blue-omikuji/stamp.svg"
                alt="Ao no Kamidana Seal"
                className="header-stamp"
              />
              <div className="header-text">
                <h1 className="site-title">青の神棚</h1>
                <p className="site-subtitle">Omikuji — Divine Fortune</p>
              </div>
            </div>
          </div>
        </header>

        <div className="card" ref={cardRef}
          style=
          {{
            backgroundImage: `url(${paperTexture})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          >
          
          {/* Title always visible */}
          <h1>御神籤</h1>
          {/* Idle state */}
          {state === "idle" && (
            <button onClick={startDraw}>Draw your fortune ✨</button>
          )}
          {/* Drawing / anticipation */}
          {state === "drawing" && <p>Drawing your fortune…</p>}
          {/* Revealed fortune */}
          {state === "revealed" && result && levelMeta && (
            <>
              <h2>{levelMeta.jp}</h2>

              <p className="fortune-subtitle">
                {levelMeta.romaji} — {levelMeta.en}
              </p>

              {Object.entries(result.domains).map(
                ([key, text]: [string, string]) => {
                  const meta = domains[key as keyof typeof domains];

                  return (
                    <section key={key} className="domain">
                      <p className="domain-header">
                        <span className="jp">{meta.jp}</span>{" "}
                        <span className="en">
                          {meta.en}
                          <span className="desc"> ({meta.description})</span>
                        </span>
                      </p>

                      <p className="fortune-line">{text}</p>
                    </section>
                  );
                },
              )}
            </>
          )}
        </div>

        {/* Actions live OUTSIDE the card */}
        {state === "revealed" && (
          <div className="actions">
            <button onClick={() => setState("idle")}>Draw again</button>
            <button onClick={tieFortune}>Tie this omikuji</button>
            <button onClick={downloadOmikuji}>Save as image</button>
          </div>
        )}
        {/* Tied / release state */}
        {state === "tied" && (
          <div className="tied-message">
            <p>
              This fortune has been entrusted.
              <br />
              May clarity follow.
            </p>

            <button onClick={() => setState("idle")}>Draw again</button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;

import { useEffect, useMemo, useRef, useState } from "react";

const loadingSequence = [
  { text: "Initializing Nardos.exe...", delay: 2200 },
  { text: "Loading appreciation module...", delay: 2300 },
  { text: "Running diagnostics...", delay: 2300 },
  { text: "Waiting for final result...", delay: 2400 },
  { text: ".............", delay: 3600 },
  { text: "I'm actually so hot alga wst", delay: 3200 },
  { text: "System recovered. Continuing...", delay: 2600 },
];

const colors = [
  "#facc15",
  "#fb7185",
  "#38bdf8",
  "#a78bfa",
  "#34d399",
  "#fb923c",
];

const buttonTexts = [
  "Click if you're curious",
  "click me harder",
  "harder",
  "HAAAARDDDEEERRRRRR",
  "Not that hard 😶‍🌫️",
  "That's just right",
];

function App() {
  const [step, setStep] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingSequence[0].text);
  const [microwaveInput, setMicrowaveInput] = useState("");
  const [microwaveStatus, setMicrowaveStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [canContinue, setCanContinue] = useState(false);
  const [resultState, setResultState] = useState("idle");
  const [clickCount, setClickCount] = useState(0);
  const imageSrc =
    resultState === "success"
      ? "/Happy.jpg"
      : resultState === "error"
        ? "/Sad.jpg"
        : null;
  const audioRef = useRef(null);

  useEffect(() => {
    if (step !== 1) return;

    let totalTime = 0;
    const timers = [];

    loadingSequence.forEach((item, index) => {
      timers.push(
        setTimeout(() => {
          setLoadingText(item.text);
          if (index === loadingSequence.length - 1) {
            setTimeout(() => setStep(2), 900);
          }
        }, totalTime),
      );
      totalTime += item.delay;
    });

    return () => timers.forEach(clearTimeout);
  }, [step]);

  useEffect(() => {
    if (step === 3 && audioRef.current) {
      audioRef.current.play();
    }
  }, [step]);

  const confetti = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        left: `${10 + index * 7}%`,
        delay: `${Math.random() * 0.9}s`,
        duration: `${1.8 + Math.random() * 1.4}s`,
        color: colors[index % colors.length],
        size: `${6 + Math.round(Math.random() * 6)}px`,
      })),
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const answer = microwaveInput.trim().toLowerCase();

    if (answer === "media") {
      setMicrowaveStatus("success");
      setResultState("success");
      setMessage(
        "That must be why ur controlling the narrative of everyones day",
      );
      setCanContinue(true);
      return;
    }

    setMicrowaveStatus("error");
    setResultState("error");
    setMessage("heyyyy don't lie u already said media before 😭");
    setTimeout(() => {
      setMicrowaveInput("");
    }, 1200);
  };

  const handleRetry = () => {
    setMicrowaveInput("");
    setMicrowaveStatus("idle");
    setResultState("idle");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(147,197,253,0.18),_transparent_35%),_linear-gradient(180deg,_rgb(15,23,42),_rgb(30,41,59))] px-4 py-8 text-slate-100">
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-3xl flex-col justify-center gap-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur-xl sm:p-10">
          {step === 0 && (
            <section className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">
                  Birthday surprise
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                  Hey Nardos <span aria-hidden="true">👀</span>
                </h1>
                <p className="max-w-xl text-slate-300 sm:text-lg">
                  I heard it's your birthday today{" "}
                  <span aria-hidden="true">😃</span>
                </p>
              </div>

              <button
                onClick={() => {
                  setClickCount((prev) => {
                    const newCount = prev + 1;
                    if (newCount === 5) {
                      setStep(1);
                    }
                    return newCount;
                  });
                }}
                className={`inline-flex items-center justify-center rounded-3xl bg-sky-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-300 ${clickCount === 0 ? "animate-float" : ""}`}
              >
                {buttonTexts[clickCount]}
              </button>
            </section>
          )}

          {step === 1 && (
            <section className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                  Loading
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                  One second…
                </h2>
                <p className="max-w-xl text-slate-300 sm:text-lg">
                  The system is running a little special birthday routine.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-700/70 bg-slate-950/90 p-6 text-center text-lg text-slate-200 shadow-xl shadow-slate-950/50">
                <p className="min-h-[3rem] text-base leading-8 sm:text-lg">
                  {loadingText}
                </p>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-8">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.35em] text-fuchsia-300/80">
                  Quick question
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                  What brand is your Microwave
                </h2>
                <p className="max-w-xl text-slate-300 sm:text-lg">
                  Answer correctly or u'll never leave this page{" "}
                  <span aria-hidden="true">😈</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block text-sm font-medium text-slate-200">
                  Answer
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={microwaveInput}
                    onChange={(event) => setMicrowaveInput(event.target.value)}
                    type="text"
                    placeholder="please say Media"
                    className={`min-w-0 flex-1 rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-3 text-slate-100 shadow-lg shadow-slate-950/20 transition duration-300 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/25 ${microwaveStatus === "error" ? "animate-shake border-rose-400/80" : ""}`}
                  />

                  <button
                    type="submit"
                    className="rounded-3xl bg-sky-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-300"
                  >
                    Submit
                  </button>
                </div>
              </form>

              <div className="rounded-3xl border border-slate-700/70 bg-slate-950/90 p-5 text-slate-200 shadow-soft">
                <p
                  className={`min-h-[3rem] text-base ${microwaveStatus === "success" ? "text-emerald-300" : microwaveStatus === "error" ? "text-rose-300" : "text-slate-300"}`}
                >
                  {message || "Type your answer and press submit."}
                </p>
              </div>

              {imageSrc && (
                <div className="mx-auto max-w-md space-y-4 px-2 pt-4 text-center">
                  <img
                    src={imageSrc}
                    alt={
                      resultState === "success" ? "Happy result" : "Sad result"
                    }
                    className="mx-auto w-full max-w-xs rounded-3xl shadow-2xl shadow-slate-950/40 transition duration-700 ease-out"
                    style={{ animation: "fadeInScale 0.7s ease forwards" }}
                  />
                </div>
              )}

              {microwaveStatus === "error" && (
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center justify-center rounded-3xl bg-rose-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-rose-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-rose-300"
                >
                  Try again
                </button>
              )}

              {canContinue && microwaveStatus !== "error" && (
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center justify-center rounded-3xl bg-emerald-400 px-6 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300"
                >
                  Continue
                </button>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="relative overflow-hidden rounded-[28px] bg-slate-950/95 p-8 sm:p-10">
              <audio ref={audioRef} src="/audio.mp3" />
              <div className="confetti-container">
                {confetti.map((piece, index) => (
                  <span
                    key={index}
                    className="confetti-piece"
                    style={{
                      left: piece.left,
                      backgroundColor: piece.color,
                      width: piece.size,
                      height: piece.size,
                      animationDuration: piece.duration,
                      animationDelay: piece.delay,
                    }}
                  />
                ))}
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                    Final message
                  </p>
                  <h2 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                    Happy Birthday, Nardos <span aria-hidden="true">🎉</span>
                  </h2>
                </div>

                <div className="space-y-5 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-soft">
                  <p className="text-lg leading-8 text-slate-200">
                    I haven't known you for long and there's a lot I still don't
                    know about you but from the little I have seen, I can tell
                    ur one of the most genuine caring and kind people out there.
                    Hopefully u'll keep proving that in the future
                  </p>
                  <p className="text-lg leading-8 text-slate-200">
                    I wish u a fan fucking tastic birthday and I hope this
                    little thing I made made u laugh once or twice.
                  </p>
                  <p className="text-lg leading-8 text-slate-200">
                    To ሚያዚያ 12 <span aria-hidden="true">🍾🥂</span>
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-5 text-slate-300 shadow-soft">
                  <p className="text-gradient text-center">
                    To ሚያዚያ 12 <span aria-hidden="true">🍾🥂</span>
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

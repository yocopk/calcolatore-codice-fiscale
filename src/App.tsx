// App.tsx
import React, { useState } from "react";
import "./index.css";
// Importa Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./assets/icons";
import { CopyBtn } from "./CopyBtn";
import {
  calcolaCf,
  calcolaCarattereDiControllo,
  codiciCatastali,
} from "./Script";
import { Nav } from "./Nav";

function App() {
  const [cognome, setCognome] = useState("");
  const [nome, setNome] = useState("");
  const [giorno, setGiorno] = useState("");
  const [mese, setMese] = useState("");
  const [anno, setAnno] = useState("");
  const [sesso, setSesso] = useState("");
  const [comune, setComune] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [items, setItems] = useState<string[]>(() => {
    const storedItems = localStorage.getItem("item");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [cfCompleto, setCfCompleto] = useState("");
  const [suggerimenti, setSuggerimenti] = useState<string[]>([]);

  function darkModeToggle() {
    setDarkMode(!darkMode);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!giorno || !mese || !anno) {
      alert("Seleziona giorno, mese e anno.");
      return;
    }

    const dataCompleta = `${giorno}-${mese}-${anno}`;
    const cf = calcolaCf(cognome, nome, dataCompleta, sesso, comune);
    const codiceFiscaleCompleto = cf + calcolaCarattereDiControllo(cf);

    // Aggiorna lo stato con il codice fiscale calcolato
    setCfCompleto(codiceFiscaleCompleto);

    // Aggiorna lo stato e salva nel localStorage
    const updatedItems = [...items, codiceFiscaleCompleto];
    setItems(updatedItems); // Imposta il nuovo array nello stato
    localStorage.setItem("item", JSON.stringify(updatedItems)); // Aggiorna il localStorage con l'array aggiornato
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    setComune(input);

    if (input.length > 0) {
      // Filtra i comuni che iniziano con il testo digitato (case-insensitive)
      const suggerimentiFiltrati = Object.keys(codiciCatastali).filter((com) =>
        com.toLowerCase().startsWith(input.toLowerCase())
      );
      setSuggerimenti(suggerimentiFiltrati);
    } else {
      setSuggerimenti([]); // Se il campo è vuoto, non mostra suggerimenti
    }
  }

  function handleSuggestionClick(suggestion: string) {
    setComune(suggestion); // Imposta il comune selezionato
    setSuggerimenti([]); // Nasconde i suggerimenti
  }

  function deleteListItems() {
    setItems([]);
    localStorage.removeItem("item");
  }

  return (
    <div
      className={`${
        darkMode && "dark"
      } bg-gray-100 md:overflow-hidden h-screen`}
    >
      <Nav />

      <div className="bg-gray-400 dark:bg-neutral-600 gap-4 flex flex-col lg:flex-row justify-center items-center w-full py-10 h-auto min-h-screen md:w-screen md:h-screen lg:py-0">
        <div className="flex flex-col-reverse gap-3 justify-center items-center">
          <form
            className="p-10 flex flex-col md:grid md:grid-cols-2 gap-5 bg-white dark:bg-neutral-800 rounded-xl dark:text-white"
            onSubmit={handleSubmit}
          >
            {/* Icona utente accanto al cognome */}
            <label
              className="flex justify-start items-center gap-4"
              htmlFor="cognome"
            >
              <FontAwesomeIcon icon={["fas", "id-card"]} /> Cognome
            </label>
            <input
              className="mr-2 capitalize bg-gray-300 rounded-md px-2 py-1 dark:bg-neutral-600"
              id="cognome"
              type="text"
              name="cognome"
              placeholder="inserisci cognome..."
              required
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
            />

            <label
              className="flex justify-start items-center gap-4"
              htmlFor="nome"
            >
              <FontAwesomeIcon icon={["fas", "user"]} />
              Nome
            </label>
            <input
              className="mr-2 capitalize bg-gray-300 rounded-md px-2 py-1 dark:bg-neutral-600"
              id="nome"
              type="text"
              name="nome"
              placeholder="inserisci nome..."
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <div className="flex justify-start items-center gap-4">
              <FontAwesomeIcon icon={["fas", "calendar-days"]} /> Data di
              nascita
            </div>
            <div className="grid grid-col-span-2">
              <div className="flex gap-3">
                {/* Giorno, mese, anno */}
                <select
                  className="bg-gray-300 rounded-md px-2 py-1 dark:bg-neutral-600"
                  required
                  value={giorno}
                  onChange={(e) => setGiorno(e.target.value)}
                >
                  <option value="">Giorno</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  className="bg-gray-300 rounded-md px-2 py-1 dark:bg-neutral-600"
                  required
                  value={mese}
                  onChange={(e) => setMese(e.target.value)}
                >
                  <option value="">Mese</option>
                  {[
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                  ].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  className="bg-gray-300 rounded-md px-2 py-1 dark:bg-neutral-600"
                  required
                  value={anno}
                  onChange={(e) => setAnno(e.target.value)}
                >
                  <option value="">Anno</option>
                  {Array.from({ length: 123 }, (_, i) => 2023 - i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="flex justify-start items-center gap-4">
              <FontAwesomeIcon icon={["fas", "venus-mars"]} /> Sesso
            </div>
            <select
              className="bg-gray-300 rounded-md px-2 py-1 dark:bg-neutral-600"
              required
              value={sesso}
              onChange={(e) => setSesso(e.target.value)}
            >
              <option value="M">Maschile</option>
              <option value="F">Femminile</option>
            </select>

            <label
              className="flex justify-start items-center gap-4"
              htmlFor="comune"
            >
              {" "}
              <FontAwesomeIcon icon={["fas", "location-dot"]} />
              Comune
            </label>
            <div className="w-full relative">
              <input
                className="w-full capitalize bg-gray-300 rounded-md px-2 py-1 dark:bg-neutral-600"
                id="comune"
                type="text"
                name="comune"
                placeholder="inserisci comune..."
                autoComplete="off"
                required
                value={comune}
                onChange={handleInputChange}
              />
              {/* Suggerimenti come dropdown */}
              {suggerimenti.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 dark:bg-neutral-600 mt-1 rounded-md shadow-md z-10 w-full max-h-60 overflow-y-auto">
                  {suggerimenti.map((suggerimento, index) => (
                    <li
                      key={index}
                      className="p-2 capitalize cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggerimento)}
                    >
                      {suggerimento}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              className="bg-blue-500 rounded-md p-2 col-span-2 text-white hover:bg-blue-600"
              type="submit"
            >
              Calcola
            </button>
          </form>

          <div className="flex justify-center items-center gap-2 text-3xl text-white bg-blue-500 p-2 w-full rounded-xl text-center">
            {cfCompleto || "----------------"}{" "}
            <CopyBtn textToCopy={cfCompleto} />
          </div>
          {/* Storico dei calcoli precedenti */}
        </div>
        <div
          className="flex flex-col justify-between bg-white dark:bg-neutral-800 dark:text-white p-10 min-h-[300px] rounded-xl"
          id="history"
        >
          <h3 className="text-lg pb-4">
            <FontAwesomeIcon icon={["fas", "history"]} /> Recenti:
          </h3>
          <div className="flex flex-col-reverse text-gray-400 font-thin">
            {items.length === 0
              ? "nessun codice recente"
              : items.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center gap-4 text-black dark:text-white font-normal">
                      {item} <CopyBtn textToCopy={item} />
                    </div>
                    <hr className="my-2 text-black" />
                  </div>
                ))}
          </div>
          <button
            className="border-[1px] border-red-500 rounded-md py-2 px-3 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={deleteListItems}
          >
            {" "}
            Cancella tutto
            <FontAwesomeIcon className="ml-2" icon={["fas", "trash"]} />
          </button>
          <button
            onClick={darkModeToggle}
            className="fixed bottom-10 right-10 h-10 w-10 rounded-full text-white bg-neutral-800 dark:bg-white dark:text-neutral-800"
          >
            {darkMode ? (
              <FontAwesomeIcon icon={["fas", "sun"]} />
            ) : (
              <FontAwesomeIcon icon={["fas", "moon"]} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

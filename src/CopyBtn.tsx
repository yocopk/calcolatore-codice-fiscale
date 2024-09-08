import { useState } from "react";
import "./assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CopyBtnProps {
  textToCopy: string;
}

export function CopyBtn({ textToCopy }: CopyBtnProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Copia l'URL negli appunti
    navigator.clipboard.writeText(textToCopy);

    // Mostra il messaggio di conferma
    setCopied(true);

    // Nasconde il messaggio dopo 2 secondi
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="copy-btn relative">
      <FontAwesomeIcon
        icon={["fas", "copy"]}
        className="copy-icon text-sm p-2 text-black bg-white text-center rounded-md cursor-pointer hover:bg-gray-200"
        onClick={handleCopy}
      />

      {/* Messaggio di feedback */}
      {copied && (
        <div className="absolute bg-green-200 text-green-700 p-1 rounded-md text-sm">
          Copiato!
        </div>
      )}
    </div>
  );
}

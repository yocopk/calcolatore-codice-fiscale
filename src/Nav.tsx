import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../src/assets/icons";

export function Nav() {
  return (
    <div className="nav flex justify-between h-10 bg-blue-500">
      <div className="flex justify-center items-center gap-5 ml-5">
        <p className="text-white text-lg tracking-wide">
          <span className="font-bold text-xl">CFGEN</span> - Calcolatore Codice
          Fiscale
        </p>
      </div>
      <ul className="flex justify-center items-center gap-5 mr-10 text-white font-bold">
        <li>
          <a
            className="cursor transition-all hover:text-gray-300"
            href="https://github.com/yocopk"
            target="_blank"
          >
            <FontAwesomeIcon className="mr-2" icon={["fab", "github"]} />
            GitHub
          </a>
        </li>
        <li>
          <a
            className="cursor transition-all hover:text-gray-300"
            href="https://www.linkedin.com/in/andrea-marchese-18a488285/"
            target="_blank"
          >
            <FontAwesomeIcon className="mr-2" icon={["fab", "linkedin"]} />
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
}

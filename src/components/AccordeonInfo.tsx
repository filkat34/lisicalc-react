import { useState } from "react";

const items = [
  {
    title: "Scores de lisibilité ?",
    content: (
      <>
        <p>
          Les scores de lisibilité sont des indicateurs qui permettent d'évaluer la difficulté de lecture
          d'un texte mais sans prendre en compte la sémantique, c'est-à-dire le sens des mots et des phrases,
          ni la cohérence globale du texte.
          Il en existe plusieurs, chacun ayant ses propres critères de calcul : ces critères combinent
          souvent la longueur des mots avec celle des phrases du texte. Cette application permet le calcul de sept indices de
          lisibilité :
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>LIX</li>
          <li>RIX</li>
          <li>Automated Readability Index (ARI)</li>
          <li>Gunning Fog index</li>
          <li>Coleman-Liau index</li>
          <li>Flesch-Kincaid Grade Level (FKGL)</li>
          <li>Simple Measure of Gobbledygook index (SMOG)</li>
        </ul>
      </>
    )
  },
  {
    title: " Comment les interpréter ?",
    content: (
      <>
        <p>Ces indices ont pour la plupart été inventés pour mesurer la lisibilité de textes anglais,
          à l'exception de l'indice suédois LIX. Ce dernier est d'ailleurs sans doute le plus efficace
          pour donner une
          mesure juste de la difficulté d'un texte français.
        </p>
        <p className="mt-2">Le principe d'interprétation de ces indices de lisibilité est simple : plus le score est élevé,
          plus le texte est
          difficile à lire. L'application propose automatiquement une analyse de ce score. En général, un
          texte sera considéré
          comme étant aisément lisible par un lecteur moyen, s'il relève d'un niveau de difficulté
          "Intermédiaire" (cela correspond au niveau d'un élève de 3e)
          ou inférieur ("Facile", "Très facile").
        </p>
      </>
    )
  },
  {
    title: " Pourquoi les utiliser ?",
    content: (
      <>
        <p>
          Les scores de lisibilité peuvent être des outils pour l'enseignant dans son choix de textes
          proposés aux élèves aux cycles 3 et 4,
          même s'ils ne doivent pas être utilisés comme des critères absolus.
        </p>
        <p className="mt-2">
          La lisibilité d'un texte et la mémoire de travail sont deux concepts étroitement liés.
          La mémoire de travail a une capacité limitée. Si un texte est difficile à lire, une grande
          partie de cette capacité
          est utilisée pour déchiffrer les mots et les phrases, laissant moins de ressources pour le
          traitement de l'information.
          Un texte lisible, en revanche, permet de libérer des ressources cognitives pour des tâches plus
          complexes.
        </p>
        <p className="mt-2">
          Les scores de lisibilité peuvent donc aider l'enseignant à :
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>choisir des textes adaptés au niveau de difficulté attendu ;</li>
          <li>mettre en place des pratiques de différenciation en identifiant mieux les textes lisibles de
            ceux qui le sont moins ;</li>
          <li>concevoir des séances davantage axées sur la compréhension et l'analyse des idées plutôt que
            sur le déchiffrage.</li>
        </ul>
      </>
    )
  },
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <h1 className='bg-white font-bold text-2xl w-full block mt-6'>LisiCalc</h1>
      <h2 className='bg-white text-xl w-full block mt-1'>Un outil pour calculer les scores de lisibilité d'un texte</h2>
      <div className="w-full mt-8 shadow-lg bg-white transition-colors overflow-y-auto max-h-[70vh] rounded-lg">
        {items.map((item, idx) => (
          <div key={idx} className="border-b last:border-b-0 border-neutral-200">
            <button
              className={`w-full flex justify-between items-center p-5 text-left font-semibold transition-colors
              hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
              ${openIndex === idx ? "bg-white" : ""}
            `}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
            >
              <span>{item.title}</span>
              <svg
                className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${openIndex === idx ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === idx && (
              <div className="p-5 text-justify bg-white transition-colors">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
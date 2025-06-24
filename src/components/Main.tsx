import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste, faEraser, faCalculator, faFileImport } from '@fortawesome/free-solid-svg-icons'
import pasteFromClipboard, { readFile } from '../utils/TextManipulation';
import {
  nbCaracteres,
  nbVoyelles,
  nbDigrammes,
  nbTrigrammes,
  nbSyllabesGraphiques,
  nbMots,
  nbMotsPolysyllabiques,
  nbMotsLongs,
  nbPhrases,
  scoreLix,
  scoreRix,
  scoreFkgl,
  scoreGunningFog,
  scoreSMOG,
  scoreColemanLiau,
  scoreAri,
  scoreAnalysis
} from '../utils/ScoresFormulas';
import { useRef } from 'react';
import React from 'react';

export default function Main() {

  /**
   * Déclaration des variables
   */
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Référence à la zone de texte pour y coller le texte ou importer un fichier
  const fileInputRef = useRef<HTMLInputElement>(null);// Référence à l'input de type "file" pour importer un fichier texte, DOCX ou ODT
  let caracters: number = 0;
  let voyelles: number = 0;
  let digrammes: number = 0;
  let trigrammes: number = 0;
  let syllabes: number = 0;
  let mots: number = 0;
  let motslongs: number = 0;
  let motspolysyl: number = 0;
  let phrases: number = 0;
  let lix: number = 0;
  let lixdif: string = "";
  let rix: number = 0;
  let rixdif: string = "";
  let fkgl: number = 0;
  let fkgldif: string = "";
  let fog: number = 0;
  let fogdif: string = "";
  let smog: number = 0;
  let smogdif: string = "";
  let colemanliau: number = 0;
  let colemanliaudif: string = "";
  let ari: number = 0;
  let aridif: string = "";
  const [stats, setStats] = React.useState<{ name: string; value: number }[]>([]);//Tableau des statistiques du texte
  const [indices, setIndices] = React.useState<{ name: string; score: number; difficulty: string }[]>([]);//Tableau des indices de lisibilité

  
  /**
   * Colle le texte depuis le presse-papiers dans la zone de texte.
   * Cette fonction est appelée lorsque l'utilisateur clique sur le bouton "Coller".
   */
  const handlePaste = async () => {
    if (textareaRef.current) {
      await pasteFromClipboard(textareaRef.current);
    }
  };

  /**
   * Importe un fichier texte, DOCX ou ODT et en extrait le contenu dans la zone de texte.
   * Cette fonction est appelée lorsque l'utilisateur sélectionne un fichier via l'input de type "file".
   * @param e 
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && textareaRef.current) {
      const text = await readFile(file);
      textareaRef.current.value = text;
    }
    // Réinitialise la valeur de l'input fichier pour permettre de réimporter le même fichier
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /**
   * Efface le contenu de la zone de texte.
   */
  function eraseTextarea() {
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  }

  /**
   * Analyse du texte saisi dans le textarea
   * Appelle les fonctions de calcul des statistiques et des indices de lisibilité
   * Remplit les tableaux des statistiques et des indices de lisibilité
   * @returns 
   */
  function analyser(): void {
    const textarea = document.getElementById('text') as HTMLTextAreaElement;
    let text = textarea.value;

    if (textarea) {

      //Décompose les caractères accentués et supprime tous les diacritiques
      text = text.normalize("NFD").replace(/[\u0300-\u036f]/gi, "");

      //Vérification si le texte est vide
      if (text.trim() === "") {
        alert("Veuillez saisir ou importer un texte à analyser.");
        return;
      }

      //Vérification si le texte est vide
      if (nbPhrases(text) === 0) {
        alert("Le texte n'est pas correctement ponctué et ne contient aucune phrase. Le calcul est impossible.");
        return;
      }

      //Calcul des statistiques
      caracters = nbCaracteres(text);
      voyelles = nbVoyelles(text);
      digrammes = nbDigrammes(text);
      trigrammes = nbTrigrammes(text);
      syllabes = nbSyllabesGraphiques(text);
      mots = nbMots(text);
      motslongs = nbMotsLongs(text);
      motspolysyl = nbMotsPolysyllabiques(text);
      phrases = nbPhrases(text);

      //Remplissage du tableau des statistiques
      const newStats = [
        { name: 'Caractères', value: caracters },
        { name: 'Voyelles', value: voyelles },
        { name: 'Digrammes', value: digrammes },
        { name: 'Trigrammes', value: trigrammes },
        { name: 'Syllabes', value: syllabes },
        { name: 'Mots', value: mots },
        { name: 'Mots longs', value: motslongs },
        { name: 'Mots polysyllabiques', value: motspolysyl },
        { name: 'Phrases', value: phrases },
      ];
      setStats(newStats);

      //Calcul des indices de lisibilité
      lix = parseFloat(scoreLix(text).toFixed(2));
      lixdif = scoreAnalysis('lix', lix);
      rix = parseFloat(scoreRix(text).toFixed(2));
      rixdif = scoreAnalysis('rix', rix);
      fkgl = parseFloat(scoreFkgl(text).toFixed(2));
      fkgldif = scoreAnalysis('fkgl', fkgl);
      fog = parseFloat(scoreGunningFog(text).toFixed(2));
      fogdif = scoreAnalysis('gunning', fog);
      smog = parseFloat(scoreSMOG(text).toFixed(2));
      smogdif = scoreAnalysis('smog', smog);
      colemanliau = parseFloat(scoreColemanLiau(text).toFixed(2));
      colemanliaudif = scoreAnalysis('coleman_liau', colemanliau);
      ari = parseFloat(scoreAri(text).toFixed(2));
      aridif = scoreAnalysis('ari', ari);
      //Remplissage du tableau des indices de lisibilité
      const newIndices = [
        { name: 'LIX', score: lix, difficulty: lixdif },
        { name: 'RIX', score: rix, difficulty: rixdif },
        { name: 'FKGL', score: fkgl, difficulty: fkgldif },
        { name: 'Gunning Fog', score: fog, difficulty: fogdif },
        { name: 'SMOG', score: smog, difficulty: smogdif },
        { name: 'Coleman-Liau', score: colemanliau, difficulty: colemanliaudif },
        { name: 'ARI', score: ari, difficulty: aridif },
      ];
      setIndices(newIndices);

      // Décompte des occurrences de chaque difficulté
      // Crée un objet pour stocker les occurrences de chaque difficulté
      const difficultyCounts: { [key: string]: number } = {
        'Très difficile': 0,
        'Difficile': 0,
        'Intermédiaire': 0,
        'Facile': 0,
        'Très facile': 0,
      };

      indices.forEach(indice => {
        if (difficultyCounts[indice.difficulty] !== undefined) {
          difficultyCounts[indice.difficulty]++;
        }
      });

    }
  }

  function getDifficultyColor(difficulty: string) {
    switch (difficulty) {
      case 'Très difficile':
        return 'bg-red-100 text-red-800';
      case 'Difficile':
        return 'bg-orange-100 text-orange-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'Facile':
        return 'bg-green-100 text-green-800';
      case 'Très facile':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <>

      <div className="border-gray-200 p-4">

        <div>
          <div className="flex pb-5 pt-9 gap-1 justify-end">
            <button
              type="button"
              className="cursor-pointer inline-flex items-center px-2 py-1 border border-gray-300 rounded shadow-sm font-medium hover:bg-gray-50 transition"
              id="btncoller"
              title="Coller le texte"
              aria-label="Coller le texte"
              onClick={handlePaste}
            >
              <FontAwesomeIcon icon={faPaste} size="lg" />
              <span className="pl-2">Coller</span>
            </button>
            <label
              htmlFor="formFile"
              className="cursor-pointer inline-flex items-center px-2 py-1 border border-gray-300 rounded shadow-sm font-medium hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon icon={faFileImport} size="lg" />
              <span className="pl-2">Importer</span>
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                id="formFile"
                accept=".txt,.docx,.odt"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <div className="form-floating pb-4">
            <textarea
              ref={textareaRef}
              className="form-control w-full border-2 border-gray-300 rounded-lg p-2"
              placeholder="Collez ou importez le texte à analyser..."
              id="text"
              style={{ width: "100%", height: "300px" }}
            ></textarea>
          </div>
          <div className="flex justify-center items-center gap-2">
            <button type="button" className="cursor-pointer inline-flex items-center px-2 py-1 border border-gray-300 rounded shadow-sm font-medium hover:bg-gray-50 transition"
              id="btnanalyser"
              onClick={analyser}>
              <FontAwesomeIcon icon={faCalculator} />
              <span className="pl-2">Analyser</span>
            </button>
            <button
              type="button"
              className="cursor-pointer inline-flex items-center px-2 py-1 border border-gray-300 rounded shadow-sm font-medium hover:bg-gray-50 transition"
              id="btneffacer"
              onClick={eraseTextarea}>
              <FontAwesomeIcon icon={faEraser} />
              <span className="pl-2">Effacer</span>
            </button>
          </div>
        </div>
      </div>



      <div className="w-full flex flex-col md:flex-row gap-6 mt-8 mb-9">
        {/* Statistiques */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">Statistiques</h2>
          <div className="overflow-x-auto rounded-lg shadow">
            <table id="stats" className="min-w-full bg-white">
              <tbody>
                {stats.map((stat, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium text-gray-700">{stat.name}</td>
                    <td className="px-4 py-2 text-right">{stat.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Indices */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">Indices de lisibilité</h2>
          <div className="overflow-x-auto rounded-lg shadow">
            <table id="indices" className="min-w-full bg-white">
              <tbody>
                {indices.map((indice, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="px-4 py-2 font-medium text-gray-700">{indice.name}</td>
                    <td className="px-4 py-2 text-right">{indice.score}</td>
                    <td className="px-4 py-2 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(indice.difficulty)}`}>
                        {indice.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>


    </>
  );
}
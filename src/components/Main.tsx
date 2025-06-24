import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste, faEraser, faCalculator, faFileImport } from '@fortawesome/free-solid-svg-icons'
import pasteFromClipboard, { readFile } from '../utils/TextManipulation';
import { useRef } from 'react';

export default function Main() {

  // Called when "Analyser" is clicked
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Référence à la zone de texte pour y coller le texte ou importer un fichier
  const fileInputRef = useRef<HTMLInputElement>(null);// Référence à l'input de type "file" pour importer un fichier texte, DOCX ou ODT

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
            <button type="button" className="cursor-pointer inline-flex items-center px-2 py-1 border border-gray-300 rounded shadow-sm font-medium hover:bg-gray-50 transition" id="btnanalyser">
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



      <div>
        <h2 className="text-2xl text-bold text-blue-500 pb-4 pt-9">Analyse textuelle</h2>
        {/* ... */}
      </div>


    </>
  );
}
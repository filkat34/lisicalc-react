import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste, faEraser, faCalculator, faFileImport } from '@fortawesome/free-solid-svg-icons'

export default function UserInput() {
    return (
        <>
            <h1 className='text-2xl text-bold text-blue-500 pb-4'>Importer un texte</h1>
            <div className="flex pb-5 gap-1 justify-end">

                <button
                    type="button"
                    className="cursor-pointer inline-flex items-center px-2 py-1 border border-gray-300 rounded shadow-sm font-medium hover:bg-gray-50 transition"
                    id="btncoller"
                    title="Coller le texte"
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
                        className="hidden"
                        type="file"
                        id="formFile"
                        accept=".txt,.docx,.odt"
                    />
                </label>

            </div>



            <div className="form-floating pb-4">
                <textarea
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
                    <button type="button" className="cursor-pointer inline-flex items-center px-2 py-1 border border-gray-300 rounded shadow-sm font-medium hover:bg-gray-50 transition" id="btneffacer">
                        <FontAwesomeIcon icon={faEraser} />
                        <span className="pl-2">Effacer</span>
                    </button>
                </div>

        </>
    );
}
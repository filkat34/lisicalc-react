import mammoth from 'mammoth';
import JSZip from 'jszip';

/**
 * Coller le texte depuis le presse-papiers dans un élément cible.
 * Cette fonction utilise l'API Clipboard pour lire le texte du presse-papiers
 * et le colle dans un élément HTML spécifié (textarea ou input).
 * @param targetElement 
 */
  export default async function pasteFromClipboard(targetElement: HTMLTextAreaElement | HTMLInputElement): Promise<void> {
    try {
      const text = await navigator.clipboard.readText();
      if (targetElement) {
        targetElement.value = text;
      }
    } catch (err) {
      console.error('Impossible de coller le texte depuis le presse-papiers: ', err);
    }
  }

  /**
   * Importe un fichier texte, DOCX ou ODT et en extrait le contenu.
   * Cette fonction utilise FileReader pour lire le contenu du fichier.
   * Pour les fichiers DOCX, elle utilise la bibliothèque Mammoth pour extraire le texte.
   * Pour les fichiers ODT, elle utilise JSZip pour lire le fichier ZIP et extraire le contenu XML.
   * @param file 
   * @returns Text content of the file as a string.
   * @throws Error if the file type is not supported or if there is an error reading the file.
   * Supported file types: .txt, .docx, .odt
   */
  export async function readFile(file: File): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const reader = new FileReader();
  
      if (file.type === 'text/plain') {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject('Erreur lors de la lecture du fichier texte.');
        reader.readAsText(file);
      } else if (file.name.endsWith('.docx')) {
        reader.onload = async () => {
          try {
            const result = await mammoth.extractRawText({ arrayBuffer: reader.result as ArrayBuffer });
            resolve(result.value);
          } catch (err) {
            reject('Erreur lors de la lecture du fichier DOCX.');
          }
        };
        reader.onerror = () => reject('Erreur lors de la lecture du fichier DOCX.');
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith('.odt')) {
        reader.onload = async () => {
          try {
            const zip = await JSZip.loadAsync(reader.result as ArrayBuffer);
            const contentXml = await zip.file('content.xml')?.async('string');
            if (contentXml) {
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(contentXml, 'application/xml');
              const textElements = xmlDoc.getElementsByTagName('text:p');
              let extractedText = '';
              for (let i = 0; i < textElements.length; i++) {
                extractedText += textElements[i].textContent + '\n';
              }
              resolve(extractedText);
            } else {
              reject('Impossible de lire le contenu du fichier ODT.');
            }
          } catch (err) {
            reject('Erreur lors de la lecture du fichier ODT.');
          }
        };
        reader.onerror = () => reject('Erreur lors de la lecture du fichier ODT.');
        reader.readAsArrayBuffer(file);
      } else {
        reject('Type de fichier non pris en charge. Veuillez importer un fichier .txt, .docx ou .odt.');
      }
    });
  }
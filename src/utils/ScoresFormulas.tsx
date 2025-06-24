export default function ScoresFormulas() {
//Décompte du nombre de caractères
  function nbCaracteres(text: string): number {
    let regex = /(\w)/gi;
    const nbCaracteres = text.match(regex);
    return nbCaracteres ? nbCaracteres.length : 0;
  }

  //Décompte du nombre de voyelles
  function nbVoyelles(text: string): number {
    let regex = /[aeiouœ]/gi;
    const voyelles = text.match(regex);
    return voyelles ? voyelles.length : 0;
  }

  //Décompte du nombre de digrammes
 function nbDigrammes(text: string): number {
    let regex = /(au)|(eu)|(ou)|(oi)|(œu)|(ei)|(ai)|(ee)|(ue)|(ui)|(ua)/gi;
    const digrammes = text.match(regex);
    return digrammes ? digrammes.length : 0;
  }

  //Décompte du nombre de trigrammes
  function nbTrigrammes(text: string): number {
    let regex = /(eau)|(oue)|(aie)/gi;
    const trigrammes = text.match(regex)
    return trigrammes ? trigrammes.length : 0;
  }

  //Décompte du nombre de syllabes graphiques
  function nbSyllabesGraphiques(text: string): number {
    return nbVoyelles(text) - (nbDigrammes(text) + nbTrigrammes(text));
  }

  //Décompte du nombre de mots
 function nbMots(text: string): number {
    let regex = /(\w+)/gi;
    const mots = text.match(regex)
    return mots ? mots.length : 0;
  }

  //Décompte des mots polysyllabiques
  function nbMotsPolysyllabiques(text: string): number {
    let punctuation = /[.,?!;:]/g;
    text = text.replace(punctuation, "").replace("  ", " ");
    let mots = text.split(' ');
    let motsPolysyllabiques = 0;
    for (const mot in mots) {
      if (nbSyllabesGraphiques(mots[mot]) >= 3) {
        motsPolysyllabiques++;
      }
    }
    return motsPolysyllabiques;
  }

  //Décompte des mots longs
  function nbMotsLongs(text: string): number {
    let regex = /(\w{7,})/g;
    const motsLongs = text.match(regex);
    return motsLongs ? motsLongs.length : 0;
  }

  //Décompte des phrases
   function nbPhrases(text: string): number {
    let regex = /..\.|!|\?/gi;
    const phrases = text.match(regex);
    return phrases ? phrases.length : 0;
  }

  //Calcul LIX
   function scoreLix(text: string): number {
    return (nbMots(text) / nbPhrases(text)) + 100 * (nbMotsLongs(text) / nbMots(text));
  }

  //Calcul RIX
   function scoreRix(text: string): number {
    return nbMotsLongs(text) / nbPhrases(text);
  }

  //Calcul FKGL
   function scoreFkgl(text: string): number {
    return 0.39 * (nbMots(text) / nbPhrases(text)) + 11.8 * (nbSyllabesGraphiques(text) / nbMots(text)) - 15.59;
  }

  //Calcul Gunning Fog
   function scoreGunningFog(text: string): number {
    return 0.4 * (nbMots(text) / nbPhrases(text)) + 100 * (nbMotsPolysyllabiques(text) / nbMots(text));
  }

  //Calcul SMOG
   function scoreSMOG(text: string): number {
    return 1.043 * Math.sqrt((nbMotsPolysyllabiques(text) * (30 / nbPhrases(text)))) + 3.1291;
  }

  //Calcul Coleman-Liau
   function scoreColemanLiau(text: string): number {
    return 0.0588 * ((nbCaracteres(text) / nbMots(text)) * 100) - 0.296 * ((nbPhrases(text) / nbMots(text)) * 100) - 15.8;
  }

  //Calcul Automated Readability Index
   function scoreAri(text: string): number {
    return 4.71 * (nbCaracteres(text) / nbMots(text)) + 0.5 * (nbMots(text) / nbPhrases(text)) - 21.43;
  }

  /**
   * Analyse de la difficulté du texte en fonction de l'indice de lisibilité
   * @param formula 
   * @param score 
   * @returns 
   */
   function scoreAnalysis(formula: string, score: number): string {
    let formula_scales = [['lix', 59, 50, 40, 30],
    ['rix', 7.1, 5.3, 2.9, 1.8],
    ['fkgl', 15, 12, 5, 1],
    ['gunning', 17, 13, 7, 1],
    ['smog', 14, 12, 7, 1],
    ['ari', 15, 9, 5, 1],
    ['coleman_liau', 15, 9, 5, 1]
    ]
    for (let column in formula_scales) {
      for (let row in formula_scales) {
        if (formula_scales[column][row] === formula) {
          if (score > Number(formula_scales[column][1])) {
            return "Très difficile";
          }
          if (score > Number(formula_scales[column][2])) {
            return "Difficile";
          }
          if (score > Number(formula_scales[column][3])) {
            return "Intermédiaire";
          }
          if (score > Number(formula_scales[column][4])) {
            return "Facile";
          }
          return "Très facile";
        }
      }
    }
    return "Erreur d'analyse";
  }
}
const valoriDispari: Record<string, number> = {
  "0": 1,
  "1": 0,
  "2": 5,
  "3": 7,
  "4": 9,
  "5": 13,
  "6": 15,
  "7": 17,
  "8": 19,
  "9": 21,
  A: 1,
  B: 0,
  C: 5,
  D: 7,
  E: 9,
  F: 13,
  G: 15,
  H: 17,
  I: 19,
  J: 21,
  K: 2,
  L: 4,
  M: 18,
  N: 20,
  O: 11,
  P: 3,
  Q: 6,
  R: 8,
  S: 12,
  T: 14,
  U: 16,
  V: 10,
  W: 22,
  X: 25,
  Y: 24,
  Z: 23,
};

const valoriPari: Record<string, number> = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
};

export const codiciCatastali: Record<string, string> = {
  roma: "H501",
  milano: "F205",
  napoli: "F839",
  torino: "L219",
  palermo: "G273",
  firenze: "D612",
  venezia: "L736",
  bologna: "L123",
  calabria: "C906",
};

function estraiConsonanti(string: string) {
  return string.replace(/[aeiou]/gi, "").toUpperCase();
}

function estraiVocali(string: string) {
  return string.replace(/[^aeiou]/gi, "").toUpperCase();
}

function generaCodiceCognome(string: string) {
  const consonanti = estraiConsonanti(string).replace(/\s+/g, "");
  console.log(consonanti);
  const vocali = estraiVocali(string);
  const codice = consonanti + vocali;
  return codice.substring(0, 3).padEnd(3, "X");
}

function generaCodiceNome(string: string) {
  const consonanti = estraiConsonanti(string).replace(/\s+/g, "");
  console.log(consonanti);
  const vocali = estraiVocali(string);
  if (consonanti.length >= 4) {
    const codice = consonanti[0] + consonanti[2] + consonanti[3];
    return codice;
  } else {
    const codice = consonanti + vocali;
    return codice.substring(0, 3).padEnd(3, "X");
  }
}

function generaMese(mese: string) {
  const lettereMese: Record<string, string> = {
    "01": "A",
    "02": "B",
    "03": "C",
    "04": "D",
    "05": "E",
    "06": "H",
    "07": "L",
    "08": "M",
    "09": "P",
    "10": "R",
    "11": "S",
    "12": "T",
  };
  return lettereMese[mese];
}

function getCodiceCatastale(comune: string) {
  const codiceCatastale = codiciCatastali[comune];
  return codiceCatastale;
}

function calcolaDataSesso(dataNascita: string, sesso: string) {
  const [giorno, mese, anno] = dataNascita.split("-");
  const annoCodice = anno.substring(2);
  const meseCodice = generaMese(mese);
  let giornoCodice = parseInt(giorno, 10);
  if (sesso === "F") giornoCodice += 40;
  return annoCodice + meseCodice + String(giornoCodice).padStart(2, "0");
}

export function calcolaCf(
  cognome: string,
  nome: string,
  dataNascita: string,
  sesso: string,
  comune: string
) {
  const codiceCognome = generaCodiceCognome(cognome);
  const codiceNome = generaCodiceNome(nome);
  const codiceData = calcolaDataSesso(dataNascita, sesso);
  const codiceCatastale = getCodiceCatastale(comune);

  return codiceCognome + codiceNome + codiceData + codiceCatastale;
}

export function calcolaCarattereDiControllo(codice: string) {
  let somma = 0;
  for (let i = 0; i < 15; i++) {
    const carattere: string = codice[i];
    let valore: number;

    if (i % 2 === 0) {
      // Posizione Dispari
      valore = valoriDispari[carattere];
    } else {
      // Posizione Pari
      valore = valoriPari[carattere];
    }

    somma += valore;
  }

  const resto = somma % 26;
  return String.fromCharCode(resto + 65); // 65 è il codice ASCII di 'A'
}

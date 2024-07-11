export default function cleanHTMLString(input: string[]): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(input, "text/html");
  const tRows: string[] = [];
  const anchors = doc.querySelectorAll("tr");
  const reg =
    / [a-z]{2,2} \w{1,} \d{1,} [a-z]{1,} [a-z]{1,} {2}\| hide \||\d{1,} [a-z]{1,} [a-z]{1,} \| hide |More/gm;
  anchors.forEach((a) => {
    tRows.push(a.innerText.replace(reg, ""));
  });
  for (let i = 0; i < tRows.length; i++) {
    tRows[i] === "" ? tRows.splice(i, 1) : null;
    tRows[i] = tRows[i].trim();
    tRows[i] = tRows[i].replace("discuss", "");
  }
  return tRows;
}

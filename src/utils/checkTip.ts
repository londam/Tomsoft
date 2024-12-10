export default function checkTip(tip: string) {
  if (tip === "placanja") return ["obracun_placanja", "vrste_placanja_uid", "Plaćanja"];
  else if (tip === "artikli") return ["obracun_artikli", "artikl_uid", "Artikli"];
  else throw new Error("Wrong type of 'tip obracuna'");
}

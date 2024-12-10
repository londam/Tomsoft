U nastavku je zadatak gdje je potrebno napraviti demo aplikaciju koja se spaja na Luceed API (rest web servisi) i radi sljedeće:

1. Upit za dio naziva i dohvat i prikaz liste artikala za taj dio naziva. Od podataka dovoljno je prikazati id artikla i naziv artikla.
   endpoint: http://apidemo.luceed.hr/datasnap/rest/artikli/naziv/<dio-naziva>
2. Upit za period obračuna i dohvat obračuna prema točki 3.3. dokumentacije (str 210)
   endpoint: http://apidemo.luceed.hr/datasnap/rest/mpobracun/placanja/<pj_uid>/<od_datuma>/<do_datuma>
3. Upit za period obračuna i dohvat obračuna prema točki 3.4. dokumentacije (str 211)
   endpoint: http://apidemo.luceed.hr/datasnap/rest/mpobracun/artikli/<pj_uid>/<od_datuma>/<do_datuma>

Pristupni podaci za naš demo server su: (spremljeni unutar .env)

Demo aplikacija može biti React web aplikacija, ili ReactNative mobile aplikacija.
Dokumentaciju za Luceed API možete pronaći na linku:
https://kb.luceed.hr/article.php?id=1177

Aplikaciju je potrebno postaviti na Git Hub, te nam samo pošaljete link.
Rok za dostavu aplikacije je 7 dana.

Pristupni podaci su hard kodirani u .env file. Obično bi se takve stvari trebale spremiti u backendu (radi sigurnosti), ali za potrebe ovog zadatka u kojem imam pristup samo frontendu, stavio sam ih u .env. Na taj način barem nisu javno dostupni na GitHubu, nego samo onome tko ima pristup originalnom mojem kodu.

#TODO:
Umjesto console.log-ova prilikom bacanja errora, trebalo bi napraviti nešto što bi upozorilo korisnika da je došlo do pogreške i uputiti ga što treba napraviti (npr. refresh aplikacije)

Imena varijabli trenutno su mix HR/EN. Da ima više vremena (a i pretpostavljam u cijelom vašem codebase imate neki protokol gdje koje koristite) to bi trebalo standardizirati.

Sam izgled je trenutno osnovni, svakako bi ga trebalo stilizirati u istom stilu kako je i cijela aplikacija

Poboljšati responzivnost.

#Kako pokrenuti:
formirati .env.local file i staviti sljedeće varijable unutra:
VITE_LUCEED_API_URL =
VITE_LUCEED_API_URL_ENDPOINT_OBR =
VITE_LUCEED_API_URL_ENDPOINT_ARTIKLI =
VITE_LUCEED_USERNAME =
VITE_LUCEED_PASSWORD =

npm i
npm run dev

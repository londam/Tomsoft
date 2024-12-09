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

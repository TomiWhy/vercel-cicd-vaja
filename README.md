# Vercel vaja - CI/CD

## Opis projekta

To je enostaven statični spletni projekt, narejen za projektno vajo iz objave spletne aplikacije na platformo Vercel.

Projekt prikazuje:
- pripravo enostavne HTML/CSS/JavaScript spletne strani,
- uporabo Git in GitHub repozitorija,
- povezavo GitHub repozitorija z Vercelom,
- samodejni deploy,
- razliko med Preview in Production deployem,
- dodatno konfiguracijo projekta.

Spletna stran vsebuje osnovno predstavitev CI/CD postopka in gumb, s katerim preverim delovanje JavaScript kode.

## Uporabljene tehnologije

- HTML
- CSS
- JavaScript
- Git
- GitHub
- Vercel

## Struktura projekta

```text
vercel-cicd-vaja/
├── index.html
├── style.css
├── script.js
├── vercel.json
└── README.md

## GitHub Repozitorij

GitHub URL: https://github.com/TomiWhy/vercel-cicd-vaja

## Deploy

Production URL: https://vercel-cicd-vaja.vercel.app
Projekt je objavljen na platformi Vercel. Vercel je povezan z GitHub repozitorijem, zato se ob spremembah v repozitoriju deployment izvede samodejno.

## CI/DC workflow

Pri projektu sem uporabil naslednji workflow:

main branch → nova veja → sprememba → commit → push → Preview deploy → Pull Request → merge → Production deploy

Najprej sem pripravil osnovno verzijo projekta in jo poslal v vejo main. Nato sem ustvaril novo vejo za spremembo:

git checkout -b update-homepage

Na tej veji sem naredil spremembo vsebine spletne strani, jo shranil s commitom in poslal na GitHub:

git add .
git commit -m "Update homepage badge"
git push -u origin update-homepage

Vercel je za to vejo ustvaril Preview deploy. Nato sem na GitHubu ustvaril Pull Request, ga pregledal in združil v vejo main.

Po združitvi v main je Vercel samodejno ustvaril Production deploy.

## Preview deploy

Preview deploy je testna verzija aplikacije. Nastane pri delu na ločeni veji ali pri Pull Requestu. Uporablja se za preverjanje sprememb, preden jih združimo v glavno vejo.

V tem projektu je Preview deploy nastal iz veje:

update-homepage

## Production deploy

Production deploy je javna verzija aplikacije. V tem projektu nastane iz veje:

main

Po združitvi Pull Requesta v vejo main je Vercel samodejno objavil novo produkcijsko verzijo aplikacije.

## Dodatna konfiguracija

V projektu sem prikazal dodatno konfiguracijo na dva načina.

## Production environment

V Vercelu sem uporabil okolje Production, ki predstavlja javno objavljeno verzijo aplikacije.

Če je bila dodana konfiguracijska vrednost, je bila uporabljena kot primer:

SITE_NAME=Vercel vaja - CI/CD

Environment variables so key-value nastavitve, ki omogočajo ločevanje konfiguracije od izvorne kode. Pri tem projektu gre za statično HTML/CSS/JavaScript stran, zato vrednost ni neposredno uporabljena v kodi, ker projekt nima posebnega build procesa. Namen dodatka je prikazati razumevanje, kako se konfiguracija nastavlja na platformi Vercel.

vercel.json

Projekt vsebuje tudi datoteko vercel.json, kjer je nastavljena dodatna konfiguracija projekta:

{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}

Ta konfiguracija pomeni:

cleanUrls: omogoča lepše URL-je,
trailingSlash: določa, da URL-ji nimajo poševnice na koncu,
headers: doda osnovno HTTP varnostno glavo X-Content-Type-Options.

## DNS in Cloudflare razlaga

Če bi imel lastno domeno, bi jo lahko povezal z Vercel projektom. Primer domene bi bil:

app.mojadomena.si

V Vercelu bi domeno dodal pod:

Project Settings → Domains

Pri DNS ponudniku ali v Cloudflare bi nastavil CNAME zapis:

Type: CNAME
Name: app
Target: cname.vercel-dns.com
Proxy status: DNS only

DNS konfiguracija je pomembna, ker določa, na kateri strežnik ali platformo kaže domena. Če DNS ni pravilno nastavljen, uporabniki ne morejo dostopati do aplikacije prek želene domene.

## Težave

Pri izdelavi projekta sem moral paziti na:

-pravilno povezavo lokalnega Git repozitorija z GitHubom,
-pravilno uporabo veje main,
-razliko med Preview in Production deployem,
-to, da se environment konfiguracija pri statičnem HTML projektu ne uporablja neposredno v brskalniku brez build procesa,
-pravilno dokumentiranje postopka v README datoteki.

## Odgovori na vprašanja za razmislek
Kaj pomeni CI/CD?

CI/CD pomeni avtomatiziran proces priprave, preverjanja in objave aplikacije. CI pomeni Continuous Integration, CD pa Continuous Deployment.

Continuous Integration pomeni, da spremembe kode redno shranjujemo v skupni repozitorij, na primer GitHub. Continuous Deployment pomeni, da se aplikacija po spremembi samodejno objavi na platformo, kot je Vercel.

Kaj se zgodi, ko naredite git push?

Ko naredim git push, se lokalne spremembe pošljejo v GitHub repozitorij. Ker je GitHub repozitorij povezan z Vercelom, Vercel zazna spremembo in samodejno izvede nov deploy.

Kakšna je razlika med Preview in Production deployem?

Preview deploy je testna verzija aplikacije, ki nastane iz ločene veje ali Pull Requesta. Uporablja se za preverjanje sprememb pred objavo.

Production deploy je javna glavna verzija aplikacije. Običajno nastane iz veje main.

Zakaj je koristno uporabljati GitHub skupaj z Vercelom?

GitHub omogoča shranjevanje, pregledovanje in verzioniranje kode. Vercel pa omogoča samodejno objavo aplikacije. Skupaj omogočata enostaven CI/CD workflow, kjer se aplikacija samodejno objavi po spremembi kode.

Kaj so environment variables?

Environment variables so konfiguracijske vrednosti, ki so nastavljene zunaj kode. Uporabljajo se za nastavitve aplikacije, API URL-je, ključe in druge vrednosti, ki jih ne želimo neposredno zapisati v izvorno kodo.

Zakaj DNS konfiguracija spada med pomembne sistemske naloge?

DNS konfiguracija določa, kam kaže domena. Če je DNS napačno nastavljen, aplikacija ni dostopna prek želene domene. Zato je DNS pomemben del objave spletnih aplikacij.

Kakšna so varnostna tveganja, če je Supabase tabela javno zapisljiva?

Če je Supabase tabela javno zapisljiva brez omejitev, lahko kdorkoli vpisuje podatke. To lahko povzroči spam, zlorabe, neprimerne podatke, preobremenitev baze ali varnostne težave.

Kaj bi bilo treba dodati, če bi projekt postal produkcijska aplikacija?

Če bi projekt postal produkcijska aplikacija, bi bilo treba dodati:

-boljše preverjanje podatkov,
-varnostne nastavitve,
-nadzor dostopa,
-spremljanje napak,
-analitiko,
-testiranje,
-boljšo dokumentacijo,
-urejeno upravljanje skrivnosti in konfiguracije.
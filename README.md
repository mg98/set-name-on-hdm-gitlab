# Set Full Name On HdM GitLab

![Header](./header.png)

Wer seinen Namen im GitLab der HdM ändert, behält ihn leider nicht für lange. Die Hochschule hat einen Cronjob eingerichtet, der in Intervallen von etwa 30 Minuten euren Namen wieder mit eurem im Studienbüro hinterlegten bürgerlichen Namen überschreibt.

Viele betrachten dies als einen Eingriff in ihre Privatsphäre, Verstoß gegen die Datenschutzgrundverordnung oder sogar Diskriminierung gegen Personen, die sich nicht als sich selber identifizieren.*

Wer dieser Maßnahme der HdM entgegen wirken möchte, kann diese Node.js App als eigenen Cronjob einstellen. Die App wird sich bei jedem Aufruf in euren GitLab Account einloggen und euren Namen mit eurem gewünschten Namen überschreiben.

_* Hierbei handelt es sich um eine Vermutung und keine tatsächlich durchgeführte Meinungsumfrage._

## Getting Started

1. `git clone https://github.com/mg98/set-name-on-hdm-gitlab`
2. `npm install`
3. `node index.js --username=xy123 --password="DeinPassword123\$" --name="Dein Wunschname"`

Der Befehl aus Schritt 3 kann regelmäßig als Cronjob ausgeführt werden.

**Achtung:** Special Characters müssen mit einem `\` escaped werden.

## Command Line Options

- `username` _(string)_: Dein HdM-Kürzel
- `password` _(string)_: Dein HdM-Password
- `fullname` _(string)_: Dein gewünschter "Voller Name"
- `browser` _(boolean, default: false)_: Ausführung der App mit Chromium
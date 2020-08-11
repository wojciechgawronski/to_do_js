# to_do_js

<b>TODO App</b> to prosta aplikacja, dająca możliwości
- zapisywania
- edytowania
- usuwania
<br>danych, wykorzystująca pamięć klienta - localStorage i tam zapisująca dane, które zostają zapamiętane po zamknięciu okna przeglądarki.

Zasada działanaia:
<ol>
<li>Sprawdzenie czy istnieją dane w pamięci podręcznej</li>
<li>Załadoanie listy lub zainiciowanie tablicy asocjacyjnej</li>
<li>Zmiany na liście zapisują się jednoczesnie w localStorage i są dynamicznie zmieniane na stronie</li>
</ol>

Aplikacja została napisana na podstawie tutoriala i rozwinięta o dodatkowe funkcje:
- tryb nocny / dzienny
- kosz
- opcja automatycznego kasowana listy podczas zamknięcia okna przeglądarki

Rozwój aplikacji:
- Ajax, PHP, baza danych
- możliwość współdzielenia listy dla różnych użytkowników
- aplikacja czasu rzeczywistego: asynchroniczne nasłuchiwanie zmian
- --------------------
- w przyszłości Aplikacja w Vue lub/i Laravel (websocets) / Yii2

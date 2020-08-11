# to_do_js

Podgląd: https://gawronsky.com.pl/todo

<b>TODO App</b> to prosta aplikacja, napisana w javaScript i ostylowana z użyciem SAAS, dająca możliwości
- zapisywania,
- edytowania,
- usuwania,

danych, wykorzystująca pamięć klienta - localStorage i tam zapisująca dane, które zostają zapamiętane po zamknięciu okna przeglądarki.

Zasada działanaia:
<ol>
<li>Sprawdzenie czy istnieją dane w pamięci podręcznej</li>
<li>Załadoanie listy lub zainiciowanie tablicy asocjacyjnej</li>
<li>Zmiany zapisują się jednoczesnie w localStorage i są dynamicznie zmieniane w widoku</li>
</ol>

Aplikacja została napisana na podstawie tutoriala i rozwinięta o dodatkowe funkcje:
- możliwość edycji elementów
- mozliwość usuwania elementów do kosza
- tryb nocny / dzienny
- opcja automatycznego kasowana listy podczas zamknięcia okna przeglądarki (TODO: do poprawy)

Rozwój aplikacji:
- Ajax, PHP, MySQL: możliwość współdzielenia listy dla różnych użytkowników
- Aplikacja czasu rzeczywistego: asynchroniczne nasłuchiwanie zmian
- W przyszłości Aplikacja w Vue lub/i Laravel (websocets) / Yii2

#  Rapport 

## Fetch- tidsförloppet


1. Fetch() -metoden använde jag för att hämta en beskrivning för vald pokemon. När användare trycker på knappen ”Read more" visas en modal med den information som redan finns tillgänglig på cards samt ytterligare information i form av beskrivning, height och weight.

2. Funktionen InitiateButtons(pokeArray) innehåller ett click-event för "Read more"-knappen. Funktionen tar pokeArray som parameter vilken innehåller en array med pokemon-objekt.

3. När man trycker på knappen "Read more" plockas namn för aktuell pokemon ut, beroende på vilket card eventet har inträffat på. Sedan gör man funktionsanropet showDescription() som tar in pokemon-namn, pokeArray, och boolean-värde (för synlighet av AddToCart-knappen som ej visas när modalen öppnas från cart) som parametrar. 

4. Man loopar igenom alla cards och om den hittar match på pokemon-namn hämtar man data om pokemon som finns i pokeArrayen, samt att metodanropet GetPokemonDescription() görs vilken tar in pokemon-namn som parameter och hämtar en beskrivning på pokemon.

5. Metoden GetPokemonDescription(index) bygger upp en url-path som består av url-objekt för att kunna besöka "https://pokeapi.co/" och pathname som i mitt fall är flavourPath- "/api/v2/pokemon-species/" + index, som är valt pokemon-namn. Man gör ett web API-anrop med fetch()- metoden där man skickar en tidigare skapad URL-path som parameter `let response = await fetch(this.url);`. Man väntar tills man får ett svar (promise) från server via web browser. När HTTP-status är 200 OK hämtar man data från promise i form av json-objekt som innehåller datan om vald pokemon `let description = await response.json();`. Från det objektet hämtar man en beskrivning (flavour_text_entries) om vald pokemon. Metoden returnerar beskrivningen tillbaks som sedan visas på modalen. 


## Reflektion

I detta projektarbete har jag varit ansvarig över modal och cart. Övergripande struktur på modal kunde jag göra med hjälp av bootstrap component. Första tanke som jag får när jag tittar på min kod är att den är lite rörig, så jag borde nog strukturera den bättre. Det finns säkert ett smidigare sätt att fixa både modal och cart, så jag borde testa att fixa några olika lösningar, men på grund av tidsbrist nöjde jag mig med den nuvarande lösningen. Också när man gör ett fetch-anrop borde jag kanske göra en felhantering för att kolla upp om svaret i från server är 200 OK. När det gäller funktionalitet av modal och cart är jag ganska nöjd och de fungerade som vi bestämde inom gruppen/par.



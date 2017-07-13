// Polish
'use strict';
var pl = function() {}
pl.code = 'pl';
pl.data = {

/* New Generics */
TX_CancelReplace           : 'Cancel or Replace Transaction',
TX_Cancel                  : 'Cancel Transaction',
PW_Desc              : 'This password * encrypts * your private key. This does not act as a seed to generate your keys. **You will need this password + your private key to unlock your wallet.**',
x_ReadMore                  : 'Read More',
TX_Replace                 : 'Replace Transaction',
x_TransHash                 : 'Transaction Hash',
TX_TXFee                     : 'TX Fee',
TX_Hash                    : 'TX Hash',

/* Check TX Status */
WALL_Create             : 'Check TX Status',
WALL_View_Short                  : 'TX Status',
TX_Details                  : 'Transaction Details',
VIEWTX_Desc                  : 'During times of high volume (like during ICOs) transactions can be pending for hours, if not days. This tool aims to give you the ability to find and "cancel" / replace these TXs. ** This is not typically something you can do. It should not be relied upon & will only work when the TX Pools are full. [Please, read about this tool here.](https://myetherwallet.groovehq.com/knowledge_base/topics/how-can-i-check-on-the-status-of-my-transaction-can-i-cancel-override-overwrite-replace-or-do-anything-once-a-transaction-has-been-sent)**',
VIEWTX_NotFound                 : 'Transaction Not Found',
VIEWTX_NotFound_1               : 'This TX cannot be found in the TX Pool of the node you are connected to.',
VIEWTX_NotFound_2               : 'If you just sent the transaction, please wait 15 seconds and press the "Check TX Status" button again. ',
VIEWTX_NotFound_3               : 'It could still be in the TX Pool of a different node, waiting to be mined.',
VIEWTX_NotFound_4               : 'Please use the dropdown in the top-right & select a different ETH node (e.g. `ETH (Etherscan.io)` or `ETH (Infura.io)` or `ETH (MyEtherWallet)`) and check again.',
VIEWTX_Found           : 'Pending Transaction Found',
VIEWTX_Found_1         : 'Your transaction was located in the TX Pool of the node you are connected to. ',
VIEWTX_Found_2         : 'It is currently pending (waiting to be mined). ',
VIEWTX_Found_3         : 'There is a chance you can "cancel" or replace this transaction. Unlock your wallet below.',
VIEWTX_FoundOnChain             : 'Transaction Found',
VIEWTX_FoundOnChain_1           : 'Your transaction was successfully mined and is on the blockchain.',
VIEWTX_FoundOnChain_2           : '**If you see a red `( ! )`, a `BAD INSTRUCTION` or `OUT OF GAS` error message**, it means that the transaction was not successfully *sent*. You cannot cancel or replace this transaction. Instead, send a new transaction. If you received an "Out of Gas" error, you should double the gas limit you specified originally.',
VIEWTX_FoundOnChain_3           : '**If you do not see any errors, your transaction was successfully sent.** Your ETH or Tokens are where you sent them. If you cannot see this ETH or Tokens credited in your other wallet / exchange account, and it has been 24+ hours since you sent, please [contact that service](https://myetherwallet.groovehq.com/knowledge_base/topics/i-have-a-question-but-its-not-about-myetherwallet-dot-com-what-do-i-do). Send them the *link* to your transaction and ask them, nicely, to look into your situation.',

/* Gen Wallet Updates */
GEN_Help_1                  : 'Use your',
GEN_Help_2                  : 'to access your account.',
GEN_Help_3                  : 'Your device * is * your wallet.',
GEN_Help_4                  : 'Guides & FAQ',
GEN_Help_5                  : 'How to Create a Wallet',
GEN_Help_6                  : 'Getting Started',
GEN_Help_7                  : 'Keep it safe · Make a backup · Don\'t share it with anyone · Don\'t lose it · It cannot be recovered if you lose it.',
GEN_Help_8                  : 'Not Downloading a File? ',
GEN_Help_9                  : 'Try using Google Chrome ',
GEN_Help_10                 : 'Right click & save file as. Filename: ',
GEN_Help_11                 : 'Don\'t open this file on your computer ',
GEN_Help_12                 : 'Use it to unlock your wallet via MyEtherWallet (or Mist, Geth, Parity and other wallet clients.) ',
GEN_Help_13                 : 'How to Back Up Your Keystore File ',
GEN_Help_14                 : 'What are these Different Formats? ',
GEN_Help_15                 : 'Preventing loss &amp; theft of your funds.',
GEN_Help_16                 : 'What are these Different Formats?',
GEN_Help_17                 : 'Why Should I?',
GEN_Help_18                 : 'To have a secondary backup.',
GEN_Help_19                 : 'In case you ever forget your password.',
GEN_Help_20                 : 'Cold Storage',
GEN_ConfButton              : 'I understand. Continue.',
GEN_Label_5                 : 'Save Your Private Key ',
GEN_Unlock                  : 'Unlock your Wallet to See Your Address',
x_GasPriceDesc              : 'Gas Price is the amount you pay per unit of gas. `TX fee = gas price * gas limit` & is paid to miners for including your TX in a block. Higher the gas price = faster transaction, but more expensive. Default is `21 GWEI`.',
x_GasLimitDesc              : 'Gas limit is the amount of gas to send with your TX. `TX fee` = gas price * gas limit & is paid to miners for including your TX in a block. Increasing this number will not get your TX mined faster. Sending ETH = `21000`. Sending Tokens = ~`200000`.',
x_NonceDesc                  : 'The nonce is the number of transactions sent from a given address. It ensures transactions are sent in order & not more than once.',
TX_TXFeeDesc                  : 'The TX Fee is paid to miners for including your TX in a block. Is is the `gas limit` * `gas price`. [You can convert GWEI -> ETH here](https://www.myetherwallet.com/helpers.html)',



/* Navigation*/
WALL_Add               : 'Dodaj Portfel ',
BULK_Generate            : 'Generuj Hurtowo ',
x_Contact                 : 'Kontakt ',
CONTRACT_Title               : 'Kontrakt ',
CONTRACT_Deploy          : 'Wyślij Kontrakt ',
ENS_Title                     : 'ENS',
WALL_Create            : 'Create Wallet ',
WALL_Create            : 'Wygeneruj Portfel ',
x_Help                    : 'Pomoc ',
CONTRACT_Interact        : 'Pracuj z Kontraktem ',
CONTRACT_Multisig                : 'Multi-podpis ',
WALL_walletViewCX               : 'Moje Portfele ',
x_Offline                 : 'Wyślij Offline ',
TX_Send_Title             : 'Wyślij Ether i Tokeny ',
TX_Send_ShortTokens              : 'Wyślij Tokeny ',
MSG_Sign                 : 'Podpisz Wiadomość ',
SWAP_Title                    : 'Giełda ',
WALL_View              : 'Wyświetl informacje o portfelu ',
WALL_Your             : 'Twoje Portfele ',

/* General */
x_Access                    : 'Dostęp ',
ADDR_Desc                : 'Your Address can also be known as you `Account #` or your `Public Key`. It is what you share with people so they can send you Ether or Tokens. Find the colorful address icon. Make sure it matches your paper wallet & whenever you enter your address somewhere. Inaczej "Numer konta" lub "Klucz publiczny". Wysyłasz go innym aby mogli Ci wysłać ether. Ikona umożliwia łatwe rozpoznanie Twojego adresu. ',
ADDR_                   : 'Twój Adres ',
x_Cancel                    : 'Anuluj ',
x_CSV                       : 'Plik CSV (nieszyfrowany) ',
x_Download                  : 'Pobierz ',
x_Json                      : 'Plik JSON (nieszyfrowany) ',
x_JsonDesc                  : 'Nieszyfrowany klucz prywatny, plik w formacie JSON. Nie wymaga podania hasła, ale każdy kto zdobędzie ten plik uzyska również pełny dostęp do Twojego portfela i zgromadzonych na nim środków. ',
x_Keystore                  : 'Plik Keystore (UTC / JSON · Zalecany · Szyfrowany) ',
x_Keystore2                 : 'Plik Keystore (UTC / JSON) ',
x_KeystoreDesc              : 'Ten plik Keystore odpowiada formatowi stosowanemu przez Mist, więc może być w prosty sposób zaimportowany w przyszłości. Jest to zalecana forma pliku do pobrania i przechowywania jako kopii zapasowej. ',
x_Mnemonic                  : 'Mnemonik ',
x_ParityPhrase              : 'Fraza Parity ',
PW_                  : 'Hasło ',
x_Print                     : 'Drukuj Portfel Papierowy ',
x_PrintDesc                 : 'Wskazówka: Kliknij drukuj i zapisz plik PDF, nawet jeżeli nie posiadasz drukarki! ',
x_PrintShort                : 'Drukuj ',
x_PrivKey                   : 'Klucz Prywatny (nieszyfrowany) ',
x_PrivKey2                  : 'Klucz Prywatny ',
x_PrivKeyDesc               : 'Nieszyfrowana, tekstowa wersja Twojego klucza prywatnego, nie wymaga hasła. Jeżeli ktoś zdobędzie nieszyfrowany klucz, będzie mógł uzyskać pełen dostęp do Twojego portfela bez podania hasła. Z tego powodu zaleca się używanie jego szyfrowanej wersji. ',
x_Save                      : 'Zapisz ',
x_TXT                       : 'Plik TXT (nieszyfrowany) ',
WALL_                    : 'Portfel ',

/* Header */
WARN_01               : 'Zawsze dokładnie sprawdzaj adres URL strony przed jej użyciem. Użycie fałszywej strony może pozbawić cię wszystkich środków! ',
WARN_04                : 'Upewnij się że posiadasz **zewnętrzne kopie bezpieczeństwa** każdego przechowywanego tu portfela. Może być wiele przyczyn utraty danych przechowywanych w tym rozszerzeniu przeglądarki Chrome, włączając w to odinstalowanie i ponowne zainstalowanie rozszerzenia. To rozszerzenie ma ułatwiać dostęp do Twoich portfeli, a **nie** służyć jako kopia bezpieczeństwa. ',
FOOTER_Tagline                 : 'Portfel Ethereum - Open Source, JavaScript, Client-Side ',
CX_Tagline                  : 'Portfel Ethereum, Rozszerzenie Chrome - Open Source, JavaScript, Client-Side ',

/* Footer */
FOOTER_1                    : 'Narzędzie do generowania portfeli Ethereum i wysyłania transakcji - otwarto-źródłowe, javascrypt\'owe, strony klienta ',
FOOTER_1b                   : 'Twórcy: ',
FOOTER_2                    : 'Darowizny: ',
FOOTER_3                    : 'Generowanie portfeli po stronie klienta przez ',
FOOTER_4                    : 'Wyłączenie odpowiedzialności ',

/* Sidebar */
ACCOUNT_Info         : 'Informacje o Koncie ',
ACCOUNT_Address         : 'Adres Konta ',
ACCOUNT_Balance          : 'Stan Konta ',
TOKEN_Balance            : 'Stan Tokenów ',
SIDEBAR_Equiv               : 'Ekwiwalent ',
TX_History        : 'Historia Transakcji ',
SIDEBAR_donation            : 'MyEtherWallet jest darmową, otwarto-źródłową usługą stworzoną dla Twojej prywatności i bezpieczeństwa. Im więcej darowizn zbierzemy, tym więcej czasu będziemy w stanie poświęcić na dodawanie nowych funkcjonalności, analizowanie informacji zwrotnych oraz spełnianie waszych oczekiwań. Jesteśmy jedynie dwójką ludzi starającą się zmienić świat. Pomóż nam! ',
SIDEBAR_donate              : 'Prześlij darowiznę ',
SIDEBAR_thanks              : 'DZIĘKUJEMY!!! ',

/* Decrypt Panel */
DECRYPT_Access              : 'Jak chciałbyś uzyskać dostęp do Twojego portfela? ',
DECRYPT_Title               : 'Wybierz format Twojego klucza prywatnego: ',
WALL_Select              : 'Wybierz Portfel: ',

/* Add Wallet */
DECRYPT_Label_1                 : 'Co chciałbyś zrobić? ',
WALL_GenerateNew                 : 'Generuj Nowy Portfel ',
DECRYPT_Radio_2                 : 'Wybierz Plik Portfela (Keystore / JSON) ',
DECRYPT_Radio_2_alt             : 'Wybierz Plik Portfela ',
DECRYPT_Radio_2_short           : 'WYBIERZ PLIK PORTFELA... ',
DECRYPT_Radio_3                 : 'Wklej/Wpisz Twój Klucz Prywatny ',
ACCOUNT_AddWatch                 : 'Dodaj Konto do Obserwacji ',
MNEM_Enter                 : 'Wklej/Wpisz Swój Mnemonik ',
MNEM_Enter_Path            : 'Wybierz ścieżkę portfela HD ',
MNEM_Enter_PathCustom      : '(Niestandardowy) ',
DECRYPT_Label_2                 : 'Utwórz Nazwę Użytkownika: ',
DECRYPT_Label_3                 : 'Twój portfel jest zaszyfrowany. Podaj hasło ',
DECRYPT_Label_4                 : 'Dodaj Konto do Obserwacji ',
WARN_03               : 'Możesz dodać dowolne konto do obserwacji bez podawania jego klucza prywatnego. ** Nie ** oznacza to, że uzyskasz dostęp do tego portfela, nie będziesz mógł również wysyłać z niego środków. ',
DECRYPT_Label_5                 : 'Wpisz Adres ',
WALL_Unlock                 : 'Odblokuj Portfel ',
WALL_Unlock_Short           : 'Odblokuj ',
ACCOUNT_Add                 : 'Dodaj konto ',

/* Generate Wallets */
GEN_desc                    : 'Jeżeli chcesz wygenerować wiele portfeli możesz to zrobić tu ',
PW_Enter                 : 'Wpisz silne hasło (co najmniej 9 znaków) ',
PW_Enter           : 'NIE zapomnij tego hasła! ',
GEN_SuccessMsg              : 'Sukces! Twój portfel został wygenerowany. ',
x_Keystore_Save                 : 'Zapisz Twój plik Keystore lub Klucz Prywatny. Nie zapomnij powyższego hasła. ',
ADDR_Save                 : 'Zapisz swój adres. ',
GEN_Label_4                 : 'Opcjonalnie: Wydrukuj swój Portfel Papierowy, lub zachowaj obrazek z kodem QR. ',

/* Bulk Generate Wallets */
BULK_Label_1                : 'Ilość Portfeli do Wygenerowania ',
BULK_Label_2                : 'Generuj Portfele ',
BULK_SuccessMsg             : 'Sukces! Twoje portfele zostały wygenerowane. ',

/* Sending Ether and Tokens */
ADDR_To                   : 'Do Adresu ',
x_Amount                 : 'Kwota do Wysłania ',
x_Amount_short           : 'Kwota ',
TOKEN_AddCustom                 : 'Niestandardowy Token ',
x_GasLimit                    : 'Paliwo ',
TX_Send_All          : 'Wyślij wszystkie środki ',
TX_Generate               : 'Wygeneruj Transakcję ',
TX_Unsigned                    : 'Surowa Transakcja ',
TX_Signed                 : 'Podpisana Transakcja ',
TX_Send_Short                  : 'Wyślij Transakcję ',
SENDModal_Title             : 'Ostrzeżenie! ',
/* full sentence reads "You are about to send "10 ETH" to address "0x1234". Are you sure you want to do this? " */
SENDModal_Content_1         : 'Wysyłasz ',
SENDModal_Content_2         : 'do adresu ',
SENDModal_Content_3         : 'Jesteś pewien, że chcesz to zrobić? ',
SENDModal_Content_4         : 'NOTKA: Jeśli wystąpi błąd, najprawdopodobniej musisz doładować ether do Twojego konta, na pokrycie kosztów paliwa do wysłania tokenów. Paliwo jest opłacane w ether. ',
SENDModal_No                : 'Nie, zabierz mnie stąd! ',
SENDModal_Yes               : 'Tak, jestem pewien! Zatwierdź transakcję. ',

/* Tokens */
ADDR_Short                  : 'Adres ',
TOKEN_Symbol                : 'Symbol Tokenu ',
TOKEN_Dec                   : 'Miejsc po przecinku ',
TOKEN_show                  : 'Pokaż Wszystkie Tokeny ',
TOKEN_hide                  : 'Ukryj Tokeny ',

/* Send Transaction */
TX_desc                  : 'Jeśli chcesz wysłać Tokeny, użyj zakładki "Wyślij Tokeny". ',
TX_warning               : 'Jeśli używasz funkcji "Tylko ETH" lub "Tylko ETC" wysyłasz przez kontrakt. Niektóre serwisy mają problemy z rozpoznawaniem tego typu transakcji. Czytaj dalej. ',
SEND_Advanced              : '+Zaawansowane: Dodaj Dane ',
x_Data                  : 'Dane ',
TX_Send_ShortInfo              : 'Standardowa transakcja, zużywająca 21000 paliwa, będzie kosztować 0.000441 ETH. My używamy ceny paliwa nieco-powyżej-minimum, co odpowiada 0.000000021 ETH aby upewnić się, że zostanie szybko zatwierdzona. Nie pobieramy żadnych dodatkowych opłat. ',
x_GasLimit                   : 'Limit Paliwa ',

/* Send Transaction Modals */
TRANSModal_Title            : 'Transakcje "Tylko ETH" i "Tylko ETC" ',
TRANSModal_Content_0        : 'Informacje na temat różnych transakcji i różnych odbiorców: ',
TRANSModal_Content_1        : '**ETH (Standardowa Transakcja): ** generuje standardową transakcję bezpośrednio z jednego adresu do drugiego. Domyślnie spala 21000 paliwa. Prawdopodobnie transakcja ETH zostanie powielona na łańcuchu ETC jeżeli posiadasz obie waluty na tym samym adresie. ',
TRANSModal_Content_2        : '**Tylko ETH: ** wysyła przez [Kontrakt zapobiegający powielaniu Timon\'a Rapp\'a (zalecany przez VB)](https://blog.ethereum.org/2016/07/26/onward_from_the_hard_fork/), który wysyła środki tylko na łańcuchu **ETH**. ',
TRANSModal_Content_3        : '**Tylko ETC: ** wysyła przez [Kontrakt zapobiegający powielaniu Timon\'a Rapp\'a (zalecany przez VB)](https://blog.ethereum.org/2016/07/26/onward_from_the_hard_fork/), który wysyła środki tylko na łańcuchu **ETC**. ',
TRANSModal_Content_4        : '**Coinbase & ShapeShift: ** używaj tylko Transakcji Standardowych. Jeżeli wyślesz z opcją "Tylko...", będziesz musiał skontaktować się z pomocą techniczną usługodawcy w celu manualnego zatwierdzenia środków lub ich zwrotu. Możesz też użyć [narzędzia Shapeshift](https://split.shapeshift.io/)  do rozdzielenia środków. ',
TRANSModal_Content_5        : '**Kraken i Poloniex:** nie są znane żadne utrudnienia. Używaj dowolnie. ',
TRANSModal_Yes              : 'Super, już rozumiem. ',
TRANSModal_No               : 'O boziu, strasznie zakręcone. Pomóżcie. ',

/* Offline Transaction */
OFFLINE_Title               : 'Generuj i Wyślij Transakcję Offline ',
OFFLINE_Desc                : 'Wygenerowanie transakcji może zostać wykonane w trzech krokach. Kroki 1 i 3 wykonasz na komputerze z internetem, krok 2 na komputerze bez połączenia z internetem. To gwarantuje, że Twoje klucze prywatne nigdy nie mają styczności z urządzeniem podłączonym do internetu. ',
OFFLLINE_Step1_Title        : 'Krok 1: Wygeneruj Informacje (Komputer Online) ',
OFFLINE_Step1_Button        : 'Wygeneruj Informacje ',
ADDR_From       : 'Od Adresu ',
OFFLINE_Step1_Label_2       : 'Notka: To jest adres NADAWCY, czyli adres Twojego konta, które starasz sie odizolować od internetu. Wyróżnik jest generowany dla tego konta. ',
OFFLINE_Step2_Title         : 'Krok 2: Wygeneruj transakcję (Komputer Offline) ',
ADDR_To       : 'Do Adresu ',
OFFLINE_Step2_Label_2       : 'Wartość / Kwota do Wysłania ',
x_GasPrice                  : 'Cena Paliwa ',
x_GasPriceDesc                 : 'To było wyświetlone w Kroku 1 na Komputerze Online. ',
x_GasLimit       : 'Limit Paliwa ',
x_GasLimitDesc      : 'Domyślny limit paliwa to 21000. Kiedy wysyłasz kontrakt lub załączasz dane ta wartość może być inna, nie zużyte paliwo zostanie zwrócone na Twoje konto. ',
x_Nonce                     : 'Wyróżnik ',
x_NonceDesc                 : 'To było wyświetlone w Kroku 1 na Komputerze Online. ',
x_Data       : 'Dane ',
x_DataDesc      : 'Wartość opcjonalna. Dane są zazwyczaj załączane jeżeli wysyłasz transakcje do kontraktów. ',
OFFLINE_Step2_Label_7       : 'Wpisz / Wybierz Twój Klucz Prywatny / plik JSON. ',
OFFLINE_Step3_Title         : 'Krok 3: Wyślij / Opublikuj Transakcję (Komputer Online) ',
OFFLINE_Step3_Label_1       : 'Wklej tu podpisaną transakcję z Kroku 2 i kliknij przycisk "WYŚLIJ TRANSAKCJĘ". ',

/* Sign Message */
MSG_message                 : 'Wiadomość ',
MSG_date                    : 'Data ',
MSG_signature               : 'Podpis ',
MSG_verify                  : 'Zweryfikuj Wiadomość ',
MSG_info1                   : 'Załącz aktualną datę, aby podpis nie mógł być ponownie wykorzystany w innym czasie. ',
MSG_info2                   : 'Załącz swój nick i napisz gdzie go wykorzystujesz, aby ktoś inny nie mógł powielić tej wiadomości. ',
MSG_info3                   : 'Opisz powód zamieszczenia wiadomości, aby nikt inny nie mógł jej wykorzystać w innym celu. ',

/* Deploy Contracts */
CONTRACT_GenBytecode                : 'Wygeneruj Kod Bajtowy ',
CONTRACT_GenBytecoded               : 'Wygenerowany Kod Bajtowy ',
TX_Sign                  : 'Podpisz Transakcję ',
CONTRACT_GenInterface               : 'Wygeneruj Interfejs ',

/* My Wallet */
WALL_Nickname                  : 'Nazwa Portfela ',
MYWAL_Address               : 'Adres Portfela ',
ACCOUNT_Balance                   : 'Środki ',
WALL_Edit_Short                  : 'Edytuj ',
WALL_View_Short                  : 'Podgląd ',
WALL_Remove                : 'Usuń ',
WALL_RemoveWal             : 'Usuń Portfel: ',
WALL_WatchOnlyAccounts             : 'Twoje Konta Tylko-do-Podglądu ',
WALL_Viewing               : 'Podgląd Portfela ',
WALL_Hide                  : 'Ukryj Dane Portfela ',
WALL_Edit                : 'Edytuj Portfel ',
WALL_Name                  : 'Nazwa Portfela ',
WARN_06             : 'Uwaga! Zaraz usuniesz swój portfel ',
WARN_07             : 'Upewnij się, że **zapisałeś klucz prywatny/plik Keystore i hasło** powiązane z tym portfelem zanim je usuniesz. ',
WARN_08             : 'Jeśli będziesz chciał w przyszłości używać ten portfel ze swoim MyEtherWallet CX, będziesz musiał go ponownie dodać używając klucza prywatnego/pliku JSON i hasła. ',

/* View Wallet Details */
VIEWWALLET_Subtitle         : 'Ta zakładka pozwoli Ci na odczyt kluczy prywatnych, pobranie kopii portfeli oraz wydrukowanie portfeli papierowych. Pobrane za jej pomocą portfele możesz [zaimportować do Geth/Mist](http://ethereum.stackexchange.com/questions/465/how-to-import-a-plain-private-key-into-geth/). Jeśli chcesz sprawdzić stan Twojego konta, zalecamy użyć eksploratora bloków np. [etherscan.io](http://etherscan.io/). ',
VIEWWALLET_Subtitle_Short   : 'Ta zakładka pozwala Ci na pobranie różnych typów kluczy prywatnych oraz ponowne wydrukowanie portfeli papierowych. ',
VIEWWALLET_SuccessMsg       : 'Sukces! Oto dane twojego portfela. ',

/* Mnemonic */
MNEM_1                      : 'Wybierz adres, którego chcesz użyć. ',
MNEM_2                      : 'Jedna grupa słów mnemonicznych ma dostęp do wielu portfeli / adresów. Wybierz adres, do którego chcesz uzyskać dostęp tym razem. ',
MNEM_more                   : 'Więcej Adresów ',
MNEM_prev                   : 'Poprzednie Adresy ',

/* Hardware wallets */
x_Ledger                    : 'Ledger Nano S ',
DECRYPT_Ledger_1                : 'Podłącz swój Ledger Nano S ',
DECRYPT_Ledger_2                : 'Otwórz aplikację Ethereum (lub aplikację kontraktu) ',
DECRYPT_Ledger_3                : 'Sprawdź czy opcja Obsługa Przeglądarki jest włączona w Ustawieniach ',
DECRYPT_Ledger_4                : 'Jeżeli w ustawieniach brak jest opcji Obsługa Przeglądarki, sprawdź czy masz [Firmware >1.2](https://www.ledgerwallet.com/apps/manager) ',
DECRYPT_Ledger_0a               : 'Otwórz MyEtherWallet ponownie na bezpiecznym połączeniu (SSL) ',
DECRYPT_Ledger_0b               : 'Otwórz MyEtherWallet w [Chrome](https://www.google.com/chrome/browser/desktop/) lub [Opera](https://www.opera.com/) ',
DECRYPT_Ledger_scan             : 'Połącz z Ledger Nano S ',
x_Trezor                    : 'TREZOR ',
DECRYPT_Trezor_scan             : 'Połącz z TREZOR ',
DECRYPT_Trezor_select           : 'To jest ziarno (seed) TREZOR',

/* Chrome Extension */
ERROR_CX_01                  : 'Nie posiadasz żadnych zapisanych portfeli. ["Dodaj Portfel"](/cx-wallet.html#add-wallet)! ',
CX_quicksend                : 'Wyślij ',

/* Node Switcher */
NODE_Title                  : 'Zmień Domyślny Węzeł',
NODE_Subtitle               : 'Aby połączyć się z lokalnym węzłem...',
WARN_05                : 'Twój węzeł musi obsługiwać HTTPS, aby można było się połączyć z nim przez MyEtherWallet.com. Możesz pobrać [repozytorium MyEtherWallet](https://github.com/kvhnuke/etherwallet/releases/latest) i uruchomić lokalnie aby połączyć się z dowolnym węzłem. Możesz też pobrać darmowy certyfikat SSL przez [LetsEncrypt](https://letsencrypt.org/)',
NODE_Name                   : 'Nazwa Węzła',
NODE_Port                   : 'Port Węzła',
NODE_CTA                    : 'Zapisz i Używaj Węzła',

/* Contracts */
CONTRACT_Title              : 'Adres Kontraktu ',
CONTRACT_Title_2            : 'Wybierz Istniejący Kontrakt ',
CONTRACT_Json               : 'Interfejs ABI / JSON ',
CONTRACT_Interact_Title     : 'Odczytaj / Zapisz Kontrakt ',
CONTRACT_Interact_CTA       : 'Wybierz funkcję ',
CONTRACT_Bytecode           : 'Kod Bajtowy ',
CONTRACT_Read               : 'ODCZYTAJ ',
CONTRACT_Write              : 'ZAPISZ ',

/* Swap / Exchange */
SWAP_rates                  : "Aktualne Kursy ",
SWAP_init_1                 : "Chcę wymienić ",
SWAP_init_2                 : " na ", // "I want to swap my X ETH for X BTC"
SWAP_init_CTA               : "Zatwierdź! ", // or "Continue"
SWAP_information            : "Dane transakcji ",
x_Amount               : "Kwota zlecenia ",
SWAP_rec_amt                : "Otrzymasz ",
SWAP_your_rate              : "Kurs wymiany ",
SWAP_rec_add                : "Twój Adres Odbiorczy ",
SWAP_start_CTA              : "Rozpocznij Wymianę ",
SWAP_ref_num                : "Twój numer referencyjny ",
SWAP_time                   : "Pozostały czas na wysyłkę ",
SWAP_progress_1             : "Zlecenie Rozpoczęte ",
SWAP_progress_2             : "Oczekiwanie na Twoje ", // Waiting for your BTC...
SWAP_progress_3             : "Otrzymano! ", // ETH Received!
SWAP_progress_4             : "Wysyłanie Twoich {{orderResult.output.currency}} ",
SWAP_progress_5             : "Zlecenie Zakończone ",
SWAP_order_CTA              : "Wyślij ", // Please send 1 ETH...
SWAP_unlock                 : "Odblokuj Twój portfel, aby wysłać ETH lub Tokeny wprost z tej strony. ",

/* Error Messages */
ERROR_0                     : 'Wprowadź prawidłową kwotę. ',
ERROR_1                     : 'Twoje hasło musi zawierać co najmniej 9 znaków. Upewnij się, że jest to silne hasło. ',
ERROR_2                     : 'Przykro nam! Nie rozpoznajemy tego formatu pliku portfela. ',
ERROR_3                     : 'To nie jest prawidłowy plik portfela. ',
ERROR_4                     : 'Ta jednostka nie istnieje, użyj jednej z następujących jednostek ',
ERROR_5                     : 'Błędny adres. ',
ERROR_6                     : 'Błędne hasło. ',
ERROR_7                     : 'Błędna wartość. (Must be integer. Try 0-18.) ', // 7
ERROR_8                     : 'Błędny limit paliwa. (Must be integer. Try 21000-4000000.) ', // 8
ERROR_9                     : 'Błędne dane. (Must be hex.) ', // 9
ERROR_10                    : 'Błędna ilość paliwa. (Must be integer. Try 20 GWEI / 20000000000 WEI.) ',
ERROR_11                    : 'Błędny wyróżnik. (Must be integer.) ', // 11
ERROR_12                    : 'Błąd podpisu transakcji. ',
ERROR_13                    : 'Portfel z tą nazwą już istnieje. ',
ERROR_14                    : 'Nie znaleziono portfela. ',
ERROR_15                    : 'Wygląda, że propozycja z tym ID jeszcze nie istnieje, lub wystąpił błąd odczytu tej propozycji. ',
ERROR_16                    : 'Portfel z tym adresem już istnieje w konfiguracji. Sprawdź zakładkę portfeli. ',
ERROR_17                    : 'Niewystarczające środki. Konto, z którego wysyłasz transakcję nie posiada wystarczających funduszy. Musisz mieć **0.01 ETH** na koncie, aby pokryć koszty paliwa. Doładuj konto i spróbuj ponownie. ',
ERROR_18                    : 'Całe paliwo było by zużyte w tej transakcji. Oznacza to, że głosowałeś już w tej propozycji albo minął termin głosowania. ',
ERROR_19                    : 'Nieprawidłowy symbol ',
ERROR_20                    : 'nie jest prawidłowym tokenem ERC-20. Jeśli inne tokeny się ładują, sporóbuj usunąć i dodać ponownie ten token. ',
ERROR_21                    : 'Nie można określić ilości paliwa. Brak wystarczających środków na koncie lub adres docelowego kontraktu zwróciłby błąd. Możesz ręcznie ustawić paliwo przed kontynuacją. Opis błędu po wysłaniu transakcji może dostarczyć więcej informacji. ',
ERROR_22                    : 'Wpisz poprawną nazwę węzła ',
ERROR_23                    : 'Wpisz poprawny adres URL. Jeśli łączysz się przez HTTPS, twój węzeł musi być za HTTPS ',
ERROR_24                    : 'Wpisz prawidłowy port ',
ERROR_25                    : 'Wpisz poprawny ID łańcucha (chain ID) ',
ERROR_26                    : 'Wpisz poprawny ABI ABI ',
ERROR_27                    : 'Minimalna Kwota: 0.01. Maksymalna Kwota: ',
ERROR_28                    : '**Potrzebujesz plik Keystore i hasło, lub Klucz Prywatny** aby uzyskać dostęp do tego portfela w przyszłości. Wykonaj zewnętrzną kopię bezpieczeństwa! Nie ma możliwości odzyskania portfela jeżeli go nie zapiszesz. Wejdź na [stronę pomocy](https://www.myetherwallet.com/#help) po instrukcje. ',
ERROR_29                    : 'Wpisz poprawny login i hasło ',
ERROR_30                    : 'Wpisz poprawną nazwę ENS ',
ERROR_31                    : 'Błędna tajna fraza (secret phrase) ',
ERROR_32                    : 'Nie można połączyć z węzłem.  Refresh your page, try a different node (upper right corner), check your firewall settings. If custom node, check your configs.', // 32
ERROR_33                    : 'The wallet you have unlocked does not match the owner\'s address. ', // 33
ERROR_34                    : 'The name you are attempting to reveal does not match the name you have entered. ', // 34
ERROR_35                    : 'Input address is not checksummed. <a href="https://myetherwallet.groovehq.com/knowledge_base/topics/not-checksummed-shows-when-i-enter-an-address" target="_blank" rel="noopener"> More info</a>', // 35

SUCCESS_1                   : 'Prawidłowy adres ',
SUCCESS_2                   : 'Portfel został odszyfrowany ',
SUCCESS_3                   : 'Your TX has been broadcast to the network. It is waiting to be mined & confirmed. During ICOs, it may take 3+ hours to confirm. Use the Verify & Check buttons below to see. TX Hash:   ', //'Transakcja zgłoszona. TX Hash ',
SUCCESS_4                   : 'Twój portfel został dodany ',
SUCCESS_5                   : 'Wybrany plik ',
SUCCESS_6                   : 'Uzyskano połączenie: ',
SUCCESS_7                   : 'Zweryfikowano Sygnaturę Wiadomości',
WARN_02              : 'Znalazłeś się tu przez odnośnik, który zawiera wstępnie uzupełniony adres, kwotę, paliwo lub dane transakcji. Możesz zmienić dowolne parametry transakcji zanim ją zatwierdzisz. Odblokuj portfel aby kontynuować. ',

/* Geth Error Messages */
GETH_InvalidSender          : 'Nieprawidłowy nadawca ',
GETH_Nonce                  : 'Wyróżnik transakcji za niski ',
GETH_Cheap                  : 'Cena paliwa poniżej akceptacji ',
GETH_Balance                : 'Niewystarczająca ilość środków na koncie ',
GETH_NonExistentAccount     : 'Konto nie istnieje lub niewystarczająca ilość środków ',
GETH_InsufficientFunds      : 'Niewystarczająca ilość środków na paliwo * cena + kwota ',
GETH_IntrinsicGas           : 'Paliwo poniżej ilości obowiązkowej ',
GETH_GasLimit               : 'Przekroczono limit paliwa na blok ',
GETH_NegativeValue          : 'Ujemna wartość ',

/* Parity Error Messages */
PARITY_AlreadyImported      : "Transakcja z takim samym hash'em została już zaimportowana.",
PARITY_Old                  : "Wyróżnik transakcji za niski. Spróbuj zwiększyć wartość wyróżnika.",
PARITY_TooCheapToReplace    : "Za niska opłata transakcyjna. Inna transakcja z tym samym wyróżnikiem znajduje się już w kolejce. Spróbuj dołączyć wyższą opłatę lub zwiększ wyróżnik transakcji.",
PARITY_LimitReached         : "Zbyt wiele transakcji w kolejce. Twoja transakcja została odrzucona ze względu na limity. Spróbuj dołączyć wyższą opłatę transakcyjną.",
PARITY_InsufficientGasPrice : "Za niska opłata transakcyjna. Opłata jest niższa niż minimalnie wymaga węzeł (minimum: {}, dołączono: {}). Spróbuj dołączyć wyższą opłatę transakcyjną.",
PARITY_InsufficientBalance  : "Niewystarczające środki. Konto, z którego wysyłasz transakcję nie posiada wystarczających funduszy. Wymaga: {}, otrzymano: {}.",
PARITY_GasLimitExceeded     : "Koszt transakcji przekracza bieżący limit paliwa. Limit: {}, otrzymano: {}. Spróbuj zmniejszyć ilość paliwa.",
PARITY_InvalidGasLimit      : "Dostarczone paliwo wykracza ponad limit.",

/* Translation Info */
// // Translation Info  [YOUR_NAME](https        : //www.myetherwallet.com/?gaslimit=21000&to=YOUR_ADDRESS&value=0.1#send-transaction) · ·
z_TRANSLATEVersion           : '4.0',
z_TRANSLATEDesc             : 'Podziękowania tłumaczom ',
z_TRANSLATE1            : '[egzi](?to=0xef39C3C51615B6e52e7D5B743BeaecdDcA822386&value=0.1#send-transaction) ',
z_TRANSLATE2            : '',
z_TRANSLATE3            : '',
z_TRANSLATE4            : '',
z_TRANSLATE5            : ''

};

module.exports = pl;


'use strict';
var ht = function() {}
ht.code = 'ht';
ht.data = {

HELP_2a_Title               : 'How do I save/backup my wallet? ',

/* New Generics */
x_CancelReplaceTx           : 'Cancel or Replace Transaction',
x_CancelTx                  : 'Cancel Transaction',
x_PasswordDesc              : 'This password * encrypts * your private key. This does not act as a seed to generate your keys. **You will need this password + your private key to unlock your wallet.**',
x_ReadMore                  : 'Read More',
x_ReplaceTx                 : 'Replace Transaction',
x_TransHash                 : 'Transaction Hash',
x_TXFee                     : 'TX Fee',
x_TxHash                    : 'TX Hash',

/* Check TX Status */
NAV_CheckTxStatus           : 'Check TX Status',
NAV_TxStatus                : 'TX Status',
tx_Details                  : 'Transaction Details',
tx_Summary                  : 'During times of high volume (like during ICOs) transactions can be pending for hours, if not days. This tool aims to give you the ability to find and "cancel" / replace these TXs. ** This is not typically something you can do. It should not be relied upon & will only work when the TX Pools are full. [Please, read about this tool here.](https://myetherwallet.groovehq.com/knowledge_base/topics/how-can-i-check-on-the-status-of-my-transaction-can-i-cancel-override-overwrite-replace-or-do-anything-once-a-transaction-has-been-sent)**',
tx_notFound                 : 'Transaction Not Found',
tx_notFound_1               : 'This TX cannot be found in the TX Pool of the node you are connected to.',
tx_notFound_2               : 'If you just sent the transaction, please wait 15 seconds and press the "Check TX Status" button again. ',
tx_notFound_3               : 'It could still be in the TX Pool of a different node, waiting to be mined.',
tx_notFound_4               : 'Please use the dropdown in the top-right & select a different ETH node (e.g. `ETH (Etherscan.io)` or `ETH (Infura.io)` or `ETH (MyEtherWallet)`) and check again.',
tx_foundInPending           : 'Pending Transaction Found',
tx_foundInPending_1         : 'Your transaction was located in the TX Pool of the node you are connected to. ',
tx_foundInPending_2         : 'It is currently pending (waiting to be mined). ',
tx_foundInPending_3         : 'There is a chance you can "cancel" or replace this transaction. Unlock your wallet below.',
tx_FoundOnChain             : 'Transaction Found',
tx_FoundOnChain_1           : 'Your transaction was successfully mined and is on the blockchain.',
tx_FoundOnChain_2           : '**If you see a red `( ! )`, a `BAD INSTRUCTION` or `OUT OF GAS` error message**, it means that the transaction was not successfully *sent*. You cannot cancel or replace this transaction. Instead, send a new transaction. If you received an "Out of Gas" error, you should double the gas limit you specified originally.',
tx_FoundOnChain_3           : '**If you do not see any errors, your transaction was successfully sent.** Your ETH or Tokens are where you sent them. If you cannot see this ETH or Tokens credited in your other wallet / exchange account, and it has been 24+ hours since you sent, please [contact that service](https://myetherwallet.groovehq.com/knowledge_base/topics/i-have-a-question-but-its-not-about-myetherwallet-dot-com-what-do-i-do). Send them the *link* to your transaction and ask them, nicely, to look into your situation.',

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
GET_ConfButton              : 'I understand. Continue.',
GEN_Label_5                 : 'Save Your `Private Key`. ',
GEN_Unlock                  : 'Unlock your wallet to see your address',
GAS_PRICE_Desc              : 'Gas Price is the amount you pay per unit of gas. `TX fee = gas price * gas limit` & is paid to miners for including your TX in a block. Higher the gas price = faster transaction, but more expensive. Default is `21 GWEI`.',
GAS_LIMIT_Desc              : 'Gas limit is the amount of gas to send with your TX. `TX fee` = gas price * gas limit & is paid to miners for including your TX in a block. Increasing this number will not get your TX mined faster. Sending ETH = `21000`. Sending Tokens = ~`200000`.',
NONCE_Desc                  : 'The nonce is the number of transactions sent from a given address. It ensures transactions are sent in order & not more than once.',
TXFEE_Desc                  : 'The TX Fee is paid to miners for including your TX in a block. Is is the `gas limit` * `gas price`. [You can convert GWEI -> ETH here](https://www.myetherwallet.com/helpers.html)',



/* Navigation*/
NAV_AddWallet               : 'METE YON BOUS ',  

NAV_BulkGenerate            : 'KREYE BOUS YO PA LO ',					
NAV_Contact                 : 'KONTAK ', 

NAV_Contracts               : 'KONTRA YO ',						
NAV_DeployContract          : 'OUVRI YON KONTRA ', 

NAV_ENS                     : 'ENS ',  							
NAV_GenerateWallet          : 'KREYE YON BOUS ', 

NAV_Help                    : 'EDE ',									
NAV_InteractContract        : 'PALE AVÈK KONTRA A ', 

NAV_Multisig                : 'PLIZYÈ SIY ',

NAV_MyWallets               : 'BOUS MWEN YO ',						
NAV_Offline                 : 'VOYE SAN SIYAL ',						
NAV_SendEther               : 'VOYE  ETHER ',						
NAV_SendTokens              : 'VOYE TOKENS YO ',					
NAV_SignMsg                 : 'SIYEN YON MESAJ ',						
NAV_Swap                    : 'CHANJE ',							
NAV_ViewWallet              : 'GADE ANNDAN YON BOUS ',														
NAV_YourWallets             : 'BOUS OU YO ', 


/* General */                       /*TOUT BAGAY*/
x_Access                    : 'ANTRE ', 								
x_AddessDesc                : 'LI RELE ANKÒ‘’NIMEWO KONT’’ OSWA ‘’ KLE PIBLIK’’ SE SA W’ KA VOYE BAY TOUT MOUN POU YO KA VOYE ETHER YO BA W’. PYON SA SE YON FASON SENP POU KONNEN ADRÈS OU ', 					
x_Address                   : 'ADRÈS OU ',							
x_Cancel                    : 'RETIRE ',							
x_CSV                       : 'PAJ  CSV SAN KÒD ',						
x_Download                  : 'PRAN L ',										
x_Json                      : 'PAJ JSON (SAN-KÒD) ',						
x_JsonDesc                  : 'SE YON LÒT VÈSYON SAN KÒD SOU FÒM JSON POU KLE SEKRÈ W’LA. SA VLE DI KE W’ PA BEZWEN KÒD SEKRÈ W’ POU W’ SÈVI AK LI MEN NENPÒT MOUN KI JWENN JSON AN KAPAB ANTRE NAN BOUS OU A AK ETHER W’ YO SAN KÒD SEKRÈ ',						
x_Keystore                  : 'PAJ KEYSTORE (UTC/ JSON DWE GEN KÒD) ',						
x_Keystore2                 : 'PAJ KEYSTORE (UTC / JSON) ',												
x_KeystoreDesc              : 'PAJ KEYSTORE SA SÈVI AK MENM  FÒM  MIST LA SÈVI A TOU, OU KAPAB PRAN L’ FASILMAN  PITA NAN LOGISYÈL YO. SE PAJ SA NOU MANDE W’ POU W’ PRAN AK KENBE L ',								
x_Ledger                    : 'ACHIV ',								
x_Mnemonic                  : 'LÈT FRAZ KACHE.',							
x_ParityPhrase              : 'FRAZ KI SANBLE ',									
x_Password                  : 'KÒD SEKRÈ ',							
x_Print                     : 'FÈ SÒTI YON BOUS SOU PAPYE	 ',										
x_PrintDesc                 : 'LÒT MWAYEN: PEZE SOU SÒTI PAJ LA  AK KENBE  BOUS PAPYE A TANKOU YON PDF, MENM  KE W’ PA GEN APARÈY POU SÒTI PAJ LA ! ',										
x_PrintShort                : 'SÒTI PAJ LA ',									
x_PrivKey                   : 'KLE SEKRÈ ( SAN KÒD) ',					
x_PrivKey2                  : 'KLE SEKRÈ ',						
x_PrivKeyDesc               : 'SE YON LÒT VÈSYON KLE SEKRÈ W’ LA  EKRI  SAN KÒD, SA VLE DI OKENN KÒD SEKRÈ PA NESESÈ POU SÈVI AK LI. SI NENPÒT MOUN TA VIN JWENN KLE SEKRÈ SA, L’AP KAPAB ANTRE NAN BOUS OU A SAN KÒD SEKRÈ. POU REZON SA, NOU MANDE LÒT FASON AN KI GEN KÒD POU KLE SEKRÈ W’ LA ',										
x_Save                      : 'KENBE L’ ',								
x_TXT                       : 'PAJ  TXT (SAN-KÒD) ',						
x_Wallet                    : 'BOUS ',

/* Header */                             /*TÈT*/
MEW_Warning_1               : 'TOUJOU BYEN VERIFYE L’URL ANVAN W’ ANTRE NAN BOUS OU A OSWA POU KREYE YON LÒT BOUS. ATANSYON AK FO SIT YO ',													
CX_Warning_1                : 'VEYE  POU W’ KA GEN** YON LÒT KOTE POU KENBE DEYÒ** AK TOUT BOUS W’AP JERE LA. GEN ANPIL BAGAY KI KAPAB FÈ W’ PÈDI DONE NIVO CHROME SA,  AK ANKÒ  RETIRE ENSTALASYON AN AK NAN ENSTALE NIVO A. NIVO SA SE YON FASON POU W’ ANTRE FASILMAN NAN BOUS OU YO, **SE PA** YON FASON POU W’ KENBE YO ',										
MEW_Tagline                 : 'BOUS d\'Ether Open Source JavaScript POU KLIYAN AN ',												
CX_Tagline                  : 'EKSTANSYON CHROME BOUS d\'Ether Open Source JavaScript POU KLIYAN  AN ',										
/* Footer */                     /* PYE PAJ LA */							
FOOTER_1                    : 'YON ZOUTI OPEN SOURCE NAN JAVASCRIPT LI FÈT POU KLIYAN KREYE BOUS  ETHEREUM YO EPI FÈ ANPIL TRANSFÈ ',						
FOOTER_1b                   : 'MOUN KI FÈ L’ LA SE	 ',					
FOOTER_2                    : 'DON YO APRESYE ANPIL ',  											
FOOTER_3                    : 'KREYASYON  BOUS POU KLIYAN AK ',									
FOOTER_4                    : 'AVÈTISMAN ',					

/* Sidebar */                /*BA LATERAL*/

sidebar_AccountInfo         : 'ENFÒMASYON YO SOU KONT LA ',

sidebar_AccountAddr         : 'ADRÈS KONT LA ',

sidebar_AccountBal          : 'KOBYEN  KÒB KONT LA GENYEN ',

sidebar_TokenBal            : 'KONBYEN TOKENS KONT LA GENYEN ',

sidebar_Equiv               : 'LÒT VALÈ KI MENM JAN ',

sidebar_TransHistory        : 'LIS TRANSFÈ YO ',

sidebar_donation            : 'MYETHERWALLET  SE YON SÈVIS GRATIS EPI YON OPEN SOURCE KI RESPEKTE VI SEKRÈ W’ AK SEKIRITE W’. PLIS N’AP JWENN ANPIL DON, PLIS N’AP PASE ANPIL TAN POU N’ DEVLOPE LÒT FONKSYON YO, N’AP TANDE SA W’ MANDE  AK BA W’ SA W’ BEZWEN . NOU SE KÈK MOUN K’AP ESEYE CHANJE MOND LA. EDE NOU! ',

sidebar_donate              : 'FÈ YON DON ',

sidebar_thanks              : 'MÈSI !!!  ',


/* Decrypt Panel */                       /* PANO DECHIFRE */							
decrypt_Access              : 'KÒMAN W’ VLE ANTRE NAN BOUS OU A ? ',						
decrypt_Title               : 'CHWAZI FÒM OU VLE METE KLE SEKRÈ W’ LA ',							
decrypt_Select              : 'CHWAZI YON BOUS ',
  
/* Add Wallet */             /* METE YON BOUS */					
ADD_Label_1                 : 'KISA W’ VLE FÈ ?  ',						
ADD_Radio_1                 : 'KREYE YON LÒT BOUS ',												
ADD_Radio_2                 : 'CHWAZI PAJ BOUS OU A (KEYSTORE/JSON) ',					
ADD_Radio_2_alt             : 'CHWAZI PAJ BOUS OU A ',

ADD_Radio_3                 : 'KOLE/PRAN KLE SEKRÈ W’ LA ',										
ADD_Radio_4                 : 'METE YON KONT ',						
ADD_Radio_5                 : 'KOLE/ANTRE LÈT POU FRAZ KACHE W’ LA ',									
ADD_Radio_5_Path            : 'CHWAZI HD POU LÒT WOUT ',												
ADD_Radio_5_PathCustom      : 'KLIYAN ', 						
ADD_Label_2                 : 'BAY KONT OU A YON NON ',			 	
ADD_Label_3                 : 'PAJ OU A GEN KÒD,  TANPRI METE KÒD SEKRÈ W’ ',												
ADD_Label_4                 : 'METE YON KONT KI KA PARÈT ',
								
ADD_Warning_1               : 'OU KAPAB METE NENPÒT KI KONT POU W’ FÈ L’ PARÈT NAN TI BWAT « BOUS YO » SAN W’ PA PRAN YON KLE SEKRÈ. SA **PA** VLE DI KE W’AP KA ANTRE NAN BOUS SA, NI POU W’ TA FÈ TRANSFÈ ETHER YO SÒTI NAN BOUS SA ',						
ADD_Label_5                 : 'ANTRE  ADRÈS LA ',						
ADD_Label_6                 : 'OUVRI BOUS OU A ',						
ADD_Label_6_short           : 'OUVRI ',								
ADD_Label_7                 : 'METE YON KONT ',						
/* Generate Wallets */                  /* KREYE BOUS YO*/
GEN_desc                    : 'SI W’ VLE KREYE PLIZYÈ LÒT BOUS, OU KAPAB FÈL LA ',

GEN_Label_1                 : 'METE YON GWO KÒD SEKRÈ (POU PI PITI 9 KARAKTÈ ',											
GEN_Placeholder_1           : 'PA BLIYE KENBE  SA ',											
GEN_SuccessMsg              : 'SIKSÈ ! BOUS OU A KREYE ',										
GEN_Label_2                 : 'KENBE PAJ KEYSTORE W ‘ LA  OSWA KLE SEKRÈ W ‘ LA. PA BLIYE KÒD SEKRÈ W’ LA KI ANLÈ A ',				
GEN_Label_3                 : 'KENBE BOUS OU A ',					
GEN_Label_4                 : 'OPSYON : FÈ SÒTI BOUS OU A SOU PAPYE OSWA SERE version QR code ',   


/* Bulk Generate Wallets */          /* KREYE BOUS YO PA PAKE*/
BULK_Label_1                : 'KANTITE BOUS KI KA KREYE ',											
BULK_Label_2                : 'KREYE BOUS YO ',							
BULK_SuccessMsg             : 'SIKSÈ ! BOUS OU YO KREYE ',									
/* Sending Ether and Tokens */   /*VOYE ETHER AK TOKENS*/
SEND_addr                   : 'ADRÈS KOTE W’AP VOYE L’ ',											
SEND_amount                 : 'KANTITE W’AP VOYE A ',									
SEND_amount_short           : 'KANTITE ',															
SEND_custom                 : 'TOKENS ESPESYAL ',
					
SEND_gas                    : 'GAZ ',								
SEND_TransferTotal          : 'VOYE TOUT KANTITE A ;// RENOUVLLE L’ POU PI PI VIT ',											
SEND_generate               : 'KREYE TRANFÈ A ',						
SEND_raw                    : 'TRASFÈ SAN ANALIZ ',						
SEND_signed                 : 'TRANSFÈ SIYEN ',							
SEND_trans                  : 'VOYE TRANSFÈ A ',						
SENDModal_Title             : 'ATANSYON!  ',										
/* full sentence reads "You are about to send "10 ETH" to address "0x1234". Are you sure you want to do this? " */                                                                                                  /*PLEN FRAZ POU LI ‘’ OU PRAL VOYE L’ ‘’10ETH’’ NAN ADRÈS ‘’0X1234’’ ESKE W’ KONFYAN OU VLE FÈ SA ?’’*/									
SENDModal_Content_1         : 'OU PRAL VOYE L ',											
SENDModal_Content_2         : 'NAN ADRÈS ',															
SENDModal_Content_3         : 'ESKE W KONFYAN ?  ',					
SENDModal_Content_4         : 'NÒT :SI JWENN AK YON ERÈ, OU TA GEN POU METE ETHER YO NAN KONT OU A POU W’ KOUVRI KÒB GAZ POU VOYE TOKENS YO. GAZ LA PEYE AK ETHER ',						
SENDModal_No                : 'NON, MWEN VLE SÒTI LA ',												
SENDModal_Yes               : 'WI, MWEN KONFYAN ! FÈ TRANSFÈ A ',


/* Tokens */                         /*TOKENS YO*/
TOKEN_Addr                  : 'ADRÈS ',							
TOKEN_Symbol                : 'SENBÒL TOKEN NAN ',					
TOKEN_Dec                   : 'KONTE AN DIS (10) ',						
TOKEN_show                  : 'MONTRE TOKENS YO ',					
TOKEN_hide                  : 'KACHE TOKENS YO ',


/* Send Transaction */                 /*VOYE TRANSFÈ A*/
TRANS_desc                  : 'SI W’ VLE VOYE TOKENS YO, ALE PITO NAN PAJ « VOYE TOKENS » ',										
TRANS_warning               : 'METE FONKSYON ‘’ETH’’ YO SÈLMAN  AK ‘’ETC SÈLMAN’’ OU FÈ W’ PASE NAN YON KONTRA. KÈK NAN SÈVIS SA YO KONN GEN PWOBLÈM  AK TRANSFÈ SA YO. POU W’  KONN PLIS ',		
TRANS_advanced              : '+AVANSE : METE GAZ ',								
TRANS_data                  : 'DONE ',													
TRANS_sendInfo              : 'YON TRANSFÈ NÒMAL SÈVI  AK 21000 GAZ KI KOUTE 0.000441  ETH. PRI GAZ LA 0.000000021 ETH  KE NOU TE CHWAZI A ON TI JAN PI WO KE  PI PITI A ASIRE W’ POU W’ YON KONFIMASYON RAPID. NOU PA PRAN FRÈ POU TRANSFÈ A.  ',					
TRANS_gas                   : 'LIMIT AN GAZ ;// CHANJE AN ENG POU LIMIT GAZ LA ',					
/* Send Transaction Modals */  /* MÒD TRANSFÈ YO*/					
TRANSModal_Title            : 'TRANSFÈ ‘’ETH YO SÈLMAN’’ AK ‘’ETC YO SÈLMAN’’',
TRANSModal_Content_0        : 'NÒT SOU TRANSFÈ YO AK LÒT SÈVIS YO ',							
TRANSModal_Content_1        : '**ETH ( TRANSFÈ NÒMAL) :** KREYE YON TRANSFÈ SAN DIFIKILTE SÒTI DIRÈKTEMAN NAN YON ADRÈS ALE NAN YON LÒT. GAZ LA SAN DIFIKILTE SE 21000. LI PWOBAB KE TOUT TRANSFÈ  D’ETH VOYE NAN FASON SA AP EGZEKITE ANKÒ SOU CHÈNN ETC A	',								
TRANSModal_Content_2        : '**ETH**. ,** SÈLMAN ETH: ** VOYE L’ NAN [KONTRA KI KONT EGZEKISYON  ANKÒ AN POU TIMON RAPP ( VB KI MANDE SA)] )](https://blog.ethereum.org/2016/07/26/onward_from_the_hard_fork/) POU W ‘ KA  PA VOYE KE SOU CHÈNN LAN ',						
TRANSModal_Content_3        : '**ETC**. , ** SÈLMAN ETC** VOYE L’ NAN[ KONTRA KI KONT EGZEKISYON ANKÒ AN POU TIMON RAPP (VB KI MANDE SA) ](https://blog.ethereum.org/2016/07/26/onward_from_the_hard_fork/)', 

TRANSModal_Content_4        : '**COINBASE& SHAPESHHIFT : ** VOYE PA TRANSFÈ NÒMAL SÈLMAN. SI W’ SÈVI AK KONTRA VOYE YO SOU YON SÈL CHENN. OU DWE JWENN EKIP KI LA POU SIPÒTE W’ LA POU YO KA METE YO MENM KANTITE KÒB LA OSWA REMÈT OU LI. [OU KAPAB ESEYE TOU AK ZOUTI ‘’SPLIT’’ NAN SHAPESHIFT.]( https://split.shapeshift.io/) ',

TRANSModal_Content_5        : '**KRAKEN & POLONIEX : ** PA GEN PWOBLÈM. SÈVI AK SA W’ VLE ',

TRANSModal_Yes              : 'WEYY !!!, MWEN KONPRANN ',

TRANSModal_Yes              : 'WEYY !!!, MWEN KONPRAN ',

TRANSModal_No               : 'AY,  M’ PA FIN KONPRANN DITOU EDE M ’ TANPRI ',

/* Offline Transaction */   /*TRANSFÈ SAN SIYAL*/
OFFLINE_Title               : 'KREYE EPI VOYE YON TRANFÈ SAN SIYAL ',						
OFFLINE_Desc                : 'KREYASYON YON TRANSFÈ SAN SIYAL FÈT NAN TWA ETAP. ETAP 1 AK 3 YO FÈT NAN YON KOMPITÈ KI GEN SIYAL AK ETAP 2 A NAN YON KOMPITÈ KI PA KONEKTE AK REZO A. SA PÈMÈT OU IZOLE NÈT  KLE SEKRÈ W’ LA POU TOUT MACHIN KI KONEKTE AK INTÈNÈT ',									
OFFLLINE_Step1_Title        : 'ETAP 1 : KREYASYON ENFÒMASYON AN (KOMPITÈ AK SIYAL) ',									
OFFLINE_Step1_Button        : 'KREYE ENFÒMASYON AN ',												
OFFLINE_Step1_Label_1       : 'ADRÈS KOTE L’ SÒTI ',								
OFFLINE_Step1_Label_2       : 'NÒT : SE NAN ADRÈS KOTE L’ SÒTI A, SE PA ADRÈS KOTE L’AP RIVE A.NONCE LA KREYE AK KONT MOUN K’AP VOYE A. SI NOU SÈVI AK YON MACHIN KI PA KONEKTE AK REZO A, ADRÈS SA AP ADRÈS  KONT LA TANKOU _COLDSTORAGE ',							
OFFLINE_Step2_Title         : 'ETAP 2: KREYASYON TRANSFÈ A(KOMPITÈ SAN SIYAL) ',										
OFFLINE_Step2_Label_1       : 'ADRÈS KOTE L’ PRALE ',					
OFFLINE_Step2_Label_2       : 'VALÈ/KANTITE W’AP VOYE ',											
OFFLINE_Step2_Label_3       : 'PRI GAZ LA ',						
OFFLINE_Step2_Label_3b      : 'KANTITE SA TE PARÈT NAN ETAP 1 AN LÈ KOMPITÈ W’ LA KI TE GEN SIYAL ',									
OFFLINE_Step2_Label_4       : 'LIMIT GAZ ',						
OFFLINE_Step2_Label_4b      : '21000 SE LIMIT NÒMAL LA. NA KA W’AP VOYE POU  KONTRA YO OSWA AVÈK DONE ANPLIS YO, VALÈ SA KAPAB DIFERAN. TOUT GAZ KI PA SÈVI YO  Y’AP VOYE YO BA W’ ',			
OFFLINE_Step2_Label_5       : 'NONCE ',							
OFFLINE_Step2_Label_5b      : 'SA TE PARÈT NAN PREMYE ETAP NAN KOMPITÈ W’ LA  KI GEN SIYAL.',									
OFFLINE_Step2_Label_6       : 'DONE YO	',							
OFFLINE_Step2_Label_6b      : 'SA SE YON ZÒN OPSYON, DONE YO TOUJOU SÈVI  LÈ Y’AP FÈ TRANSFÈ POU KONTRA YO ',								
OFFLINE_Step2_Label_7       : 'ANTRE/ CHWAZI KLE SEKRÈ W’ LA / JSON ',					
OFFLINE_Step3_Title         : 'ETAP 3 : VOYE/ FÈ WÈ TRANSFÈ A ( KOMPITÈ AK SIYAL) ',												
OFFLINE_Step3_Label_1       : 'KOPYE TRANSFÈ A LA SIYEN NAN ETAP 2 A AK PEZE SOU BOUTON  ”VOYE TRANSFÈ A ',				

/* Sign Message */                    /*SIYEN YON MESAJ*/

MSG_message                 : 'MESAJ ',										
MSG_date                    : 'DAT ',						 							
MSG_signature               : 'SIYATI.',								
MSG_verify                  : 'VERIFYE YON MESAJ ',							
MSG_info1                   : 'METE DAT JOU A POU SIYATI A PA SÈVI ANKÒ NAN YON LÒT MOMAN ',	
							
MSG_info2                   : 'METE TI NON W’ NAN KOTE W’ KONN SÈVI AK LI A POU YON LÒT MOUN PA SÈVI AK LI ',		
			
MSG_info3                   : 'METE YON SÈL BON REZON POU MESAJ LA  POU L’ PA SÈVI ANKÒ POU YON LÒT  REZON ',			

/* My Wallet */                               /*BOUS MWEN*/

MYWAL_Nick                  : 'NON BOUS LA ',												
MYWAL_Address               : 'ADRÈS BOUS LA ',														
MYWAL_Bal                   : 'KANTITE  KÒB ',											
MYWAL_Edit                  : 'KORIJE ',										
MYWAL_View                  : 'GADE ',															
MYWAL_Remove                : 'EFASE ',												
MYWAL_RemoveWal             : 'EFASE BOUS LA ',											
MYWAL_WatchOnly             : 'KONT OU YO KI PARÈT SELMAN ',									
MYWAL_Viewing               : 'FÈ PARÈT BOUS YO ',		
MYWAL_Hide                  : 'KACHE ENFÒMASYON YO SOU BOUS LA ',							
MYWAL_Edit_2                : 'KORIJE BOUS LA ',		
MYWAL_Name                  : 'NON BOUS LA ',					
MYWAL_Content_1             : 'ANTANSYON ! OU PRAL EFASE BOUS OU A ',				
MYWAL_Content_2             : 'BYEN VEYE  KE W’ **KENBE KLE SEKRÈ W’ LA/PAJ JSON AK KÒD SEKRÈ A**KI ASOSYE AK BOUS LA ANVAN W’ EFASE L’ ',												
MYWAL_Content_3             : 'SI W’ VLE SÈVI AK BOUS SA  AVÈK MyEtherWallet CX NAN LÒT JOU YO, OU DWE METE L’ ANKÒ  SÈVI AK KLE SEKRÈ A /PAJ JSON AK KÒD SEKRÈ A ',							
/* View Wallet Details */            /*GADE DETAY YO KI NAN BOUS MWEN AN.*/										
VIEWWALLET_Subtitle         : 'SA PÈMÈT OU POU W’ PRAN PLIZYÈ VÈZSYON KLE SEKRÈ  YO EPI AK SÒTI BOUS OU A ANKÒ SOU PAPYE. OU DWE FÈ L’ POU [ PRAN KONT OU A NAN GETH/MIST] (http://ethereum.stackexchange.com/questions/465/how-to-import-a-plain-private-key-into-geth/). SI W’ VLE  WÈ VALÈ KÒB OU A, NOU MANDE W’ POU SÈVI AK YON EKSPLORATÈ POU BLOCKCHAIN TANKOU[etherscan.io](http://etherscan.io/).',   						
VIEWWALLET_Subtitle_Short   : 'SA PÈMÈT OU POU W’ PRAN PLIZYÈ VÈZSYON KLE SEKRÈ  YO EPI POU SÒTI BOUS OU A ANKÒ SOU PAPYE ',									
VIEWWALLET_SuccessMsg       : 'SIKSÈ ! MEN DETAY YO POU BOUS OU A ',

						
/* Mnemonic */              /* FRAZ LÈT KACHE*/							
MNEM_1                      : 'CHWAZI ADRÈS OU VLE PALE A ',							
MNEM_2                      : 'SÈL FRAZ LÈT KACHE HD W’ YO KAPAB ANTRE NAN KÈK ADRÈS BOUS OU YO. CHWAZI ADRÈS OU VLE PALE A KOUNYE A ',														
MNEM_more                   : 'LÒT ADRÈS ',								
MNEM_prev                   : 'ADRÈS ANVAN YO ',	
		

/* Hardware wallets */      /*MATERYÈL BOUS YO*/

ADD_Ledger_1                : 'KONEKTE ACHIV OU A ',												
ADD_Ledger_2                : 'OUVRI APLIKASYON ETHEREUM ( OSWA YON APLIKASYON KONTRA) ',								
ADD_Ledger_2                : 'OUVRI APLIKASYON ETHEREUM  LAN ( OSWA YON APLIKASYON KONTRA) ',									
ADD_Ledger_3                : 'VERIFYE KE OPSYON BROWSER SUPPORT LA AKTIVE NAN SETTINGS ',											
ADD_Ledger_scan             : 'KONEKTE NAN ACHIV LA ',											
ADD_Ledger_4                : 'SI OPSYON BROWSER SUPPORT PA NAN SETTINGS NAN VERIFYE KE W’ GENYEN l [Firmware >1.2](https://www.ledgerwallet.com/apps/manager) ',					
ADD_Ledger_0a               : 'OUVRI MYETHERWALLET ANKÒ NAN YON KONEKSYON KI GEN SEKIRITE (SSL) ',										
ADD_Ledger_0b               : 'OUVRI MYETHERWALLET ANKÒ AK [Chrome](https://www.google.com/chrome/browser/desktop/) OSWA [Opera](https://www.opera.com/) ',								
x_Trezor                    : 'TREZÒ ',							
ADD_Trezor_scan             : 'KONEKTE NAN TREZÒ A ',						
ADD_Trezor_select           : 'SA SE YON _SEMANS_ TREZÒ ', 										


/* Chrome Extension */  /* CHROME EKSTANSYON */						
CX_error_1                  : 'OU PA GEN BOUS KI ANREJISTRE. PEZE SOU[‘’METE YON BOUS’’] (/cx-wallet.html#add-wallet) POU METE YOUN !.	',					
CX_quicksend                : 'VOYE RAPID ; // SI JAN L’ TRADWI A PA NAN GOU W’ JIS SÈVI AK ”SEND” ',												

/* Misc *//* Node Switcher */                 /*PLIZYÈ*/ /* NE YOUN AL NAN LÒT*/

NODE_Title                  : 'ENSTALE NE SEKRÈ W’ LA ',															
NODE_Title                  : 'ENSTALE NE SEKRÈ W’ LA ',													
NODE_Subtitle               : 'POU W’ KAPAB KONENTE AK YON NE LOKAL ',									
NODE_Warning                : 'NE W’ LA DWE AN HTTPS POU W’ KONEKTE AVÈK MYETHERWALLET.COM. OU KAPAB [PRAN REPO MYWALLET LA EPI OUVRI  L’ LOKALMAN ](https://github.com/kvhnuke/etherwallet/releases/latest) POU W’ KONEKTE A KÈK LÒT NE , OSWA POU W’ GENYEN SÈTIFIKA SSL GRATIS AVÈK[LetsEncrypt](https://letsencrypt.org/).',						
NODE_Name                   : 'NON NE A ',										
NODE_Port                   : 'PÒ NE A ',									
NODE_CTA                    : 'ANREJISTRE EPI SÈVI AK YON NE SEKRÈ ',	
					


/* Contracts */                           /*KONTRA YO*/								
CONTRACT_Title              : 'ADRÈS KONTRA A ',					
CONTRACT_Title_2            : 'CHWAZI YON KONTRA KI LA DEJA ',									
CONTRACT_Json               : 'RELASYON ABI/ JSON ',
										
CONTRACT_Interact_Title     : 'LI/EKRI KONTRA ',								 	
CONTRACT_Interact_CTA       : 'CHWAZI YON FONKSYON ',											
CONTRACT_ByteCode           : 'Bytecode ',				
CONTRACT_Read               : 'LI ',								
CONTRACT_Write              : 'EKRI ',
											
DEP_generate                : 'KREYE SEKANS KÒD LA ',	
	
DEP_generated               : 'SEKANS KÒD KREYE ',

DEP_signtx                  : 'SIYEN TRANSFÈ A ',

DEP_interface               : 'RELASYON KREYE ',


/* Swap / Exchange */                /*CHANJE*/							
SWAP_rates                  : 'VALÈ LI YE KOUNYE A” ',			
SWAP_init_1                 : 'M VLE CHANJE	',						
SWAP_init_2                 : 'M’ VLE CHANJE X ETH POU X BTC ',
SWAP_init_CTA               : 'ANN KONTINYE',											
SWAP_information            : 'ENFÒMASYON W’ YO',					
SWAP_send_amt               : 'KANTITE POU VOYE ',						
SWAP_rec_amt                : 'KANTITE POU RESEVWA ', 						
SWAP_your_rate              : 'VALÈ LI YE ',													
SWAP_rec_add                : 'ADRÈS POU RESEVWA ',					
SWAP_start_CTA              : 'KÒMANSE CHANJE ',					
SWAP_ref_num                : 'NIMEWO POU YO JWENN OU ',																					
SWAP_time                   : 'TAN KI RETE POU VOYE L ',												
SWAP_progress_1             : 'LÒD PASE ',							
SWAP_progress_2             : '// Waiting for your BTC... //N’AP TANN BTC W’ YO ',										
SWAP_progress_3             : ', // ETH Received! ETH RESEVWA ! ',			
SWAP_progress_4             : 'VOYE {{REZILTA LÒD. KREYASYON.MONNEN}} YO ',							
SWAP_progress_5             : 'LÒD AKONPLI ',						
SWAP_order_CTA              : 'TANPRI VOYE 1 ETH ',		
SWAP_unlock                 : 'OUVRI BOUS OU A POU W’ VOYE ETH YO OSWA TOKENS YO SÒTI DIRÈKTEMAN NAN SA ',		


/* Error Messages */       /*MESAJ PA BON	*/								
ERROR_0                     : 'ANTRE YON KANTITE KI VALAB ',																	
ERROR_1                     : 'KÒD SEKRÈ W’ LA DWE GEN POU PI PITI 9 KARAKTÈ. BYEN VEYE KE SE YON GWO KÒD SEKRÈ ',						
ERROR_2                     : 'DEZOLE ! SÈVIS NOU AN PA PÈMÈT NOU JERE  JAN DE PAJ BOUS SA ',										
ERROR_3                     : 'SA SE PA YON PAJ BOUS ',  																				
ERROR_4                     : 'VALÈ SA PA LA, TANPRI SÈVI AK YOUN NANN LÒT VALÈ SA YO	 ',										
ERROR_5                     : 'ANTRE YON BON ADRÈS ',												
ERROR_6                     : 'ANTRE YON BON KÒD SEKRÈ ',										
ERROR_7                     : 'TANPRI ANTRE YON VALÈ KI BON  (Must be integer. Try 0-18.) ', // 7 (LI DWE ANTYE. Try 0-18.) ', // 7																
ERROR_8                     : 'TANPRI ANTRE YON BON LIMIT GAZ . (Must be integer. Try 21000-4000000.) ', // 8  (LI DWE ANTYE. Try 21000-4000000.) ', // 8    														
ERROR_9                     : 'TANPRI ANTRE YON VALÈ DONE YO KI VALAB. (Must be hex.) ', //9 (LI DWE hex.) ', //9								
ERROR_10                    : 'TANPRI ANTRE YON VALÈ GAZ KI VALAB(Must be integer. Try 20 GWEI / 20000000000 WEI.) (LI DWE ANTYE. Try 20 GWEI / 20000000000 WEI.) ',																				
ERROR_11                    : '(Must be integer.) ', // 11 TANPRI ANTRE YON NONCE VALAB. . (Must be integer.) ', // 11  	. (LI DWE ANTYE.) ', // 11 ', 				
ERROR_12                    : 'SIYATI TRANSFÈ A PA VALAB ',				
ERROR_13                    : 'NON BOUS SA LA DEJA ',																					
ERROR_14                    : 'BOUS SA PA LA ',											
ERROR_15                    : 'TA SANBLE POKO GEN OKENN PWOPOZISYON  KI LA DEJA AVÈK MOUN SA OSWA GEN YON ERÈ PANDAN KONSILTASYON PWOPOZISYON AN ',										
ERROR_16                    : 'GEN YON BOUS KI GEN ADRÈ SA DEJA. TANPRI AL GADE  LIS PAJ BOUS OU A ',											
ERROR_17                    : 'IFONDS LA YO PA SIFI. KONT KOTE W’AP ESEYE VOYE TRANSFÈ A PA GEN ASE PWOVISYON. FÒK OU TA GENYEN POU PI PITI 0,01 ETHER SOU KONT OU A POU W’ KA KOUVRI KÒB GAZ YO. METE ETHER YO EPI ESEYE ANKÒ ',										
ERROR_18                    : 'TOUT GAZ LA TE SÈVI PANDAN TRANSFÈ A. SA VLE DI  KE W’ TE DEJA VOTE POU PWOPOZISYON SA DEJA OSWA KE MOMAN DEBA A FINI ',												
ERROR_19                    : 'TANPRI ANTRE YON SENBÒL KI VALAB ',  															
ERROR_20                    : 'SE PA YON TOKEN ERC-20 VALAB.  SI Y’AP PRAN  LÒT TOKEN YO, RETIRE SA EPI ESEYE ANKÒ ',					
ERROR_21                    : 'LI PA POSIB POU N’ KONN KONBYEN GAZ LA YE. PA GEN ASE PWOVISYON SOU KONT SA, OSWA ADRÈS KONTRA KOTE Y ‘AP RESEVWA L’ LA TE VOYE TOUNEN YON ERÈ. OU KAPAB METE GAZ LA OU MENM EPI KÒMANSE ANKÒ. MESAJ  ERÈ  A PANDAN W’AP VOYE L’ LA KAPAB GEN ANPIL ENFÒMASYON ',							
ERROR_22                    : 'TANPRI ANTRE YON NON NE KI VALAB ',															
ERROR_23                    : 'TANPRI ANTRE YON URL KI VALAB ; SI W’ AN HTTPS URL OUA DWE AN HTTPS ',								
ERROR_24                    : 'TANPRI ANTRE YON PÒ KI VALAB ',											
ERROR_25                    : 'TANPRI ANTRE YON ID DE CHÈNN VALAB ',								
ERROR_26                    : 'TANPRI ANTRE YON ABI KI VALAB ',																	
ERROR_27                    : 'KANTITE PI PITI : 0.01. KANTITE PI GWO ',														
ERROR_28                    : '**OU BEZWEN PAJ KEYSTORE W’ LA EPI KÒD SEKRÈ A ** ( OSWA KLE SEKRÈ W’ LA) POU KAPAB ANTRE NAN BOUS SA NAN LÒT JOU YO. TANPRI PRAN L’EPI  POU W’ SERE L’ YON KOTE DEYÒ ! PA GEN OKENN LÒT MWAYEN POU W’ JWENN ANKÒ YON BOUS SI W’ PA ANREJISTRE L’. TANPRI LI PAJ SA [PAJ POU EDE](https://www.myetherwallet.com/#help) POU DETAY YO ',																	
ERROR_29                    : 'TANPRI ANTRE YON BON NON AK  KÒD SEKRÈ L’ ',									
ERROR_30                    : 'TANPRI ANTRE YON BON NON ENS ',													
ERROR_31                    : 'FRAZ SEKRÈ A PA VALAB ',								
ERROR_32                    : 'LI ENPOSIB POU W’ KONEKTE AK NE A. RAFRECHI PAJ LA, OSWA ESEYE YON LÒT NE (upper right corner), GADE NAN PARAMÈT FIREWALL OU YO. SI W’ AN MÒD NE, GADE NAN PARAMÈT YO // 32 ',																				
ERROR_33                    : 'BOUS W’AP ESEYE OUVRI A LI PA GEN MENNM ADRÈS AK MET LI;33 ',																	
ERROR_34                    : 'NON W’AP TANTE POU W’ KA WÈ A PA GEN MENM ADRÈS AK NON OU TE ANTRE A // 34 ',     


SUCCESS_1                   : 'ADRÈS LA VALAB ',

SUCCESS_2                   : 'BOUS DEKÒDE AVÈK SIKSÈ ',

SUCCESS_3                   : 'TX ALE NAN BLOCKCHAIN NAN. PEZE BOUTON AN POU W’ KA WÈ TRANSFÈ W’ LA & VERIFYE SI SE POU OU AK SI LI PA MANKE GAZ OSWA KÈK ERÈ NAN KONTRA EKZEKISYON L’YO ',																
SUCCESS_4                   : 'BOUS LA METE AVÈK SIKSÈ ',										
SUCCESS_5                   : 'PAJ CHWAZI ',							
SUCCESS_6                   : 'OU BYEN KONEKTE ', 	 				
SUCCESS_7                   : 'SIYATI MESAJ LA VERIFYE ',


WARN_Send_Link              : 'OU RIVE LA GRAS AK YON LYEN KI PLEN ADRÈS LA, KANTITE A, GAZ LA OSWA ESPAS DONE  W’ YO. OU KAPAB KORIJE TOUT ENFÒMASYON YO  ANVAN W’ VOYE YO . OUVRI BOUS OU A POU W ‘ KÒMANSE ',

/* Geth Error Messages */       /* GETH MESAJ ERÈ YO*/						
GETH_InvalidSender          : 'MOUN K’AP VOYE L’ PA BON ',					
GETH_Nonce                  : 'NONCE TWÒ BA ',												
GETH_Cheap                  : 'PRI GAZ LA TWO BA POU L’ AKSEPTE ',									
GETH_Balance                : 'KANTITE A PA SIFI ',								
GETH_NonExistentAccount     : 'KONT SA PA EGZISTE OSWA KANTITE KI NAN KONT LA TWÒ BA ',													
GETH_InsufficientFunds      : 'KÒB SA YO PA SIFI POU GAZ *PRI+VALÈ ',								
GETH_IntrinsicGas           : 'VALÈ GAZ LA TWO BA ',						
GETH_GasLimit               : 'LIMIT GAZ LA DEPASE ',						
GETH_NegativeValue          : 'VALÈ A PA BON ',

/* Parity Error Messages */        /* ERÈ MESAJ SANBLE YO*/						
PARITY_AlreadyImported      : 'GEN YON TRANSFÈ KI GEN MENM HASH SA KI SÒTI LA DEJA ',											
PARITY_Old                  : 'NONCE TRANSFÈ A TWÒ BA. ESEYE METE SOU NONCE LAN ANKÒ	 ',										
PARITY_TooCheapToReplace    : 'FRÈ TRANSFÈ YO TWÒ BA. GEN YON LÒT TRANSFÈ KI GEN MENM NONCE LA K’AP TANN. ESEYE METE SOU FRÈ A OSWA METE SOU NONCE LAN ',															
PARITY_LimitReached         : 'GEN TWÒP TRANSFÈ K’AP TANN. TRANSFÈ W’ LA PA FÈT POU REZON SA. ESYE METE SOU FRÈ A ',															
PARITY_InsufficientGasPrice : 'FRÈ TRANSFÈ YO TWÒ BA. YO PA SATISFÈ MENM POU PITI NE A (MINIMUM :{},REÇU :{}). ESEYE METE SOU FRÈ YO ',				
PARITY_InsufficientBalance  : 'IFONDS YO PA SIFI. KONT KOTE W’AP ESEYE VOYE  TANSFÈ A PA GEN ASE KÒB. YO MANDE A: {} , REÇU : {} ',													
PARITY_GasLimitExceeded     : 'KÒB TRANSFÈ A DEPASE LIMIT GAZ  KOUNYE A. LIMIT :{}. ESEYE RETIRE NAN GAZ OU JWENN NAN	 ',									

PARITY_InvalidGasLimit      : "Supplied gas is beyond limit.",

/* Tranlsation Info */
translate_version           : '0.5 ',
Translator_Desc             : 'Kreyol yo ',
TranslatorName_1            : 'JJ ',
TranslatorAddr_1            : '0x152e77CC3Dd8d86471ebEa8e93B9924A41e7055a',
/* Translator 1             : Insert Comments Here */
TranslatorName_2            : ' ',
TranslatorAddr_2            : ' ',
/* Translator 2             : Insert Comments Here */
TranslatorName_3            : ' ',
TranslatorAddr_3            : ' ',
/* Translator 3             : Insert Comments Here */
TranslatorName_4            : ' ',
TranslatorAddr_4            : ' ',
/* Translator 4             : Insert Comments Here */
TranslatorName_5            : ' ',
TranslatorAddr_5            : ' ',
/* Translator 5             : Insert Comments Here */

/* Help - Nothing after this point has to be translated. If you feel like being extra helpful, go for it. */
HELP_Warning                : 'If you created a wallet -or- downloaded the repo before **Dec. 31st, 2015**, please check your wallets &amp; download a new version of the repo. Click for details. ',
HELP_Desc                   : 'Do you see something missing? Have another question? [Get in touch with us](mailto:support@myetherwallet.com), and we will not only answer your question, we will update this page to be more useful to people in the future! ',
HELP_Remind_Title           : 'Some reminders ',
HELP_Remind_Desc_1          : '**Ethereum, MyEtherWallet.com & MyEtherWallet CX, and some of the underlying Javascript libraries we use are under active development.** While we have thoroughly tested & tens of thousands of wallets have been successfully created by people all over the globe, there is always the remote possibility that something unexpected happens that causes your ETH to be lost. Please do not invest more than you are willing to lose, and please be careful. If something were to happen, we are sorry, but **we are not responsible for the lost Ether**. ',
HELP_Remind_Desc_2          : 'MyEtherWallet.com & MyEtherWallet CX are not "web wallets". You do not create an account or give us your Ether to hold onto. All data never leaves your computer/your browser. We make it easy for you to create, save, and access your information and interact with the blockchain. ',
HELP_Remind_Desc_3          : 'If you do not save your private key & password, there is no way to recover access to your wallet or the funds it holds.  Back them up in multiple physical locations &ndash; not just on your computer! ',

HELP_0_Title                : '0) I\'m new. What do I do? ',
HELP_0_Desc_1               : 'MyEtherWallet gives you the ability to generate new wallets so you can store your Ether yourself, not on an exchange. This process happens entirely on your computer, not our servers. Therefore, when you generate a new wallet, **you are responsible for safely backing it up**. ',
HELP_0_Desc_2               : 'Create a new wallet. ',
HELP_0_Desc_3               : 'Back the wallet up. ',
HELP_0_Desc_4               : 'Verify you have access to this new wallet and have correctly saved all necessary information. ',
HELP_0_Desc_5               : 'Transfer Ether to this new wallet. ',

HELP_1_Title                : '1) How do I create a new wallet? ',
HELP_1_Desc_1               : 'Go to the "Generate Wallet" page. ',
HELP_1_Desc_2               : 'Go to the "Add Wallet" page & select "Generate New Wallet" ',
HELP_1_Desc_3               : 'Enter a strong password. If you think you may forget it, save it somewhere safe. You will need this password to send transactions. ',
HELP_1_Desc_4               : 'Click "GENERATE". ',
HELP_1_Desc_5               : 'Your wallet has now been generated. ',

HELP_2a_Desc_1              : 'You should always back up your wallet externally and in multiple physical locations - like on a USB drive and/or a piece of paper. ',
HELP_2a_Desc_2              : 'Save the address. You can keep it to yourself or share it with others. That way, others can transfer ether to you. ',
HELP_2a_Desc_3              : 'Save versions of the private key. Do not share it with anyone else. Your private key is necessary when you want to access your Ether to send it! There are 3 types of private keys ',
HELP_2a_Desc_4              : 'Place your address, versions of the private key, and the PDF version of your paper wallet in a folder. Save this on your computer and a USB drive. ',
HELP_2a_Desc_5              : 'Print the wallet if you have a printer. Otherwise, write down your private key and address on a piece of paper. Store this as a secure location, separate from your computer and the USB drive. ',
HELP_2a_Desc_6              : 'Keep in mind, you must prevent loss of the keys and password due to loss or failure of you hard drive failure, or USB drive, or piece of paper. You also must keep in mind physical loss / damage of an entire area (think fire or flood). ',

HELP_2b_Title               : '2b) How do I safely / offline / cold storage with MyEtherWallet? ',
HELP_2b_Desc_1              : 'Go to [https://github.com/kvhnuke/etherwallet/releases/latest](https://github.com/kvhnuke/etherwallet/releases/latest). ',
HELP_2b_Desc_2              : 'Click on `dist-vX.X.X.X.zip`. ',
HELP_2b_Desc_3              : 'Move zip to an airgapped computer. ',
HELP_2b_Desc_4              : 'Unzip it and double-click `index.html`. ',
HELP_2b_Desc_5              : 'Generate a wallet with a strong password. ',
HELP_2b_Desc_6              : 'Save the address. Save versions of the private key. Save the password if you might not remember it forever. ',
HELP_2b_Desc_7              : 'Store these papers / USBs in multiple physically separate locations. ',
HELP_2b_Desc_8              : 'Go to the "View Wallet Info" page and type in your private key / password to ensure they are correct and access your wallet. Check that the address you wrote down is the same. ',

HELP_3_Title                : '3) How do I verify I have access to my new wallet? ',
HELP_3_Desc_1               : '**Before you send any Ether to your new wallet**, you should ensure you have access to it. ',
HELP_3_Desc_2               : 'Navigate to the "View Wallet Info" page. ',
HELP_3_Desc_3               : 'Navigate to the MyEtherWallet.com "View Wallet Info" page. ',
HELP_3_Desc_4               : 'Select your wallet file -or- your private key and unlock your wallet. ',
HELP_3_Desc_5               : 'If the wallet is encrypted, a text box will automatically appear. Enter the password. ',
HELP_3_Desc_6               : 'Click the "Unlock Wallet" button. ',
HELP_3_Desc_7               : 'Your wallet information should show up. Find your account address, next to a colorful, circular icon. This icon visually represents your address. Be certain that the address is the address you have saved to your text document and is on your paper wallet. ',
HELP_3_Desc_8               : 'If you are planning on holding a large amount of ether, we recommend that send a small amount of ether from new wallet before depositing a large amount. Send 0.001 ether to your new wallet, access that wallet, send that 0.001 ether to another address, and ensure everything works smoothly. ',

HELP_4_Title                : '4) How do I send Ether from one wallet to another? ',
HELP_4_Desc_1               : 'If you plan to move a large amount of ether, you should test sending a small amount to your wallet first to ensure everything goes as planned. ',
HELP_4_Desc_2               : 'Navigate to the "Send Ether & Tokens" page. ',
HELP_4_Desc_3               : 'Select your wallet file -or- your private key and unlock your wallet. ',
HELP_4_Desc_4               : 'If the wallet is encrypted, a text box will automatically appear. Enter the password. ',
HELP_4_Desc_5               : 'Click the "Unlock Wallet" button. ',
HELP_4_Desc_6               : 'Enter the address you would like to send to in the "To Address:" field. ',
HELP_4_Desc_7               : 'Enter the amount you would like to send. You can also click the "Send Entire Balance" link if you would like the transfer the entire balance. ',
HELP_4_Desc_9               : 'Click "Generate Transaction". ',
HELP_4_Desc_10              : 'A couple more fields will appear. This is your browser generating the transaction. ',
HELP_4_Desc_11              : 'Click the blue "Send Transaction" button below that. ',
HELP_4_Desc_12              : 'A pop-up will appear. Verify that the amount and the address you are sending to are correct. Then click "Yes, I am sure! Make transaction." button. ',
HELP_4_Desc_13              : 'The transaction will be submitted. The TX Hash will display. You can click that TX Hash to see it on the blockchain. ',

HELP_4CX_Title              : '4) How do I send Ether using MyEtherWallet CX? ',
HELP_4CX_Desc_1             : 'First, you need to add a wallet. Once you have done that, you have 2 options: the "QuickSend" functionality from the Chrome Extension icon or the "Send Ether & Tokens" page. ',
HELP_4CX_Desc_2             : 'QuickSend ',
HELP_4CX_Desc_3             : 'Click the Chrome Extension Icon. ',
HELP_4CX_Desc_4             : 'Click the "QuickSend" button. ',
HELP_4CX_Desc_5             : 'Select the wallet you wish to send from. ',
HELP_4CX_Desc_6             : 'Enter the address you would like to send to in the "To Address:" field. ',
HELP_4CX_Desc_7             : 'Enter the amount you would like to send. You can also click the "Send Entire Balance" link if you would like the transfer the entire balance. ',
HELP_4CX_Desc_8             : 'Click "Send Transaction". ',
HELP_4CX_Desc_9             : 'Verify the address and the amount you are sending is correct. ',
HELP_4CX_Desc_10            : 'Enter the password for that wallet. ',
HELP_4CX_Desc_11            : 'Click "Send Transaction." ',
HELP_4CX_Desc_12            : 'Using "Send Ether & Tokens" Page ',

HELP_5_Title                : '5) How do I run MyEtherWallet.com offline/locally? ',
HELP_5_Desc_1               : 'You can run MyEtherWallet.com on your computer instead of from the GitHub servers. You can generate a wallet completely offline and send transactions from the "Offline Transaction" page. ',
HELP_5_Desc_7               : 'MyEtherWallet.com is now running entirely on your computer. ',
HELP_5_Desc_8               : 'In case you are not familiar, you need to keep the entire folder in order to run the website, not just `index.html`. Don\'t touch or move anything around in the folder. If you are storing a backup of the MyEtherWallet repo for the future, we recommend just storing the ZIP so you can be sure the folder contents stay intact. ',
HELP_5_Desc_9               : 'As we are constantly updating MyEtherWallet.com, we recommend you periodically update your saved version of the repo. ',

HELP_5CX_Title              : '5) How can I install this extension from the repo instead of the Chrome Store? ',
HELP_5CX_Desc_2             : 'Click on `chrome-extension-vX.X.X.X.zip` and unzip it. ',
HELP_5CX_Desc_3             : 'Go to Google Chrome and find you settings (in the menu in the upper right). ',
HELP_5CX_Desc_4             : 'Click "Extensions" on the left. ',
HELP_5CX_Desc_5             : 'Check the "Developer Mode" button at the top of that page. ',
HELP_5CX_Desc_6             : 'Click the "Load unpacked extension..." button. ',
HELP_5CX_Desc_7             : 'Navigate to the now-unzipped folder that you downloaded earlier. Click "select". ',
HELP_5CX_Desc_8             : 'The extension should now show up in your extensions and in your Chrome Extension bar. ',

HELP_7_Title                : '7) How do I send tokens & add custom tokens? ',
HELP_7_Desc_0               : '[Ethplorer.io](https://ethplorer.io/) is a great way to explore tokens and find the decimals of a token. ',
HELP_7_Desc_1               : 'Navigate to the "Send Ether & Tokens" page. ',
HELP_7_Desc_2               : 'Unlock your wallet. ',
HELP_7_Desc_3               : 'Enter the address you would like to send to in the "To Address:" field. ',
HELP_7_Desc_4               : 'Enter the amount you would like to send. ',
HELP_7_Desc_5               : 'Select which token you would like to send. ',
HELP_7_Desc_6               : 'If you do not see the token listed ',
HELP_7_Desc_7               : 'Click "Custom". ',
HELP_7_Desc_8               : 'Enter the address, name, and decimals of the token. These are provided by the developers of the token and are also needed when you "Add a Watch Token" to Mist. ',
HELP_7_Desc_9               : 'Click "Save". ',
HELP_7_Desc_10              : 'You can now send that token as well as see it\'s balance in the sidebar. ',
HELP_7_Desc_11              : 'Click "Generate Transaction". ',
HELP_7_Desc_12              : 'A couple more fields will appear. This is your browser generating the transaction. ',
HELP_7_Desc_13              : 'Click the blue "Send Transaction" button below that. ',
HELP_7_Desc_14              : 'A pop-up will appear. Verify that the amount and the address you are sending to are correct. Then click "Yes, I am sure! Make transaction." button. ',
HELP_7_Desc_15              : 'The transaction will be submitted. The TX Hash will display. You can click that TX Hash to see it on the blockchain. ',

HELP_8_Title                : '8) What happens if your site goes down? ',
HELP_8_Desc_1               : 'MyEtherWallet is not a web wallet. You don\'t have a login and nothing ever gets saved to our servers. It is simply an interface that allows you interact with the blockchain. ',
HELP_8_Desc_2               : 'If MyEtherWallet.com goes down, you would have to find another way (like geth or Ethereum Wallet / Mist) to do what we are doing. But you wouldn\'t have to "get" your Ether out of MyEtherWallet because it\'s not in MyEtherWallet. It\'s in whatever wallet your generated via our site. ',
HELP_8_Desc_3               : 'You can import your unencrypted private key and your Geth/Mist Format (encrypted) files directly into geth / Ethereum Wallet / Mist very easily now. See question #12 below. ',
HELP_8_Desc_4               : 'In addition, the likelihood of us taking MyEtherWallet down is slim to none. It costs us almost nothing to maintain as we aren\'t storing any information. If we do take the domain down, it still is, and always will be, publicly available at [https://github.com/kvhnuke/etherwallet](https://github.com/kvhnuke/etherwallet/tree/gh-pages). You can download the ZIP there and run it locally. ',

HELP_8CX_Title              : '8) What happens if MyEtherWallet CX disappears? ',
HELP_8CX_Desc_1             : 'First, all data is saved on your computer, not our servers. I know it can be confusing, but when you look at the Chrome Extension, you are NOT looking at stuff saved on our servers somewhere - it\'s all saved on your own computer. ',
HELP_8CX_Desc_2             : 'That said, it is **very important** that you back up all your information for any new wallets generated with MyEtherWallet CX. That way if anything happens to MyEtherWallet CX or your computer, you still have all the information necessary to access your Ether. See the #2a for how to back up your wallets. ',
HELP_8CX_Desc_3             : 'If for some reason MyEtherWallet CX disappears from the Chrome Store, you can find the source on Github and load it manually. See #5 above. ',

HELP_9_Title                : '9) Is the "Send Ether & Tokens" page offline? ',
HELP_9_Desc_1               : 'No. It needs the internet in order to get the current gas price, nonce of your account, and broadcast the transaction (aka "send"). However, it only sends the signed transaction. Your private key safely stays with you. We also now provide an "Offline Transaction" page so that you can ensure your private keys are on an offline/airgapped computer at all times. ',

HELP_10_Title               : '10) How do I make an offline transaction? ',
HELP_10_Desc_1              : 'Navigate to the "Offline Transaction" page via your online computer. ',
HELP_10_Desc_2              : 'Enter the "From Address". Please note, this is the address you are sending FROM, not TO. This generates the nonce and gas price. ',
HELP_10_Desc_3              : 'Move to your offline computer. Enter the "TO ADDRESS" and the "AMOUNT" you wish to send. ',
HELP_10_Desc_4              : 'Enter the "GAS PRICE" as it was displayed to you on your online computer in step #1. ',
HELP_10_Desc_5              : 'Enter the "NONCE" as it was displayed to you on your online computer in step #1. ',
HELP_10_Desc_6              : 'The "GAS LIMIT" has a default value of 21000. This will cover a standard transaction. If you are sending to a contract or are including additional data with your transaction, you will need to increase the gas limit. Any excess gas will be returned to you. ',
HELP_10_Desc_7              : 'If you wish, enter some data. If you enter data, you will need to include more than the 21000 default gas limit. All data is in HEX format. ',
HELP_10_Desc_8              : 'Select your wallet file -or- your private key and unlock your wallet. ',
HELP_10_Desc_9              : 'Press the "GENERATE SIGNED TRANSACTION" button. ',
HELP_10_Desc_10             : 'The data field below this button will populate with your signed transaction. Copy this and move it back to your online computer. ',
HELP_10_Desc_11             : 'On your online computer, paste the signed transaction into the text field in step #3 and click send. This will broadcast your transaction. ',

HELP_12_Title               : '12) How do I import a wallet created with MyEtherWallet into geth / Ethereum Wallet / Mist? ',
HELP_12_Desc_1              : 'Using an Geth/Mist JSON file from MyEtherWallet v2+.... ',
HELP_12_Desc_2              : 'Go to the "View Wallet Info" page. ',
HELP_12_Desc_3              : 'Unlock your wallet using your **encrypted** private key or JSON file. ',
HELP_12_Desc_4              : 'Go to the "My Wallets" page. ',
HELP_12_Desc_5              : 'Select the wallet you want to import into Mist, click the "View" icon, enter your password, and access your wallet. ',
HELP_12_Desc_6              : 'Find the "Download JSON file - Geth/Mist Format (encrypted)" section. Press the "Download" button below that. You now have your keystore file. ',
HELP_12_Desc_7              : 'Open the Ethereum Wallet application. ',
HELP_12_Desc_8              : 'In the menu bar, go "Accounts" -> "Backup" -> "Accounts" ',
HELP_12_Desc_9              : 'This will open your keystore folder. Copy the file you just downloaded (`UTC--2016-04-14......../`) into that keystore folder. ',
HELP_12_Desc_10             : 'Your account should show up immediately under "Accounts." ',
HELP_12_Desc_11             : 'Using your unencrypted private key... ',
HELP_12_Desc_12             : 'If you do not already have your unencrypted private key, navigate to the "View Wallet Details" page. ',
HELP_12_Desc_13             : 'Select your wallet file -or- enter/paste your private key to unlock your wallet. ',
HELP_12_Desc_14             : 'Copy Your Private Key (unencrypted). ',
HELP_12_Desc_15             : 'If you are on a Mac ',
HELP_12_Desc_15b            : 'If you are on a PC ',
HELP_12_Desc_16             : 'Open Text Edit and paste this private key. ',
HELP_12_Desc_17             : 'Go to the menu bar and click "Format" -> "Make Plain Text". ',
HELP_12_Desc_18             : 'Save this file to your `desktop/` as `nothing_special_delete_me.txt`. Make sure it says "UTF-8" and "If no extension is provided use .txt" in the save dialog. ',
HELP_12_Desc_19             : 'Open terminal and run the following command: `geth account import ~/Desktop/nothing_special_delete_me.txt` ',
HELP_12_Desc_20             : 'This will prompt you to make a new password. This is the password you will use in geth / Ethereum Wallet / Mist whenever you send a transaction, so don\'t forget it. ',
HELP_12_Desc_21             : 'After successful import, delete `nothing_special_delete_me.txt` ',
HELP_12_Desc_22             : 'The next time you open the Ethereum Wallet application, your account will be listed under "Accounts". ',
HELP_12_Desc_23             : 'Open Notepad & paste the private key ',
HELP_12_Desc_24             : 'Save the file as `nothing_special_delete_me.txt` at `C:` ',
HELP_12_Desc_25             : 'Run the command, `geth account import C:\\nothing_special_delete_me.txt` ',
HELP_12_Desc_26             : 'This will prompt you to make a new password. This is the password you will use in geth / Ethereum Wallet / Mist whenever you send a transaction, so don\'t forget it. ',
HELP_12_Desc_27             : 'After successful import, delete `nothing_special_delete_me.txt` ',
HELP_12_Desc_28             : 'The next time you open the Ethereum Wallet application, your account will be listed under "Accounts". ',

HELP_13_Title               : '13) What does "Insufficient funds. Account you try to send transaction from does not have enough funds. Required XXXXXXXXXXXXXXXXXXX and got: XXXXXXXXXXXXXXXX." Mean? ',
HELP_13_Desc_1              : 'This means you do not have enough Ether in your account to cover the cost of gas. Each transaction (including token and contract transactions) require gas and that gas is paid in Ether. The number displayed is the amount required to cover the cost of the transaction in Wei. Take that number, divide by `1000000000000000000`, and subtract the amount of Ether you were trying to send (if you were attempting to send Ether). This will give you the amount of Ether you need to send to that account to make the transaction. ',

HELP_14_Title               : '14) Some sites randomize (seed) the private key generation via mouse movements. MyEtherWallet.com doesn\'t do this. Is the random number generation for MyEtherWallet safe? ',
HELP_14_Desc_1              : 'While the mouse moving thing is clever and we understand why people like it, the reality is window.crypto ensures more entropy than your mouse movements. The mouse movements aren\'t unsafe, it\'s just that we (and tons of other crypto experiments) believe in window.crypto. In addition, MyEtherWallet.com can be used on touch devices. Here\'s a [conversation between an angry redditor and Vitalik Buterin regarding mouse movements v. window.crypto](https://www.reddit.com/r/ethereum/comments/2bilqg/note_there_is_a_paranoid_highsecurity_way_to/cj5sgrm) and here is the [the window.crypto w3 spec](https://dvcs.w3.org/hg/webcrypto-api/raw-file/tip/spec/Overview.html#dfn-GlobalCrypto). ',

HELP_15_Title               : '15) Why hasn\'t the account I just created show up in the blockchain explorer? (ie: etherchain, etherscan) ',
HELP_15_Desc_1              : 'Accounts will only show up in a blockchain explorer once the account has activity on it&mdash;for example, once you have transferred some Ether to it. ',

HELP_16_Title               : '16) How do I check the balance of my account? ',
HELP_16_Desc_1              : 'You can use a blockchain explorer like [etherscan.io](http://etherscan.io/). Paste your address into the search bar and it will pull up your address and transaction history. For example, here\'s what our [donation account](http://etherscan.io/address/0x7cb57b5a97eabe94205c07890be4c1ad31e486a8) looks like on etherscan.io ',

HELP_17_Title               : '17) Why isn\'t my balance showing up when I unlock my wallet? ',
HELP_17_Desc_1              : ' This is most likely due to the fact that you are behind a firewall. The API that we use to get the balance and convert said balance is often blocked by firewalls for whatever reason. You will still be able to send transactions, you just need to use a different method to see said balance, like etherscan.io ',

HELP_18_Title               : '18) Where is my geth wallet file? ',

HELP_19_Title               : '19) Where is my Mist wallet file? ',
HELP_19_Desc_1              : 'Mist files are typically found in the file locations above, but it\'s much easier to open Mist, select "Accounts" in the top bar, select "Backup", and select "Accounts". This will open the folder where your files are stored. ',

HELP_20_Title               : '20) Where is my pre-sale wallet file? ',
HELP_20_Desc_1              : 'Wherever you saved it. ;) It also was emailed to you, so check there. Look for the file called `"ethereum_wallet_backup.json"` and select that file. This wallet file will be encrypted with a password that you created during the purchase of the pre-sale. ',

HELP_21_Title               : '21) Couldn\'t everybody put in random private keys, look for a balance, and send to their own address? ',
HELP_21_Desc_1              : 'Short version: yes, but finding an account with a balance would take longer than the universe...so...no. ',
HELP_21_Desc_2              : 'Long ELI5 Version: So Ethereum is based on [Public Key Cryptography](https://en.wikipedia.org/wiki/Public-key_cryptography), specifically [Elliptic curve cryptography](https://eprint.iacr.org/2013/734.pdf) which is very widely used, not just in Ethereum. Most servers are protected via ECC. Bitcoin uses the same, as well as SSH and TLS and a lot of other stuff. The Ethereum keys specifically are 256-bit keys, which are stronger than 128-bit and 192-bit, which are also widely used and still considered secure by experts. ',
HELP_21_Desc_3              : 'In this you have a private key and a public key. The private key can derive the public key, but the public key cannot be turned back into the private key. The fact that the internet and the world’s secrets are using this cryptography means that if there is a way to go from public key to private key, your lost ether is the least of everyone’s problems. ',
HELP_21_Desc_4              : 'Now, that said, YES if someone else has your private key then they can indeed send ether from your account. Just like if someone has your password to your email, they can read and send your email, or the password to your bank account, they could make transfers. You could download the Keystore version of your private key which is the private key that is encrypted with a password. This is like having a password that is also protected by another password. ',
HELP_21_Desc_5              : 'And YES, in theory you could just type in a string of 64 hexadecimal characters until you got one that matched. In fact, smart people could write a program to very quickly check random private keys. This is known as "brute-forcing" or "mining" private keys. People have thought about this long and hard. With a few very high end servers, they may be able to check 1M+ keys / second. However, even checking that many per second would not yield access to make the cost of running those servers even close to worthwhile - it is more likely you, and your great-grandchildren, will die before getting a match. ',
HELP_21_Desc_6              : 'If you know anything about Bitcoin, [this will put it in perspective:](http://bitcoin.stackexchange.com/questions/32331/two-people-with-same-public-address-how-will-people-network-know-how-to-deliver) *To illustrate how unlikely this is: suppose every satoshi of every bitcoin ever to be generated was sent to its own unique private keys. The probability that among those keys there could be two that would correspond to the same address is roughly one in 100 quintillion. ',
HELP_21_Desc_7              : '[If you want something a bit more technical:](http://security.stackexchange.com/questions/25375/why-not-use-larger-cipher-keys/25392#25392) *These numbers have nothing to do with the technology of the devices; they are the maximums that thermodynamics will allow. And they strongly imply that brute-force attacks against 256-bit keys will be infeasible until computers are built from something other than matter and occupy something other than space. ',
HELP_21_Desc_8              : 'Of course, this all assumes that keys are generated in a truly random way & with sufficient entropy. The keys generated here meet that criteria, as do Jaxx and Mist/geth. The Ethereum wallets are all pretty good. Keys generated by brainwallets do not, as a person\'s brain is not capable of creating a truly random seed. There have been a number of other issues regarding lack of entropy or seeds not being generated in a truly random way in Bitcoin-land, but that\'s a separate issue that can wait for another day. ',

HELP_SecCX_Title            : 'Security - MyEtherWallet CX ',
HELP_SecCX_Desc_1           : 'Where is this extension saving my information? ',
HELP_SecCX_Desc_2           : 'The information you store in this Chrome Extension is saved via [chrome.storage](http://chrome.storage/). - this is the same place your passwords are saved when you save your password in Chrome. ',
HELP_SecCX_Desc_3           : 'What information is saved? ',
HELP_SecCX_Desc_4           : 'The address, nickname, private key is stored in chrome.storage. The private key is encrypted using the password you set when you added the wallet. The nickname and wallet address is not encrypted. ',
HELP_SecCX_Desc_5           : 'Why aren\'t the nickname and wallet address encrypted? ',
HELP_SecCX_Desc_6           : 'If we were to encrypt these items, you would need to enter a password each time you wanted to view your account balance or view the nicknames. If this concerns you, we recommend you use MyEtherWallet.com instead of this Chrome Extension. ',

HELP_Sec_Title              : 'Security ',
HELP_Sec_Desc_1             : 'If one of your first questions is "Why should I trust these people?", that is a good thing. Hopefully the following will help ease your fears. ',
HELP_Sec_Desc_2             : 'We\'ve been up and running since August 2015. If you search for ["myetherwallet" on reddit](https://www.reddit.com/search?q=myetherwallet), you can see numerous people who use us with great success. ',
HELP_Sec_Desc_3             : 'We aren\'t going to take your money or steal your private key(s). There is no malicious code on this site. In fact the "GENERATE WALLET" pages are completely client-side. That means that all the code is executed on ** your computer** and it is never saved and transmitted anywhere. ',
HELP_Sec_Desc_4             : 'Check the URL -- This site is being served through GitHub and you can see the source code here: [https://github.com/kvhnuke/etherwallet/tree/gh-pages](https://github.com/kvhnuke/etherwallet/tree/gh-pages) to [https://www.myetherwallet.com](https://www.myetherwallet.com). ',
HELP_Sec_Desc_5             : 'For generating wallets, you can download the [source code and run it locally](https://github.com/kvhnuke/etherwallet/releases/latest). See #5 above. ',
HELP_Sec_Desc_6             : 'Generate a test wallet and check and see what network activity is happening. The easiest way for you to do this is to right click on the page and click "inspect element". Go to the "Network" tab. Generate a test wallet. You will see there is no network activity. You may see something happening that looks like data:image/gif and data:image/png. Those are the QR codes being generated...on your computer...by your computer. No bytes were transferred. ',
HELP_Sec_Desc_8             : 'If you do not feel comfortable using this tool, then by all means, do not use it. We created this tool as a helpful way for people to generate wallets and make transactions without needing to dive into command line or run a full node. Again, feel free to reach out if you have concerns and we will respond as quickly as possible. Thanks! ',

HELP_FAQ_Title              : 'More Helpful Answers to Frequent Questions ',
HELP_Contact_Title          : 'Ways to Get in Touch '
};

module.exports = ht;

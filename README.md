## XRPL NFT GATEWAY 
>> Step 1
To use this code you must have nodejs install .
>> Step 2
Cd to the project directory and run below code
>>> npm install

### TO START THIS PROJECT::
copy your xaman api key and secret key and fill the topmost field of mint.js and transfernft.js with them in this format...
const Sdk = new XummSdk('someAppKey', 'someAppSecret')

### To MINT NFT??
Cd to the project directories, locate mint.js file and 
go to the extreme end of the mint.js file, 
then ensure that mintToken function invocation is not commented.

Then open your IDE terminal and run npm mint.js
>>Result on the console
Copy the subscription link shown in below format and open it with browser
{
  Subscription: 'https://xumm.app/sign/3d1c4d21-8646-4a5d-b1a4-42a747095015'
}
Then verify with your xaman wallet account through scanning.

### TO GET THE NUMBER OF NFT YOU HAVE WITH THE XAMAN WALLET??
cd to mint.js again
go to the extreme end of the mint.js file, 
then ensure that getToken function invocation is not commented and comment mintToken invocation
Then open your IDE terminal and run npm mint.js
>>Result on the console
Copy the subscription link shown in below format and open it with browser
{
  Subscription: 'https://xumm.app/sign/3d1c4d21-8646-4a5d-b1a4-42a747095015'
}
Then verify with your xaman wallet account through scanning.

### TO CREATE NFT SELL OFFER 
open transfernft.js file
go to the extreme end of the mint.js file, 
then ensure that createSellOffer function invocation is not commented and comment acceptSellOffer
Then open your IDE terminal and run npm transfernft.js
Then open your IDE terminal and run npm mint.js
>>Result on the console
Copy the subscription link shown in below format and open it with browser
{
  Subscription: 'https://xumm.app/sign/3d1c4d21-8646-4a5d-b1a4-42a747095015'
}
Then verify with your xaman wallet account through scanning.

### TO ACCEPT NFT SELL OFFER 
open transfernft.js file
go to the extreme end of the mint.js file, 
then ensure that acceptSellOffer function invocation is not commented and comment  createSellOffer
Then open your IDE terminal and run npm transfernft.js
Then open your IDE terminal and run npm mint.js
>>Result on the console
Copy the subscription link shown in below format and open it with browser
{
  Subscription: 'https://xumm.app/sign/3d1c4d21-8646-4a5d-b1a4-42a747095015'
}
Then verify with your xaman wallet account through scanning.

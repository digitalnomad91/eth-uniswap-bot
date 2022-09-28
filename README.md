<p align="center"><a href="https://codebuilder.us/cryptocurrency" target="_blank"><img src="https://codebuilder.us/images/2fsddf-removebg-preview.png"></a></p>

# Ethereum Uniswap Bot
Ethereum bot that watches the blockchain txpool in realtime for uniswap smart contract addLiquidityETH() tx's and then intiates a swapExactETHforToken() when a tx with the right paramaters is found.

# Install & Run Instructions
- You must have access to an ethereum node with websocket access enabled.
- npm install

watch_tx_bot.js:
- This script connects to your geth node and watches the TXPOOL in realtime to search for transactions going to the uniswap router address (0x7a250d5630b4cf539739df2c5dacb4c659f2488d) and with a binary input value that starts with 0xf305d719 (inidcating a addLiquidityETH() smart contract). It then decodes the binary input data using the data in abi.json and looks at the paramater values for the addLiquidityETH() function call. If the token (or is it the to address? -- deeprocks) value matches the one we're looking for, then the bot will initiate an asynchronous call to the send_tx_swapExactETHForTokens.js script. 

send_tx_swapExactETHForTokens.js:
- This script is called automatically by the watch_tx_bot.js script when the right transaction is found. It will create a new smart contract binary value using the swapExactETHForTokens() function and then pass that binary input value into a new transaction going to the uniswap router address (0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D). Values for the smart contract and for the new uniswap router tx will be provided by values passed in by the watch_tx_bot.js script.

send_test_tx.js:
- This script is for testing the bot by sending out a transaction for it to "find". It is suggested that you run your geth node on the rinkeby testnet chain so that you don't lose any real eth funds. Make sure you're watch_tx_bot.js is running and listening for transactions with the proper paramaters, then run this script and watch as the bot catches it as soon as it's posted to the testnet TXPOOL. 


# See it in action 
(the final tx fails due to no balance in my wallet at the time)
<a href="https://asciinema.org/a/oe9pzjqcgRPAfXfO9y3nMUzo3" target="_blank"><img src="https://asciinema.org/a/oe9pzjqcgRPAfXfO9y3nMUzo3.svg" /></a>

//var add = 'wss://nginx:b4RXaM3dAkyTehC7@subtlefu.ge/mynode'
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { spawn } = require('child_process');
const abiDecoder = require('abi-decoder'); // NodeJS
var flags = require('flags');
var abi = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
var net = require('net');

var add = 'ws://127.0.0.1:8546';

flags.defineString('token_address', '', 'To token address to search for in decoded transaction input.');
flags.defineString('wallet_address', '', 'To token address to search for in decoded transaction input.');
flags.defineString('gas', '', 'To token address to search for in decoded transaction input.');
flags.defineString('value', '', 'To token address to search for in decoded transaction input.');

flags.parse();

if(flags.get('token_address') == '') {
	console.log("Error, you must pass in a token to address value (node watch_tx_bot.js --token_address=<token address>");
	process.exit(0);
}
if(flags.get('wallet_address') == '') {
	console.log("Error, you must pass in a wallet address value (node watch_tx_bot.js --wallet_address=<wallet_address>");
	process.exit(0);
}
if(flags.get('gas') == '') {
	console.log("Error, you must pass in a gas value (node watch_tx_bot.js --gas=<gas>");
	process.exit(0);
}
if(flags.get('value') == '') {
	console.log("Error, you must pass in a value (node watch_tx_bot.js --value=<value>");
	process.exit(0);
}

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.WebsocketProvider(add));
const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
if (err) console.error(err);
});

console.log("\nLooking for TX sent to 0x7a250d5630b4cf539739df2c5dacb4c659f2488d with addLiquidityETH() function in input. \n");
var num = 0; var found = 0; var status = null;


subscription.on('data', (txHash) => {
	setTimeout(async () => {
	try {
		let tx = await web3.eth.getTransaction(txHash);
		if (tx) {

		    num = num + 1;
		    tx.txHash = txHash;
			if(tx.input.substring(0,10) == "0xf305d719" && tx.to.toLowerCase() == "0x7a250d5630b4cf539739df2c5dacb4c659f2488d".toLowerCase()) {
				found = found + 1;
				status = "Decoding TX Input...";
				abiDecoder.addABI(abi);
				const decodedData = abiDecoder.decodeMethod(tx.input);
				var to_token =  decodedData.params[0].value;

				if(to_token.toLowerCase() == flags.get('token_address').toLowerCase()) {
					console.log("\n===============FOUND TX======================");
					console.log('TX hash: ',tx.txHash ); // transaction hash
					console.log('TX confirmation: ',tx.transactionIndex ); // "null" when transaction is pending
					console.log('TX nonce: ',tx.nonce ); // number of transactions made by the sender prior to this one
					console.log('TX block hash: ',tx.blockHash ); // hash of the block where this transaction was in. "null" when transaction is pending
					console.log('TX block number: ',tx.blockNumber ); // number of the block where this transaction was in. "null" when transaction is pending
					console.log('TX sender address: ',tx.from ); // address of the sender
					console.log('TX amount(in Ether): ',web3.utils.fromWei(tx.value, 'ether')); // value transferred in ether
					console.log('TX date: ',new Date()); // transaction date
					console.log('TX gas price: ',tx.gasPrice ); // gas price provided by the sender in wei
					console.log('TX gas: ',tx.gas ); // gas provided by the sender.
					console.log('TX input: ',tx.input ); // the data sent along with the transaction.
					console.log('Decoded Input:', decodedData);
					console.log('=====================================\n\n') // a visual separator

					status = "Initiating new TX....";
					initiateNewTx(tx);
				}

			}
		}
		} catch (err) {
			console.error(err);
		}
	})
});

setInterval(function() { printProgress(num, found); }, 1000);

function printProgress(progress){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    if(status == null)
    	process.stdout.write("Processed "+progress + ' transactions. Found '+found+' matching tx so far.');
    else 
    	process.stdout.write("Processed "+progress + ' transactions. Found '+found+' matching tx so far. \n\nPending Job: '+status);
}		


async function decodeInput(tx) {
	//const { stdout, stderr } = await exec('ethereum_input_data_decoder --abi abi.json '+tx.input);

	/* Decode input binary data & get token (to) address */
	abiDecoder.addABI(abi);
	const decodedData = abiDecoder.decodeMethod(tx.input);
	return decodedData;
}


async function initiateNewTx(tx) {
  	//const { stdout, stderr } = await exec('node testbuy.js');
  	//console.log('New Transaction Output:', stdout);
  	//console.log('stderr:', stderr);

	var client = new net.Socket();
	client.connect(1691, 'localhost', function() {
		console.log('Connected');

		var data = {
			walletAddr: flags.get('wallet_address'),
			tokenAddr:  flags.get('token_address'),
			gas: 	flags.get('gas'),
			gasPrice: 	tx.gasPrice,
			value: 		flags.get('value'),
		};

		client.write(JSON.stringify(data));

		var child = spawn('ls');

		child.stdout.on('data', function(chunk) {
		   console.log(chunk);
		});
	});

  	/*
	const ls = spawn('./send_tx_swapExactETHForTokens.js');

	ls.stdout.on('data', (data) => {
	  console.log("\n\n===============Transasction Purchase======================");
	  console.log(`${data}`);
	  console.log('=====================================\n') // a visual separator
	  status = null;
	});

	ls.stderr.on('data', (data) => {
	  console.log("===============Transasction Purchase (Error) ======================");
	  console.error(`${data}`);
	  console.log('=====================================\n') // a visual separator
	  status = null;
	});

	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	  status = null;
	});*/
}
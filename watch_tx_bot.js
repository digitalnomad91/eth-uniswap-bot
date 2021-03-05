//var add = 'wss://nginx:b4RXaM3dAkyTehC7@subtlefu.ge/mynode'
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { spawn } = require('child_process');

var add = 'ws://127.0.0.1:8546'

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
				decodeInput(tx);
			}
			
			/*console.log('TX hash: ',txHash ); // transaction hash
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
			console.log(tx);
			console.log('=====================================') // a visual separator*/
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
	const { stdout, stderr } = await exec('ethereum_input_data_decoder --abi abi.json '+tx.input);
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
	console.log('Decoded Input:', stdout);
	console.log('=====================================\n\n') // a visual separator
	status = "Initiating new TX....";
	initiateNewTx(tx);
}


async function initiateNewTx(tx) {
  	//const { stdout, stderr } = await exec('node testbuy.js');
  	//console.log('New Transaction Output:', stdout);
  	//console.log('stderr:', stderr);
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
	});
}
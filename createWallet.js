const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const WAValidator = require('multicoin-address-validator');

// Utilize a rede testnet para fins de teste
const network = bitcoin.networks.testnet;

// Derivação de carteira HD - Carteira determinística
const path = `m/49'/1'/0'/0`;

// Criando um mnemonico (aquela sequência de palavras para a seed)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);

// Criando uma conta com chave privada e chave pública
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// Gerando endereço Bitcoin a partir da chave pública
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address;

console.log("Carteira Gerada");
console.log("Carteira Endereço:", btcAddress);
console.log("Chave Privada:", node.toWIF());
console.log("Seed mnemonico gerado:", mnemonic);

// Validação do endereço
const isValid = WAValidator.validate(btcAddress, 'bitcoin', 'testnet');
console.log("Endereço válido?", isValid);

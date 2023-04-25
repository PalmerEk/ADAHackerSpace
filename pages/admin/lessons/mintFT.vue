<script setup>
	const { Address, value, BigNum, MetadataMap, Metadata} = useCardano();

	//import { Buffer } from "buffer";
//	const { Policy } = Transaction;

		// Define the metadata for the token
	const metadata = new MetadataMap();
	metadata.insert(
			7364, // Name
			new Metadata.CharlieValue("XP")
		);
		metadata.insert(
			7365, // Symbol
			new Metadata.CharlieValue("XP")
		);
		metadata.insert(
			7366, // Description
			new CSL.Metadata.CharlieValue("Experience Points")
		);

		// Define the policy for the token
		const policy = Policy.fromMonetaryPolicy(
			new BigNum(1000000), // Total supply
			0 // Decimal places
		);

		// Create the token
		const token = new CSL.Token(
			Address.from_bytes(new Uint8Array(32)), // No issuer for this token
			policy,
			metadata
		);

		// Mint the total supply of tokens
		const privateKey = Bip32PrivateKey.from_bytes(Crypto.random_private_key());
		const mintTxBuilder = new CSL.TransactionBuilder.MintTransactionBuilder(
			new CSL.Address.SingleAddress(privateKey.to_public().to_raw_key().hash()),
			token,
			new BigNum(1000000) // Amount to mint
		);
		const mintTx = mintTxBuilder.build();
		console.log(mintTx.to_bytes());
	});
*/
</script>

<template>
	<div>
		<h1>Should be here</h1>
		<pre>{{ Cardano }}</pre>
		<!-- <FormKit type="form" :value="mintData" submit-label="Mint" @submit="mint">
			<h2 class="text-3xl font-bold mb-12">Test Minting a FT from browser?</h2>

			<FormKit label="Token Name" name="tokenName" type="text" help="Enter the name of your new token" validation="required|length:2,8"> </FormKit>
		</FormKit> -->
	</div>
</template>

<script setup>
	// TODO: Remove need for helios wallet
	import { Cip30Wallet, WalletHelper } from "@hyperionbt/helios";
	import { Value, Tx, Program, ByteArrayData, hexToBytes, ConstrData, Assets, Address, TxOutput, NetworkParams } from "@hyperionbt/helios";

	const optimize = false; // TODO: set based on process.env.NODE_ENV
	const wallet = useWallet();

	definePageMeta({
		middleware: "auth-admin",
	});

	const lesson = ref(undefined);

	const lessonJSON = computed(() => {
		try {
			return JSON.parse(lesson.value);
		} catch (e) {
			return null;
		}
	});

	const mint = async () => {
		const address = "addr_test1qqrvgh0nn8ygcuc4u2ar5mhq0xh3tlwpahasnkjk885fe2mqvt7dxydvf9k33mjl2fvj3fanz9gqrrkwaxzn6cx20p7sqmw4hd";
		const handle = await window.cardano.eternl.enable();
		const walletAPI = new Cip30Wallet(handle);
		// const walletHelper = new WalletHelper(walletAPI);

		const minAda = 2000000; // minimum lovelace needed to send an NFT
		const maxTxFee = 500000; // maximum estimated transaction fee
		const minChangeAmt = 1000000; // minimum lovelace needed to be sent back as change
		const minAdaVal = new Value(BigInt(minAda));
		const minUTXOVal = new Value(BigInt(minAda + maxTxFee + minChangeAmt));

		// get the necessary unspent transactions to cover the costs
		const utxos = await wallet.value.pickUtxos(minUTXOVal);
		// Get change address
		const changeAddr = await wallet.value.address;

		// Start building the transaction
		const tx = new Tx();

		// Add the UTXO as inputs
		tx.addInputs(utxos[0]);

		`minting signed

		const OWNER: PubKeyHash = PubKeyHash::new(#26372...)

		func main(_, ctx: ScriptContext) -> Bool {
    		ctx.tx.is_signed_by(OWNER)
		}`;

		const mintScript = `minting nft

	   const TX_ID: ByteArray = #${utxos[0][0].txId.hex}
	   const txId: TxId = TxId::new(TX_ID)
	   const outputId: TxOutputId = TxOutputId::new(txId, ${utxos[0][0].utxoIdx})

	   func main(ctx: ScriptContext) -> Bool {
	       tx: Tx = ctx.tx;
	       mph: MintingPolicyHash = ctx.get_current_minting_policy_hash();

	       assetclass: AssetClass = AssetClass::new(mph, "${lessonJSON.value.title}".encode_utf8());
	       value_minted: Value = tx.minted;

	       // Validator logic starts
	       (value_minted == Value::new(assetclass, 1)).trace("NFT:1 ") &&
	       tx.inputs.any((input: TxInput) -> Bool {
						(input.output_id == outputId).trace("NFT2: ")
					}
				)
	   }`;

		// Compile the helios minting script
		const mintProgram = Program.new(mintScript).compile(optimize);

		// Add the script as a witness to the transaction
		tx.attachScript(mintProgram);

		// Construct the NFT that we will want to send as an output
		const nftTokenName = ByteArrayData.fromString(lessonJSON.value.title).toHex();
		const tokens = [[hexToBytes(nftTokenName), BigInt(1)]];

		// Create an empty Redeemer because we must always send a Redeemer with
		// a plutus script transaction even if we don't actually use it.
		const mintRedeemer = new ConstrData(0, []);

		// Indicate the minting we want to include as part of this transaction
		tx.mintTokens(mintProgram.mintingPolicyHash, tokens, mintRedeemer);

		// Construct the output and include both the minimum Ada as well as the minted NFT
		tx.addOutput(new TxOutput(Address.fromBech32(address), new Value(minAdaVal.lovelace, new Assets([[mintProgram.mintingPolicyHash, tokens]]))));

		const networkParams = new NetworkParams(await fetch("https://d1t0d7c2nekuk0.cloudfront.net/preview.json").then((response) => response.json()));

		// Attached the metadata for the minting transaction
		tx.addMetadata(721, {
			map: [
				[
					mintProgram.mintingPolicyHash.hex,
					{
						map: [
							[
								lessonJSON.value.title,
								{
									map: [
										["name", lessonJSON.value.title],
										["description", lessonJSON.value.description],
										["image", lessonJSON.value.image],
										["level", lessonJSON.value.level],
										["categories", lessonJSON.value.categories.join(",")],
										["tracks", lessonJSON.value.tracks.join(",")],
										["duration", lessonJSON.value.duration],
									],
								},
							],
						],
					},
				],
			],
		});

		console.log("tx before final", tx.dump());

		// Send any change back to the buyer
		await tx.finalize(networkParams, changeAddr, utxos[1]);

		console.log("Verifying signature...");
		const signatures = await walletAPI.signTx(tx);
		tx.addSignatures(signatures);

		console.log("tx after final", tx.dump());
		console.log("Submitting transaction...");
		const txHash = await walletAPI.submitTx(tx);

		console.log("txHash", txHash.hex);
	};

	const submitLesson = async (fields) => {
		await new Promise((r) => setTimeout(r, 1000));
		alert(JSON.stringify(fields));
	};
</script>

<template>
	<h2 class="text-3xl font-bold mb-12 text-center">Test Mint</h2>

	<FormKit type="form" submit-label="Mint" @submit="mint">
		<FormKit type="textarea" v-model="lesson" class="w-full h-full"> </FormKit>
	</FormKit>
</template>

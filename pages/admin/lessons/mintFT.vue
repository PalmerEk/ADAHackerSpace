<script setup>
	// // TODO: Remove need for helios wallet
	// import { Cip30Wallet, WalletHelper } from "@hyperionbt/helios";
	// import { Value, Tx, Program, ByteArrayData, hexToBytes, ConstrData, Assets, Address, TxOutput, NetworkParams } from "@hyperionbt/helios";

	// const optimize = false; // TODO: set based on process.env.NODE_ENV
	// const wallet = useWallet();

	// const mintData = ref({
	// 	tokenName: "XP",
	// });

	// definePageMeta({
	// 	middleware: "auth-admin",
	// });

	// //const tokenName = ref(undefined);

	// const mint = async (data) => {
	// 	console.log(data);

	// 	// tx
	// 	// .mintTokens(
	// 	//     uplcProgram.mintingPolicyHash,
	// 	//     [["my_first_nft", 1n], ["my_second_nft", 1n]],
	// 	//     redeemerData // can be generated using program.evalParam("...").data
	// 	// )
	// 	// .attachScript(uplcProgram)

	// 	// console.log("minting");

	// 	// const mintScript = `minting signed

	// 	// const OWNER: PubKeyHash = PubKeyHash::new(#3e384a5787cca03174f5dc7c267e59aa58b6d2b8eb63652a415537a3)

	// 	// func main(_, ctx: ScriptContext) -> Bool {
	// 	// 		ctx.tx.is_signed_by(OWNER)
	// 	// }`;

	// 	// // Compile the helios minting script
	// 	// const mintProgram = Program.new(mintScript).compile(true);
	// 	// const lcMPH = mintProgram.mintingPolicyHash;
	// 	// console.log(lcMPH.hex);
	// };
</script>

<template>
	<div class="container mx-auto">
		<FormKit type="form" :value="mintData" submit-label="Mint" @submit="mint">
			<h2 class="text-3xl font-bold mb-12">Test Minting a FT from browser?</h2>

			<FormKit label="Token Name" name="tokenName" type="text" help="Enter the name of your new token" validation="required|length:2,8"> </FormKit>
		</FormKit>
	</div>
</template>

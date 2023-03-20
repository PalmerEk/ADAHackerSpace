# ADAHackerSpace Overview

## What is ADAHackerSpace?

Something between [buildspace](https://buildspace.so) and jupyter notebooks. A place to learn and experiment with Cardano.

## How does it work?

### Lessons

Lessons are created by the community and are comprised of markdown files. The markdown files are rendered into a web page with some additional helper components (MDC).

A lesson would be created by community members and submitted for review/approval. Once approved, the creator would be sent an NFT which is comprised of the lesson image and metadata

NOTE: image, title, description level duration come from NFT metadata
Rest of information stored in json file on ipfs?

### MVP TODO:

-   [ ] Build deploy pipeline to netlify or whatever. (no longer using API so self contined mini site)
-   [ ] Mint 1B XP Fungible Tokens
-   [ ] Add to API the ability to mint NFT to a contributor
-   [ ] Add Rewards somehow. Initially planned on adding to creator NFT but that forces it to remain the same forever. Second thought was to create a second NFT that is a "reward" NFT that would reference the creator's NFT (ie. 100XP for Lesson #assetid). which would allow admins to change rewards at any time by burning and then minting a new NFT.
-   [ ] Another issue is how to remove content. Currently we look for all assets with a given policy id (creator NFTs). If a creator wanted to remove their content they could burn it _but_ if the creator is gone and the content is no longer valid or wanted then what? A thought was to create a second NFT under a new policy that we control. we could then remove any NFT by burning it or. rewards could be included in that as well.
-   [ ] Determine how to send rewards for completion. The wallet responsible would have to have the tokens and then a simple send transaction to the user, but could that controlling wallet be a multisig wallet?
-   [ ] Determine if we need/want a DAO. XP could be used as governance tokens
-   [ ] The thought is to keep the "docket" dynamic and out of the system. This means that translations and changes can be made, but is that a good thing?
-   [ ] Need to be able to add images to IPFS for tokens. Could IPFS also be used to handle rewards or additional meta data? In order for that to work we would need things to be mutable in IPFS, need to know more about that.

### Stuff to think about

```json
{
  sections: [
    {
      "en": {
        "title": "Getting Started",
        "steps": [
          "/lessons/Solana_NFTs/en/Section_0/Lesson_1_Lets_Ship_Some_NFTs.md",
          "/lessons/Solana_NFTs/en/Section_0/Lesson_2_Whats_Different_About_Solana_NFTs.md"
        ]
      },
    },
    {
      "en": {
        "title": "Connect Web App to Solana",
        "steps": [
          "/lessons/Solana_NFTs/en/Section_1/Lesson_1_Hook_Up_Phantom_Wallet.md",
          "/lessons/Solana_NFTs/en/Section_1/Lesson_2_Build_Connect_Wallet_Button.md"
        ]
      },
    },

  ]
    "Lesson_1_Lets_Ship_Some_NFTs.md": "LEeae2ea82-cc16-4041-b7a2-0a862dc163cd",
    "Lesson_2_Whats_Different_About_Solana_NFTs.md": "LE0f8a7abb-1a70-434d-a0d2-b7452d7638e3",
    "Lesson_1_Hook_Up_Phantom_Wallet.md": "LEcba29417-f413-4051-b7c7-d89e837cdc8d",
    "Lesson_2_Build_Connect_Wallet_Button.md": "LE4992746b-05d4-41e4-9a8b-62415bc885c8",
    "Lesson_1_Get_Solana_Running.md": "LEb8701835-158d-4598-a2f2-98012e6bd648",
    "Lesson_2_Setup_NFT_Assets.md": "LEf8f528dc-79d5-401b-9409-96206b9b2d19",
    "Lesson_3_Depoy_NFTs_To_Devnet.md": "LE6560a067-18fa-4510-af54-9a041599776a",
    "Lesson_4_Create_Your_Candy_Machine.md": "LEa393d91c-3094-4670-8c08-0bf073f2a213",
    "Lesson_1_Call_Candy_Machine_From_App.md": "LE360bb858-dce3-4a84-82d8-839c59a5a083",
    "Lesson_2_Create_Mint_NFT_Button.md": "LEaeaed522-8656-4f2e-a3f1-6ad23be8cf6a",
    "Lesson_3_Build_Loading_States.md": "LEd1c4ae6f-221f-478c-85b8-00737ae8b799",
    "Lesson_1_Drop_Timer_And_Sold_Out_State.md": "LE7229484e-bbf9-42fb-ab59-598bb1d33a0f",
    "Lesson_2_Finalize_And_Celebrate.md": "LEcc49c5b8-a6af-4c0b-899f-32544c198080"
  }


	"steps": [
		{
			"source": "/lessons/test1/0.intro.md"
		},
		{
			"source": "/lessons/test1/1.install.md"
		},
		{
			"source": "/lessons/test1/2.step2.md"
		},
		{
			"source": "/lessons/test1/3.step3.md"
		},
		{
			"source": "/lessons/test1/4.step4.md"
		}
	]
}
```

"theperfectnft_001": {
"name": "The Perfect NFT 001",
"image": "ipfs://QmcTCBUARZUtn7Nstvw1vF85bmvKVwTuLK9rsQTVnaucUE",
"renderer": {
"main": "renderer",
"arguments": [
1,
3,
[
[
"addr_test1qqzdl92zkvjpy95ggya0ddwke22c28x68t06s26dmf7e5vglaeslj4",
"r7yyt83ktudh92uxs4qu08x8klfx4psnz8ka7qg85knz"
],
[
"addr_test1qqzdl92zkvjpy95ggya0ddwke22c28x68t06s26dmf7e5vglaeslj4",
"r7yyt83ktudh92uxs4qu08x8klfx4psnz8ka7qg85knz"
]
]
]
},
"mediaType": "image/png",
"properties": {
"round": "003",
"number": "001",
"number_binary": "1",
"owner_history": [
{
"round": "001",
"address": [
"addr_test1qqzdl92zkvjpy95ggya0ddwke22c28x68t06s26dmf7e5vglaeslj4",
"r7yyt83ktudh92uxs4qu08x8klfx4psnz8ka7qg85knz"
],
"fingerprint_type": "ulnar loop"
},
{
"round": "002",
"address": [
"addr_test1qqzdl92zkvjpy95ggya0ddwke22c28x68t06s26dmf7e5vglaeslj4",
"r7yyt83ktudh92uxs4qu08x8klfx4psnz8ka7qg85knz"
],
"fingerprint_type": "ulnar loop"
}
],
"grid_dimension": "1x1",
"number_of_voids": 0,
"number_of_spaces": 1,
"number_of_fingerprints": 2,
"maximum_number_of_spaces": 1,
"number_of_unfilled_spaces": 0
},
"description": "The Perfect NFT 001 (1)"
},

### Ideas

maybe add an optional "soundtrack/playlist" to the manifest which would rendor a simple audio player ie. http://fast.citrus3.com:8532/stream

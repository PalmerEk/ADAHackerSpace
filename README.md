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

-   [ ] Mint 1B XP Fungible Tokens
-   [ ] Add to API the ability to mint NFT to a contributor
-   [ ] Add Rewards somehow. Initially planned on adding to creator NFT but that forces it to remain the same forever. Second thought was to create a second NFT that is a "reward" NFT that would reference the creator's NFT (ie. 100XP for Lesson #assetid). which would allow admins to change rewards at any time by burning and then minting a new NFT.
-   [ ] Another issue is how to remove content. Currently we look for all assets with a given policy id (creator NFTs). If a creator wanted to remove their content they could burn it _but_ if the creator is gone and the content is no longer valid or wanted then what? A thought was to create a second NFT under a new policy that we control. we could then remove any NFT by burning it or. rewards could be included in that as well.
-   [ ] Determine how to send rewards for completion. The wallet responsible would have to have the tokens and then a simple send transaction to the user, but could that controlling wallet be a multisig wallet?
-   [ ] Determine if we need/want a DAO. XP could be used as governance tokens
-   [ ] The thought is to keep the "docket" dynamic and out of the system. This means that translations and changes can be made, but is that a good thing?
-   [ ] Need to be able to add images to IPFS for tokens. Could IPFS also be used to handle rewards or additional meta data? In order for that to work we would need things to be mutable in IPFS, need to know more about that.
-   [ ] Add front matter templates for OpenGraph and Twitter Cards (see: https://gohugo.io/templates/internal/)

### step submissions?

"submissionType": "tx",
"condition": [verifyTxExists, ????],
conditionOperator: "and"

:submission{type="tx" condition="[verifyTxExists]" conditionOperator="and"}

Component would be a simple form with a text box and a submit button. The text box would be used to enter the transaction id. The submit button would then call the API to verify the transaction exists and then update the user's progress somehow. (unlock next lesson, add xp, etc.)

Submissions would be optional. if not provided then next lesson would be unlocked automatically.

## perhaps it should be in the front matter?

proof:
type: tx
condition: [exists]

---

### Stuff to think about

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

## Footnotes

Footnotes aren't part of the core Markdown spec, but they supported by GFM.

::tab{:tabs='["Preview", "Code"]'}

#Preview

Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

You can also use words, to fit your writing style more closely[^note].

[^1]: My reference.
[^2]:
    Every new line should be prefixed with 2 spaces.
    This allows you to have a footnote with multiple lines.

[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.
    This footnote also has been made with a different syntax using 4 spaces for new lines.

#Code

```md
Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

You can also use words, to fit your writing style more closely[^note].

[^1]: My reference.
[^2]:
    Every new line should be prefixed with 2 spaces.
    This allows you to have a footnote with multiple lines.

[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.
    This footnote also has been made with a different syntax using 4 spaces for new lines.
```

::

---

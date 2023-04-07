---
title: Thie is the title
description: This is the description
navigation: true
aside: true
bottom: false
toc: false
---

Learn how to use @nuxt/content.

<!--more-->

Full amount of content beyond the more divider.

### Buttons (Btn)

::Btn{type="info"}
My MD Info Button
::

#### Properties

-   type: primary, secondary, success, danger, warning, info, neutral

### Alerts

::alert{type="warning" icon="mdi-alert-octagon" title="Be Careful!"}
Check out a **warning** alert with `code` and a [link](#).
::

#### Properties

-   type: primary, secondary, success, danger, warning, info, neutral
-   icon: any mdi icon (optional)
-   title: any title (optional)

### ::tab

::tab{:tabs='["Chrome", "Firefox", "Brave", "Edge", "Opera"]'}

#Chrome

1. Go to the [Chrome Web Store](https://chrome.google.com/webstore/detail/eternl-wallet/ndjgjgjgjgjgjgjgjgjgjgjgjgjgjgjg)
2. Click the "Add to Chrome" button
3. Click the "Add Extension" button

```js
const foo = "bar";
```

#Firefox

1. Go to the [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/eternl-wallet/)
2. Click the "Add to Firefox" button
3. Click the "Add" button

```js
const foo = "bar";
```

#Brave

1. Go to the [Brave Add-ons](https://chrome.google.com/webstore/detail/eternl-wallet/ndjgjgjgjgjgjgjgjgjgjgjgjgjgjgjg)
2. Click the "Add to Chrome" button
3. Click the "Add Extension" button

#Edge

1. Go to the [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/eternl-wallet/ndjgjgjgjgjgjgjgjgjgjgjgjgjgjgjg)
2. Click the "Add to Edge" button
3. Click the "Add Extension" button

#Opera

1. Go to the [Opera Add-ons](https://addons.opera.com/en/extensions/details/eternl-wallet/)
2. Click the "Add to Opera" button
3. Click the "Add Extension" button

::

# MD Examples

### ::alert

::alert{type="primary"}
Check out a **primary** alert with `code` and a [link](/).
::
::alert{type="secondary"}
Check out a **secondary** alert with `code` and a [link](/).
::
::alert{type="success"}
Check out a **success** alert with `code` and a [link](/).
::
::alert{type="danger"}
Check out a **danger** alert with `code` and a [link](/).
::
::alert{type="warning"}
Check out a **warning** alert with `code` and a [link](/).
::
::alert{type="info"}
Check out a **info** alert with `code` and a [link](/).
::
::alert{type="neutral"}
Check out a **neutral** alert with `code` and a [link](/).
::

### TODO: BlockHero

### TODO: ButtonLink

### TODO: Callout

### TODO: Card

### TODO: CardGrid

### TODO: CodeGroup

### TODO: CodeBlock

### TODO: CopyButton

### TODO: Icon

### TODO: List

### TODO: Sandbox

### TODO: Terminal

### TODO: VideoPlayer

### TODO: Cardano specific components (e.g. CardanoAddress, CardanoTransaction, CheckTransaction etc... )

```js
const foo = "bar";
```

## Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

# H1

## H2

### H3

**bold text**

_italicized text_

> blockquote

1. Order List -- First item
2. Order List -- Second item
3. Order List -- Third item

-   UnOrder List -- First item
-   UnOrder List -- Second item
-   UnOrder List -- Third item

`let x = 1`

```
// Without syntax highlighting
let foo = "bar";
```

```js
// With syntax highlighting
let foo = "bar";
```

---

## Horizontal Rule

---

[hyperlink](https://www.markdownguide.org)

![linux penguin](https://www.markdownguide.org/assets/images/tux.png)

| Syntax    | Description |
| --------- | ----------- |
| Header    | Title       |
| Paragraph | Text        |

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

~Strikethrough~

### Task List?

-   [x] Write the press release
-   [ ] Update the website
-   [ ] Contact the media

### Emoji

That is so funny! :joy:

(See also [Copying and Pasting Emoji](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))

### Highlight

I need to highlight these ===very important words===.

### Subscript

H^2O

### Superscript

X^2^

Would be great if we can pull this remotely from github and import it into the markdown file. This would be a great way to share content between projects and keep things DRY.

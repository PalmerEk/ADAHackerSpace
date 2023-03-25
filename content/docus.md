# Components

Discover every component you can use in your content.

# Wallet Properties

## `Change Address`

::tab{:tabs='["Preview", "Code"]'}

#Preview

:WalletChangeAddress

#Code

```md
:WalletChangeAddress
```

::

---

## `Balance`

::tab{:tabs='["Preview", "Code"]'}

#Preview

:WalletBalance
:WalletBalance{format}

#Code

```md
:WalletBalance
:WalletBalance{format}
```

::

---

## `Network`

::tab{:tabs='["Preview", "Code"]'}

#Preview

:WalletNetwork

#Code

```md
:WalletNetwork
```

::

---

# Blockchain Controls

## `Transaction Details`

::tab{:tabs='["Preview", "Code"]'}

#Preview

:BlockchainTx{hash="b95e7868db8ece525e8fde46780019b0c3587574fe9fae704671d0f2866e6c86"}

:BlockchainTx

#Code

```md
:BlockchainTx{hash="b95e7868db8ece525e8fde46780019b0c3587574fe9fae704671d0f2866e6c86"}

:BlockchainTx
```

::

---

## `<Alert />`

::tab{:tabs='["Preview", "Code"]'}

#Preview

::alert{type="info" style="margin-top: 0;"}
Check out an **info** alert with `code` and a [link](#).
::

::alert{type="success"}
Check out a **success** alert with `code` and a [link](#).
::

::alert{type="warning" title="Warning" icon="mdi-alert-octagon"}
Check out a **warning** alert with `code` and a [link](#).
::

::alert{type="danger" style="margin-bottom: 0;"}
Check out a **danger** alert with `code` and a [link](#).
::

#Code

```md
::alert{type="info"}
Check out an **info** alert with `code` and a [link](#).
::

::alert{type="success"}
Check out a **success** alert with `code` and a [link](#).
::

::alert{type="warning" title="Warning" icon="mdi-alert-octagon"}
Check out a **warning** alert with `code` and a [link](#).
::

::alert{type="danger"}
Check out a **danger** alert with `code` and a [link](#).
::
```

::

---

## `<Badge />`

`<Badge />` support same types as `<Alert />`.

::tab{:tabs='["Preview", "Code"]'}

#Preview

      ::badge
      v1.2
      ::

      ::badge{type="warning"}
      [Deprecated]
      ::

      ::badge{type="error"}
      Not found!
      ::

#Code

```md [Code]
::badge
[v1.2]
::

::badge{type="warning"}
[Deprecated]
::

::badge{type="error"}
Not found!
::
```

::

---

## `<ButtonLink />`

::tab{:tabs='["Preview", "Code"]'}

#Preview

::button-link{icon="IconStackBlitz" href="https://stackblitz.com/github/nuxtlabs/docus-starter" blank}
Play on StackBlitz
::

#Code

```md
::button-link{icon="IconStackBlitz" href="https://stackblitz.com/github/nuxtlabs/docus-starter" blank}
Play on StackBlitz
::
```

::

---

## `<Icon />`

Icon component gives you access to all **100,000+** icons from [icones.js.org](https://icones.js.org).

::tab{:tabs='["Preview", "Code"]'}

#Preview

:icon{name="cryptocurrency:ada" size="4em"}
:icon{name="logos:vue" size="2em"}
:icon{name="logos:nuxt-icon"}

#Code

```md
:icon{name="cryptocurrency:ada" size="4em"}
:icon{name="logos:vue"}
:icon{name="logos:nuxt-icon"}
```

::

---

## `<Callout />`

`<Callout />` support same types as `<Alert />`.

::tab{:tabs='["Preview", "Code"]'}

#Preview

::callout{title="This is a callout! Click me to open."}
This is the content of the callout.
::

::callout{title="This is a callout! Click me to open." type="warning"}
This is the content of the callout.
::

::callout{title="This is a callout! Click me to open." type="warning" icon="cryptocurrency:ada"}
This is the content of the callout.
::
#Code

```md
::callout{title="This is a callout! Click me to open."}
This is the content of the callout.
::

::callout{title="This is a callout! Click me to open." type="warning"}
This is the content of the callout.
::

::callout{title="This is a callout! Click me to open." type="warning" icon="cryptocurrency:ada"}
This is the content of the callout.
::
```

::

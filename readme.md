# Htmxxx: htmx but sexier

`htmxxx` comprises just 2 attributes for you to learn.
all this is implemented in 2 functions.
it is 941 bytes minified - that's ~14x smaller than `htmx` min/gzip'd.
a truly lean framework for interactivity that exposes just enough.

[Repository](https://github.com/fliepeltje/htmxxx) & [demo](https://demo-htmxxx.fly.dev/)

## Usage

Make your `a` or `form` elements sexy by adding the `xxx` attribute.

```html

<h1 id="target-element">I will get updated</h1>

<a href="/get-update" xxx>Click Me</a>

```

Return an element wrapped in an element with the `xxx-update` attribute set to the target of the `id` you want to replace.

```html

<div xxx-update="target-element">
    <h1 id="target-element">Sexy update</h1>
</div>

```

## Advanced Usage

You can send multiple updates in 1 response:

```html

<div xxx-update="target-1">...</div>
<div xxx-update="target-2">...</div>

```

You can send new interactive elements in a response

```html

<div xxx-update="target-1">
    <a href="/bloop" xxx>Click me</a>
</div>

```

You can delete elements with an empty update

```html

<div xxx-update="target-1"><div>

```

## Install

### copy-paste source

[View source](https://htmxxx.fly.dev/script.min.js)


### curl into a local file

```sh
curl https://htmxxx.fly.dev/script.min.js > htmxxx.js
```

### include in html file

```html
<script src="https://htmxxx.fly.dev/script.min.js"></script>
```

dont though.

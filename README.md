Ionic Ion Header Shrink
===========================

An Ion for making a header that shrinks based on the user scrolling (like Facebook's iOS app).

To use this, add a `<ion-header-bar>` and a `<ion-content>`. Add the `header-shrink` attribute to the `<ion-content>` element:

```html
<ion-header-bar class="bar-positive">
  <div class="buttons">
    <button class="button button-icon ion-navicon"></button>
  </div>
  <h1 class="title">Things</h1>
</ion-header-bar>
<ion-content header-shrink>
</ion-content>
```

It's also useful to add an empty spacer element inside the content to make sure it doesn't go up under the bar:

```html
<ion-content>
  <div style="height: 50px"></div>
</ion-content>
```

Also make sure to include the `ionic.ion.headerShrink` angular module in your app.

Note, this should also work with an `<ion-nav-bar>`.

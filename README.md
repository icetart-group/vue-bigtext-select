# vue-bigtext-select
Vue select for big text option
  
## Install

Register the component
```html
<link rel="stylesheet" href="vue-bigselect.css">
<script src="vue-bigselect.js"></script>
```

You may now use the component in your markup  
```html
<v-bigselect v-model="id" :options="lists" :id="'id'" :text="'name'"/>
```
 ## Usage
 `v-bigselect` requires the `options` prop to be an `array of objects`.
To specify which text will display it must be on `text` property and the `id` property to know which one will be returned by v-model.
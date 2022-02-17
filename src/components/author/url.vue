/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
    <a v-if="url" target="_blank" v-bind:href="this.url" class="nx-author-url nx-external-link"><span>{{ displayUrl }}</span></a>
  </template>

<script>
import { displayUrl } from '@i-is-as-i-does/jack-js/src/modules/Web'

export default {
  name: 'NxAuthorUrl',
  props: {
    url: [String, undefined]
  },
  computed: {
    displayUrl: function () {
      return displayUrl(this.url)
    }
  }
}
</script>

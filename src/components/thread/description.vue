/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
    <div v-if="description" class="nx-thread-description">
       <p v-for="(paragraph, idx) in descriptionLines" :key="idx">{{paragraph}}</p>
      </div>
  </template>

<script>
import { splitOnLineBreaks } from '@i-is-as-i-does/jack-js/src/modules/Help'
export default {
  name: 'NxThreadDescription',
  props: {
    description: {
      type: [String, undefined],
      default: ''
    }
  },
  computed: {
    descriptionLines: function () {
      return splitOnLineBreaks(this.description)
    }
  }
}
</script>

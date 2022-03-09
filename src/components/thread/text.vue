
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
      <section class="nx-text-content">
<span class="nx-content-timestamp">{{ formatTimestamp }}</span>
  <div class="nx-content-main">
     <p v-for="paragraph in mainLines" :key="paragraph">{{paragraph}}</p>
  </div>
    <div v-if="aside" class="nx-content-aside">
        <p v-for="(paragraph, idx) in asideLines" :key="idx">{{paragraph}}</p>
    </div>
</section>
  </template>

<script>
import { splitOnLineBreaks } from '@i-is-as-i-does/jack-js/src/modules/Help'
export default {
  name: 'NxThreadText',
  props: {
    timestamp: [String, undefined],
    main: [String, undefined],
    aside: [String, undefined]
  },
  computed: {
    formatTimestamp: function () {
      if (this.timestamp) {
        return new Date(this.timestamp).toISOString().split('T')[0]
      }
      return ''
    },
    mainLines: function () {
      if (this.main) {
        return splitOnLineBreaks(this.main)
      }
      return []
    },
    asideLines: function () {
      if (this.aside) {
        return splitOnLineBreaks(this.aside)
      }
      return []
    }
  }
}
</script>

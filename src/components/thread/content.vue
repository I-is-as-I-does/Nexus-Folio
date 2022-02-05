/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
    <div class="nx-thread-content">
      <nx-thread-text :timestamp="timestamp" :main="main" :aside="aside"></nx-thread-text>
     <nx-thread-media v-if="media && media.url" v-bind="media"></nx-thread-media>
    </div>
  </template>

<script>
import NxThreadMedia from './media.vue'
import NxThreadText from './text.vue'
export default {
  name: 'NxThreadContent',
  components: {
    NxThreadMedia,
    NxThreadText
  },
  props: {
    timestamp: String,
    main: String,
    aside: [String, undefined],
    media: {
      type: [Object, undefined]
    }
  }
}
</script>

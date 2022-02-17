/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
 <span v-if="title" class="nx-thread-title">{{ title }}</span>
  </template>

<script>

export default {
  name: 'NxThreadTitle',
  props: {
    title: [String, undefined]
  }
}
</script>

/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
     <span v-if="handle" class="nx-author-handle">{{ handle }}</span>
  </template>

<script>

export default {
  name: 'NxAuthorHandle',
  props: {
    handle: [String, undefined]
  }
}
</script>

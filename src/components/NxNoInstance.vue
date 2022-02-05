/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
  <div class="nx-no-instance">
    <p class="nx-no-instance-feedback">
        {{ msg }}
  </p>
  </div>
  </template>

<script>
export default {
  name: 'NxNoInstance',
  props: {
    msg: String
  }
}
</script>

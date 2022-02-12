/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
<a class="nx-app-link nx-external-link" target="_blank" :href="url" title="Nexus"><nx-app-name></nx-app-name></a>
</template>

<script>
import NxAppName from './name'
import { appUrl } from '@i-is-as-i-does/nexus-core/src/validt/NxSpecs'
export default {
  name: 'NxAppLink',
  data () {
    return {
      url: appUrl
    }
  },
  components: {
    NxAppName
  }
}
</script>

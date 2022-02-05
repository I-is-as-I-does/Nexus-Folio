/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
<div class="nx">
   <div v-if="seed" class="nx-reader">
   <nx-app-header></nx-app-header>
  <nx-instance class="nx-origin" :styleUrl="seed.styleUrl" :instance="seed.viewstore" :collapsedAuthor="-1" :index="-1" :first="seed.firstview" :parents="[]"></nx-instance>
   </div>
  <nx-no-instance v-else :msg="feedback"></nx-no-instance>
</div>

</template>
<script>
import NxAppHeader from './components/app/header.vue'
import NxInstance from './components/NxInstance.vue'
import { initAll } from '@i-is-as-i-does/nexus-core/src/load/NxInit.js'
import NxNoInstance from './components/NxNoInstance.vue'
import { logErr } from '@i-is-as-i-does/nexus-core/src/logs/NxLog'
import { extendInitData } from '@i-is-as-i-does/nexus-core/src/data/NxViews'
import { styleUrl } from './AppDefaults'
export default {
  name: 'Nexus',
  components: {
    NxAppHeader,
    NxInstance,
    NxNoInstance
  },
  data () {
    return {
      seed: null,
      feedback: ''
    }
  },
  created () {
    initAll({ appDefaultCss: styleUrl }).then(seed => {
      this.seed = extendInitData(seed)
    }).catch((err) => {
      logErr(err.message)
      this.feedback = '– /–'
    })
  }
}
</script>

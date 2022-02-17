
/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */<template>
    <div v-if="about" class="nx-author-about">
        <p v-for="(paragraph, idx) in aboutLines" :key="idx">{{paragraph}}</p>
    </div>
  </template>

<script>

import { splitOnLineBreaks } from '@i-is-as-i-does/jack-js/src/modules/Help'

export default {
  name: 'NxAuthorAbout',
  props: {
    about: [String, undefined]
  },
  computed: {
    aboutLines: function () {
      return splitOnLineBreaks(this.about)
    }
  }
}
</script>

/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
<section v-if="type && url" class="nx-media-content">

    <div v-if="caption" class="nx-media-caption">
   <p v-for="(paragraph, idx) in captionLines" :key="idx">{{paragraph}}</p>
  </div>

 <div class="nx-media-element" :class="containerClass">

      <img v-if="type === 'image'" :src="url">

       <video v-else-if="type === 'video'" controls="true">
         <source :src="url">
         </video>

<audio v-else-if="type === 'audio'" controls="true" :src="url"></audio>

 <iframe v-else-if="type !== 'page'" scrolling="no" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" :src="url"></iframe>

<a v-else target="_blank" :href="url" class="nx-external-link"><span>{{ displayMediaUrl }}</span></a>

 </div>

  </section>
</template>

<script>

import { splitOnLineBreaks } from '@i-is-as-i-does/jack-js/src/modules/Help'
import { conciseUrl } from '@i-is-as-i-does/jack-js/src/modules/Web'
// @doc: important; no error handler: media type and url MUST have already been resolved; cf. Core, NxMedia

export default {
  name: 'NxThreadMedia',
  props: {
    url: [String, undefined],
    type: [String, undefined],
    caption: [String, undefined]
  },
  computed: {
    containerClass: function () {
      if (this.type) {
        return 'nx-media-' + this.type
      }
      return ''
    },
    displayMediaUrl: function () {
      return conciseUrl(this.url)
    },
    captionLines: function () {
      return splitOnLineBreaks(this.caption)
    }
  }
}
</script>

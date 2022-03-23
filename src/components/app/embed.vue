/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
<div class="nx-embed">
    <a class="nx-embed-toggle" @click="toggleEmbed()">
        <span class="nx-embed-mark" ref='mark'>{{ closeMark }}</span>
    </a>
    <transition @enter="easeIn" @leave="easeOut">

        <div v-show="open" class="nx-embed-body">

       <div class="nx-src-toggle">
                <a class="nx-src-label nx-html-src" @click="changeSnippet('html')" :class="{'nx-src-label-active': type === 'html'}">html</a>

         <span class="nx-src-label-divider">|</span>
         <a class="nx-src-label nx-json-src" :class="{'nx-src-label-active': type === 'json'}" @click="changeSnippet('json')">src</a>
</div>
    <pre class="nx-embed-snippet" ref="snippet" @click="selectContent()">{{ snippets[type] }}</pre>

    </div>
</transition>
</div>
  </template>

<script>
import { getSnippet } from '@i-is-as-i-does/nexus-core/src/data/NxSnippet'
import { vShow, vHide } from '@i-is-as-i-does/valva/src/modules/transitions.js'
import { scriptSrc } from '../../AppDefaults'
export default {
  name: 'NxEmbed',
  props: {
    theme: String,
    src: String,
    closed: Boolean
  },
  watch: {
    closed: function (newval) {
      if (newval && this.open) {
        this.toggleEmbed()
      }
    },
    src: function (newval) {
      if (newval) {
        this.snippets.json = newval
        this.snippets.html = getSnippet(newval, this.theme, scriptSrc)
      }
    }
  },
  methods: {
    easeIn: function (e) {
      vShow(e, 'ease')
    },
    easeOut: function (e) {
      vHide(e, 'ease')
    },
    changeSnippet: function (type) {
      if (this.type !== type) {
        this.type = type
      }
    },
    selectContent: function () {
      var range
      if (document.selection) { // IE
        range = document.body.createTextRange()
        range.moveToElementText(this.$refs.snippet)
        range.select()
      } else if (window.getSelection) {
        range = document.createRange()
        range.selectNode(this.$refs.snippet)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
      }
    },
    toggleEmbed: function () {
      var mk
      if (!this.open) {
        mk = '<\xa0/>'
        this.open = true
      } else {
        mk = this.closeMark
        this.open = false
      }
      this.$refs.mark.textContent = mk
    }
  },
  data () {
    return {
      snippets: { json: this.src, html: getSnippet(this.src, this.theme, scriptSrc) },
      open: false,
      closeMark: '</>',
      type: 'html'
    }
  }
}
</script>

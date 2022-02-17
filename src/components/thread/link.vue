/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
 <a v-if="view.data.title" class="nx-thread-link" @click="relayTriggerView()">
       <nx-thread-title :title="view.data.title"></nx-thread-title>
     <transition @enter="fadeIn" @leave="fadeOut">
         <span v-if="unseen" class="nx-unseen">*</span>
        </transition>
       </a>
  </template>

<script>
import NxThreadTitle from './title.vue'
import { registerThreadVisit, isThreadContentUnseen } from '@i-is-as-i-does/nexus-core/src/storg/NxMemory'
import { vShow, vHide } from '@i-is-as-i-does/valva/src/modules/transitions.js'
export default {
  name: 'NxThreadLink',
  props: {
    view: Object
  },
  components: {
    NxThreadTitle
  },
  data () {
    return {
      unseen: this.firstUnseen()
    }
  },
  methods: {
    canprc: function () {
      if (this.view.data.content && this.view.data.content.timestamp) {
        return true
      }
      return false
    },
    firstUnseen: function () {
      if (this.canprc()) {
        return isThreadContentUnseen(this.view.src, this.view.data.content.timestamp)
      }
      return false
    },
    fadeIn: function (e) {
      vShow(e, 'fade')
    },
    fadeOut: function (e) {
      vHide(e, 'fade')
    },
    registerVisit: function () {
      registerThreadVisit(this.view.src, this.view.data.content.timestamp)
      this.unseen = false
    },
    relayTriggerView: function () {
      if (this.unseen) {
        this.registerVisit()
      }
      this.$emit('triggerView', this.view)
    }
  }
}
</script>

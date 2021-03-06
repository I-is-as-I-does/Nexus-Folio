/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
<template>
    <div class="nx-instance">

<div class="nx-nav">
  <transition @enter="easeIn" @leave="easeOut">
    <a v-if="instance.views.author.src !== current.src" @click="changeState(instance.views.author)" class="nx-collapse">[...]</a>
     </transition>
</div>

    <div class="nx-author">
<a v-if="instance.views.author.data.handle" @click="toggleAuthor()" class="nx-author-link" :class="{'nx-author-collapsed':authorCollapsed}">
<nx-author-handle :handle="instance.views.author.data.handle"></nx-author-handle>
</a>
<transition @enter="easeIn" @leave="easeOut">

  <div v-if="canCollapseAuthor()" class="nx-author-block">

<div class="nx-author-details">
     <nx-author-about v-if="instance.views.author.data.about" :about="instance.views.author.data.about"></nx-author-about>
     <nx-author-url v-if="instance.views.author.data.url" :url="instance.views.author.data.url"></nx-author-url>
  </div>
  <nx-embed :closed="!authorCollapsed" :src="instance.views.author.src" :theme="styleUrl"></nx-embed>
  </div>
 </transition>
 </div>

 <transition @enter="easeIn" @leave="easeOut" mode="out-in">

<div v-if="instance.views.author.src === current.src && instance.views.threads.length" class="nx-index">
 <ul>
    <li v-for="(view, idx) in instance.views.threads" :key="idx">
        <nx-thread-link v-if="view.data.title" :view="view" @triggerView="changeState"></nx-thread-link>
        </li>
</ul>
 </div>

<div v-else-if="instance.views.author.src !== current.src " class="nx-main">
   <nx-thread-title v-if="current.data.title" :title="current.data.title"></nx-thread-title>

   <transition @enter="easeIn" @leave="easeOut" mode="out-in">
 <div v-if="loaderPosition > -1" class="nx-loading">
 {{ loaderStates[loaderPosition] }}
  </div>

<div v-else class="nx-thread">
<transition @enter="easeIn" @leave="easeOut">
 <div v-if="nindex === -1" class="nx-thread-block">
 <nx-thread-description v-if="current.data.description" :description="current.data.description"></nx-thread-description>
    <nx-thread-content v-if="current.data.content" v-bind="current.data.content"></nx-thread-content>
    <nx-embed :closed="nindex === -1" :src="current.src" :theme="styleUrl"></nx-embed>
</div>
 </transition>

<ul class="nx-linked" v-if="current.resolved.nested && current.nested.length">
<li v-for="(ninstance, nidx) in current.nested" :key="nidx">
  <transition @enter="easeIn" @leave="easeOut">
<NxInstance v-if="nindex === -1 || nindex === nidx" :collapsedAuthor="nCollapsedAuthor" :parents="nParents.concat([current.src])" :index="nidx" :instance="ninstance" :styleUrl="styleUrl" @nestedChange="changeNested"></NxInstance>
</transition>
      </li>
</ul>

</div>
</transition>

</div>
</transition>

</div>
</template>

<script>
import NxEmbed from './app/embed.vue'
import NxAuthorHandle from './author/handle.vue'
import NxAuthorAbout from './author/about.vue'
import NxAuthorUrl from './author/url.vue'
import { vShow, vHide } from '@i-is-as-i-does/valva/src/modules/transitions.js'
import NxThreadDescription from './thread/description.vue'
import NxThreadContent from './thread/content.vue'
import NxThreadLink from './thread/link.vue'
import NxThreadTitle from './thread/title.vue'
import { resolveLinkedViews } from '@i-is-as-i-does/nexus-core/src/data/NxNest.js'
import { preResolveViewMedia } from '@i-is-as-i-does/nexus-core/src/data/NxMedia'
import { addViewToHistory, getView, listenToHistoryChange } from '@i-is-as-i-does/nexus-core/src/data/NxViews'
import { registerThreadVisit } from '@i-is-as-i-does/nexus-core/src/storg/NxMemory'

export default {
  name: 'NxInstance',
  components: {
    NxEmbed,
    NxAuthorHandle,
    NxAuthorUrl,
    NxAuthorAbout,
    NxThreadTitle,
    NxThreadLink,
    NxThreadDescription,
    NxThreadContent
  },
  data () {
    return {
      authorCollapsed: false,
      nCollapsedAuthor: -1,
      nParents: this.parents.concat([this.instance.views.author.src]),
      loaderStates: ['', '/', '–', '\\', '|'],
      loaderPosition: -1,
      nindex: -1,
      current: { src: this.instance.views.author.src }
    }
  },
  watch: {
    instance: function (ninstance) {
      if (ninstance) {
        this.resolveRequestedSrc(this.current.src, true)
      }
    }
  },
  created () {
    if (this.index === -1) {
      listenToHistoryChange(this.resolveRequestedSrc.bind(this))
    }
    if (this.first && this.instance.views.author.src !== this.first.src) {
      this.changeState(this.first, true)
      registerThreadVisit(this.first.src, this.first.data.content.timestamp)
    } else if (this.index === -1 || !this.instance.views.threads.length) {
      this.toggleAuthor()
    }
  },
  methods: {
    canCollapseAuthor: function () {
      if (!this.authorCollapsed) {
        return false
      }
      if (this.index === this.collapsedAuthor || this.collapsedAuthor === -1) {
        return true
      }
      this.authorCollapsed = false
      return false
    },
    easeIn: function (e) {
      vShow(e, 'ease')
    },
    easeOut: function (e) {
      vHide(e, 'ease')
    },
    toggleAuthor: function () {
      this.authorCollapsed = !this.authorCollapsed
      if (this.index !== -1) {
        this.$emit('nestedChange', { index: this.index, prop: 'nCollapsedAuthor' })
      }
    },
    changeNested: function (ndata) {
      if (ndata.index === -1 || ndata.index === this[ndata.prop]) {
        this[ndata.prop] = -1
      } else {
        this[ndata.prop] = ndata.index
        if (ndata.prop === 'nindex' && this.authorCollapsed) {
          this.toggleAuthor()
        }
      }
    },
    resolveRequestedSrc (src, resetCurrent = false) {
      this.changeState(getView(this.instance, src), true, resetCurrent)
    },
    changeState (view, skipBubble = false, resetCurrent = false) {
      if (resetCurrent || (view.src !== this.current.src)) {
        if (!skipBubble) {
          if (this.index === -1) {
            addViewToHistory(view.src)
          } else {
            this.$emit('nestedChange', { index: this.index, prop: 'nindex' })
          }
        }
        var authorCollapsed = false
        if (this.instance.views.author.src === view.src) {
          this.current = { src: view.src }
          this.nindex = -1
          if (this.index === -1) {
            authorCollapsed = true
          }
        } else if (view.resolved.nested === false || view.resolved.media === false) {
          this.resolveView(view, resetCurrent)
        } else {
          this.current = view
        }
        if (authorCollapsed !== this.authorCollapsed) {
          this.toggleAuthor()
        }
      }
    },
    endLoader: function () {
      this.loaderPosition = -1
    },
    startLoader: function () {
      this.loaderPosition = 0
      var wait = window.setInterval(function () {
        switch (this.loaderPosition) {
          case -1:
            clearInterval(wait)
            break
          case 4:
            this.loaderPosition = 1
            break
          default:
            this.loaderPosition++
        }
      }.bind(this), 150)
    },
    resolveView: function (view, resetCurrent = false) {
      var promises = []

      if (view.resolved.nested === false) {
        if (view.data.linked) {
          view.resolved.nested = null
          promises.push(resolveLinkedViews(view, this.nParents, resetCurrent))
        } else {
          view.resolved.nested = true
        }
      }
      if (view.resolved.media === false) {
        if (view.data.content.media && view.data.content.media.url && view.data.content.media.type !== 'page') {
          view.resolved.media = null
          promises.push(preResolveViewMedia(view))
        } else {
          view.resolved.media = true
        }
      }

      if (!promises.length) {
        this.current = view
      } else if (!resetCurrent) {
        this.startLoader()
        this.current = view
        Promise.all(promises).then(() => {
          this.endLoader()
        })
      } else {
        this.current = view
        Promise.all(promises).then(() => {
          this.current = view
        })
      }
    }
  },
  props: {
    first: [Object, undefined],
    styleUrl: String,
    collapsedAuthor: Number,
    index: Number,
    parents: Array,
    instance: Object
  }
}
</script>

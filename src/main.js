/*! Nexus | (c) 2021-22 I-is-as-I-does | AGPLv3 license */
import { createApp } from 'vue'
import Nexus from './App.vue'
import NxInstance from './components/NxInstance.vue'

const nexus = createApp(Nexus)
nexus.component('NxInstance', NxInstance)
nexus.mount('#Nexus')

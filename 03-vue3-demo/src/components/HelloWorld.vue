<template>
  <h1>{{ msg }}</h1>
  <!-- demo1 -->
  <!-- <composition></composition> -->
  <!-- demo2 -->
  <!-- <modal-button></modal-button> -->
  <!-- demo3 -->
  <Emits @click="onClick"></Emits>
</template>

<script>
import Composition from './Composition.vue'
import ModalButton from './ModalButton.vue'
import Emits from './Emits.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Composition,
    ModalButton,
    Emits
  },
  methods: {
    onClick () {
      console.log('click me!');
    }
  }
}

</script>

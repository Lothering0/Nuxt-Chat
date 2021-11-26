<template>
  <li class="mb-3">
    <template v-if="name !== 'Administrator'">
      <div
        class="triangle"
        :class="{ 'triangle-owner': owner }"
        :style="{ backgroundColor: color }"
      ></div>
      <div
        class="message rounded"
        :class="{ owner }"
        :style="{ backgroundColor: color }"
      >
        <h6 :style="{ color }">{{name}}</h6>
        <p :style="{ color }">{{text}}</p>
      </div>
    </template>
    <div class="system-message" v-else>
      <p class="text-danger">{{text}}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class MessageComp extends Vue {
  @Prop(String) readonly name!: string
  @Prop(String) readonly color!: string
  @Prop(String) readonly text!: string
  @Prop({
    default: false,
    type: Boolean
  }) readonly owner!: string
}
</script>

<style scoped>
li {
  position: relative;
  width: 100%;
  list-style: none;
}

.message {
  max-width: 60%;
  width: fit-content;
  border-top-left-radius: 0 !important;
  box-shadow: 0 0 4px 1px rgba(50, 50, 50, .2);
  margin-left: 20px;
  padding: 20px;
  word-wrap: break-word;
}

.system-message {
  width: fit-content;
  box-shadow: none;
  margin: 0 auto;
}

.owner {
  border-top-right-radius: 0 !important;
  margin-left: auto;
  margin-right: 20px;
}

.owner h6 {
  text-align: right;
}

.message h6, .message p {
  filter: invert(1);
}

.triangle {
  position: absolute;
  border-top: 20px solid transparent;
  border-left: 20px solid white;
  width: 20px;
  height: 20px;
}

.triangle-owner {
  right: 0;
  border-top: 20px solid transparent;
  border-right: 20px solid white;
  border-left: 0;
}

h6 {
  font-weight: 600;
}

p {
  margin: 0;
}
</style>

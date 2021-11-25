<template>
  <li class="mb-3">
    <div
      class="message rounded"
      :class="{ owner }"
      v-if="name !== 'Administrator'"
    >
      <h6>{{name}}</h6>
      <p>{{text}}</p>
    </div>
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
  @Prop(String) readonly text!: string
  @Prop({
    default: false,
    type: Boolean
  }) readonly owner!: string
}
</script>

<style scoped>
li {
  width: 100%;
  list-style: none;
}

.message {
  max-width: 60%;
  width: fit-content;
  box-shadow: 0 0 4px 1px rgba(50, 50, 50, .2);
  margin-left: 2px;
  padding: 20px;
  word-wrap: break-word;
}

.system-message {
  width: fit-content;
  box-shadow: none;
  margin: 0 auto;
}

.owner {
  margin-left: auto;
  margin-right: 2px;
}

.owner h6 {
  text-align: right;
}

h6 {
  font-weight: 600;
}

p {
  margin: 0;
}
</style>

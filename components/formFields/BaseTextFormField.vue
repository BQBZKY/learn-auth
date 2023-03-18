<script setup lang="ts">
  export interface Props {
    value?: string
    invalid?: boolean
    inputElType?: 'text' | 'email' | 'password'
  }

  export interface Emits {
    (event: 'update:value', value: string): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const {value} = useVModels(props, emit)

  const {
    invalid = false,
    inputElType,
  } = $(props)

  let inputElRef = $ref<HTMLInputElement>()

  defineExpose($$({
    inputElRef,
  }))
</script>

<template>
  <div class="BaseTextFormField">

    <label><slot name="label"></slot></label>

    <span v-if="invalid" class="text-red-600">invalid</span>

    <input
      v-model="value"
      v-bind:type="inputElType ?? 'text'"
      ref="inputElRef"
    />

    <div class="rightSlot">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .BaseTextFormField {
    // width: 100%;
    height: 56px;
    padding: 0 8px;

    display: grid;
    grid-template:
      ' label .     .        '
      ' input input rightSlot' /
        auto  1fr   auto
    ;
    gap: 0 8px;
    align-items: center;

    border-radius: 6px;
    background: theme('colors.zinc.100');
    font-size: 12px;

    &:focus-within {
      outline: 2px solid black;
      border-radius: 4px;
      background: white;
    }

    label {
      grid-area: label;
      color: theme('colors.zinc.400');
      font-weight: bold;
    }

    input {
      grid-area: input;

      background: transparent;
      color: black;
      font-size: 20px;
      font-family: theme('fontFamily.mono');

      &:focus {
        outline: none;
      }
    }

    .rightSlot {
      grid-area: rightSlot;
    }
  }
</style>

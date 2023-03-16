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

  const slots = useSlots()
</script>

<template>
  <div class="BaseTextFormField">

    <label v-if="slots.label">
      <slot name="label"></slot>
      <span v-if="invalid" class="text-red-600">invalid</span>
    </label>

    <input
      v-model="value"
      v-bind:type="inputElType ?? 'text'"
    />
  </div>
</template>

<style scoped lang="scss">
  .BaseTextFormField {
    // width: 100%;
    height: 56px;
    padding: 6px 8px;

    display: grid;
    align-items: center;

    border-radius: 6px;
    background: theme('colors.zinc.100');

    &:focus-within {
      outline: 2px solid black;
      border-radius: 4px;
      background: white;
    }

    label {
      display: flex;
      gap: 0 1ch;
      color: theme('colors.zinc.400');
      font-size: 12px;
      font-weight: bold;
    }

    input {
      background: transparent;
      color: black;
      font-size: 20px;
      font-family: theme('fontFamily.mono');

      &:focus {
        outline: none;
      }
    }
  }
</style>

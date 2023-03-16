<script setup lang="ts">
  import zod from 'zod'

  import BaseTextFormField, {
    type Props as BaseTextFormFieldProps,
    type Emits as BaseTextFormFieldEmits,
  } from './BaseTextFormField.vue'

  interface Props extends Omit<BaseTextFormFieldProps, 'invalid' | 'inputElType'> {}
  interface Emits extends BaseTextFormFieldEmits {}

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  // FIXME: destructuring with $() not working
  const vModels = useVModels(props, emit)
  let value = $ref(vModels.value)

  let invalid = $ref(false)

  const validationSchema = zod.string().email()

  function validateValue() {
    if (!value) {
      return
    }

    try {
      validationSchema.parse(value)
      invalid = false
    } catch {
      invalid = true
    }
  }

  watch($$(value), () => invalid = false)
  watchDebounced($$(value), validateValue, {debounce: 1500})
</script>

<template>
  <BaseTextFormField
    class="EmailFormField"
    inputElType="email"
    v-model:value="value"
    v-bind:invalid="invalid"
    v-on:focusout="validateValue()"
  >

    <template v-slot:label>
      <slot name="label">EMAIL</slot>
    </template>
  </BaseTextFormField>
</template>

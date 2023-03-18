<script setup lang="ts">
  import BaseTextFormField, {
    type Props as BaseTextFormFieldProps,
    type Emits as BaseTextFormFieldEmits,
  } from './BaseTextFormField.vue'

  interface Props extends Omit<BaseTextFormFieldProps, 'inputElType'> {}
  interface Emits extends BaseTextFormFieldEmits {}

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const {value} = useVModels(props, emit)

  const [visible, toggleVisibility] = useToggle(false)

  const baseTextFieldRef = $ref<InstanceType<typeof BaseTextFormField>>()
  const inputElRef = $computed(() => baseTextFieldRef?.inputElRef)
</script>

<template>
  <BaseTextFormField
    class="PasswordFormField"
    v-bind:class="[{visible}]"
    v-model:value="value"
    v-bind:inputElType="!visible ? 'password' : 'text'"
    ref="baseTextFieldRef"
  >

    <template v-slot:label>
      <slot name="label">PASSWORD</slot>
    </template>

    <template v-slot:right>
      <button
        class="toggleVisibility"
        tabindex="-1"
        v-on:click="toggleVisibility(); inputElRef?.focus()"
      >
        <Icon
          v-bind:name="!visible ? 'tabler:eye' : 'tabler:eye-closed'"
          size="24px"
        />
      </button>
    </template>
  </BaseTextFormField>
</template>

<style scoped lang="scss">
  .PasswordFormField {

    :deep(input::-ms-reveal) {
      display: none;
    }

    .toggleVisibility .icon {
      color: theme('colors.zinc.400');

      &:hover {
        color: black;
      }
    }

    &.visible {
      .toggleVisibility .icon {
        color: black;
      }
    }
  }
</style>

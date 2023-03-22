<script setup lang="ts">
  type Form = {
    action: 'SIGN_IN' | 'REGISTER'
    data: {
      email: string
      password: string
    }
  }

  const form = reactive<Form>({
    action: 'SIGN_IN',
    data: {
      email: '',
      password: '',
    },
  })
</script>

<template>
  <form class="AuthForm">
    <h2 class="AuthForm-title">AUTHENTICATE</h2>

    <div class="AuthForm-actionToggle">
      <label
        class="AuthForm-actionToggle-button"
        v-bind:class="{checked: form.action === 'SIGN_IN'}"
      >
        Sign In

        <input
          type="radio"
          name="action"
          value="SIGN_IN"
          v-model="form.action"
        />
      </label>

      <label
        class="AuthForm-actionToggle-button"
        v-bind:class="{checked: form.action === 'REGISTER'}"
      >
        Register

        <input
          type="radio"
          name="action"
          value="REGISTER"
          v-model="form.action"
        />
      </label>
    </div>

    <input
      class="AuthForm-textInput"
      type="email"
      placeholder="Email"
      v-model="form.data.email"
    />

    <input
      class="AuthForm-textInput"
      type="password"
      placeholder="Password"
      v-model="form.data.password"
    />

    <button class="AuthForm-submitButton">
      <Icon name="material-symbols:arrow-right-alt" />
    </button>
  </form>
</template>

<style scoped lang="scss">
  .AuthForm {
    width: 300px;

    display: grid;
    grid-auto-rows: 30px;
    gap: 10px;
  }

  .AuthForm-title,
  .AuthForm-textInput,
  .AuthForm-actionToggle-button,
  .AuthForm-submitButton {
    text-align: center;
  }

  .AuthForm-actionToggle-button,
  .AuthForm-submitButton {
    display: grid;
    place-content: center;
  }

  .AuthForm-title {
    font-weight: bold;
  }

  .AuthForm-actionToggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .AuthForm-actionToggle-button,
  .AuthForm-textInput {
    border: 2px solid black;
    background: white;
  }

  .AuthForm-actionToggle-button.checked,
  .AuthForm-submitButton {
    border: 0;
    background: black;
    color: white;
  }

  .AuthForm-actionToggle-button {
    &:first-child {
      border-right: 0;
    }

    &:last-child {
      border-left: 0;
    }

    & input[type=radio] {
      display: none;
    }
  }

  .AuthForm-textInput {
    &::placeholder {
      color: black;
    }

    &:focus {
      &::placeholder {
        opacity: 0;
      }
    }
  }

  .AuthForm-submitButton {
    & svg.icon {
      width: 20px;
      height: 20px;
    }
  }

  // RESET DEFAULT STYLES

  .AuthForm :where(input, button) {
    outline: none;
  }
</style>

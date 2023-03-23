<script setup lang="ts">
  type Form = {
    action: 'SIGN_IN' | 'REGISTER'
    data: {
      email: string
      password: string
    }
    error?: {
      message: string
    }
  }

  const form = reactive<Form>({
    action: 'SIGN_IN',
    data: {
      email: '',
      password: '',
    },
  })

  const supabase = useSupabaseClient()

  const submit = async () => {
    let response

    if (form.action === 'SIGN_IN') {
      response = await supabase.auth.signInWithPassword(form.data)
    }

    if (form.action === 'REGISTER') {
      response = await supabase.auth.signUp(form.data)
    }

    if (response?.error) {
      form.error = response.error
    }
  }
</script>

<template>
  <form class="AuthForm" v-on:submit.prevent="submit()">
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

    <button class="AuthForm-submitButton" type="submit">
      <Icon name="material-symbols:arrow-right-alt" />
    </button>

    <span v-if="form.error" class="AuthForm-errorMessage">
      {{ form.error.message }}
    </span>
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
  .AuthForm-errorMessage,
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

  .AuthForm-errorMessage {
    color: red;
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

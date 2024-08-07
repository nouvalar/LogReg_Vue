<script setup>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

import { useAuthStore, useAlertStore } from "../../stores";

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

async function onSubmit(values) {
  const authStore = useAuthStore();
  const alert2Store = useAlertStore();
  const { username, password } = values;
  await authStore.login(username, password);
  try {
    await authStore.login(username, password);
    alert2Store.success("Login successful");
  } catch (error) {
    alert2Store.error(error);
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-card">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
        <h3>Sign In</h3>

        <div class="mb-3">
          <label>Username</label>
          <Field
            name="username"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.username }"
          />
          <div class="invalid-feedback">{{ errors.username }}</div>
        </div>

        <div class="mb-3">
          <label>Password</label>
          <Field
            name="password"
            type="password"
            class="form-control"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="invalid-feedback">{{ errors.password }}</div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary" :disabled="isSubmitting">
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            ></span>
            Login
          </button>
          <router-link to="register" class="btn btn-link">Register</router-link>
        </div>
        <div class="social-icons">
          <ul>
            <li>
              <a href="#"><i class="fa fa-google"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa fa-facebook"></i></a>
            </li>
            <li>
              <a href="#"><i class="fa fa-twitter"></i></a>
            </li>
          </ul>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
}

.login-card {
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.mb-3 {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.is-invalid {
  border-color: #e3342f;
}

.invalid-feedback {
  color: #e3342f;
}

.btn-primary {
  background-color: #6e8efb;
  border-color: #6e8efb;
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
}

.btn-link {
  color: #6e8efb;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}

.social-icons {
  margin-top: 1.5rem;
}

.social-icons ul {
  list-style: none;
  padding: 0;
}

.social-icons li {
  display: inline;
  margin: 0 0.5rem;
}

.social-icons a {
  color: #6e8efb;
  font-size: 1.5rem;
  text-decoration: none;
}
</style>



<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useUsersStore, useAlertStore } from '../../stores';
import { router } from '../../router';

const schema = Yup.object().shape({
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
});

async function onSubmit(values) {
    const usersStore = useUsersStore();
    const alertStore = useAlertStore();
    try {
        await usersStore.register(values);
        await router.push('/account/login');
        alertStore.success('Registration successful');
    } catch (error) { 
        alertStore.error(error);
    }
}
</script>

<template>
    <div class="register-page">
      <div class="register-card">
        <h4 class="card-header">Register</h4>
        <div class="card-body">
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="form-group">
              <label>First Name</label>
              <Field name="firstName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
              <div class="invalid-feedback">{{ errors.firstName }}</div>
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
              <div class="invalid-feedback">{{ errors.lastName }}</div>
            </div>
            <div class="form-group">
              <label>Username</label>
              <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
              <div class="invalid-feedback">{{ errors.username }}</div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
              <div class="invalid-feedback">{{ errors.password }}</div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" :disabled="isSubmitting">
                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                Register
              </button>
              <router-link to="login" class="btn btn-link">Cancel</router-link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #ffafbd, #ffc3a0);
  }
  
  .register-card {
    background-color: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }
  
  h4.card-header {
    margin-bottom: 1.5rem;
    text-align: center;
    color: #333;
  }
  
  .form-group {
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
    background-color: #ffafbd;
    border-color: #ffafbd;
    padding: 0.75rem 1.5rem;
    border-radius: 0.25rem;
  }
  
  .btn-link {
    color: #ffafbd;
    text-decoration: none;
  }
  
  .btn-link:hover {
    text-decoration: underline;
  }
  </style>
  
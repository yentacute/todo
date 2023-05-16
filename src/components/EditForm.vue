<template>
    <div>
        <Form :validation-schema="schema">
          <input type="hidden" v-model="model.id">
          <Field name="name" type="text" placeholder="Task name" v-model="model.name"/>
          <ErrorMessage name="name" as="div" class="error-message mb-2"/>
          <Editor
            api-key="mxlftmz0xjsd4q38wnir8pr3923pyx17rwbpf3a18r3dvg1f"
            :init="{
              plugins: 'lists link image table code help wordcount'
            }"
            v-model="model.description"
            placeholder="Task description"
          />
          <div class="todo__app-select-date">
            <font-awesome-icon :icon="['fas', 'calendar-days']" />
            <input 
              id="due-date-input" 
              type="datetime-local" 
              v-model="model.due_date" 
            >
          </div>
          <div class="todo__app-action">
            <button class="btn btn-sm btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-sm btn-danger" @click="addNewTask($event)">Add task</button>
          </div>
        </Form>
    </div>
</template>

<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  import Editor from '@tinymce/tinymce-vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import { useTodoStore } from '../stores/todo';
  const store = useTodoStore();
</script>
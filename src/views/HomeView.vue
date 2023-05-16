<template>
  <main>
    <div class="todo__app">
      <div class="todo__app-header">
        <div class="todo__app-header-title">
          <h2>To do List</h2>
          <span class="d-block mb-2">{{ getDate}}</span>
        </div>
        <button class="btn btn-success btn-sm">
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span>Add task</span>
        </button>
      </div>
      <div class="todo__app-list" v-if="getDatabase.length">
          <div class="todo__app-task-item" v-for="(item, key) in mainDataArr" :key="key">
            <button>
                <span class="task__item-name">{{item?.name}}</span>
                <div class="task__item-description">{{item?.description}}</div>
            </button>
          </div>
      </div>
      <div class="todo__app-form">
        <Form :validation-schema="schema">
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
    </div>
  </main>
</template>

<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  import Editor from '@tinymce/tinymce-vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import * as yup from 'yup';
  const dataArr = ref([]);
  const mainDataArr = ref([]);
  const model = reactive({
    name: '',
    due_date: Date.now(),
    description: '',
    status: 0
  });

  const getDatabase = () => {
    const parseData = JSON.parse(localStorage.getItem('database'));
    mainDataArr.value = parseData;
  };

  const getDate = computed(() => {
    const d = new Date();
    return d.toDateString();
  })
  
  
  const schema = yup.object({
    name: yup.string().required('Mời nhập tên task'),
  });


  const addNewTask = (event) => {
    event.preventDefault();
    dataArr.value.push(model);
    localStorage.setItem('database',  JSON.stringify(dataArr.value));
  }

  watch(dataArr.value, (value) => {
    if(value) {
      getDatabase();
    }
  })

</script>

<style lang="scss">
  .todo__app {
    .todo__app-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .todo__app-header-title {
        float: left;
        
        h2 {
          color: #db4c3f;
          text-transform: uppercase;
          font-weight: 600;
        }
      }
    }

    .todo__app-form {
      width: 100%;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
      padding: 24px;
      margin: 0 auto;
      form {
        input {
          width: 100%;
          margin-bottom: 12px;
          height: 42px;
          line-height: 42px;
          padding: 12px;
          border: 1px solid #ddd;
          outline: none;
          border-radius: 8px;
        }

        .todo__app-action {
          display: flex;
          justify-content: flex-end;

          button {
            margin: 0 6px;
          }
        }
      }
      .todo__app-select-date {
        position: relative;
        width: 20px;
        height: 20px;
        margin: 12px 0;
  
        svg.svg-inline--fa {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          cursor: pointer;
          path {
            fill: #db4c3f;
          }
        }
        input {
          width: 100%;
          height: 100%;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          position: absolute;
          z-index: 99;
          opacity: 0;
          cursor: pointer;
  
        }
      }
    }

    .error-message {
      color: #db4c3f;
      font-size: 14px;
    }

    
  }

</style>
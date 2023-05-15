<template>
  <main>
    <div class="todo__app">
      <div class="todo__app-header">
        <div class="todo__app-header-title">
          <h2>To do List</h2>
          <span>15th may, 2023</span>
        </div>
        <button class="btn btn-success btn-sm">
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span>Add task</span>
        </button>
      </div>

      <div class="todo__app-form">
        <form action="">
          <input type="text" placeholder="Task name" v-model="model.name">
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
            <button type="submit" class="btn btn-sm btn-danger">Add task</button>
          </div>
        </form>
       
      </div>
    </div>
  </main>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import Editor from '@tinymce/tinymce-vue'

  const model = reactive({
    name: '',
    description: '',
    due_date: new Date()
  });

  

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

    
  }

</style>
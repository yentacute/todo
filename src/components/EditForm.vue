<template>
    <div>
      <!-- Modal -->
      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <div class="modal-body todo__app-form ">
              <Form :validation-schema="schema">
                <input type="hidden" v-model="store.editModel.id">
                <Field name="name" type="text" :placeholder="$t('form.name')" v-model="store.editModel.name"/>
                <ErrorMessage name="name" as="div" class="error-message mb-2"/>
                <Editor
                  api-key="mxlftmz0xjsd4q38wnir8pr3923pyx17rwbpf3a18r3dvg1f"
                  :init="{
                    plugins: 'lists link image table code help wordcount'
                  }"
                  v-model="store.editModel.description"
                  :placeholder="$t('form.description')"
                />
                <div class="todo__app-select-date">
                  <div class="select__date-input">
                    <label for="">Due date: </label>
                    <input 
                      id="due-date-input" 
                      type="datetime-local" 
                      v-model="store.editModel.due_date" 
                    >
                  </div>
                </div>
      
                <div class="todo__app-action">
                  <button class="btn btn-sm btn-secondary" data-dismiss="modal" aria-label="Close">{{$t('form.cancel')}}</button>
                  <button type="submit" class="btn btn-sm btn-danger" @click="updateModel($event)">{{$t('form.edit')}}</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import Editor from '@tinymce/tinymce-vue';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import { useTodoStore } from '../stores/todo';
  const store = useTodoStore();
  
  const updateModel = (event) => {
    event.preventDefault();
    const arr = JSON.parse(localStorage.getItem('database'));
    const item = arr.find(obj => obj.id === store.currentId);
    item.name = store.editModel.name;
    item.description = store.editModel.description;
    item.due_date = store.editModel.due_date;
    localStorage.setItem('database', JSON.stringify(arr));
    store.mainDataArr = arr;
    document.querySelector('#exampleModalCenter .close').click();
  }


</script>
<template>
  <main>
    <div class="todo__app">
      <div class="todo__app-language">
        <button class="btn btn-sm btn-danger mx-2"  @click="switchLocale('vi')">Vietnamese</button>
        <button class="btn btn-sm btn-primary" @click="switchLocale('en')">English</button>
      </div>
      <div class="todo__app-header">
        <div class="todo__app-header-title">
          <h2>{{ $t('appHeading') }}</h2>
          <span class="d-block mb-2">{{ getDate}}</span>
        </div>
        <button class="btn btn-success btn-sm" @click="showAddBtn = !showAddBtn">
          <font-awesome-icon :icon="['fas', 'plus']" />
          <span>{{ $t('addTaskButton') }}</span>
        </button>
      </div>
      
      <div class="todo__app-list" v-if="store.mainDataArr">
          <div class="todo__app-task-item" v-for="(item, key) in store.mainDataArr" :key="key" :class="{'task__item--over-due': item.over_due}">
                <div class="task__item-check">
                  <input type="checkbox" class="form-check" v-if="item.status === 1" checked >
                  <input type="checkbox" class="form-check" v-else>
                </div>
                <div class="task__item-content" :class="{'completed': item.status === 1}">
                  <span class="task__item-name">{{item?.name}}</span>
                  <div class="task__item-description" v-html="item?.description"></div>
                  <div class="task__item-due-date"><strong style="color: #db4c3f;">Due date: </strong><span>{{store.chooseDateConvert(item.due_date)}}</span></div>
                </div>
                <button class="btn" @click="handleRightMenu($event, item.id)">
                  <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
                </button>
          </div>
          <RightMenuOptions />

      </div>
      <div class="todo__app-form" v-if="showAddBtn">
        <Form :validation-schema="schema">
          <input type="hidden" v-model="model.id">
          <Field name="name" type="text" :placeholder="$t('form.name')" v-model="model.name"/>
          <ErrorMessage name="name" as="div" class="error-message mb-2"/>
          <Editor
            api-key="mxlftmz0xjsd4q38wnir8pr3923pyx17rwbpf3a18r3dvg1f"
            :init="{
              plugins: 'lists link'
            }"
            v-model="model.description"
            :placeholder="$t('form.description')"
          />
          <div class="todo__app-select-date">
            <div class="select__date-input">
              <label for="">Due date: </label>
              <input 
                id="due-date-input" 
                type="datetime-local" 
                v-model="model.due_date" 
              >
            </div>
          </div>
          <div class="todo__app-action">
            <button class="btn btn-sm btn-secondary">{{$t('form.cancel')}}</button>
            <button type="submit" class="btn btn-sm btn-danger" @click="addNewTask($event)">{{$t('form.submit')}}</button>
          </div>
        </Form>
      </div>
      <EditForm/>
    </div>
  </main>
</template>

<script setup>
  import { ref, reactive, computed, onMounted, watch } from 'vue'
  import Editor from '@tinymce/tinymce-vue';
  import { v4 as uuidv4 } from 'uuid';
  import { Form, Field, ErrorMessage } from 'vee-validate';
  import RightMenuOptions from '../components/RightMenuOptions.vue'
  import * as yup from 'yup';
  import i18n from '../locales/i18n'
  import { useTodoStore } from '../stores/todo';
  import EditForm from '../components/EditForm.vue'
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  const store = useTodoStore();
  const showAddBtn = ref(false);

  const model = reactive({
    id: uuidv4(),
    name: '',
    due_date: store.convertNowToIsoString(),
    description: '',
    status: 0,
    over_due: false
  });

  const resetModels = () => {
  model.id = uuidv4();
  model.name = '';
  model.due_date = store.convertNowToIsoString();
  model.description = '';
  model.status = 0;
  model.over_due = false
  // Add more models to reset as needed
}

const switchLocale = (newLocale) => {
  i18n.global.locale = newLocale;
}

  const getDate = computed(() => {
    const d = new Date();
    return d.toDateString();
  });

  
  const schema = yup.object({
    name: yup.string().required('Mời nhập tên task'),
  });

  const handleRightMenu = (event, id) => {
    event.preventDefault();
    const x = event.x;
    const y = event.y;
    store.showRightmenu = true;
    store.currentId = id;
    setTimeout(() => {
      document.querySelector('.right__menu-container').style.left = (x - 200) + 'px';
      document.querySelector('.right__menu-container').style.top = y + 'px';
    }, 200);

  }

  const addNewTask = (event) => {
    event.preventDefault();
    store.mainDataArr.push(model);
    localStorage.setItem('database',  JSON.stringify(store.mainDataArr));
    showAddBtn.value = false;
    resetModels();
    store.mainDataArr = JSON.parse(localStorage.getItem('database'))
  }


  onMounted(() => {
    if(store.localStorageData) {
      store.mainDataArr = JSON.parse(localStorage.getItem('database'));
    }
    document.addEventListener('mousedown', function(event) {
      if(!event.target.classList.contains('right__menu-item')) {
            if(event.which === 1) {
                store.showRightmenu = false;
            }
        } 
    });

    setInterval(() => {
      const getArr = JSON.parse(localStorage.getItem('database'));
      if(getArr) {
        const item = getArr.find(item => item.due_date === store.convertNowToIsoString());
        if(typeof(item) !== 'undefined') {
          item.over_due = true;
          toast(`Task: ${item.name} over due`);
          localStorage.setItem('database', JSON.stringify(getArr));
          store.mainDataArr = getArr;
        }
      }
   
    }, 1000);
  });

</script>

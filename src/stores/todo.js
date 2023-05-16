import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export const useTodoStore = defineStore('todo', () => {
  const currentId = ref('');
  const showRightmenu = ref(false);
  const mainDataArr = ref([{}]);
  const editModel = reactive({
    id: uuidv4(),
    name: '',
    due_date: Date.now(),
    description: '',
    status: 0
  })

  return { 
    currentId,
    mainDataArr,
    showRightmenu,
    editModel
  }
})

import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid';

export const useTodoStore = defineStore('todo', () => {
  const currentId = ref('');
  const showRightmenu = ref(false);
  const itemObj = reactive({});
  const changeLanguage = ref(false);

  const chooseDateConvert = (date) => {
    const d = new Date(date);
    return d.toLocaleString('vi-VN')
  }

  const convertIsoStringDate = (date) => {
    let time = new Date(date);
    time.setMinutes(time.getMinutes() - time.getTimezoneOffset());
    return time.toISOString().slice(0, 19);
  }
  const convertNowToIsoString = () => {
    let time = new Date();
    time.setMinutes(time.getMinutes() - time.getTimezoneOffset());
    return time.toISOString().slice(0, 19);
  }

  const mainDataArr = ref([{
    id: uuidv4(),
    name: 'Task 1',
    due_date: convertNowToIsoString(),
    description: 'Today have to complete',
    status: 0,
    over_due: false
  }]);
  const editModel = reactive({
    id: uuidv4(),
    name: '',
    due_date: convertNowToIsoString(),
    description: '',
    status: 0,
    over_due: false
  });


  return { 
    currentId,
    mainDataArr,
    showRightmenu,
    editModel,
    chooseDateConvert,
    itemObj,
    convertIsoStringDate,
    convertNowToIsoString,
    changeLanguage
  }
})

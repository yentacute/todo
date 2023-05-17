<template>
    <div class="right__menu-container" v-if="store.showRightmenu">
        <button class="close">
            <font-awesome-icon :icon="['fas', 'xmark']" />
        </button>
        <ul>
            <li @click="markToCompleted" class="right__menu-item">{{$t('rightMenu.completed')}}</li>
            <li @click="editTask" class="right__menu-item" data-toggle="modal" data-target="#exampleModalCenter">{{$t('rightMenu.edit')}}</li>
            <li @click="deleteTask" class="right__menu-item">{{$t('rightMenu.delete')}}</li>
        </ul>
    </div>

</template>

<script setup>
  import { useTodoStore } from '../stores/todo';
  const store = useTodoStore();

  function markToCompleted () {
    const arr = JSON.parse(localStorage.getItem('database'));
    const item = arr.find(obj => obj.id === store.currentId);
    item.status = 1;
    localStorage.setItem('database', JSON.stringify(arr));
    store.mainDataArr =  JSON.parse(localStorage.getItem('database'));
    store.showRightmenu = false;
  }

  function deleteTask() {
    const arr = JSON.parse(localStorage.getItem('database'));
    const index = arr.findIndex(obj => obj.id === store.currentId);
    arr.splice(index, 1);
    localStorage.setItem('database', JSON.stringify(arr));
    store.mainDataArr =  JSON.parse(localStorage.getItem('database'));
    store.showRightmenu = false;
  }

  function editTask() {
    store.showRightmenu = false;
    const arr = JSON.parse(localStorage.getItem('database'));
    const item = arr.find(obj => obj.id === store.currentId);
    store.itemObj = item;
    store.editModel.name = store.itemObj.name;
    store.editModel.description = store.itemObj.description;
    store.editModel.due_date = store.convertIsoStringDate(store.itemObj.due_date);
  }

</script>

<style lang="scss">
    .right__menu-container {
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        max-width: 200px;
        width: 100%;
        min-height: 250px;
        padding: 12px 0;
        position: fixed;
        z-index: 999;
        background-color: #fff;
        right: 0;

        .close {
            position: absolute;
            right: -10px;
            top: -10px;
            width: 30px;
            height: 30px;
            background-color: #ddd;
            border-radius: 50%;
           
            svg {
                color: #000;
                width: 15px;
            }
        }
        ul {
            padding: 0;
            list-style: none;
            li {
                margin-bottom: 6px;
                padding: 6px 12px;
                cursor: pointer;
                &:hover {
                    background-color: #eff6fc;
                }
            }

        }
    }
</style>
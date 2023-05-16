<template>
    <div class="right__menu-container" v-if="store.showRightmenu">
        <ul>
            <li @click="markToCompleted" class="right__menu-item">Mark completed</li>
            <li @click="editTask" class="right__menu-item">Edit</li>
            <li @click="deleteTask" class="right__menu-item">Delete</li>
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
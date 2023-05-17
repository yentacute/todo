import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: 'en',
    messages: {
        en: {
            appHeading: 'To do app',
            addTaskButton: 'Add task',
            form: {
                name: 'Task name',
                description: 'Task description',
                cancel: 'Cancel',
                submit: 'Add task',
                edit: 'Edit task'
            },
            rightMenu: {
                completed: 'Mark completed',
                edit: 'Edit',
                delete: 'Delete'
            },

            toast: 'Task: {taskName} over due'
        },

        vi: {
            appHeading: 'Danh sách công việc',
            addTaskButton: 'Thêm công việc',
            form: {
                name: 'Tên công việc',
                description: 'Mô tả',
                cancel: 'Huỷ',
                submit: 'Thêm',
                edit: 'Chỉnh sửa'
            },

            rightMenu: {
                completed: 'Đánh dấu hoàn thành',
                edit: 'Chỉnh sửa',
                delete: 'Xoá'
            }

        }
    }
});

export default i18n;
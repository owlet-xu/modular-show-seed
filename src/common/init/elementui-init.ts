import Vue from 'vue';
import Animate from 'animate.css';
import {
    Button,
    Input,
    Message,
    Form,
    FormItem,
    Menu,
    MenuItem,
    Submenu,
    Popover,
    Radio,
    RadioGroup,
    RadioButton,
    Table,
    TableColumn,
    Pagination,
    DatePicker
} from 'element-ui';


export const initElement = () => {
    Vue.use(DatePicker);
    Vue.use(Pagination);
    Vue.use(RadioButton);
    Vue.use(TableColumn);
    Vue.use(Table);
    Vue.use(Popover);
    Vue.use(Radio);
    Vue.use(RadioGroup);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(Menu);
    Vue.use(FormItem);
    Vue.use(Form);
    Vue.use(Button);
    Vue.use(Input);
    Vue.prototype.$message = Message;
    Vue.use(Animate);
};

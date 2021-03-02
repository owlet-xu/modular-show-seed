import { Vue, Component } from 'vue-property-decorator';
import { AppModule } from '@/store/modules/app';
// components
import ItemDefault from './menu-item/item-default.vue';
import ItemSimple from './menu-item/item-simple.vue';
// models
import { MenuInfo } from '@/models/menu-info';

@Component({
  components: {
    ItemDefault,
    ItemSimple
  }
})
export default class Sidebar extends Vue {

  get deviceType() {
    return AppModule.deviceType;
  }

  get menus(): MenuInfo[] {
    return AppModule.menus;
  }

  menuClick(menu: MenuInfo) {
    AppModule.setAnimateIn();
    this.$router.push({ name: menu.RouterName }).catch((error: any) => error);
  }
}

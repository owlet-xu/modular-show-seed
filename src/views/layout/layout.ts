import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { AppModule } from '@/store/modules/app';
// componets
import Navbar from '@/components/navbar/navbar.vue';
import Sidebar from '@/components/sidebar/sidebar.vue';
import AppMain from '@/components/app-main/app-main';
import ResizeMixin from '@/common/mixin/resize-mixin';

@Component({
  components: {
    Navbar,
    Sidebar,
    AppMain
  }
})
export default class Layout extends mixins(ResizeMixin) {

  get deviceType() {
    return AppModule.deviceType;
  }
}

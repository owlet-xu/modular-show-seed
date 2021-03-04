import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { IAppState } from './modules/app';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
}
const isDev = process.env.NODE_ENV === 'development';
const store = new Vuex.Store<IRootState>({
  plugins: isDev ? [createLogger({})] : []
});

export default store;

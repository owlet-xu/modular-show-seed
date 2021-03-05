// import { Message as ElMessage } from 'element-ui';
// import { Path } from '@/router/router-types';
// import { UserModule } from '@/store/modules/user';
import i18n from '@/lang';
let timeout: any = null;
/**
 * 统一处理错误
 */
export const ErrorShow = (errorCode: number, message: string) => {
    if (errorCode === 29999) {
        // token失效，重新登录
        // ElMessage.error(i18n.t('TokenValid').toString());
        // UserModule.LogOut(null, true);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const url = window.location.href;
            const index = url.indexOf('/#');
            if (index > -1) {
                // window.location.href = `#${Path.Login}?redirect=${url.substr(index + 2)}`;
            } else {
                // window.location.href = `#${Path.Login}`;
            }
        }, 3000);
    }
};

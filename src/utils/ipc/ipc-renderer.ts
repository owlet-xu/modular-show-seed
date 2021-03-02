
import { Observable, Observer } from 'rxjs';
import { fromPromise } from 'rxjs/observable/fromPromise';


declare var electron: Electron;

export class ApiResponse {
  result!: boolean;
  message!: string;
  overload!: boolean;
  data: any;
}

// tslint:disable-next-line:max-classes-per-file
export class IpcResponse {
  event: any;
  args!: any[];
}


// tslint:disable-next-line:max-classes-per-file
class MockIpcRenderer implements IpcRenderer {
  on(channel: string, listener: (event: any, ...args: any[]) => void): this {
    return this;
  }

  once(channel: string, listener: (event: any, ...args: any[]) => void): this {
    return this;
  }

  removeAllListeners(channel?: string): this {
    return this;
  }

  // tslint:disable-next-line:ban-types
  removeListener(channel: string, listener: any): this {
    return this;
  }

  send(channel: string, ...args: any[]): void {}

  sendSync(channel: string, ...args: any[]): void {}
}

// tslint:disable-next-line:max-classes-per-file
class IpcRendererService {

  constructor() {
    console.log('IpcRendererService constructor constructorconstructorconstructor');
    if (this.isElectron()) {
      this.ipcRenderer = electron.ipcRenderer;
    } else {
      this.ipcRenderer = new MockIpcRenderer();
    }
  }
  private ipcRenderer: IpcRenderer;

  on(channel: string): Observable<IpcResponse> {
    return Observable.create((observer: Observer<IpcResponse>) => {
      this.ipcRenderer.on(channel, (event, ...args) => {
        observer.next({ event, args });
      });
      return () => {
        this.ipcRenderer.removeAllListeners(channel);
      };
    });
  }

  once(channel: string): Observable<IpcResponse> {
    return Observable.create((observer: Observer<IpcResponse>) => {
      this.ipcRenderer.once(channel, (event, ...args) => {
        observer.next({ event, args });
        observer.complete();
      });
    });
  }

  send(channel: string, ...args: any[]): void {
    return this.ipcRenderer.send(channel, args);
  }

  sendSync(channel: string, ...args: any[]): void {
    return this.ipcRenderer.sendSync(channel, args);
  }

  api(channel: string, ...args: any[]): Observable<ApiResponse> {
    this.ipcRenderer.send(channel, args);
    // tslint:disable-next-line:one-variable-per-declaration
    const promise = new Promise<ApiResponse>((resolve, reject) => {
      this.ipcRenderer.once(`${channel}_reply`, (event: any, response: ApiResponse) => {
        if (response.result) {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
    return fromPromise(promise);
  }

  private isElectron() {
    return window && (window as any)['process'] && ((window as any)['process'])['type'];
  }
}

export  const IpcRenderer = new IpcRendererService();


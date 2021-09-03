import {action,observable} from 'mobx'
import { makeAutoObservable } from "mobx"
class Store {
    constructor() {
        makeAutoObservable(this)
    }
    @observable
    content='';

    @action
    setContent=(str:string)=>{
        this.content=str;
    }
}

export const store=new Store();

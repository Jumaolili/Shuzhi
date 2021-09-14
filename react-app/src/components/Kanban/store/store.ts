import {action,observable} from 'mobx'
import { makeAutoObservable } from "mobx"
class Store {
    constructor() {
        makeAutoObservable(this)
    }
    @observable
    title='';
    content='';

    @action
    setTitle=(str:string)=>{
        this.title=str;
    }
    setContent=(str:string)=>{
        this.content=str;
    }
}

export const store=new Store();
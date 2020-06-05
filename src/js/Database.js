import firebase from 'firebase/app';
import 'firebase/firestore'; 
let UAParser = require('ua-parser-js');
let isEqual = require('lodash.isequal');

class Database {
    constructor(){
        if (!Database.instance){
            Database.instance = this;
            this.db = null;
            this.parser = null;
        }
        return Database.instance;
    }
    initDatabase(){
        firebase.initializeApp({
            apiKey: "AIzaSyAqP3g27lowoxPAfG35GRfaixlYsG08VQU",
            authDomain: "dashboard-63843.firebaseapp.com",
            databaseURL: "https://dashboard-63843.firebaseio.com",
            projectId: "dashboard-63843",
            storageBucket: "dashboard-63843.appspot.com",
            messagingSenderId: "812486429745",
            appId: "1:812486429745:web:9cfa762d2bda849fc19910"
          });
        this.db = firebase.firestore();
        this.parser = new UAParser();
        this.parser.setUA(window.navigator.userAgent);
        this.info = this.removeUndefinedProp(this.parser.getResult());
    }

    removeUndefinedProp(sourceObj) {
        let jsErrorObj = {};
        for (let name in sourceObj ) {
            if (typeof sourceObj[name] === 'object'){
                jsErrorObj[name] = this.removeUndefinedProp(sourceObj[name]);
            } else if(typeof sourceObj[name] === 'undefined'){
                jsErrorObj[name] = '-';
            }
            else {
                jsErrorObj[name] = sourceObj[name];
            }
        }
        return jsErrorObj;
    }

    isDataPresent(objArr, obj){
        for(let idx=0; idx<objArr.length; idx++)
            if(isEqual(objArr[idx],obj))
                return idx;
        return -1;
    }

    add(memory_size, cb){
        this.info.wasmMemory = memory_size;
        this.get().then((querySnapshot) => {
            let dataArr = [];
            querySnapshot.forEach((doc) => {
                dataArr.push(doc.data());
            })
            return dataArr;
        }).then((dataArr) => {
                let idx = this.isDataPresent(dataArr, this.info);
                if(idx === -1){//data is not already present
                    this.db.collection("info").add(this.info)
                    dataArr.unshift(this.info);
                    console.log("adding new data to DB");
                } else{
                    var first = dataArr[idx];
                    dataArr.sort(function(x,y){ return isEqual(x,first) ? -1 : isEqual(y,first) ? 1 : 0; });
                    console.log("data is already there in DB");
                }
                cb(dataArr);
        });
    }

    update(){

    }

    getCurrent(){
        let dataArr = [];
        dataArr.push(this.info);
        return dataArr;
    }
    
    async get(){
        return await this.db.collection("info").get();
        /*.then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
            });
        });*/
    }
}

export default new Database();
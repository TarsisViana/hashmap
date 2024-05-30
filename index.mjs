import { LinkedList, Node } from "./linkedList.mjs";

const HashMap = class {
  constructor() {
    this.size = 16;
    this.buckets = [];
    this.loadFactor = 0.8;
  }

  hash(key) {
    if (typeof key !== "string") throw new Error("Wrong type of key!");
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key) % this.size;
    let node = new Node(key, value);
    if (this.buckets[index] == null) {
      this.buckets[index] = node;
    } else {
      let list = new LinkedList(this.buckets[index]);
      if (list.contains(key)) {
        //if the same key is found, update the value.
        list.contains(key).value = value;
        return;
      }
      list.append(key, value);
    }

    // need to check load factor
  }
};

const hashMap = new HashMap();

hashMap.set("steve", 31);
hashMap.set("john", 41);
hashMap.set("james", 21);
hashMap.set("carlos", 33);
hashMap.set("carla", 34);
hashMap.set("adam", 12);
hashMap.set("joe", 21);
hashMap.set("hanna", 8);
hashMap.set("sofia", 15);
hashMap.set("jack", 55);
hashMap.set("karma", 70);
hashMap.set("val", 59);
hashMap.set("jim", 30);
hashMap.set("john", 1);
hashMap.set("karma", 10);
console.log(hashMap.buckets);

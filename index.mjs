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
    if (this.buckets[index] == null) {
      this.buckets[index] = new LinkedList(key, value);
    } else {
      let list = this.buckets[index];
      if (list.contains(key)) {
        //if the same key is found, update the value.
        list.contains(key).value = value;
        return;
      }

      list.append(key, value);
      this.buckets[index] = list;
    }

    // need to check load factor
  }

  get(key) {
    let index = this.hash(key) % this.size;

    if (this.buckets[index] == null) {
      return null;
    }
    let test = this.buckets[index].contains(key);
    if (test) return test.value;
    else return null;
  }

  has(key) {
    let index = this.hash(key) % this.size;

    if (this.buckets[index] == null) {
      return false;
    }
    let test = this.buckets[index].contains(key);
    if (test) return true;
    else return false;
  }
  remove(key) {
    if (!this.has(key)) {
      return false;
    }

    let index = this.hash(key) % this.size;
    let list = this.buckets[index]; //just for clarity
    if (list.size() === 1) {
      this.buckets[index] = undefined;
      return true;
    }
    list.remove(key);
    this.buckets[index] = list;
    return true;
  }

  length() {
    let count = 0;
    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i]) {
        count += this.buckets[i].size();
      }
    }
    return count;
  }
  clear() {
    this.buckets = [];
  }
  keys() {
    let keys = [];
    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i]) {
        keys = [...keys, ...this.buckets[i].toArray("key")];
      }
    }
    return keys;
  }

  values() {
    let valueArr = [];
    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i]) {
        valueArr = [...valueArr, ...this.buckets[i].toArray("value")];
      }
    }
    return valueArr;
  }

  entries() {
    let entriesArr = [];
    for (let i = 0; i < this.size; i++) {
      if (this.buckets[i]) {
        let checkNext = true;
        let current = this.buckets[i].list;

        while (checkNext) {
          if (!current.next) checkNext = false;
          let arr = [];
          arr.push(current.key);
          arr.push(current.value);
          entriesArr.push(arr);
          current = current.next;
        }
      }
    }
    return entriesArr;
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
hashMap.set("carma", 50);
hashMap.set("naruto", 18);

console.log({ ...hashMap.buckets });
console.log(hashMap.get("karma"));
console.log(hashMap.get("johnson"));
console.log(hashMap.has("karma"));
console.log(hashMap.has("johnson"));

hashMap.remove("joe");
hashMap.remove("sofia");
console.log({ ...hashMap.buckets });
console.log(hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

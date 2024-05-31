import { LinkedList, Node } from "./linkedList.mjs";

const HashMap = function () {
  let size = 16;
  let buckets = [];
  let loadFactor = 0.8;

  function hash(key) {
    if (typeof key !== "string") throw new Error("Wrong type of key!");
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  function set(key, value) {
    let index = hash(key) % size;
    if (buckets[index] == null) {
      checkLoad();
      index = hash(key) % size;
      buckets[index] = new LinkedList(key, value);
    } else {
      let list = buckets[index];
      if (list.contains(key)) {
        //if the same key is found, update the value.
        list.contains(key).value = value;
        return;
      }
      checkLoad();
      index = hash(key) % size;
      list.append(key, value);
      buckets[index] = list;
    }

    // need to check load factor
  }

  function get(key) {
    let index = hash(key) % size;

    if (buckets[index] == null) {
      return null;
    }
    let test = buckets[index].contains(key);
    if (test) return test.value;
    else return null;
  }

  function has(key) {
    let index = hash(key) % size;

    if (buckets[index] == null) {
      return false;
    }
    let test = buckets[index].contains(key);
    if (test) return true;
    else return false;
  }
  function remove(key) {
    if (!has(key)) {
      return false;
    }

    let index = hash(key) % size;
    let list = buckets[index]; //just for clarity
    if (list.size() === 1) {
      buckets[index] = undefined;
      return true;
    }
    list.remove(key);
    buckets[index] = list;
    return true;
  }

  function length() {
    let count = 0;
    for (let i = 0; i < size; i++) {
      if (buckets[i]) {
        count += buckets[i].size();
      }
    }
    return count;
  }
  function clear() {
    buckets = [];
  }
  function keys() {
    let keys = [];
    for (let i = 0; i < size; i++) {
      if (buckets[i]) {
        keys = [...keys, ...buckets[i].toArray("key")];
      }
    }
    return keys;
  }

  function values() {
    let valueArr = [];
    for (let i = 0; i < size; i++) {
      if (buckets[i]) {
        valueArr = [...valueArr, ...buckets[i].toArray("value")];
      }
    }
    return valueArr;
  }

  function entries() {
    let entriesArr = [];
    for (let i = 0; i < size; i++) {
      if (buckets[i]) {
        let checkNext = true;
        let current = buckets[i].list;

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

  function checkLoad() {
    let load = length() / size;

    if (load >= loadFactor) {
      let data = entries();
      size *= 2;
      data.forEach((arr) => {
        set(arr[0], arr[1]);
      });
    }
  }

  return { set, get, has, remove, length, keys, values, entries };
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

console.log(hashMap.get("karma"));
console.log(hashMap.get("johnson"));
console.log(hashMap.has("karma"));
console.log(hashMap.has("johnson"));

hashMap.remove("joe");
hashMap.remove("sofia");

console.log(hashMap.length());
console.log(hashMap.keys());
console.log(hashMap.values());
console.log(hashMap.entries());

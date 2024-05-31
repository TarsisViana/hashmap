class LinkedList {
  constructor(key, value) {
    this.list = new Node(key, value);
  }

  getHead() {
    return this.list;
  }
  getTail(node = this.list) {
    //Wanted to try a recursive method
    if (!node) return "undefined";
    if (node.next === null) return node;
    return this.getTail(node.next);
  }

  append(key, value) {
    if (this.list.next === null) {
      this.list.next = new Node(key, value);
    } else {
      this.getTail().setNext(new Node(key, value));
    }
  }

  prepend(value) {
    if (this.list.next === null) {
      this.list.next = new Node(key, value);
    } else {
      const temp = this.list.next;
      this.list.next = new Node(key, value, temp);
    }
  }
  size() {
    // wanted to try an iterative method
    if (this.list.next === null) return 1;
    let count = 1;
    let checkNext = true;
    let current = this.list.next;

    while (checkNext) {
      if (current.next != null) {
        count++;
        current = current.next;
      } else {
        count++;
        checkNext = false;
      }
    }
    return count;
  }

  at(index) {
    //index starts at 0
    if (index === 0) return this.list;
    let count = 1;
    let checkNext = true;
    let current = this.list.next;

    while (checkNext) {
      if (current.next != null) {
        if (count === index) return current;
        count++;
        current = current.next;
      } else return "undefined";
    }
  }
  pop() {
    if (this.list.next === null) return "Empty";
    let checkNext = true;
    let current = this.list.next;
    let prev = null;

    while (checkNext) {
      if (current.next != null) {
        prev = current;
        current = current.next;
        if (current.next == null) {
          prev.setNext(null);
        }
      } else {
        checkNext = false;
      }
    }
  }
  contains(key) {
    let checkNext = true;
    let current = this.list;

    let prev = null;

    while (checkNext) {
      if (current.next != null) {
        if (current.key === key) {
          return current;
        }
        current = current.next;
      } else {
        if (current.key === key) {
          return current;
        }
        checkNext = false;
      }
    }
    return false;
  }

  find(value) {
    if (this.list.next === null) return "Empty";
    let checkNext = true;
    let current = this.list;

    while (checkNext) {
      if (current.next != null) {
        if (current.getValue() === value) {
          return current;
        }
        current = current.next;
      } else {
        if (current.getValue() === value) {
          return current;
        }
        checkNext = false;
      }
    }
    return null;
  }
  toString() {
    if (this.list.next === null) return "Empty";
    let checkNext = true;
    let current = this.list.next;
    let string = "";

    while (checkNext) {
      if (current.next != null) {
        string += `( ${current.getValue()} ) -> `;
        current = current.next;
      } else {
        string += `( ${current.getValue()} ) -> null`;
        checkNext = false;
      }
    }
    return string;
  }

  toArray(input) {
    let arr = [];
    let checkNext = true;
    let current = this.list;

    while (checkNext) {
      if (!current.next) checkNext = false;
      arr.push(current[input]);
      current = current.next;
    }
    return arr;
  }

  insertAt(value, index) {
    if (this.list.next === null) return "Empty";
    if (index === 0) return this.list.next;
    let count = 1;
    let checkNext = true;
    let current = this.list.next;
    let prev = this.list;
    let node = new Node(key, value);

    while (checkNext) {
      if (current.next != null) {
        if (count === index) {
          node.next = current;
          prev.next = node;
          return;
        }
        count++;
        prev = current;
        current = current.next;
      } else {
        if (count === index) {
          node.next = current;
          prev.next = node;
          return;
        } else if (count + 1 == index) {
          current.next = node;
          return;
        }
        return "index invalid";
      }
    }
  }

  // removing the "head" node made this function need aditional
  // ifs when removing the first node in the list
  remove(key) {
    let checkNext = true;
    let current = this.list;
    let prev = null;

    while (checkNext) {
      if (current.next != null) {
        if (current.key === key) {
          if (!prev) {
            this.list = current.next;
            return;
          }
          prev.next = current.next;
          return;
        }
        prev = current;
        current = current.next;
      } else {
        if (current.key === key) {
          prev.next = null;
          return;
        }
        checkNext = true;
      }
    }
  }
}

class Node {
  constructor(key, value = null, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }

  getValue() {
    return this.value;
  }

  getNext() {
    return this.next;
  }

  setNext(node) {
    this.next = node;
  }
}

export { LinkedList, Node };

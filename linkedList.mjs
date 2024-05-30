class LinkedList {
  constructor(node) {
    this.head = node;
  }

  getHead() {
    return this.head.next;
  }
  getTail(node = this.head) {
    //Wanted to try a recursive method
    if (!node) return "undefined";
    if (node.getNext() === null) return node;
    return this.getTail(node.getNext());
  }

  append(key, value) {
    if (this.head.getNext() === null) {
      this.head.next = new Node(key, value);
    } else {
      this.getTail().setNext(new Node(value));
    }
  }

  prepend(value) {
    if (this.head.next === null) {
      this.head.next = new Node(value);
    } else {
      const temp = this.head.next;
      this.head.next = new Node(value, temp);
    }
  }
  size() {
    // wanted to try an iterative method
    if (this.head.next === null) return 1;
    let count = 1;
    let checkNext = true;
    let current = this.head.getNext();

    while (checkNext) {
      if (current.getNext() != null) {
        count++;
        current = current.getNext();
      } else {
        count++;
        checkNext = false;
      }
    }
    return count;
  }

  at(index) {
    //index starts at 0
    if (index === 0) return this.head;
    let count = 1;
    let checkNext = true;
    let current = this.head.getNext();

    while (checkNext) {
      if (current.getNext() != null) {
        if (count === index) return current;
        count++;
        current = current.getNext();
      } else return "undefined";
    }
  }
  pop() {
    if (this.head.next === null) return "Empty";
    let checkNext = true;
    let current = this.head.getNext();
    let prev = null;

    while (checkNext) {
      if (current.getNext() != null) {
        prev = current;
        current = current.getNext();
        if (current.getNext() == null) {
          prev.setNext(null);
        }
      } else {
        checkNext = false;
      }
    }
  }
  contains(key) {
    let checkNext = true;
    let current = this.head;
    let prev = null;

    while (checkNext) {
      if (current.getNext() != null) {
        if (current.key === key) {
          return current;
        }
        current = current.getNext();
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
    if (this.head.next === null) return "Empty";
    let checkNext = true;
    let current = this.head.getNext();

    while (checkNext) {
      if (current.getNext() != null) {
        if (current.getValue() === value) {
          return current;
        }
        current = current.getNext();
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
    if (this.head.next === null) return "Empty";
    let checkNext = true;
    let current = this.head.getNext();
    let string = "";

    while (checkNext) {
      if (current.getNext() != null) {
        string += `( ${current.getValue()} ) -> `;
        current = current.getNext();
      } else {
        string += `( ${current.getValue()} ) -> null`;
        checkNext = false;
      }
    }
    return string;
  }

  insertAt(value, index) {
    if (this.head.next === null) return "Empty";
    if (index === 0) return this.head.next;
    let count = 1;
    let checkNext = true;
    let current = this.head.getNext();
    let prev = this.head;
    let node = new Node(value);

    while (checkNext) {
      if (current.getNext() != null) {
        if (count === index) {
          node.next = current;
          prev.next = node;
          return;
        }
        count++;
        prev = current;
        current = current.getNext();
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

  removeAt(index) {
    let listSize = list.size();

    if (index >= listSize) return console.log("invalid index");
    if (this.head.next === null) return console.log("Empty");
    let count = 0;
    let checkNext = true;
    let current = this.head.getNext();
    let prev = this.head;

    while (checkNext) {
      if (current.getNext() != null) {
        if (count === index) {
          prev.next = current.next;
          return;
        }
        count++;
        prev = current;
        current = current.getNext();
      } else {
        if (count === index) {
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

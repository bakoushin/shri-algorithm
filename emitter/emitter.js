'use strict';

class Emitter {
  constructor() {
    this._events = Object.create(null);
  }
  // O(1)
  on(event, handler) {
    let eventHandlers = this._events[event];
    if (!eventHandlers) {
      eventHandlers = new LinkedList();
      this._events[event] = eventHandlers;
    }
    eventHandlers.add(handler);
  }
  // O(1)
  off(event, handler) {
    this._events[event].delete(handler);
  }
  // O(n) n - size of handlers list
  emit(event) {
    this._events[event].forEach(handler => handler());
  }
}

class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._index = new Map();
  }
  add(value) {
    const node = this._newNode(value);
    this._index.set(value, node);
    if (!this._head) {
      this._head = node;
    }
    if (this._tail) {
      node.prev = this._tail;
      this._tail.next = node;
      this._tail = node;
    } else {
      this._tail = node;
    }
  }
  delete(value) {
    let node = this._index.get(value);
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  forEach(handler) {
    let node = this._head;
    while (node) {
      handler(node.value);
      node = node.next;
    }
  }
  _newNode(value) {
    return {
      value,
      prev: null,
      next: null
    };
  }
}

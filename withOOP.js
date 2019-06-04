console.clear();

/**
 * 사용자 정의 객체를 이터러블 프로그래밍으로 다루기
 *
 */

// 1. Map, Set

let m = new Map();
m.set('a', 1);
m.set('b', 2);
m.set('c', 3);

_.go(
  m,
  _.filter(([k, v]) => v % 2),
  entries => new Map(entries),
  console.log
);

let s = new Set();
s.add(10);
s.add(20);
s.add(30);
const _add = (a, b) => a + b;

console.log(_.reduce(_add, s));


// 2. Model, Collection

class Model {
  constructor(attrs = {}) {
    this._attrs = attrs;
  }

  get(k) {
    return this._attrs[k];
  }

  set(k, v) {
    this._attrs[k] = v;
    return this;
  }
}

class Collection {
  constructor(models = []) {
    this._models = models;
  }

  at(idx) {
    return this._models[idx];
  }
  add(model) {
    this._models.push(model);
    return this;
  }
  *[Symbol.iterator]() {
    // for (const model of this._models) {
    //   yield model;
    // }
    yield *this._models;
  }
}

const coll = new Collection();
coll.add(new Model({ id: 1, name: 'AA' }));
coll.add(new Model({ id: 2, name: 'BB' }));
coll.add(new Model({ id: 3, name: 'CC' }));
console.log(coll.at(2).get('name'));
console.log(coll.at(1).get('id'));

_.go(
  coll,
  L.map(m => m.get('name')),
  _.each(console.log)
);

// 3. Product, Producs
console.clear();

const addAll = _.reduce(_add);

class Product extends Model {}

class Products extends Collection {
  getPrices() {
    return L.map(p => p.get('price'), this);
  }
  totalPrice() {
    return addAll(this.getPrices());
  }
}

const products = new Products();
products.add(new Product({ id: 1, price: 10000}));
console.log(products.totalPrice());
products.add(new Product({ id: 2, price: 25000}));
console.log(products.totalPrice());
products.add(new Product({ id: 3, price: 35000}));
console.log(products.totalPrice());
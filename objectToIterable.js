// 객체를 이터러블 프로그래밍으로 다루기

const obj1 = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

// 1. values
console.log(Object.values(obj1));

L.values = function* (obj) {
  for (const k in obj) {
    yield obj[k];
  }
}

_.go(
  obj1,
  L.values,
  L.map(a => a + 10),
  L.take(2),
  _.reduce((a, b) => a + b),
);



// 2. entries
L.entries = function* (obj) {
  for ( const k in obj) {
    yield [k, obj[k]];
  }
};



// 3. keys
L.keys = function* (obj) {
  for (const k in obj) {
    yield k;
  }
};

// _.go(
//   obj1,
//   L.keys,
//   _.each(console.log)
// );


/**
 * 4. 어떠한 값이든 이터러블 프로그래밍으로 다루기
  - 이터러블로 이터러블 프로그래밍
  - 객체를 제네레이터를 이용해서 이터레이터로 만들어서 이터러블 프로그래맹
  - 어떤 제네레이터든 이터레이더로 만들어서 이터러블 프로그래그
 */

//  5. object

// const object = entries => _.go(
//   entries,
//   L.map((k, v) => ({ [k]: v })),
//   _.reduce(Object.assign)
// );

const object = entries =>
  _.reduce((obj, [k, v]) => (obj[k] = v, obj), {}, entries);

// 6. mapObject
const mapObject = (f, obj) => _.go(
  obj,
  L.entries,
  _.map(([k, v]) => [k, f(v)]),
  object
);

console.log(mapObject(a => a + 10, obj1))



// 7. pick
const obj2 = { a: 1, b: 2, c: 3, d: 4, e: 5 };

const pick = (ks, obj) => _.go(
  ks,
  L.map(k => [k, obj[k]]),
  L.reject(([k, v]) => v === undefined),
  object
);

console.log(pick(['b', 'c', 'z'], obj2))
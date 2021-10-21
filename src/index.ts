const R = require('ramda');
// 引数のObjectの型を継承する

class ObjectWrapper<T extends Object> {
  private _obj: T;

  /***
   * 引数のオブジェクトのコピーを this._objに設定
   */
  // インスタンス化したObjectの型
  constructor(_obj: T) {
    // スプレッド構文で_objのコピーを作成し設定
    this._obj = { ..._obj };
  }

  /**
   * this._objのコピーを返却
   * @return Object
   */
  get obj(): T {
    // this._objのコピーをスプレッド構文で作成しreturn
    return { ...this._obj };
  }

  /**
   * this._obj[key] に valを設定。keyがthis._objに存在しない場合、falseを返却
   * @param key オブジェクトのキー
   * @param val オブジェクトの値
   */
  // keyとvalの型はオブジェクトのもの
  // 考え方
  // インスタンス化したオブジェクトの型と仮定
  // type MyObj = {
  //   a: string;
  //   b: string;
  // };

  // keyofでMyObjeの型を取得できる
  // type MyObjKeys = keyof MyObj; // 'a'|'b' となる
  // => keyの型をインスタンス化したオブジェクトの型から持ってこれる

  // MyObjのvalueの型は、オブジェクトのkeyの値でアクセスすることで型を取得できる
  // MyObjが{ a: '01', b: '02' }だったとすると、 MyObj['a']でアクセスすることで、'01'のstring型となる
  // type MyObjValue = MyObj[keyof MyObj];
  // => valueの型をインスタンス化したオブジェクトの型から持ってこれる
  set(key: keyof T, val: T[keyof T]): boolean {
    this._obj[key] = val;
    return true;
  }

  /**
   * 指定したキーの値のコピーを返却
   * 指定のキーが存在しない場合 undefinedを返却
   * @param key オブジェクトのキー
   */
  // key オブジェクトのキーなので、undefinedを返却するパターンは型で防げる
  get(key: keyof T): T[keyof T] {
    const data = R.clone(this._obj[key]);
    console.log('value: ' + data);
    return data;
    // return { ...this._obj[key] };
  }

  /**
   * 指定した値を持つkeyの配列を返却。該当のものがなければ空の配列を返却。
   */
  // valはインスタンス化したオブジェクトの値
  // returnはオブジェクトのkeyの配列
  findKeys(val: T[keyof T]): (keyof T)[] {
    const result: (keyof T)[] = (Object.keys(this._obj) as (keyof T)[]).filter(
      (key: keyof T): boolean => {
        return this._obj[key] === val;
      }
    );
    return result;
  }
}

/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */
const obj1 = { a: '01', b: '02' };
const wrappedObj1 = new ObjectWrapper(obj1);

if (wrappedObj1.obj.a === '01') {
  console.log('OK: get obj()');
} else {
  console.error('NG: get obj()');
}

if (
  // wrappedObj1.set('c', '03') === false &&
  wrappedObj1.set('b', '04') === true &&
  wrappedObj1.obj.b === '04'
) {
  console.log('OK: set(key, val)');
} else {
  console.error('NG: set(key, val)');
}

if (
  wrappedObj1.get('b') === '04'
  //&& wrappedObj1.get('c') === undefined
) {
  console.log('OK: get(key)');
} else {
  console.error('NG: get(key)');
}
console.log(wrappedObj1.get('b'));

const obj2 = { a: '01', b: '02', bb: '02', bbb: '02' };
const wrappedObj2 = new ObjectWrapper(obj2);
const keys = wrappedObj2.findKeys('02');
console.log(keys);
if (
  wrappedObj2.findKeys('03').length === 0 &&
  keys.includes('b') &&
  keys.includes('bb') &&
  keys.includes('bbb') &&
  keys.length === 3
) {
  console.log('OK: findKeys(val)');
} else {
  console.error('NG: findKeys(val)');
}

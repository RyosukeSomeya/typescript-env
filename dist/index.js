"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// 引数のObjectの型を継承する
var ObjectWrapper = /** @class */ (function () {
    /***
     * 引数のオブジェクトのコピーを this._objに設定
     */
    // インスタンス化したObjectの型
    function ObjectWrapper(_obj) {
        // スプレッド構文で_objのコピーを作成し設定
        this._obj = __assign({}, _obj);
    }
    Object.defineProperty(ObjectWrapper.prototype, "obj", {
        /**
         * this._objのコピーを返却
         * @return Object
         */
        get: function () {
            // this._objのコピーをスプレッド構文で作成しreturn
            return __assign({}, this._obj);
        },
        enumerable: false,
        configurable: true
    });
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
    ObjectWrapper.prototype.set = function (key, val) {
        if (key in this._obj) {
            this._obj[key] = val;
            return true;
        }
        return false;
    };
    return ObjectWrapper;
}());
/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */
var obj1 = { a: '01', b: '02' };
var wrappedObj1 = new ObjectWrapper(obj1);
if (wrappedObj1.obj.a === '01') {
    console.log('OK: get obj()');
}
else {
    console.error('NG: get obj()');
}
if (
wrappedObj1.set('c', '03') === false &&
wrappedObj1.set('b', '04') === true &&
    wrappedObj1.obj.b === '04') {
    console.log('OK: set(key, val)');
}
else {
    console.error('NG: set(key, val)');
}
console.log(wrappedObj1.set('b', '03') )
// if (wrappedObj1.get('b') === '04' && wrappedObj1.get('c') === undefined) {
//   console.log('OK: get(key)');
// } else {
//   console.error('NG: get(key)');
// }
// const obj2 = { a: '01', b: '02', bb: '02', bbb: '02' };
// const wrappedObj2 = new ObjectWrapper(obj2);
// const keys = wrappedObj2.findKeys('02');
// if (
//   wrappedObj2.findKeys('03').length === 0 &&
//   keys.includes('b') &&
//   keys.includes('bb') &&
//   keys.includes('bbb') &&
//   keys.length === 3
// ) {
//   console.log('OK: findKeys(val)');
// } else {
//   console.error('NG: findKeys(val)');
// }

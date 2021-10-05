# typescript-env

typescript学習環境

## 使い方

### 1. 前提条件

node.js、npmが使用できる環境であること

### 2. typescipt_envディレクトリへ移動

```bash
cd typescript_env
```

### 3. Typescript関連モジュールをインストール

```bash
npm install
```

### 4. tsファイルをコンパイルする

ファイルを指定したコンパイル（tsconfig.jsonの設定内容は無視される。）

```bash
npx tsc ./src/index.ts
```

tsconfig.jsonの設定を反映させるコンパイル (ファイルの指定を行わない)

```bash
npx tsc
```

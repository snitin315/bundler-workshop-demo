const fs = require("fs");
const path = require("path");
const babelParser = require("@babel/parser");
const babelCore = require("@babel/core");
const traverse = require("@babel/traverse").default;

let ID = 0;

function createAsset(filename) {
  const content = fs.readFileSync(filename, "utf-8");

  const ast = babelParser.parse(content, {
    sourceType: "module",
  });

  const dependencies = [];

  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    },
  });

  const { code } = babelCore.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"],
  });

  return {
    id: ID++,
    filename,
    dependencies,
    code,
  };
}

function createGraph(entry) {
  const mainAsset = createAsset(entry);
  const queue = [mainAsset];

  for (const asset of queue) {
    const dirname = path.dirname(asset.filename);
    asset.mapping = {};

    asset.dependencies.forEach((relativePath) => {
      const absolutePath = path.join(dirname, relativePath);
      const child = createAsset(absolutePath);

      asset.mapping[relativePath] = child.id;
      queue.push(child);
    });
  }

  return queue;
}

function createBundle(graph) {
  let modules = ``;

  graph.forEach((module) => {
    modules += `${module.id}: [
      function(require, module, exports) {
        ${module.code}
      },
      ${JSON.stringify(module.mapping)},
    ],`;
  });
  const bundle = `
    (function(modules) {
      function require (id) {
        const [fn, mapping] = modules[id];
        function localRequire(relativePath) {
          return require(mapping[relativePath]);
        }
        const module = { exports: {} };
        fn(localRequire, module, module.exports);

        return module.exports;
      }

      

      require(0);
 
    })({
      ${modules}
    })
  `;

  return bundle;
}

const graph = createGraph("./src/entry.js");
const result = createBundle(graph);

if (!fs.existsSync("./dist")) {
  fs.mkdirSync("./dist");
}

fs.writeFileSync("./dist/bundle.js", result);

### webpack5 模块联邦 （module federation plugin）
模块联邦背后实现原理：宿主系统通过配置名称来引用远程模块，同时在编译阶段宿主系统是不需要了解远程模块的，仅仅在运行时通过加载远程模块的入口文件来实现；

微前端 构建一个现代web应用所需要的技术、策略和方法，具备多个团队独立开发、部署的特性；

### webpack构建流程
  - 初始化
    - 从配置文件和shell语句中读取和合并参数，得到最终参数
    - run 实例化，用上一步得到的参数初始化complier对象，加载所有配置的插件，执行对象的run方法开始执行编译
  - 编译构建
    - 确定入口，根据配置的entry找出所有入口文件
    - 编译模板，从入口文件出发，调用所有配置的loader对模块进行翻译，再找出该模块的依赖模块，递归本步骤知道所有的入口依赖文件都经过了本步的处理
    - 完成模块编译，经过上一步使用的loader翻译完所有的模块后，得到了每个模块被翻译后的最终内容以及他们之间的依赖关系
    - 输出资源 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk，再把每个 chunk 转换成一个单独的文件加载到输出列表，这一步是可以修改输出内容的最后一步
    - 输出完成 在确定好输出内容后，根据配置好的输出文件路径以及文件名，把文件内容写入到文件系统

  - 实现一个webpack流程
    - 读取入口文件
    - 分析入口文件，递归去读取模块所依赖的文件内容，生成AST语法树
    - 根据AST语法树，生成浏览器能够运行的代码

```javascript
const path = require('path');
const fs = require('fs');
const { getAST, getDependencies, transform } = require("./parser");
module.exports = class Complier {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  // 开启编译
  run() {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    this.module.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildModule(dependency))
      })
    })
    this.emitFiles();
  }
  // 构建模块相关
  buildModule(filename, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(filename);
    } else {
      const absolutePath = path.join(process.cwd(), './src', filename);
      ast = getAST(absolutePath)
    }
    return {
      filename,
      dependencies: getDependencied(ast), // 依赖列表
      transformCode: transform(ast),  // 转化后的代码
    }
  }
  // 输出文件
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';
    this.modules.map((_module) => {
      modules += `'${_module.filename}' : function(require, module, exports) {${_module.transformCode}},`;
    })

    const bundle = `
      (function(modules) {
        function required(fileName) {
          const fn = modules[fileName];
          const module = { exports: {}};
          fn(require, module, module,exports)
          return module.exports
        }
        require('${this.entry}')
      })({${modules}})
    `
    fs.writeFileSync(outputPath, bundle, "utf-8");
  }
}
```

```javascript
// @babel/parser：用于将源码生成AST
// @babel/traverse：对AST节点进行递归遍历
// babel-core/@babel/preset-env：将获得的ES6的AST转化成ES5
const fs = require("fs");
// const babylon = require("babylon");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("babel-core");
module.exports = {
  // 解析我们的代码生成AST抽象语法树
  getAST: (path) => {
    const source = fs.readFileSync(path, 'utf-8');
    return parser.parse(source, {
      sourceType: 'module' //表示我们要解析的是ES模块
    })
  },
  // 对AST节点进行递归遍历 遍历AST，将用到的依赖收集起来
  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration:({ node }) => {
        dependencies.push(node.source.value);
      }
    })
  },
  // 将获得的ES6的AST转化成ES5
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['env']
    })
    return code;
  }
}
```

经过webpack打包出来的是一个匿名闭包函数（IIFE）
modules是一个数组，每一项是一个模块初始化函数
__webpack_require__ 用来加载模块，返回module.exports
通过WEBPACK_REQUIRE_METHOD(0)来启动该程序
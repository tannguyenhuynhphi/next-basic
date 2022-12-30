const fs = require('fs');
const path = require('path');
const typescript = require('typescript');

/**
 * This function following package: i18next-scanner-typescript
 * @param {*} options
 * @returns
 */
function typescriptTransform(
  options = {
    tsOptions: {
      target: 'es2018',
    },
    extensions: ['.js', '.tsx'],
  }
) {
  return function transform(file, enc, done) {
    const { base, ext } = path.parse(file.path);

    if (options.extensions.includes(ext) && !base.includes('.d.ts')) {
      const content = fs.readFileSync(file.path, enc);

      const { outputText } = typescript.transpileModule(content, {
        compilerOptions: {
          target: 'es2018',
        },
        fileName: path.basename(file.path),
      });

      this.parser.parseTransFromString(outputText);
      this.parser.parseFuncFromString(outputText, { list: ['i18next.t', 'i18n.t', 't'] }, (key, options) => {
        options.defaultValue = `[i18n]${key}`;
        this.parser.set(key, options);
      });
    }

    done();
  };
}

module.exports = {
  input: ['components/**/*.{js,tsx}', '!components/**/*.test.{js,tsx}'],
  options: {
    debug: true,
    sort: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.tsx'],
    },
    trans: {
      extensions: [], // Parse Trans only in custom transformer
    },
    removeUnusedKeys: true,
    // Add your languages whatever you want
    lngs: ['en', 'vi'],
    resource: {
      loadPath: 'locales/{{lng}}/{{ns}}.json',
      savePath: 'locales/{{lng}}/{{ns}}.json',
    },
  },
  transform: typescriptTransform({
    extensions: ['.js', '.tsx'],
    tsOptions: {
      target: 'es5',
      module: 'esnext',
    },
  }),
};

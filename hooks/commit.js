'use strict';
const log = {
  info: (message) => {
    // eslint-disable-next-line no-console
    console.info('\u001B[36m', message);
    // eslint-disable-next-line no-console
    console.info('\u001B[0m');
  },
  error: (message) => {
    // eslint-disable-next-line no-console
    console.error('\u001B[31m', message);
    // eslint-disable-next-line no-console
    console.error('\u001B[0m');
  }
};
try {
  const { readFileSync } = require('fs');

  const path = require('path');

  const PACKAGE_FILE = path.resolve(__dirname, '..', 'package.json');
  const GITIGNORE_FILE = path.resolve(__dirname, '..', '.gitignore');

  // eslint-disable-next-line security/detect-unsafe-regex
  const testCommitMessage = (message) => /^(fix|style|chore|refactor|maintain|feat|merge|test|ci)\(.*\):(.+){5,}/
    .test(message);

  const testGitMessage = (message) => /^(Merge|Revert|Initial) */.test(message);

  // eslint-disable-next-line max-len
  const testMail = (email) => /.*@(adneom\.com|adneom\.lu|serial\.ch|worldofdigits\.com|bgficonsulting\.com|positivethinking\.co|positivethinking\.company)/.test(email);

  const testGitignore = (file) => /(package-lock\.json|yarn\.lock)/g.test(file);

  const testFixedSemver = (version) => /^\d+\.\d+\.\d+$/.test(version);

  const testDeps = (deps) => Object.keys(deps).reduce((accumulator, dep) => {
    const version = deps[dep];

    if (!testFixedSemver(version)) {
      accumulator.push(`${dep}: ${version}`);
    }

    return accumulator;
  }, []);

  if (testGitignore(readFileSync(GITIGNORE_FILE, 'utf-8'))) {
    throw new Error(
      `Nope!

      package-lock.json/yarn.lock must not be in .gitignore.

      Remove it from .gitignore.
      Commit your lock files.
      `
    );
  }

  const invalidDeps = testDeps(require(PACKAGE_FILE).dependencies);

  if (invalidDeps.length > 0) {
    throw new Error(
      `Nope!

      Use fixed semver in your package.json.

      Fix those:
      ${invalidDeps.join(', ')}
      `
    );
  }

  if (!process.env.HUSKY_GIT_PARAMS) {
    throw new Error('Can\'t get HUSKY_GIT_PARAMS');
  }

  if (!process.env.GIT_AUTHOR_EMAIL) {
    throw new Error('Can\'t get GIT_AUTHOR_EMAIL');
  }

  const commitMessage = readFileSync(process.env.HUSKY_GIT_PARAMS, 'utf8');

  if (!testGitMessage(commitMessage) && !testCommitMessage(commitMessage)) {
    throw new Error(
      `The commit was rejected because its message does not follow commit convention.
      You can see the convention here :
      https://gitlab.positivethinking.company/adneom-lab/knowledge-base/wikis/git`
    );
  }

  if (!testMail(process.env.GIT_AUTHOR_EMAIL)) {
    throw new Error('The commit was rejected because its author email does not match a PTC address');
  }

  log.info('Commit check passed');
} catch (error) {
  log.error(error);
  process.exitCode = 1;
}

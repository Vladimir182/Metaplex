/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "src");
const moduleNameMapper = fs.readdirSync(SRC).reduce(
  (memo, dir) => {
    const stat = fs.statSync(path.join(SRC, dir));
    if (stat.isDirectory()) {
      memo[`^${dir}/(.*)`] = `<rootDir>/src/${dir}/$1`;
      memo[`^${dir}`] = `<rootDir>/src/${dir}`;
    }
    return memo;
  },
  {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  }
);

const tModules = ["@solana", "@blocto", "@project-serum"].join("|");

module.exports = {
  testEnvironment: "node",
  moduleNameMapper,
  globals: {
    self: {},
  },
  transform: {
    "\\.tsx?$": "babel-jest",
    "\\.jsx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transformIgnorePatterns: [`<rootDir>/(node_modules)/(?!${tModules})`],
};

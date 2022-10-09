module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-empty": [2, "never"],
    "scope-max-length": [2, "always", 15],
    "subject-min-length": [2, "always", 10],
    "subject-max-length": [2, "always", 100],
  },
};

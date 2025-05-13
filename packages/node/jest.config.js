module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageThreshold: {
        global: {
            lines: 90,
            statements: 90,
            branches: 85,
            functions: 90
        }
    },
    testMatch: [
        "**/__tests__/**/*.test.ts"]
    ,
};

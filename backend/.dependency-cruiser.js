module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Evitar dependências circulares',
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: 'no-dependency-from-domain-to-outer',
      severity: 'error',
      comment: 'Camada domain não deve depender de nenhuma outra camada',
      from: {
        path: '^src/domain',
      },
      to: {
        path: '^src/(application|infrastructure|interface)',
      },
    },
    {
      name: 'no-dependency-from-application-to-outer',
      severity: 'error',
      comment: 'Camada application não deve depender de infrastructure ou interface',
      from: {
        path: '^src/application',
      },
      to: {
        path: '^src/(infrastructure|interface)',
      },
    },
    {
      name: 'no-dependency-from-interface-to-infrastructure',
      severity: 'error',
      comment: 'Camada interface não deve depender de infrastructure',
      from: {
        path: '^src/interface',
      },
      to: {
        path: '^src/(infrastructure)',
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsConfig: {
      fileName: './tsconfig.json',
    },
    combinedDependencies: true,
    includeOnly: '^src/',
    exclude: 'node_modules|test',
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
      },
    },
  },
};

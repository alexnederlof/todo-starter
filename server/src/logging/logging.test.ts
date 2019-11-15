import { getLogger } from './logging';

const nodeModule = module;

test('Logger name is set correctly', () => {
  const logger = getLogger(nodeModule);
  // tslint:disable-next-line:no-string-literal
  const meta = logger['defaultMeta'];
  expect(meta.logger_name).toBe('src/logging.test.ts');
});

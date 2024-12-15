import { sampleAction } from '../actions/sampleAction';

it('should return Hello, World!', async () => {
  const result = await sampleAction();
  expect(result).toBe('Hello, World!');
});

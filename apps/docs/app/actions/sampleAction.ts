'use server';

export const sampleAction = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, World!');
    }, 500);
  });
};

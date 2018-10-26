import { sortingInstancesPipe } from './sorting-table.pipe';

describe('sortingInstancesPipe', () => {
  it('create an instance', () => {
    const pipe = new sortingInstancesPipe();
    expect(pipe).toBeTruthy();
  });
});

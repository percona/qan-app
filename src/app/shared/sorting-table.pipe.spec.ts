import { SortingTablePipe } from './sorting-table.pipe';

describe('sortingInstancesPipe', () => {
  it('create an instance', () => {
    const pipe = new SortingTablePipe();
    expect(pipe).toBeTruthy();
  });
});

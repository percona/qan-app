import { HumanLabelsPipe } from './humanize-symbol-pipe';

describe('HumanLabelsPipe', () => {
  it('create an instance', () => {
    const pipe = new HumanLabelsPipe();
    expect(pipe).toBeTruthy();
  });
});

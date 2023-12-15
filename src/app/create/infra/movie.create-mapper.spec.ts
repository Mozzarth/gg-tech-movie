import { StringHelper } from '../../../shared/app/string.helper';
import { MovieCreateMapper } from '../app/movie.create-mapper';
import { MovieCreateInput } from '../app/movie.dto';

jest.mock('../../../shared/app/string.helper', () => ({
  StringHelper: {
    uuid: jest.fn(() => 'mocked-uuid'),
  },
}));

describe('MovieCreateMapper', () => {
  it('should map MovieCreateInput to Movie', () => {
    const input: MovieCreateInput = {
      watched: false,
      title: 'Test Movie',
      description: 'Test Description',
    };

    const result = MovieCreateMapper.build(input);

    expect(result.id).toEqual('mocked-uuid');
    expect(result.watched).toEqual(false);
    expect(result.title).toEqual(input.title);
    expect(result.description).toEqual(input.description);
    expect(StringHelper.uuid).toHaveBeenCalled();
  });
});

import { v4 as uuidv4 } from 'uuid';
import { StringHelper } from '../app/string.helper';

jest.mock('uuid');

describe('StringHelper', () => {
  describe('uuid', () => {
    it('should generate a valid UUID using uuidv4', () => {
      const mockedUuid = '29fbc56c-9430-49d0-b0cb-6c544113a7a4';
      (uuidv4 as jest.Mock).mockReturnValueOnce(mockedUuid);
      const result = StringHelper.uuid();

      expect(result).toMatch(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/,
      );
      expect(uuidv4).toHaveBeenCalled();
    });
  });
});

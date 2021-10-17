import { determineSortBy } from './sorting';

const testIncrementSortBy = (prevSortedBy, clickedHeader, userLangPref, expectedIncrements) => {
  let newSortedBy;

  expectedIncrements.forEach((expected) => {
    newSortedBy = determineSortBy({ prevSortedBy, clickedHeader, userLangPref });
    if (expected === null) {
      expect(newSortedBy).toBeNull();
    } else {
      expect(newSortedBy).toMatchObject(expected);
    }
    // eslint-disable-next-line no-param-reassign
    prevSortedBy = newSortedBy;
  });
};

test('clicking a simple header continuously goes from asc to desc to null', () => {
  const prevSortedBy = null;
  const clickedHeader = 'index';
  const userLangPref = 'en';

  const expectedIncrements = [
    { index: 'asc' },
    { index: 'desc' },
    null,
    { index: 'asc' },
  ];

  testIncrementSortBy(prevSortedBy, clickedHeader, userLangPref, expectedIncrements);
});

test('clicking a different header', () => {
  const prevSortedBy = { oldHeader: 'desc' };
  const clickedHeader = 'index';
  const userLangPref = 'en';

  const expectedIncrements = [
    { index: 'asc' },
    { index: 'desc' },
    null,
    { index: 'asc' },
  ];

  testIncrementSortBy(prevSortedBy, clickedHeader, userLangPref, expectedIncrements);
});

test("clicking a name header with EN langPref: NULL > { english_name: 'asc' } > { english_name: 'desc' } > NULL", () => {
  const prevSortedBy = null;
  const clickedHeader = 'name';
  const userLangPref = 'en';

  const expectedIncrements = [
    { english_name: 'asc' },
    { english_name: 'desc' },
    null,
    { english_name: 'asc' },
  ];

  testIncrementSortBy(prevSortedBy, clickedHeader, userLangPref, expectedIncrements);
});

test("clicking a name header with EN langPref after previous header: { index: 'desc' } > { english_name: 'asc' } > { english_name: 'desc' } > NULL", () => {
  const prevSortedBy = { index: 'desc' };
  const clickedHeader = 'name';
  const userLangPref = 'en';

  const expectedIncrements = [
    { english_name: 'asc' },
    { english_name: 'desc' },
    null,
    { english_name: 'asc' },
  ];

  testIncrementSortBy(prevSortedBy, clickedHeader, userLangPref, expectedIncrements);
});

test("clicking a name header with SE langPref: NULL > { swedish_name: 'asc' } > { swedish_name: 'desc' } > NULL", () => {
  const prevSortedBy = null;
  const clickedHeader = 'name';
  const userLangPref = 'se';

  const expectedIncrements = [
    { swedish_name: 'asc' },
    { swedish_name: 'desc' },
    null,
    { swedish_name: 'asc' },
  ];

  testIncrementSortBy(prevSortedBy, clickedHeader, userLangPref, expectedIncrements);
});

test("clicking a name header with SE langPref after previous header: { index: 'desc' } > { swedish_name: 'asc' } > { swedish_name: 'desc' } > NULL", () => {
  const prevSortedBy = { index: 'desc' };
  const clickedHeader = 'name';
  const userLangPref = 'se';

  const expectedIncrements = [
    { swedish_name: 'asc' },
    { swedish_name: 'desc' },
    null,
    { swedish_name: 'asc' },
  ];

  testIncrementSortBy(prevSortedBy, clickedHeader, userLangPref, expectedIncrements);
});

test("clicking a name header with both langPref: NULL > { english_name: 'asc' } > { english_name: 'desc' } > { swedish_name: 'asc' } > { swedish_name: 'desc' } > NULL", () => {
  const prevSortedBy = null;
  const clickedHeader = 'name';
  const userLangPref = 'both';

  const expectedIncrements = [
    { english_name: 'asc' },
    { english_name: 'desc' },
    { swedish_name: 'asc' },
    { swedish_name: 'desc' },
    null,
    { english_name: 'asc' },
  ];

  testIncrementSortBy(prevSortedBy, clickedHeader, userLangPref, expectedIncrements);
});

test("clicking a name header with both langPref after previous header: { index: 'desc' } > { english_name: 'asc' } > { english_name: 'desc' } > { swedish_name: 'asc' } > { swedish_name: 'desc' } > NULL", () => {
  const prevSortedBy = { index: 'desc' };
  const clickedHeader = 'name';
  const userLangPref = 'both';

  const expectedIncrements = [
    { english_name: 'asc' },
    { english_name: 'desc' },
    { swedish_name: 'asc' },
    { swedish_name: 'desc' },
    null,
    { english_name: 'asc' },
  ];

  testIncrementSortBy(prevSortedBy, clickedHeader, userLangPref, expectedIncrements);
});

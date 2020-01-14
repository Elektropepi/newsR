import {Article} from "./Article";
import {Content} from "./Content";

test('Citation at beginning correctly removed', () => {
  const actual: Content[] = [
    new Content("Am 25-Nov-19 um 17:01 schrieb blabla:", 0),
    new Content("lorem ipsum", 1),
    new Content("bla bla", 0),
    new Content("bla bla", 0),
  ];

  const expected: Content[] = [
    new Content("bla bla", 0),
    new Content("bla bla", 0),
  ];
  Article.stripStartEndCitationsFromContents(actual);
  expect(actual).toEqual(expected);
});

test('Citation at end correctly removed 1', () => {
  const actual: Content[] = [
    new Content("Hello", 0),
    new Content("", 0),
    new Content("I cannot see any change on the upstream ", 0),
    new Content("Am 24.11.2019 um 11:39 schrieb re: ", 0),
    new Content("basdf", 1),
    new Content("as", 1),
    new Content("", 0)
  ];
  const expected: Content[] = [
    new Content("Hello", 0),
    new Content("", 0),
    new Content("I cannot see any change on the upstream ", 0),
  ];
  Article.stripStartEndCitationsFromContents(actual);
  expect(actual).toEqual(expected);
});

test('Nested citation at end correctly removed 1', () => {
  const actual: Content[] = [
    new Content("Hello", 0),
    new Content("", 0),
    new Content("I cannot see any change on the upstream ", 0),
    new Content("Am 24.11.2019 um 11:39 schrieb re: ", 0),
    new Content("basdf", 1),
    new Content("as", 1),
    new Content("Am 25.11.2019 um 11:39 schrieb re: ", 1),
    new Content("lorem", 2),
    new Content("ipsum", 2),
    new Content("", 0)
  ];
  const expected: Content[] = [
    new Content("Hello", 0),
    new Content("", 0),
    new Content("I cannot see any change on the upstream ", 0),
  ];
  Article.stripStartEndCitationsFromContents(actual);
  expect(actual).toEqual(expected);
});

test('Citation at beginning removed 2', () => {
  const actual: Content[] = [new Content("Am 25-Nov-19 um 17:01 schrieb blabla:", 0),
    new Content(" Hello,", 1), new Content(" ", 1),
    new Content(" I cannot see any change on the upstream [1]. The latest commit I see is ", 1),
    new Content(" xxx..", 1), new Content(" ", 1),
    new Content(" Best regards,", 1), new Content(" blabla", 1), new Content(" ", 1),
    new Content(" [1] ", 1),
    new Content(" bla ", 1),
    new Content(" ", 1), new Content(" ", 1), new Content(" ", 1),
    new Content("", 0), new Content("Hi,", 0), new Content("", 0), new Content("it should be online now. Please" +
      " check and let me know in case it still ", 0), new Content("is not.", 0), new Content("", 0), new Content("Best wishes,", 0), new Content("BlaXX", 0)];
  const expected: Content[] = [
    new Content("", 0), new Content("Hi,", 0), new Content("", 0), new Content("it should be online now. Please check and let me know in case it still ", 0), new Content("is not.", 0), new Content("", 0), new Content("Best wishes,", 0), new Content("BlaXX", 0)
  ];
  Article.stripStartEndCitationsFromContents(actual);
  expect(actual).toEqual(expected);
});

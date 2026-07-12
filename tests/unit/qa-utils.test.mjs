import assert from 'node:assert/strict';
import test from 'node:test';
import { forbiddenPublicPatterns, percentile, sha256 } from '../../scripts/qa/qa-utils.mjs';

test('percentile uses nearest-rank calculation', () => {
  assert.equal(percentile([1, 2, 3, 4, 100], 95), 100);
  assert.equal(percentile([], 95), 0);
});

test('sha256 is deterministic', () => {
  assert.equal(
    sha256(Buffer.from('Local Web Works')),
    'b478a6425fe0ad19ccdb1548f64e11e08b63b1efcd472b9979b14970a9d12bb6'
  );
});

test('forbidden public copy catches stale and placeholder claims', () => {
  for (const value of ['Most selected', 'S$499', '[FULL LEGAL NAME]', 'redesigned in seven days']) {
    assert.ok(forbiddenPublicPatterns.some((pattern) => pattern.test(value)), value);
  }
  assert.ok(!forbiddenPublicPatterns.some((pattern) => pattern.test('Recommended')));
});

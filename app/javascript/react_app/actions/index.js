const BASE_URL = '/api/v1';

// actions
export const FETCH_FAMILIES = 'FETCH_FAMILIES';
export const FETCH_FAMILY = 'FETCH_FAMILY';
export const MARK_SEEN = 'MARK_SEEN';

export function fetchFamilies() {
  const url = BASE_URL + '/families'

  const promise = fetch(url, { credentials: 'same-origin' })
  .then(r => r.json());

  return {
    type: FETCH_FAMILIES,
    payload: promise
  }
}

export function fetchFamily(family) {
  const url = BASE_URL + `/families/${family}`;

  const promise = fetch(url, { credentials: "same-origin" }).then((r) =>
    r.json()
  );

  return {
    type: FETCH_FAMILY,
    payload: promise,
  };
}

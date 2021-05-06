const BASE_URL = '/api/v1';

// actions
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const FETCH_GROUP = 'FETCH_GROUP';
export const MARK_SEEN = 'MARK_SEEN';

export function fetchGroups() {
  const url = BASE_URL + '/groups'

  const promise = fetch(url, { credentials: 'same-origin' })
  .then(r => r.json());

  return {
    type: FETCH_GROUPS,
    payload: promise
  }
}

export function fetchGroup(group) {
  const url = BASE_URL + `/families/${group}`;

  const promise = fetch(url, { credentials: "same-origin" }).then((r) =>
    r.json()
  );

  return {
    type: FETCH_GROUP,
    payload: promise,
  };
}

export function markSeen(birdScientificName) {
  const url = BASE_URL + `/birds/${birdScientificName}/observations`;
  const csrfToken = document.querySelector('meta[name="csrf-token"]').attributes.content.value;

  const promise = fetch(url,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      credentials: "same-origin"
    }).then((r) => r.json()
  );

  return {
    type: MARK_SEEN,
    payload: promise,
  };
}

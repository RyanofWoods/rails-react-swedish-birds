const BASE_URL = '/api/v1';
const LOCAL_SETTINGS = 'swedishBirdsSettings'

// actions
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const FETCH_GROUP = 'FETCH_GROUP';
export const MARK_SEEN = 'MARK_SEEN';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';

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

export function loadSettings() {
  // defaults
  let groupBy = 'family' 
  let seenConfirmation = true;

  if (localStorage.getItem(LOCAL_SETTINGS)) {
    let parsedSettings = '';

    try {
      const x = localStorage.getItem(LOCAL_SETTINGS);
      parsedSettings = JSON.parse(x);
    } catch (err) {
      console.log(err.message);
    }

    // set it if it exists, otherwise use default
    groupBy = parsedSettings.groupBy || groupBy;

    // cannot do shorthand || for this as it could be falsy
    if (parsedSettings.seenConfirmation !== undefined) {
      seenConfirmation = localStorage.getItem(LOCAL_SETTINGS).seenConfirmation;
    }
  }

  const settings = { groupBy, seenConfirmation }

  return {
    type: LOAD_SETTINGS,
    payload: settings,
  };
}

export function saveSettings(settings) {
  // save in localStorage
  localStorage.setItem(LOCAL_SETTINGS, JSON.stringify(settings));

  // and save in redux state
  return {
    type: SAVE_SETTINGS,
    payload: settings,
  };
}

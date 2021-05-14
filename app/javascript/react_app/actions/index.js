const BASE_URL = '/api/v1';

export const LOCAL_SETTINGS = 'swedishBirdsSettings';

// actions
export const FETCH_GROUPS = 'FETCH_GROUPS';
export const FETCH_GROUP = 'FETCH_GROUP';
export const MARK_SEEN = 'MARK_SEEN';
export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';

export function fetchGroups(groupBy, populationThreshold = 9) {
  // group_by param must be singular
  const url = BASE_URL + `/groups?group_by=${groupBy}&population_category_at_least=${populationThreshold}`;

  const promise = fetch(url, { credentials: 'same-origin' })
    .then(r => r.json());

  return {
    type: FETCH_GROUPS,
    payload: promise
  }
}

export function fetchGroup(groupedBy, groupName) {
  const url = BASE_URL + `/${groupedBy}/${groupName}`;
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

const parseLocalStorageSettings = () => {
  const settings = localStorage.getItem(LOCAL_SETTINGS);

  if (settings) {
    try {
      return JSON.parse(settings)
    } catch (err) {
      console.log(err.message);
      return {}
    }
  } else {
    return {}
  }
}

export function loadSettings() {
  const userSettings = parseLocalStorageSettings();

  return {
    type: LOAD_SETTINGS,
    payload: userSettings,
  };
}

export function saveSettings(settings) {
  return {
    type: SAVE_SETTINGS,
    payload: settings,
  };
}

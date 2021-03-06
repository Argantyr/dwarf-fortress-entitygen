import React  from 'react';
import { capitalize } from "../../assets/utils";
import { racePresets, raceEnum, languageEnum } from "../../assets/constants";
/**
 * Displays the current naming pool with options to choose a new preset.
 * If the name pool does not match any pool, displays "Custom"
 * @param {string} current [[positive pools], [negative pools]] 
 * @param {function} callback - Sets state
 */
export function getPresetMenu(current, callback) {
  const matchingRace = getCurrentPreset(current);
  const customOption = <option selected="selected" disabled={true}>Custom</option>
  return(
    <div>
      <span className="text-minor">Preset </span>
      <select
        onChange={event => callback(event.target.value)}
      >
        {matchingRace === "custom" ? customOption : null}
        {/* fill the dropdown box with the values from the race list */}
        {raceEnum.map((e, i) => (
          <option
            value={e}
            selected={(e === matchingRace) ? "selected" : ""}
            key={`preset-op-${i}`}
          >
            {capitalize(e)}
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * Checks the current selected pools and compares it to the preset tag pools
 * @returns {string} the name of the race that matches the current tags or "custom" if there are no matches
 * @param {Array<Array<string>>} currentTags [[positive pools], [negative pools]]
 * @requires racePresets constant for reference
 */
function getCurrentPreset(currentTags){
  const current = currentTags.map(e => e.sort());
  let found = "";
  raceEnum.forEach((race) => {
    const checkagainst = racePresets[race].map(e => e.sort());
    if(JSON.stringify(current) === JSON.stringify(checkagainst)){
      found = race;
    }
  });
  return found ? found : "custom";
}

/**
 * renders a drop-down menu with all available languages. 
 * displays the language name, but internally uses race names for consistency
 * @param {string} current - The currently selected option 
 * @param {function} callback - Sets the selected language to state
 */
export function getLanguageMenu(current, callback) {
  return(
    <div>
      <span className="text-minor">Language </span>
      <select
        onChange={event => callback(event.target.value)}
      >
        {/* fill the dropdown box with the values from the race list */}
        {raceEnum.map((e, i) => (
          <option
            value={e}
            selected={(current === e) ? "selected" : ""}
            key={`lang-op-${i}`}
          >
            {capitalize(languageEnum[i])}
          </option>
        ))}
      </select>
    </div>
  );
}
import React  from 'react';
import { getSliderList } from "./trinarySliderList";
import { getPresetMenu, getLanguageMenu } from "./dropDownList";
import "../NamePoolModal.scss";

/**
 *
 * @param {object} stuffObj
 */
export function getPoolState(stuffObj) {
  const { allTokens, currentLanguage, currentTokens, setRace, setLang, handleSwitch, toggleModal, clear } = stuffObj;
  return (
    <div className="token-list">
      <div className="token-list-head">
          {getPresetMenu(currentTokens, setRace)}
          {getLanguageMenu(currentLanguage, setLang)}
        <div className="flex-row modal-buttonbox">
          <button onClick={() => clear()}>
            Clear
          </button>
          <button onClick={() => toggleModal()}>
            X
          </button>
        </div>
      </div>
      {getSliderList(allTokens, currentTokens, handleSwitch)}
    </div>
  );
}

import React, { Component } from 'react';
import Modal from "@material-ui/core/Modal";

import "./NameModule.scss";
import { getPoolState } from './partials/poolModal';
import { setCurrentLanguage, setCurrentRace } from "./setters/dropDownFuncs";
import { handleSwitch } from './setters/sliderFuncs'
import { getNameBlock } from './partials/nameBlock';
import { getName } from "./partials/getName";
import { allNameTokens } from "./assets/languages";
import { racePresets } from "./assets/languages";

class NameModule extends Component {
  constructor(){
    super();
    this.state = {
      entityName: {
        first: "",
        last1: "",
        last2: "",
        firstHeld: false,
        lastHeld: false
      },
      namePool: [],
      selectedCurrent: racePresets.dwarf,
      selectedPrev: [],
      selectedLanguage: "dwarf",
      races: Object.keys(racePresets),
      allNameTokens: allNameTokens.sort(),
      modalIsOpen: false
    };
    this.clearSelected = this.clearSelected.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getNameBlock = getNameBlock.bind(this);
    this.setCurrentRace = setCurrentRace.bind(this);
    this.setCurrentLanguage = setCurrentLanguage.bind(this);
    this.getPoolState = getPoolState.bind(this);
    this.handleSwitch = handleSwitch.bind(this);
  }

  componentDidMount(){
  }

  clearSelected() {
    this.setState({ selectedCurrent: [[], []] });
  }


  toggleModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  }

  handleNameGen() {
    // get new names
    const nameObj = getName(this.state.selectedCurrent, this.state.selectedLanguage)
    const { first, last1, last2 } = nameObj;
    // clone old name before setting new one
    let newEntityName = {
      first: this.state.entityName.first,
      last1: this.state.entityName.last1,
      last2: this.state.entityName.last2,
      firstHeld: this.state.entityName.firstHeld,
      lastHeld: this.state.entityName.lastHeld
    }
    // 
    if(!this.state.entityName.lastHeld){
      newEntityName.last1 = last1
      newEntityName.last2 = last2;
    };
    if(!this.state.entityName.firstHeld){
      newEntityName.first = first;
    };
    this.setState({entityName: newEntityName});
  }

  render() {

    const stuffObj = {
      races: this.state.races,
      allTokens: this.state.allNameTokens,
      currentLanuage: this.state.selectedLanguage,
      currentTokens: this.state.selectedCurrent,
      setRace: this.setCurrentRace,
      setLang: this.setCurrentLanguage,
      handleSwitch: this.handleSwitch,
      toggleModal: this.toggleModal,
      clear: this.clearSelected
    };

    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="entity-module">
          {this.getNameBlock()}
          <div className="entity-module-controls">
            <button
              className="button-entity-name"
              onClick={() => this.handleNameGen()}
            >
              Get Name
            </button>
            <button
              className="button-entity-name"
              onClick={() => this.toggleModal()}
            >
              Settings
            </button>
          </div>
        </div>
        <Modal open={this.state.modalIsOpen} onClose={() => this.toggleModal()}>
          {getPoolState(stuffObj)}
        </Modal>
      </div>
    );
  }
}

export default NameModule;
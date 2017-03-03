import React, { Component } from 'react';
import * as MUI from 'material-ui'
import styles from './CrimeSummaryStyles';
import InfoBox from '../InfoBox/InfoBox'
import Face from 'material-ui/svg-icons/action/face';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import RecordVoiceOver from 'material-ui/svg-icons/action/record-voice-over';
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';

class CrimeSummary extends Component {
  
  componentWillMount() {
    //this.props.getDonorDetail(this.props.params.id);
  }

  //user-default
  render() {
    return (
      <div style={styles.crimeSummaryContainer}>
        <div style={styles.infoBoxDiv}>
          <InfoBox Icon={Assessment}
                    color={cyan600}
                    title="Total"
                    value="460"
            />
        </div>
        <div style={styles.infoBoxDiv}>
          <InfoBox Icon={Fingerprint}
                    color={pink600}
                    title="Crime Report"
                    value="460"
            />
        </div>
        <div style={styles.infoBoxDiv}>
          <InfoBox Icon={Face}
                    color={purple600}
                    title="Missing Persons"
                    value="460"
            />
        </div>
        <div style={styles.infoBoxDiv}>
          <InfoBox Icon={RecordVoiceOver}
                    color={orange600}
                    title="Complaints"
                    value="460"
            />
        </div>
        <div style={styles.clear}/>
      </div>
    );
  }
}

export default CrimeSummary

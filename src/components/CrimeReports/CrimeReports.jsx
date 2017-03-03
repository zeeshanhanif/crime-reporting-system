import React, { Component } from 'react';
import * as MUI from 'material-ui'
import styles from './CrimeReportsStyles';
import InfoBox from '../InfoBox/InfoBox'
import Face from 'material-ui/svg-icons/action/face';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import RecordVoiceOver from 'material-ui/svg-icons/action/record-voice-over';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';


class CrimeReports extends Component {
  
  componentWillMount() {
    //this.props.getDonorDetail(this.props.params.id);
  }

  //user-default
  render() {
    return (
      <div style={styles.crimeReportsContainer}>
        <MUI.Tabs>
          <MUI.Tab
            icon={<Fingerprint />}
            label="Crimes">
              <MUI.List>
                <div key={"donor.uid"}>
                    <MUI.ListItem                    
                        leftAvatar={<MUI.Avatar icon={<Fingerprint />} />}
                        rightIcon={<ActionInfo />}
                        primaryText={"donor.fullName"}
                        secondaryText={"Blood Group: "}
                      />
                      <MUI.Divider />
                </div>                
              </MUI.List>
          </MUI.Tab>
          <MUI.Tab
            icon={<Face />}
            label="Missing Persons">
            <MUI.List>
                <div key={"donor.uid"}>
                    <MUI.ListItem                    
                        leftAvatar={<MUI.Avatar icon={<Face />} />}
                        rightIcon={<ActionInfo />}
                        primaryText={"donor.fullName"}
                        secondaryText={"Blood Group: "}
                      />
                      <MUI.Divider />
                </div>                
              </MUI.List>
          </MUI.Tab>
          <MUI.Tab
            icon={<RecordVoiceOver />}
            label="Complaints">
            <MUI.List>
                <div key={"donor.uid"}>
                    <MUI.ListItem                    
                        leftAvatar={<MUI.Avatar icon={<RecordVoiceOver />} />}
                        rightIcon={<ActionInfo />}
                        primaryText={"donor.fullName"}
                        secondaryText={"Blood Group: "}
                      />
                      <MUI.Divider />
                </div>                
              </MUI.List>
          </MUI.Tab>
        </MUI.Tabs>
      </div>
    );
  }
}

export default CrimeReports

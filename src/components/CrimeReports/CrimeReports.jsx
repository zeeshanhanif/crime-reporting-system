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
//"Crime"
//<Fingerprint />
  displayPrimaryTextBasedOnReportType(report){
    
    if(report.reportType==="Crime" || report.reportType==="Complaint"){
      return report.title;
    }
    else {
      return report.fullName;
    }
  }

  displaySecondyTextBasedOnReportType(report){    
    if(report.reportType==="Crime" || report.reportType==="Complaint"){
      return report.description;
    }
    else {
      return report.identification;
    }
  }

  renderList(reportType,iconComponent){
    return (
          <MUI.List>
              {
                this.props.reportList
                  .filter(report=>report.reportType===reportType)
                  .map(report=>{
                  return (
                    <div key={report.key}>
                      <MUI.ListItem
                        leftAvatar={<MUI.Avatar icon={iconComponent} />}
                        rightIcon={<ActionInfo />}
                        primaryText={this.displayPrimaryTextBasedOnReportType(report)}
                        secondaryText={this.displaySecondyTextBasedOnReportType(report)}
                      />
                      <MUI.Divider />
                    </div>  
                  );
                })
              }             
            </MUI.List>
        );
  }


  renderComplaintsTabIfAuthenticated(){
    let complaintsEle = (
        <MUI.Tab
            icon={<RecordVoiceOver />}
            label="Complaints">              
              {
                (()=>{
                  var list = this.props.reportList.filter(report=>report.reportType==="Complaint");
                  return list.length > 0 ? this.renderList("Complaint",<Face />) 
                  : 
                  <div style={{margin:20}}>Luckly No Complaint for this city</div>
                })()
              }          
          </MUI.Tab>);
    if(this.props.isAuthenticated){
      return complaintsEle;
    }
  }

  //user-default
  //{this.renderList("Missing Person",<Face />)}
  //{this.renderList("Complaint",<RecordVoiceOver />)} 
  render() {
    console.log("test");
    return (
      <div style={styles.crimeReportsContainer}>
        <MUI.Tabs>
          <MUI.Tab
            icon={<Fingerprint />}
            label="Crimes">
              {
                (()=>{
                  var list = this.props.reportList.filter(report=>report.reportType==="Crime");
                  return list.length > 0 ? this.renderList("Crime",<Fingerprint />) 
                  : 
                  <div style={{margin:20}}>Luckly No Crime Report for this city</div>
                })()
              }
          </MUI.Tab>
          <MUI.Tab
            icon={<Face />}
            label="Missing Persons">            
            {
                (()=>{
                  var list = this.props.reportList.filter(report=>report.reportType==="Missing Person");
                  return list.length > 0 ? this.renderList("Missing Person",<Face />) 
                  : 
                  <div style={{margin:20}}>Luckly No Missing Person Report for this city</div>
                })()
              }
          </MUI.Tab>
          {this.renderComplaintsTabIfAuthenticated()}
        </MUI.Tabs>
      </div>
    );
  }
}

export default CrimeReports

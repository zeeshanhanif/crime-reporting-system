import React, { Component,PropTypes } from 'react';
import * as MUI from 'material-ui'
import styles from './CrimeReportsStyles';
import Face from 'material-ui/svg-icons/action/face';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import RecordVoiceOver from 'material-ui/svg-icons/action/record-voice-over';
import ActionInfo from 'material-ui/svg-icons/action/info';


class CrimeReports extends Component {
  
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(){
    super();
    this.handleListItemClick = this.handleListItemClick.bind(this)
  }

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
/*
  handleListItemClick = (reportCity,reportId) => {
    console.log("test in >>>>>>>>><<<<<<<<<<<<<<")
    this.context.router.push("/reportItem/"+reportId);
  }*/

  //handleListItemClick = (reportId) =>this.context.router.push("/reportItem/"+reportId);
  handleListItemClick = (reportCity,reportId) => this.context.router.push({pathname:"/reportItem/"+reportId,state:{reportCity:reportCity}});
  renderList(reportType,iconComponent){
    const reportList = this.props.showSelfReports?this.props.myReportList:this.props.reportList;
    return (
          <MUI.List>
              {
                reportList
                  .filter(report=>report.reportType===reportType)
                  .map(report=>{
                  return (
                    <div key={report.key}>
                      <MUI.ListItem
                        leftAvatar={<MUI.Avatar icon={iconComponent} />}
                        rightIcon={<ActionInfo />}
                        primaryText={this.displayPrimaryTextBasedOnReportType(report)}
                        secondaryText={this.displaySecondyTextBasedOnReportType(report)}
                        onTouchTap={()=>this.handleListItemClick(report.city,report.key)}
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
    const reportList = this.props.showSelfReports?this.props.myReportList:this.props.reportList;
    let complaintsEle = (
        <MUI.Tab
            icon={<RecordVoiceOver />}
            label="Complaints">              
              {
                (()=>{
                  var list = reportList.filter(report=>report.reportType==="Complaint");
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
    const reportList = this.props.showSelfReports?this.props.myReportList:this.props.reportList;
    return (
      <div style={styles.crimeReportsContainer}>
        <MUI.Tabs>
          <MUI.Tab
            icon={<Fingerprint />}
            label="Crimes">
              {
                (()=>{
                  var list = reportList.filter(report=>report.reportType==="Crime");
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
                  var list = reportList.filter(report=>report.reportType==="Missing Person");
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

import React, { Component } from 'react';
import * as MUI from 'material-ui'
import styles from './ReportDetailStyles';
import Person from 'material-ui/svg-icons/social/person';
import { ReportMiddelware } from '../../store'
import { connect } from 'react-redux';
import Moment from 'react-moment';

function mapStateToProps(state) {
    return {
        reportDetail: state.ReportReducer.reportDetail,
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getReportDetial: (reportCity,reportId)=> dispatch(ReportMiddelware.getReportDetial(reportCity,reportId)),
        updateStatus: (reportObj,newStatus)=> dispatch(ReportMiddelware.updateReportStatus(reportObj,newStatus))
    };
}

class ReportDetail extends Component {
  componentWillMount() {
    this.props.getReportDetial(this.props.location.state.reportCity,this.props.params.id);
  }


  renderReportBasedOnType(reportDetail){
    var date = new Date();
    if(reportDetail.dateSinceMissing) {
      date = new Date(reportDetail.dateSinceMissing);
    }
    var missingPersonEle = (
      <div>
          <div>Identification : {reportDetail.identification}</div>
          <div>Contatct No. : {reportDetail.contactNo}</div>
          <div>Age : {reportDetail.age}</div>
          <div>Date Since Missing : <Moment format="YYYY/MM/DD">{date.toString()}</Moment></div>
          <div>Address : {reportDetail.address}</div>
      </div>
    );
    var complaints = (
      <div>
          <div>Title : {reportDetail.title}</div>
          <div>Description : {reportDetail.description}</div>
      </div>
    );

    var crimes = (
      <div>
          {complaints}
      </div>
    );

    if(reportDetail.reportType==="Missing Person"){
      return missingPersonEle;
    }
    else if(reportDetail.reportType==="Crime"){
      return crimes;
    }
    else {
      return complaints;
    }
  }

  handleSave (){
    //alert(this.refs.status.getValue());
    this.props.updateStatus(this.props.reportDetail,this.refs.status.getValue());
  }
  renderStatusUpdateBoxForAdmin(){
    var statusUpdate = (
      <div>
        <MUI.Divider/>
        <MUI.Card>
          <MUI.CardText >
            <MUI.TextField
              ref="status"
              name="status"
              hintText="Status Updat"
              floatingLabelText="Status Update"
              fullWidth={true}
              required={true}
            />
            <MUI.RaisedButton label="Update"
                          primary={true}
                          onTouchTap={this.handleSave.bind(this)}
                          />
          </MUI.CardText>
        </MUI.Card>
        
      </div>
    );
    if(this.props.isAuthenticated && this.props.authUser.isAdmin){
      return statusUpdate;
    }

    
  }
  renderStatusList(reportDetail){
    var statusListKeys=[]
    if(reportDetail.statuslist){
      statusListKeys = Object.keys(reportDetail.statuslist);
    }
    var statusEle = (
      <div>
        <div style={{margin:20}}>
          Status Updates From Admin
        </div>
        {
            statusListKeys.map(key=>{
              return (
              <MUI.Card key={key}>
                <MUI.CardText >
                  {reportDetail.statuslist[key].statusMessage}
                </MUI.CardText>
              </MUI.Card>);
            })
        }
      </div>
    );
    return statusEle;
  }
  //user-default
  render() {
    console.log("test in reporit detail>>>>>>>>>>>>>>>>>>>.....",this.props);
    const {reportDetail} = this.props;
    //const date = new Date();
    const reportType = reportDetail.reportType;
    //<div>Date Of Birth : {date.toString()}</div>
    return (
      <div style={styles.reportDetailContainer}>
        <MUI.Card>
          <MUI.CardHeader
            title={reportType==="Missing Person"?reportDetail.fullName:reportDetail.title}
            subtitle={reportDetail.city}
            avatar={<MUI.Avatar icon={<Person />}/>}
          />
          <MUI.CardText >
            {this.renderReportBasedOnType(reportDetail)}
          </MUI.CardText>
        </MUI.Card>
        <MUI.Divider />
        
        {this.renderStatusList(reportDetail)}
        
        {this.renderStatusUpdateBoxForAdmin(reportDetail)}
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ReportDetail)

import React, { Component,PropTypes } from 'react';
import styles from './FileReportStyles';
import * as MUI from 'material-ui'
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { ReportMiddelware } from '../../store'

function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser,
        cityList : state.ReportReducer.cityList,
        reportCounts : state.ReportReducer.reportCounts,
        isReportSubmited : state.ReportReducer.isReportSubmited
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fileReport : (reportObj,reportCounts)=>dispatch(ReportMiddelware.fileReport(reportObj,reportCounts)) 
        //logout: () => dispatch(AuthMiddleware.logout())
    };
}

class FileReport extends Component {

  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  constructor(props){
    super();
    console.log("component props ",props);
    this.state = {
      reportType : "",
      city:"",
      title:"",
      description:"",
      picture:"",
      fullName:"",
      address:"",
      identification:"",
      contactNo:"",
      ///age:0,
      dateSinceMissing:new Date(),
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeInDate = this.handleChangeInDate.bind(this);
  }


  componentWillUpdate(){
    console.log("test>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    setTimeout(()=> {
      if(this.props.isReportSubmited){
        console.log("isReportSubmited true >>>>>>>>>>>>>>>>>>>>>");
          //this.context.router.push("/dashboard");
      }
    },0);
  }
  handleReportChange = (event, index, value) => {
    this.setState({reportType:value});
  }

  handleCityChange = (event, index, value) => this.setState({city:value});
  //handleChange = (event, index, value) => this.setState({bloodGroupValue:value});

  handleChangeInput(e){
    this.setState({[e.target.name]:e.target.value});
  }

  handleChangeInDate(e,newDate){
    this.setState({dateSinceMissing:newDate});
  }


  handleSave(){
    var reportObj = {
      reportType: this.state.reportType,
      city: this.state.city,
      userId: this.props.authUser.uid
    };

    if(this.state.reportType==="Complaint" || this.state.reportType==="Crime") {
      reportObj.title = this.state.title;
      reportObj.description = this.state.description;
    }

    if(this.state.reportType==="Crime"){
      reportObj.picture = this.state.picture;
    }

    if(this.state.reportType==="Missing Person"){
      reportObj.fullName = this.state.fullName;
      reportObj.address = this.state.address;
      reportObj.age = this.state.age;
      reportObj.identification = this.state.identification;
      reportObj.dateSinceMissing = this.state.dateSinceMissing.getTime();
    }
    this.props.fileReport(reportObj,this.props.reportCounts);
  }


  renderPictureUploadField(){
    return (
        <MUI.TextField
            ref="picture"
            name="picture"
            hintText="Picture"
            floatingLabelText="Picture"
            value={this.state.picture}
            onChange={this.handleChangeInput}
            fullWidth={true}
          />)
  }

  renderReportSpecificFields(reportType){
    if(reportType!=="Missing Person") {
      const fields = (
        <div>
          <MUI.TextField
              ref="title"
              name="title"
              hintText="Title"
              floatingLabelText="Title"
              value={this.state.title}
              onChange={this.handleChangeInput}
              fullWidth={true}
              required={true}
            />
          <MUI.TextField
              ref="description"
              name="description"
              hintText="Description"
              floatingLabelText="Description"
              value={this.state.description}
              onChange={this.handleChangeInput}
              fullWidth={true}
            /> 
            {reportType==="Crime"?this.renderPictureUploadField():null}
        </div>
      );
      return fields;
    }
    else {
      return this.renderMissingPersonFields();
    }
  }

  renderMissingPersonFields(){
    const fields = (
      <div>
        <MUI.TextField
            ref="fullName"
            name="fullName"
            hintText="Full Name"
            floatingLabelText="Full Name"
            value={this.state.fullName}
            onChange={this.handleChangeInput}
            fullWidth={true}
          />
          <MUI.TextField
            ref="address"
            name="address"
            hintText="Address"
            floatingLabelText="Address"
            value={this.state.address}
            onChange={this.handleChangeInput}            
            fullWidth={true}
          />
          <MUI.TextField
            ref="age"
            name="age"
            hintText="Age"
            floatingLabelText="Age"
            value={this.state.age}
            onChange={this.handleChangeInput}            
            fullWidth={true}
            type="number"
          />
          <MUI.TextField
            ref="identification"
            name="identification"
            hintText="Identification"
            floatingLabelText="Identification"
            value={this.state.identification}
            onChange={this.handleChangeInput}            
            fullWidth={true}
          />
          <MUI.DatePicker
            ref="dateSinceMissing"
            hintText="Date Since Missing"
            floatingLabelText="Date Since Missing"
            value={this.state.dateSinceMissing}
            onChange={this.handleChangeInDate}
            fullWidth={true}/>

          {this.renderPictureUploadField()}
      </div>
    );

    return fields;    
  }

  render() {
    return (
      <div style={styles.fileReportContainer}>
        <MUI.Paper style={styles.paper}>
          <h3 style={styles.title}>File A Report</h3>
          <MUI.Divider/>
          <form>

            <MUI.SelectField
              ref="reportType"
              floatingLabelText="Report Type"
              value={this.state.reportType}
              fullWidth={true}
              autoWidth={true}
              onChange={this.handleReportChange.bind(this)}>
                <MUI.MenuItem key="complaint" value="Complaint" primaryText="Complaint"/>
                <MUI.MenuItem key="crime" value="Crime" primaryText="Crime"/>
                <MUI.MenuItem key="missingperson" value="Missing Person" primaryText="Missing Person"/>
            </MUI.SelectField>
            <MUI.SelectField
              ref="city"
              floatingLabelText="City"
              value={this.state.city}
              fullWidth={true}
              autoWidth={true}
              onChange={this.handleCityChange.bind(this)}>
                {
                  this.props.cityList.map(city=>{
                    return <MUI.MenuItem key={city} value={city} primaryText={city}/>
                  })
                }
            </MUI.SelectField>

            {this.renderReportSpecificFields(this.state.reportType)}
          
          <div style={styles.buttons}>
            <Link to="/">
              <MUI.RaisedButton label="Cancel"/>
            </Link>

            <MUI.RaisedButton label="Save"
                          style={styles.saveButton}
                          onTouchTap={this.handleSave}
                          primary={true}/>
          </div>
        </form>

          <div style={styles.clear}/>
        </MUI.Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FileReport);
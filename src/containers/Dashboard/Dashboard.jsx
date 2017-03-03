import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import { CrimeSummary, CrimeReports} from '../../components'
import * as MUI from 'material-ui'
import { ReportMiddelware } from '../../store'


function mapStateToProps(state) {
    return {
        isAuthenticated: state.AuthReducer.isAuthenticated,
        authUser: state.AuthReducer.authUser,
        reportCounts: state.ReportReducer.reportCounts,
        reportList: state.ReportReducer.reportList,
        cityList : state.ReportReducer.cityList,
        myReportList : state.ReportReducer.myReportList
    };
}

function mapDispatchToProps(dispatch) {
    return {
      getReportList : (cityNameOrTotal)=>dispatch(ReportMiddelware.getReportList(cityNameOrTotal)),
      //getMyReportList : (userId)=>dispatch(ReportMiddelware.getMyReportList(userId)),
      //getMyReportList : (cityNameOrTotal)=>dispatch(ReportMiddelware.getMyReportList(cityNameOrTotal)),
    };
}


class Dashboard extends Component {

  constructor(){
    super();
    this.state = {
      city:""
    };
  }

  handleCityChange = (event, index, value) => {
    this.setState({city:value});
    this.props.getReportList(value);
  }

  renderCityFilter(){
    var cityFilter = (
      <div style={{border: 'solid 1px #d9d9d9'}}>
        <div style={{display:"inline-block",verticalAlign:"bottom",paddingBottom:17,paddingRight:15}}>
          Select City To Filter Reports
        </div>
        <MUI.SelectField
            ref="city"
            floatingLabelText="City"
            value={this.state.city}
            autoWidth={true}
            onChange={this.handleCityChange.bind(this)}>
              {
                this.props.cityList.map(city=>{
                  return <MUI.MenuItem key={city} value={city} primaryText={city}/>
                })
              }
          </MUI.SelectField>
      </div>
    );
    if(this.props.location.pathname==="/myreports"){
      return null;
    }
    return cityFilter;
  }

  render() {
    console.log("in dashboard",this.props);
    return (
      <div className="dashboard-container">
        {
          this.props.location.pathname!=="/myreports"?(
        <div>
          <CrimeSummary {...this.props} city={this.state.city} />
          </div>):null
        }
        {this.renderCityFilter()}
        <div>
          <CrimeReports {...this.props} isAdmin={true} showSelfReports={this.props.location.pathname==="/myreports"} />
        </div>        
      </div>
    );
  }
}
//{this.props.children?React.cloneElement(this.props.children, {...this.props}):this.props.children}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
//export default Dashboard;

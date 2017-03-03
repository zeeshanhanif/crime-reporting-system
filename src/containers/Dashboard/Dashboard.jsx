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
        //donorDetail: state.DonorReducer.donorDetail,
        //isDetailUpdated: state.DonorReducer.isDetailUpdated
    };
}

function mapDispatchToProps(dispatch) {
    return {
      getReportList : (cityNameOrTotal)=>dispatch(ReportMiddelware.getReportList(cityNameOrTotal)),
      getMyReportList : (cityNameOrTotal)=>dispatch(ReportMiddelware.getReportList(cityNameOrTotal)),
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

  render() {
    return (
      <div className="dashboard-container">
        <div>
          <CrimeSummary {...this.props} city={this.state.city} />
        </div>
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
        <div>
          <CrimeReports {...this.props} />
        </div>        
      </div>
    );
  }
}
//{this.props.children?React.cloneElement(this.props.children, {...this.props}):this.props.children}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);
//export default Dashboard;

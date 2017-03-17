import ReportActions from "./../actions/reportActions";
//import AuthMiddleware from "./authMiddleware";
import * as firebase from 'firebase';

export default class ReportMiddleware {

    static fileReport(reportObj,reportCounts) {
        console.log("fileReport ",reportObj);
        return (dispatch) => {
            dispatch(ReportActions.fileReport())
            ReportMiddleware.addReportOnFirebase(dispatch,reportObj,reportCounts);            
        }
    }

    static addReportOnFirebase(dispatch,reportObj,reportCounts){
        var pushKey = firebase.database().ref('/')
            .child(`reports/${reportObj.city}`)
            .push().key;

        firebase.database().ref('/')
            .child(`reports/${reportObj.city}/${pushKey}`)
            .set(reportObj)
            .then(function (){
                console.log("updated in Reports collection");

                firebase.database().ref('/')
                    .child(`userreports/${reportObj.userId}/${pushKey}`)
                    .set(reportObj)
                    .then(function (){
                        console.log("updated in User reports");
                        dispatch(ReportActions.fileReportSuccessful());
                        ReportMiddleware.updateReportCounts(dispatch,reportObj,reportCounts);
                    });
            }).catch(function (error){
                dispatch(ReportActions.fileReportRejected(error));
            });    
        
    }

    static updateReportCounts(dispatch,reportObj,reportCounts){
        var cityCount = {
            complaints:0,
            crimes:0,
            missingPersons:0
        };
        var totalCount = {
            complaints:0,
            crimes:0,
            missingPersons:0
        };
        if(reportCounts && reportCounts[reportObj.city]){
            cityCount = {...reportCounts[reportObj.city]}
        }
        if(reportCounts && reportCounts.totalCounts){
            totalCount = {...reportCounts.totalCounts}
        }
        
        if(reportObj.reportType==="Complaint"){
            totalCount["complaints"] = ++totalCount["complaints"]
            cityCount["complaints"] = ++cityCount["complaints"]
        }
        if(reportObj.reportType==="Crime"){
            totalCount["crimes"] = ++totalCount["crimes"]
            cityCount["crimes"] = ++cityCount["crimes"]
        }
        if(reportObj.reportType==="Missing Person"){
            totalCount["missingPersons"] = ++totalCount["missingPersons"]
            cityCount["missingPersons"] = ++cityCount["missingPersons"]
        }

        var reportTotalCountRef = firebase.database().ref('/')
            .child(`reportCounts/totalCounts/`);
        var reportCityCountRef = firebase.database().ref('/')
            .child(`reportCounts/${reportObj.city}`);

        reportTotalCountRef.set(totalCount);
        reportCityCountRef.set(cityCount);
    }

        //Get Report Counts
    static getReportCounts() {
        console.log("getReportCounts");
        return (dispatch) => {
            dispatch(ReportActions.getReportCounts())
            ReportMiddleware.getReportCountFromFirebase(dispatch);            
        }
    }

    static getReportCountFromFirebase(dispatch){
        firebase.database().ref('/')
            .child(`reportCounts`)
            .on("value",function (snapshot){
                console.log(snapshot.val());
                dispatch(ReportActions.getReportCountsSuccessful(snapshot.val()));
            });
    }

    // Get Report List By City or Total
    static getReportList(cityNameOrTotal) {
        console.log("getReportList ",cityNameOrTotal);
        return (dispatch) => {
            dispatch(ReportActions.getReportList())
            ReportMiddleware.getReportListFromFirebase(dispatch,cityNameOrTotal);            
        }
    }

    static getReportListFromFirebase(dispatch,cityNameOrTotal){
        //playersRef.orderByChild("name").equalTo("John")
        var reportListRef = firebase.database().ref('/')
                            .child(`reports/${cityNameOrTotal}`);
        
        
        console.log("test middleware");
        reportListRef.on("child_added",function (snapshot){
            var reportObj = snapshot.val();
            reportObj.key = snapshot.key;
            dispatch(ReportActions.addReportToList(reportObj))
        })
    }

    //My Report List
    static getMyReportList(userId) {
        console.log("getMyReportList ",userId);
        return (dispatch) => {
            dispatch(ReportActions.getMyReportList())
            ReportMiddleware.getMyReportListFromFirebase(dispatch,userId);            
        }
    }

    static getMyReportListFromFirebase(dispatch,userId){
        var reportListRef = firebase.database().ref('/')
                            .child(`userreports/${userId}`);
        
        console.log("test middleware");
        reportListRef.on("child_added",function (snapshot){
            var reportObj = snapshot.val();
            reportObj.key = snapshot.key;
            dispatch(ReportActions.addMyReportToList(reportObj))
        })
    }

    //Get Report Detail
    static getReportDetial(reportCity,reportId) {
        console.log("getReportDetial ",reportId);
        return (dispatch) => {
            dispatch(ReportActions.getReportDetail())
            ReportMiddleware.getReportDetialFromFirebase(dispatch,reportCity,reportId);            
        }
    }

    static getReportDetialFromFirebase(dispatch,reportCity,reportId){
        firebase.database().ref('/')
            .child(`reports/${reportCity}/${reportId}`)
            .on("value",function (snapshot){
                var reportDetail = snapshot.val();
                reportDetail.key = snapshot.key;
                dispatch(ReportActions.getReportDetailSuccessful(reportDetail))
            });
    }


    static updateReportStatus(reportObj,newStatus) {
        console.log("fileReport ",reportObj);
        return (dispatch) => {
            dispatch(ReportActions.updateReportStatus())
            ReportMiddleware.updateReportStatusOnFirebase(dispatch,reportObj,newStatus);            
        }
    }

    static updateReportStatusOnFirebase(dispatch,reportObj,newStatus){
        var statusUpdateReportRef = firebase.database().ref('/')
            .child(`reports/${reportObj.city}/${reportObj.key}/statuslist`);
        var statusUpdateUserReportRef = firebase.database().ref('/')
            .child(`userreports/${reportObj.userId}/${reportObj.key}/statuslist`);
        statusUpdateReportRef.push({"statusMessage":newStatus});
        statusUpdateUserReportRef.push({"statusMessage":newStatus});
        dispatch(ReportActions.updateReportStatusSuccessful())

    }


    //Get Cities List
    static getListOfCities() {
        console.log("getListOfCities ");
        return (dispatch) => {
            dispatch(ReportActions.getListOfCities())
            ReportMiddleware.getCitiesListFromFirebase(dispatch);            
        }
    }


    static getCitiesListFromFirebase(dispatch){
        firebase.database().ref('/')
            .child(`cities`)
            .on("value",function (snapshot){
                console.log(snapshot.val());
                console.log(Object.keys(snapshot.val()));
                dispatch(ReportActions.getListOfCitiesSuccessful(Object.keys(snapshot.val())));
            });
    }
}
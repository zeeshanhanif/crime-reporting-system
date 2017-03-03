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
            dispatch(ReportActions.getListOfCities())
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
        const reportListRef = firebase.database().ref('/')
                            .child(`reports/${cityNameOrTotal}`)
        console.log("test middleware");
        reportListRef.on("child_added",function (snapshot){
            var reportObj = snapshot.val();
            reportObj.key = snapshot.key;
            dispatch(ReportActions.addReportToList(reportObj))
        })
    }



/*
    /// Fetch Donor List Functions
    static getDonorList(bloodGroup) {
        console.log("getDonorList ",bloodGroup);
        return (dispatch) => {
            dispatch(DonorActions.getDonorList())
            DonorMiddleware.getDonorListFromFirebase(dispatch,bloodGroup);            
        }
    }

    static getDonorListFromFirebase(dispatch,bloodGroup){
        //playersRef.orderByChild("name").equalTo("John")
        const donorListRef = firebase.database().ref('/')
                            .child("users")
                            .orderByChild("isDonor").equalTo(true);
        donorListRef.on("child_added",function (snapshot){
                        dispatch(DonorActions.addDonorToList(snapshot.val()))
                    })
    }

    //Get Donor Detail
    static getDonorDetial(donorId) {
        console.log("getDonorDetial ",donorId);
        return (dispatch) => {
            dispatch(DonorActions.getDonorDetail())
            DonorMiddleware.getDonorDetailFromFirebase(dispatch,donorId);            
        }
    }

    static getDonorDetailFromFirebase(dispatch,donorId){
        firebase.database().ref('/')
            .child(`users/${donorId}`)
            .on("value",function (snapshot){
                dispatch(DonorActions.getDonorDetailSuccessful(snapshot.val()))
            });
    }

*/

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